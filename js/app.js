const DESTINOS=[
 {n:'Cartagena',d:'Bolívar',img:'card-cartagena.png',t:['Cultura','Gastronomía','Recreación']},
 {n:'Barranquilla',d:'Atlántico',img:'card-barranquilla.png',t:['Cultura','Gastronomía','Recreación']},
 {n:'Santa Marta',d:'Magdalena',img:'card-santamarta.png',t:['Cultura','Gastronomía','Recreación']}];
function renderExplorar(){
 const g=document.getElementById('grid');let tag='Todos',q='';
 const draw=()=>{g.innerHTML=DESTINOS.filter(x=>(tag==='Todos'||x.t.includes(tag))&&x.n.toLowerCase().includes(q)).map(x=>`
 <article class="dest"><div class="ph"><img src="img/${x.img}" alt="${x.n}"><button class="heart" aria-label="Favorito"><i class="fa-regular fa-heart"></i></button></div>
 <div class="body"><h3>${x.n}</h3><div class="loc"><i class="fa-solid fa-location-dot"></i>${x.d}</div>
 <div class="stats"><span><i class="fa-solid fa-landmark"></i>Lugares</span><span><i class="fa-solid fa-utensils"></i>Comida</span><span><i class="fa-solid fa-bed"></i>Hoteles</span><span><i class="fa-solid fa-camera"></i>Tours</span></div></div></article>`).join('')};
 draw();
 document.querySelectorAll('.pill').forEach(p=>p.onclick=()=>{document.querySelectorAll('.pill').forEach(b=>b.classList.remove('on'));p.classList.add('on');tag=p.textContent;draw()});
 document.getElementById('q').oninput=e=>{q=e.target.value.toLowerCase();draw()};
 g.onclick=e=>{const h=e.target.closest('.heart');if(h){h.classList.toggle('on');h.firstElementChild.className=h.classList.contains('on')?'fa-solid fa-heart':'fa-regular fa-heart'}};
}
function initPlanificar(){
 document.querySelectorAll('.city').forEach(c=>c.onclick=()=>c.classList.toggle('on'));
 document.querySelectorAll('.int').forEach(c=>c.onclick=()=>c.classList.toggle('on'));
 document.getElementById('go').onclick=()=>{
  const ci=[...document.querySelectorAll('.city.on')].map(x=>x.textContent.trim()),
  it=[...document.querySelectorAll('.int.on')].map(x=>x.textContent.trim()),
  d=document.querySelectorAll('input[type=date]'),r=document.getElementById('res');
  r.innerHTML=`<b>Tu viaje:</b> ${ci.join(', ')||'—'}<br>${d[0].value} → ${d[1].value}<br>Intereses: ${it.join(', ')||'—'}`;r.classList.add('show')};
}
