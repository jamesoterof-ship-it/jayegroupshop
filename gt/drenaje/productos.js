/* ============================================================
   FICHA · DRENAJE LINFÁTICO MASVELD · GUATEMALA (jayegroupshop.com/gt/drenaje/) · 11-11-2026
   Página IDÉNTICA a la de Lymphoria de Chile (jayegroup.com.co/lymphoria), James: "mira el de Chile, hazlo idéntico sin
   cambiarle nada, solo dirigido a Guatemala". Mismo formato que el productos.js de Chile (lo lee ficha.js, copia del de Chile).
   Dropi GT 19504 "GOTAS DE DRENAJE LINFATICO" (proveedor Ghilda, costo Q34). Frasco de vidrio ámbar marca MASVELD.
   🔴 La etiqueta del frasco y la ficha de Dropi NO coinciden en los ingredientes: no se nombra ninguno (James 11-11).
      Tampoco se afirma ml, sabor, vegano ni sin gluten: nada de eso está confirmado.
   🔴 Suplemento: no se dice que desinflama, que baja la hinchazón, que adelgaza ni la dosis. Solo lo que dice su etiqueta
      («linfático tradicional · extracto 100 % natural») y hechos de la compra.
   Escalera APROBADA por James 11-11: contra entrega 1 frasco Q139 · 2 frascos Q172 · 4 frascos Q295;
   con tarjeta −10 %: Q125 · Q155 · Q265. Tachado con el criterio de Chile: el 1 frasco +30 %, los packs = frascos sueltos.
   Reseñas: ninguna hasta tener reales de Guatemala (sinResenas, James 11-11).
   ============================================================ */
