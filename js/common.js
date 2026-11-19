const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k,d){try{const v=localStorage.getItem('ce_'+k);return v===null?d:JSON.parse(v)}catch{return d}},set(k,v){try{localStorage.setItem('ce_'+k,JSON.stringify(v))}catch{}},del(k){try{localStorage.removeItem('ce_'+k)}catch{}}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cop=n=>n===0?'Gratis':'$ '+Number(n).toLocaleString('es-CO');
const fmtDate=(iso,o={weekday:'long',day:'numeric',month:'long'})=>new Date(iso+'T12:00:00').toLocaleDateString('es-CO',o);
const param=k=>new URLSearchParams(location.search).get(k);
const norm=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function toast(msg,ok=true){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
 t.innerHTML=`<i class="fa-solid ${ok?'fa-circle-check':'fa-circle-exclamation'}"></i> ${esc(msg)}`;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600)}
/* Favoritos */
const favs=()=>store.get('favs',[]);
const isFav=k=>favs().includes(k);
function toggleFav(k){let f=favs();const on=!f.includes(k);f=on?[...f,k]:f.filter(x=>x!==k);store.set('favs',f);return on}
const heartIcon=on=>on?'fa-solid fa-heart':'fa-regular fa-heart';
const heartBtn=(k,cls='')=>`<button class="heart ${cls} ${isFav(k)?'on':''}" data-fav="${k}" aria-label="Favorito"><i class="${heartIcon(isFav(k))}"></i></button>`;
/* Notificaciones */
function notifs(){let n=store.get('notifs',null);if(!n){n=[{id:1,t:'¡Bienvenido a Caribe Explora!',s:'Empieza explorando Cartagena, Barranquilla y Santa Marta.',read:false},
 {id:2,t:'Consejo de viaje',s:'Reserva los tours a las islas y a Tayrona con anticipación.',read:false},{id:3,t:'Planifica tu ruta',s:'Genera un itinerario según tu presupuesto e intereses.',read:false}];store.set('notifs',n)}return n}
function pushNotif(t,s){const n=notifs();n.unshift({id:Date.now(),t,s,read:false});store.set('notifs',n.slice(0,15))}
/* Header */
function renderHeader(active){
 const u=store.get('user',{name:'Gillian'}),un=notifs().filter(n=>!n.read).length;
 const lnk=(h,k,i,l)=>`<a href="${h}" ${active===k?'class="active"':''}><i class="fa-solid ${i}"></i>${l}</a>`;
 $('#hdr').outerHTML=`<header class="nav"><a class="brand" href="index.html">Caribe Explora <img src="img/logo.png" alt="Logo"></a>
 <nav class="menu">${lnk('index.html','inicio','fa-house','Inicio')}${lnk('explorar.html','explorar','fa-compass','Explorar Destinos')}${lnk('planificar.html','planificar','fa-person-walking-luggage','Planificar Viaje')}${lnk('favoritos.html','favoritos','fa-heart','Favoritos')}</nav>
 <div class="right"><div class="dd"><button class="iconbtn" id="bell" aria-label="Notificaciones"><i class="fa-regular fa-bell"></i>${un?`<span class="dot">${un}</span>`:''}</button><div class="panel" id="pn"></div></div>
 <div class="dd"><button class="avatar" id="av" aria-label="Perfil">${esc((u.name||'G')[0].toUpperCase())}</button><div class="panel menu-p" id="pu">
  <div class="uname">${esc(u.name)}</div><a href="perfil.html"><i class="fa-regular fa-user"></i>Mi perfil</a><a href="favoritos.html"><i class="fa-regular fa-heart"></i>Mis favoritos</a><a href="itinerario.html"><i class="fa-regular fa-calendar"></i>Mi itinerario</a></div></div></div></header>`;
 const pn=$('#pn');
 const draw=()=>{const n=notifs();pn.innerHTML=`<div class="ph-h"><b>Notificaciones</b><button id="mr">Marcar leídas</button></div>`+n.map(x=>`<div class="nt ${x.read?'':'unread'}"><b>${esc(x.t)}</b><span>${esc(x.s)}</span></div>`).join('')};
 draw();
 $('#bell').onclick=e=>{e.stopPropagation();$('#pu').classList.remove('open');pn.classList.toggle('open')};
 $('#av').onclick=e=>{e.stopPropagation();pn.classList.remove('open');$('#pu').classList.toggle('open')};
 pn.onclick=e=>{e.stopPropagation();if(e.target.id==='mr'){store.set('notifs',notifs().map(x=>({...x,read:true})));draw();const d=$('#bell .dot');d&&d.remove()}};
 document.addEventListener('click',()=>{pn.classList.remove('open');$('#pu').classList.remove('open')});
}
/* Tarjetas */
function itemCard(it){const c=CITY[it.city],T=TYPE[it.type];
 return `<article class="item"><img class="ithumb" src="img/${c.thumb}" alt=""><div class="ibody"><div class="itop"><span class="badge t-${it.type}"><i class="fa-solid ${T.icon}"></i>${T.label}</span>${heartBtn('i:'+it.id,'sm')}</div>
 <h3>${esc(it.name)}</h3><p class="idesc">${esc(it.desc)}</p>
 <div class="imeta"><span><i class="fa-solid fa-location-dot"></i>${c.name}</span>${it.dur?`<span><i class="fa-regular fa-clock"></i>${it.dur}</span>`:''}<span class="price">${cop(it.cost)}${it.type==='hotel'?' / noche':''}</span></div>
 <button class="btn-sm" data-add="${it.id}"><i class="fa-solid fa-plus"></i>${it.type==='hotel'?'Elegir como hotel':'Agregar al itinerario'}</button></div></article>`}
/* Itinerario: agregar */
function addToItin(id){const it=BY_ID[id],itin=store.get('itin',null);
 if(!itin){toast('Primero crea tu itinerario',false);setTimeout(()=>location.href='planificar.html',1000);return}
 if(it.type==='hotel'){if(!itin.cities.includes(it.city)){toast(`${CITY[it.city].name} no está en tu itinerario`,false);return}
  itin.hotels[it.city]=id;store.set('itin',itin);toast(`Hotel actualizado en ${CITY[it.city].name}`);return}
 let di=itin.days.findIndex(d=>d.city===it.city);if(di<0)di=0;
 if(itin.days[di].items.some(x=>x.id===id)){toast('Ya está en ese día',false);return}
 itin.days[di].items.push({id,slot:it.type==='transporte'?'Traslado':'Libre'});store.set('itin',itin);toast(`Agregado al día ${di+1}`)}
document.addEventListener('click',e=>{
 const f=e.target.closest('[data-fav]');
 if(f){e.preventDefault();e.stopPropagation();const on=toggleFav(f.dataset.fav);$$(`[data-fav="${f.dataset.fav}"]`).forEach(b=>{b.classList.toggle('on',on);b.firstElementChild.className=heartIcon(on)});
  toast(on?'Agregado a favoritos':'Quitado de favoritos');document.dispatchEvent(new CustomEvent('favchange'));return}
 const a=e.target.closest('[data-add]');if(a){e.preventDefault();addToItin(a.dataset.add)}});
