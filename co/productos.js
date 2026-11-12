/* ============================================================
   PRODUCTOS · Jaye Group COLOMBIA (jayegroupshop.com/co/, desde el 10-11-2026; precios en PESOS COLOMBIANOS).
   Mismo formato que /pe/productos.js, para que la portada se arme igual que todas las tiendas.
   Los productos de Colombia entran cuando James aprueba el producto y sus precios.
   Las fichas viven en /co/<id>/ (cada una con su propio productos.js; aquí va lo que pinta la portada).
   ============================================================ */
window.PRODUCTOS = [
  /* 11/12-11 James: Funda navideña para puerta (Dropi 1979374) y Fundas navideñas para silla (2295051 / 2296349).
     Precios aprobados: puerta 1 $75.000 · 2 $109.900 · 3 $124.900 · 4 $139.900 · sillas 4 $70.000 · 6 $90.000; anticipado Wompi −10 %. */
  {
    id: 'funda', dropiId: 1979374,
    nombre: 'Funda Navideña para Puerta',
    sub: '2 m × 1 m, elástica: se ajusta también a puertas de menos de 1 m · 34 diseños',
    categoria: 'Hogar',
    etiqueta: 'Edición Navidad',
    foto: 'co/funda/img/fp-heroe.webp?v=1',
    nota: { n: 55, prom: '4.9' },
    packs: [
      { cant: 1, precio: 75000, texto: '1 funda' },
      { cant: 2, precio: 109900, texto: '2 fundas' },
      { cant: 3, precio: 124900, texto: '3 fundas' },
      { cant: 4, precio: 139900, texto: '4 fundas' },
    ],
    anticipado: { pct: 10, precios: [67500, 98900, 112400, 125900] },
  },
  {
    id: 'sillas', dropiId: 2295051,
    nombre: 'Fundas Navideñas para Silla',
    sub: 'Cubren espaldar y asiento · 8 diseños a juego con la puerta',
    categoria: 'Hogar',
    etiqueta: 'Edición Navidad',
    foto: 'co/sillas/img/si-heroe.webp?v=1',
    nota: { n: 74, prom: '4.9' },
    packs: [
      { cant: 4, precio: 70000, texto: '4 sillas' },
      { cant: 6, precio: 90000, texto: '6 sillas' },
    ],
    anticipado: { pct: 10, precios: [63000, 81000] },
  },
  /* 10-11 James: Combo Protector de Colchón + Cobija Navideña, Dropi Colombia 2293056 (3 protectores + 6 fundas + cobija).
     Contra entrega $119.900 · pago anticipado con Wompi −10 %: $107.900. Sin precio tachado. */
  {
    id: 'protector', dropiId: 2293056,
    nombre: 'Combo Protector de Colchón + Cobija Navideña',
    sub: '3 protectores impermeables + 6 fundas + cobija navideña de regalo',
    categoria: 'Hogar',
    etiqueta: 'Agotado',
    foto: 'co/protector/img/pr-01-heroe.webp?v=3',
    packs: [
      { cant: 1, precio: 119900, texto: '1 combo' },
    ],
    anticipado: { pct: 10, precios: [107900] },
    /* 12-11 James: "ponlo como agotado y no puedan hacer pedido" */
    agotado: true,
  },
];

/* preguntas de despacho y pago, iguales para todos */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas en efectivo cuando te llegue el pedido. Si pagas antes con Wompi, ahorras 10 %.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a toda Colombia ya está incluido en el precio.' },
];

/* candado: si un precio no está aprobado por James, la portada no lo muestra. Colombia: protector aprobado el 10-11. */
window.PRECIOS_APROBADOS = [119900, 107900,
  75000, 109900, 124900, 139900, 67500, 98900, 112400, 125900,   /* funda de puerta (James 11-11 / 12-11) */
  70000, 90000, 63000, 81000];                                   /* fundas de silla (James 12-11) */