window.PRODUCTOS = [
  {
    id: 'drenaje', unidad: 'frasco', promo: 2,
    dropiId: 19504,
    /* sin video: el de Chile muestra el frasco Lymphoria */
    sinResenas: true,
    /* «El cambio»: compara la RUTINA (polvos y cápsulas contra unas gotas), nunca el cuerpo */
    antesDespues: 'img/gt-dren-cambio.webp?v=1',
    antesDespuesSub: 'Cómo era la rutina con polvos y cápsulas, y cómo es con unas gotas en el vaso.',
    preguntas: [
      { q: '¿Para qué sirve?', a: 'Es un drenaje linfático en gotas, a base de extractos de plantas. Está pensado para apoyar el funcionamiento del sistema linfático, acompañar el equilibrio natural de líquidos del organismo y sumarse a una rutina de alimentación equilibrada y actividad física. Su etiqueta lo presenta como «linfático tradicional · extracto 100 % natural». Es un suplemento: acompaña tu alimentación y no la reemplaza.' },
      { q: '¿Cómo se toma?', a: 'Se agregan unas gotas a un vaso de agua o de jugo, en el momento del día que prefieras. La dosis sugerida viene indicada en la etiqueta del frasco.' },
      { q: '¿Qué trae dentro?', a: 'Extractos de plantas en gotas, en un frasco de vidrio ámbar. La composición completa viene declarada en la etiqueta del frasco.' },
      { q: '¿Cuánto me dura?', a: 'Depende de la dosis que indica la etiqueta. Por eso la mayoría se lleva el pack de 2 frascos: sale más conveniente y no se queda sin.' },
      { q: '¿Se puede llevar en la cartera?', a: 'Sí. Es un frasco chico de vidrio con tapa de rosca, así que cabe en cualquier bolso y lo usas donde estés.' },
      { q: '¿Quién no debería tomarlo?', a: 'No se recomienda para menores de edad, embarazadas ni mujeres en período de lactancia, salvo indicación de un profesional de la salud. Si tomas medicamentos o tienes alguna condición de salud, consulta antes con tu médico. No reemplaza una alimentación balanceada.' },
    ],
    formulaRotulo: 'Qué trae dentro',
    formulaTitulo: 'Extractos de plantas en gotas.',
    formulaSub: 'Lo que declara la etiqueta del fabricante: drenaje linfático tradicional, extracto natural, en un frasco de vidrio ámbar.',
    formula: [
      ['hoja', 'Extractos de plantas', 'La fórmula es a base de extractos vegetales. La composición completa viene en la etiqueta del frasco.'],
      ['gota', 'En gotas', 'Se mezcla en tu agua o en tu jugo: no hay cápsulas que tragar ni polvo que quede en el fondo.'],
      ['escudo', 'Frasco de vidrio ámbar', 'Con tapa de rosca, para que no se derrame en el bolso.'],
      ['hoja', 'Drenaje Linfático Masveld', 'El frasco que recibes es el de la foto, con su etiqueta del fabricante.'],
    ],
    comparaTitulo: 'Por qué en gotas y no en cápsulas',
    compara: [
      'Se mezcla en tu agua o tu jugo: no hay que tragar pastillas.',
      'Unas gotas y listo: nada de contar cápsulas.',
      'Extracto natural en un frasco que cabe en tu bolso.',
    ],
    nombre: 'Drenaje Linfático Masveld',
    sub: 'Extractos de plantas en gotas',
    categoria: 'Bienestar',
    foto: 'img/prod-drenaje.webp?v=1',
    fotos: ['img/prod-drenaje.webp?v=1', 'img/gt-dren-llega.webp?v=1'],
    acento: '#1E4D3B',   /* el mismo verde bosque de la página de Chile */
    desc: 'Un drenaje linfático en gotas, a base de extractos de plantas, pensado para apoyar el funcionamiento del sistema linfático y acompañar el equilibrio natural de líquidos del organismo. Su etiqueta lo presenta como «linfático tradicional · extracto 100 % natural». Es un suplemento, no un medicamento.',
    puntos: [
      'Apoya el funcionamiento del sistema linfático',
      'Acompaña el equilibrio natural de líquidos del organismo',
      'Extractos de plantas, en gotas',
      'Se toma en gotas: nada de cápsulas ni de polvos con grumos',
      'Frasco de vidrio ámbar con tapa de rosca',
      'Pagas al recibir, con envío gratis a toda Guatemala',
    ],
    packs: [
      { cant: 1, precio: 139, antes: 181, texto: '1 frasco' },
      { cant: 2, precio: 172, antes: 278, texto: '2 frascos' },
      { cant: 4, precio: 295, antes: 556, texto: '4 frascos' },
    ],
    popular: 1,   /* el pack de 2, el más pedido (igual que Chile) */
    /* pago con tarjeta −10 % (lo lee el formulario de Guatemala y los precios de arriba) */
    anticipado: { pct: 10, titulo: 'Paga ahora con tarjeta', envio: 'Entrega prioritaria: sale primero', precios: [125, 155, 265] },
  },
];

/* preguntas de despacho y pago de Guatemala (las 4 primeras van debajo de las del producto, como en Chile) */
window.PREGUNTAS = [
  { q: '¿Cuándo me llega?', a: 'Normalmente entre 2 y 5 días hábiles, según tu municipio. Te escribimos por WhatsApp para confirmar tu pedido y coordinar la entrega.' },
  { q: '¿Tiene garantía?', a: 'Sí. Si te llega dañado o distinto, te lo cambiamos. Y puedes retractarte dentro de los 5 días hábiles siguientes a la entrega, con el producto sin uso y en su empaque original. Revisa la Política de cambios y devoluciones.' },
  { q: '¿Cómo pago?', a: 'Pagas en efectivo cuando recibes el producto en tu dirección. Si prefieres, pagas ahora con tarjeta y ahorras un 10 %.' },
  { q: '¿Llegan a mi municipio?', a: 'Enviamos a toda Guatemala. Elige tu departamento y tu municipio en el formulario; si es una zona lejana puede tardar un poco más.' },
];

/* Candado de precios: solo la escalera aprobada por James el 11-11 */
window.PRECIOS_APROBADOS = [139, 172, 295, 125, 155, 265];
