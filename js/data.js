/* Datos de ejemplo (precios y horarios referenciales) */
const CITIES=[
 {id:'cartagena',name:'Cartagena',state:'Bolívar',tag:'Historia, cultura y mar',card:'card-cartagena.png',thumb:'thumb-cartagena.png',
  desc:'Ciudad amurallada, calles coloniales, fortalezas y las islas del Caribe a pocos minutos en lancha.'},
 {id:'barranquilla',name:'Barranquilla',state:'Atlántico',tag:'Alegría, tradición y sabor',card:'card-barranquilla.png',thumb:'thumb-barranquilla.png',
  desc:'La puerta de oro de Colombia: Carnaval, río Magdalena, música y una gastronomía inconfundible.'},
 {id:'santamarta',name:'Santa Marta',state:'Magdalena',tag:'Naturaleza y aventura',card:'card-santamarta.png',thumb:'thumb-santamarta.png',
  desc:'La ciudad más antigua de Colombia, entre la Sierra Nevada y el mar: playas, parques naturales y buceo.'}];
const CITY=Object.fromEntries(CITIES.map(c=>[c.id,c]));
const TYPE={lugar:{label:'Lugar',icon:'fa-landmark',tab:'Lugares'},comida:{label:'Comida',icon:'fa-utensils',tab:'Comida'},
 hotel:{label:'Hotel',icon:'fa-bed',tab:'Hoteles'},tour:{label:'Tour',icon:'fa-camera',tab:'Tours'},transporte:{label:'Transporte',icon:'fa-bus',tab:'Transporte'}};
const INTERESTS=[{k:'cultura',l:'Cultura',i:'fa-masks-theater'},{k:'gastronomia',l:'Gastronomía',i:'fa-utensils'},{k:'playa',l:'Playa y naturaleza',i:'fa-umbrella-beach'},
 {k:'aventura',l:'Aventura',i:'fa-compass'},{k:'noche',l:'Vida nocturna',i:'fa-martini-glass'},{k:'compras',l:'Compras',i:'fa-bag-shopping'}];
