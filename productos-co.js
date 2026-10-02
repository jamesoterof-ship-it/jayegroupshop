/* ============================================================
   PRODUCTO · Gafas de Aumento TR90 · Jaye Group Colombia
   Mismo formato que nadplus/productos.js (la tienda de Chile), para que la
   ficha se arme con el mismo diseño.
   Escalera APROBADA por James el 29-09-2026:
     contra entrega: 1 par $59.900 · 2 pares $89.900
     anticipado:     1 par $50.000 · 2 pares $77.000
   Solo se dice lo que es verdad del producto (proveedor Dropi 2229646).
   ============================================================ */
/* Kit Chao Canas · PAGO ANTICIPADO (1 / 2 / 3 kits).
   APROBADOS por James el 01-10-2026. Este es el ÚNICO lugar donde se cambian
   (la ficha, la tienda y el candado de precios los leen de aquí). */
var CHAO_ANTICIPADO = [59900, 86900, 112900];

window.PRODUCTOS = [
  {
    id: 'gafas', unidad: 'par', promo: 2,
    nombre: 'Gafas de Aumento TR90',
    sub: 'Vuelve a leer de cerca sin esfuerzo',
    categoria: 'Salud',
    foto: 'img/card3.webp',
    fotos: ['img/hero.webp', 'img/card1.webp', 'img/card2.webp', 'img/card3.webp', 'img/oferta.webp'],
    acento: '#A16207',        /* dorado del screen: botones y selecciones */
    botonAlt: '#1C1917',
    antesDespues: 'img/antes-despues.webp',
    antesDespuesSub: 'De forzar la vista con el celular a leer tranquilo y nítido.',
    desc: 'Gafas de aumento TR90 sin marco para leer de cerca: el celular, el periódico, la letra pequeña de los medicamentos. Son ultralivianas, con patas flexibles y filtro de luz azul, y cada par viene con estuche rígido con cremallera y gancho, y paño de microfibra. Graduación de +1.00 a +4.00.',
    puntos: [
      'Para leer de cerca sin forzar la vista',
      'Sin marco y ultralivianas, con patas TR90 flexibles',
      'Filtro de luz azul para celular y computador',
      'Estuche rígido con gancho + paño en cada par',
      'Graduación de +1.00 a +4.00',
    ],
    formulaRotulo: 'Lo que tienen',
    formulaTitulo: 'Pensadas para usarlas todo el día.',
    formulaSub: 'Livianas, flexibles y con todo lo que necesitas en la caja.',
    formula: [
      ['ojo', 'Visión nítida de cerca', 'Para el celular, libros, recetas y la letra pequeña.'],
      ['pantalla', 'Filtro de luz azul', 'Más cómodas frente al celular y el computador.'],
      ['pluma', 'Ultralivianas', 'Sin marco y con patas TR90 flexibles.'],
      ['escudo', 'Estuche rígido', 'Con cremallera y gancho para colgarlo, más paño de microfibra.'],
      ['libro', 'De +1.00 a +4.00', 'Eliges la graduación de cada par.'],
      ['casa', 'Uno en cada parte', 'Por eso el combo de 2 pares es el que más piden.'],
    ],
    comparaTitulo: '¿Por qué estas y no unas cualquiera?',
    compara: [
      'Sin marco y ultralivianas: casi no se sienten.',
      'Patas flexibles TR90 que no se parten fácil.',
      'Filtro de luz azul para las pantallas.',
      'Estuche rígido con gancho y paño incluidos.',
    ],
    preguntas: [
      { q: '¿Cómo sé qué graduación elegir?', a: 'En el formulario tienes una guía por edad. Si ya usas gafas de lectura, elige el mismo número que tienen.' },
      { q: '¿Necesito receta médica?', a: 'No. Son gafas de aumento para leer de cerca. No corrigen astigmatismo ni reemplazan unas gafas formuladas: si tienes fórmula, lo correcto es mandarla a hacer.' },
      { q: '¿Qué trae cada par?', a: 'Las gafas, un estuche rígido con cremallera y gancho, y un paño de microfibra.' },
    ],
    /* contra entrega (lo de siempre) */
    packs: [
      { cant: 1, precio: 59900, antes: 0, texto: '1 par' },
      { cant: 2, precio: 89900, antes: 119800, texto: '2 pares' },
    ],
    /* pago anticipado: como en España, un precio por pack */
    anticipado: { precios: [50000, 77000], titulo: 'Pago anticipado', envio: 'Despacho prioritario · Tarjeta, PSE o Nequi' },
    popular: 1,
  },
  /* ------------------------------------------------------------
     Kit Chao Canas (Matuyal, 3 en 1) · proveedor Dropi 2152776
     Contra entrega APROBADO por James: 1 kit $69.900 · 2 kits $99.900 · 3 kits $129.900
     La página propia vive en /chao-canas/ (chao.js). Sin precio "antes":
     no se inventa; el ahorro que se muestra es contra comprar los kits por separado.
     ------------------------------------------------------------ */
  {
    id: 'chao-canas', unidad: 'kit', promo: 2,
    nombre: 'Kit Chao Canas',
    sub: 'Shampoo + color para cubrir las canas en casa',
    categoria: 'Cuidado personal',
    foto: '/chao-canas/img/producto.webp',
    fotos: ['/chao-canas/img/hero.webp', '/chao-canas/img/producto.webp', '/chao-canas/img/tonos.webp'],
    acento: '#059669',
    botonAlt: '#EA580C',
    packs: [
      { cant: 1, precio: 69900, antes: 0, texto: '1 kit' },
      { cant: 2, precio: 99900, antes: 0, texto: '2 kits' },
      { cant: 3, precio: 129900, antes: 0, texto: '3 kits' },
    ],
    /* pago anticipado aprobado por James el 01-10-2026 (ver CHAO_ANTICIPADO arriba) */
    anticipado: { precios: CHAO_ANTICIPADO, titulo: 'Pago anticipado', envio: 'Despacho prioritario · Tarjeta, PSE o Nequi' },
    popular: 1,
  },
];

/* preguntas de despacho y pago, iguales para todos (como en Chile) */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad. Con pago anticipado tu pedido se despacha con prioridad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Eliges "Pago contra entrega" y pagas en efectivo cuando te llegue el pedido.' },
  { q: '¿El pago anticipado es seguro?', a: 'Sí. Se procesa con Wompi, la pasarela de pagos de Bancolombia. Puedes pagar con tarjeta, PSE o Nequi, y nosotros nunca vemos los datos de tu tarjeta.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a toda Colombia ya está incluido en el precio.' },
];

/* candado de Chile: si un precio no está aprobado, la ficha no vende */
window.PRECIOS_APROBADOS = [59900, 89900, 50000, 77000,
  69900, 99900, 129900]            /* Kit Chao Canas contra entrega (aprobados por James) */
  .concat(CHAO_ANTICIPADO);        /* Kit Chao Canas anticipado: aprobado 01-10 */
