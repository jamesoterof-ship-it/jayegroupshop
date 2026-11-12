/* ============================================================
   PRODUCTO · Gafas de Aumento TR90 · Jaye Group Colombia
   Página recuperada el 12-11-2026 (se había borrado el 28-10 cuando la tienda
   pasó a Ecuador). El /productos-co.js de la raíz ahora es el catálogo de México,
   por eso las gafas de Colombia tienen su propio archivo aquí.
   Proveedor Dropi 2229646 "GAFA TR90 DE AUMENTO VIDRIO": $11.000 por unidad,
   +1.00 a +4.00, ~61.000 en stock (12-11).
   Escalera APROBADA por James el 12-11-2026 ("Sí, esos" y "Sí, dale"):
     contra entrega: 1 par $59.900 · 2 pares $79.900
     anticipado (10 % menos):  1 par $53.900 · 2 pares $71.900
   ============================================================ */
window.PRODUCTOS = [
  {
    id: 'gafas', unidad: 'par', promo: 2,
    nombre: 'Gafas de Aumento TR90',
    sub: 'Vuelve a leer de cerca sin esfuerzo',
    categoria: 'Salud',
    foto: 'img/card3.webp',
    fotos: ['img/hero.webp', 'img/card1.webp', 'img/card2.webp', 'img/card3.webp', 'img/oferta.webp'],
    acento: '#A16207',
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
    packs: [
      { cant: 1, precio: 59900, antes: 0, texto: '1 par' },
      { cant: 2, precio: 79900, antes: 119800, texto: '2 pares' },
    ],
    anticipado: { precios: [53900, 71900], titulo: 'Pago anticipado', envio: 'Despacho prioritario · Tarjeta, PSE o Nequi' },
    popular: 1,
  },
];

window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad. Con pago anticipado tu pedido se despacha con prioridad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Eliges "Pago contra entrega" y pagas en efectivo cuando te llegue el pedido.' },
  { q: '¿El pago anticipado es seguro?', a: 'Sí. Se procesa con Wompi, la pasarela de pagos de Bancolombia. Puedes pagar con tarjeta, PSE o Nequi, y nosotros nunca vemos los datos de tu tarjeta.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a toda Colombia ya está incluido en el precio.' },
];

/* candado: si un precio no está aprobado, la ficha no vende */
window.PRECIOS_APROBADOS = [59900, 79900, 53900, 71900];