let _n=0;
const I=(city,type,cat,name,desc,cost,tags,extra={})=>({id:'i'+(++_n),city,type,cat,name,desc,cost,tags,...extra});
const ITEMS=[
 // Cartagena
 I('cartagena','lugar','Cultura','Castillo San Felipe de Barajas','Fortaleza colonial con túneles y vistas de toda la ciudad.',30000,['cultura'],{dur:'2 h'}),
 I('cartagena','lugar','Cultura','Ciudad Amurallada y Torre del Reloj','Recorrido a pie por plazas, iglesias y balcones coloniales.',0,['cultura','compras'],{dur:'3 h'}),
 I('cartagena','lugar','Cultura','Getsemaní y sus murales','Barrio artístico con arte urbano, plazas y bares al atardecer.',0,['cultura','noche'],{dur:'2 h'}),
 I('cartagena','lugar','Recreación','Playa de Bocagrande','Playa urbana ideal para caminar al atardecer.',0,['playa'],{dur:'2 h'}),
 I('cartagena','comida','Gastronomía','Cevichería del Muelle','Ceviches, arroz con coco y pescado frito frente al mar.',65000,['gastronomia'],{dur:'1,5 h'}),
 I('cartagena','comida','Gastronomía','Casa Candé','Cocina caribeña de autor en el centro histórico.',90000,['gastronomia','noche'],{dur:'2 h'}),
 I('cartagena','comida','Gastronomía','Fritos de la Plaza','Arepas de huevo, empanadas y carimañolas para el desayuno.',18000,['gastronomia'],{dur:'45 min'}),
 I('cartagena','hotel','Recreación','Hotel Casa Amurallada','Hotel boutique dentro del centro histórico, con piscina en el patio.',380000,['cultura']),
 I('cartagena','hotel','Recreación','Hotel Bocagrande Mar','Frente a la playa, desayuno incluido y aire acondicionado.',260000,['playa']),
 I('cartagena','tour','Recreación','Islas del Rosario en lancha','Día de playa y snorkel en el archipiélago, almuerzo incluido.',190000,['playa','aventura'],{dur:'8 h'}),
 I('cartagena','tour','Cultura','Free tour del centro histórico','Guía local por los rincones más emblemáticos de la ciudad.',40000,['cultura'],{dur:'2,5 h'}),
 I('cartagena','tour','Recreación','Atardecer en velero','Navegación por la bahía con bebida de bienvenida.',150000,['noche','aventura'],{dur:'2 h'}),
 // Barranquilla
 I('barranquilla','lugar','Cultura','Museo del Caribe','Un viaje interactivo por la historia y la cultura de la región.',25000,['cultura'],{dur:'2 h'}),
 I('barranquilla','lugar','Recreación','Gran Malecón del Río','Paseo peatonal sobre el río Magdalena con restaurantes y espacios al aire libre.',0,['noche','compras'],{dur:'2 h'}),
 I('barranquilla','lugar','Cultura','Barrio Abajo y Casa del Carnaval','Cuna de las tradiciones carnavaleras de la ciudad.',15000,['cultura'],{dur:'2 h'}),
 I('barranquilla','lugar','Cultura','Catedral Metropolitana María Reina','Templo moderno con vitrales de gran formato.',0,['cultura'],{dur:'1 h'}),
 I('barranquilla','comida','Gastronomía','Butifarras y Bollo de la Troja','Parada obligada de la comida callejera barranquillera.',20000,['gastronomia'],{dur:'45 min'}),
 I('barranquilla','comida','Gastronomía','Sancocho de Guandú del Malecón','Sopa tradicional costeña con carne asada.',48000,['gastronomia'],{dur:'1,5 h'}),
 I('barranquilla','comida','Gastronomía','Terraza del Río','Cenas con vista al río y coctelería de autor.',85000,['gastronomia','noche'],{dur:'2 h'}),
 I('barranquilla','hotel','Recreación','Hotel Prado Real','Hotel clásico en el barrio El Prado, con piscina y desayuno.',230000,['cultura']),
 I('barranquilla','hotel','Recreación','Hotel Norte Plaza','Moderno, cerca de centros comerciales y vida nocturna.',290000,['compras','noche']),
 I('barranquilla','tour','Cultura','Tour de Carnaval y Cumbia','Taller de baile y recorrido por talleres de disfraces.',90000,['cultura','noche'],{dur:'3 h'}),
 I('barranquilla','tour','Recreación','Bocas de Ceniza y Puerto Mocho','Paseo en lancha donde el río se une al mar.',110000,['aventura','playa'],{dur:'4 h'}),
 I('barranquilla','tour','Gastronomía','Ruta gastronómica callejera','Degustación guiada de cinco platos típicos.',75000,['gastronomia'],{dur:'3 h'}),
 // Santa Marta
 I('santamarta','lugar','Cultura','Quinta de San Pedro Alejandrino','Hacienda donde murió Simón Bolívar, con jardines y museo.',28000,['cultura'],{dur:'2 h'}),
 I('santamarta','lugar','Cultura','Centro Histórico y Catedral','Plazas, museos y cafés en la ciudad más antigua del país.',0,['cultura','compras'],{dur:'2 h'}),
 I('santamarta','lugar','Recreación','Playa Los Cocos y El Rodadero','Playas tranquilas con palmeras y restaurantes de pescado.',0,['playa'],{dur:'3 h'}),
 I('santamarta','lugar','Recreación','Malecón y Bahía de Santa Marta','Paseo marítimo animado al caer la tarde.',0,['noche'],{dur:'1,5 h'}),
 I('santamarta','comida','Gastronomía','Mojarra frita en Taganga','Pescado fresco frente a la bahía.',55000,['gastronomia'],{dur:'1,5 h'}),
 I('santamarta','comida','Gastronomía','Cayeye y Arepa de Huevo','Desayuno típico del Magdalena.',22000,['gastronomia'],{dur:'45 min'}),
 I('santamarta','comida','Gastronomía','Bar Rooftop Sierra','Tragos y cocina fusión con vista a la Sierra Nevada.',80000,['noche','gastronomia'],{dur:'2 h'}),
 I('santamarta','hotel','Recreación','Hotel Bahía Dorada','Frente al mar en el centro, con terraza y desayuno incluido.',300000,['playa']),
 I('santamarta','hotel','Recreación','Eco-hostal Sierra Verde','Alojamiento rústico cercano a la naturaleza.',150000,['aventura']),
 I('santamarta','tour','Recreación','Parque Tayrona','Senderos entre selva y playas vírgenes; salida desde la ciudad.',210000,['playa','aventura'],{dur:'10 h'}),
 I('santamarta','tour','Recreación','Minca y cascadas','Pueblo de montaña, café de origen y baño en cascadas.',140000,['aventura'],{dur:'8 h'}),
 I('santamarta','tour','Recreación','Buceo en Taganga','Bautizo de buceo con instructor certificado.',180000,['aventura','playa'],{dur:'4 h'}),
];
const TRANSPORTE=[
 ['cartagena','barranquilla','Bus intermunicipal','2 h 30 min',35000],['barranquilla','cartagena','Bus intermunicipal','2 h 30 min',35000],
 ['barranquilla','santamarta','Bus intermunicipal','1 h 45 min',28000],['santamarta','barranquilla','Bus intermunicipal','1 h 45 min',28000],
 ['cartagena','santamarta','Bus directo','4 h 30 min',65000],['santamarta','cartagena','Bus directo','4 h 30 min',65000],
 ['cartagena','cartagena','Taxi aeropuerto - centro','20 min',18000],['santamarta','santamarta','Buseta urbana a El Rodadero','25 min',3500]
].map((r,i)=>({id:'t'+(i+1),city:r[0],from:r[0],to:r[1],type:'transporte',cat:'Recreación',
 name:r[0]===r[1]?r[2]:`${CITY[r[0]].name} → ${CITY[r[1]].name}`,desc:r[0]===r[1]?'Trayecto dentro de la ciudad.':`${r[2]} · ${r[3]}`,cost:r[4],tags:[],dur:r[3]}));
const ALL=[...ITEMS,...TRANSPORTE];
const BY_ID=Object.fromEntries(ALL.map(x=>[x.id,x]));
