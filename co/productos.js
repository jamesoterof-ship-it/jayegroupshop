/* ============================================================
   PRODUCTOS · Jaye Group COLOMBIA (jayegroupshop.com/co/, desde el 10-11-2026; precios en PESOS COLOMBIANOS).
   Mismo formato que /pe/productos.js, para que la portada se arme igual que todas las tiendas.
   Los productos de Colombia entran cuando James aprueba el producto y sus precios.
   Las fichas viven en /co/<id>/ (cada una con su propio productos.js; aquí va lo que pinta la portada).
   ============================================================ */
window.PRODUCTOS = [
  /* 10-11 James: Combo Protector de Colchón + Cobija Navideña, Dropi Colombia 2293056 (3 protectores + 6 fundas + cobija).
     Contra entrega $119.900 · pago anticipado con Wompi −10 %: $107.900. Sin precio tachado. */
  {
    id: 'protector', dropiId: 2293056,
    nombre: 'Combo Protector de Colchón + Cobija Navideña',
    sub: '3 protectores impermeables + 6 fundas + cobija navideña de regalo',
    categoria: 'Hogar',
    etiqueta: 'Edición Navidad',
    foto: 'co/protector/img/pr-01-heroe.webp?v=1',
    packs: [
      { cant: 1, precio: 119900, texto: '1 combo' },
    ],
    anticipado: { pct: 10, precios: [107900] },
  },
];

/* preguntas de despacho y pago, iguales para todos */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas en efectivo cuando te llegue el pedido. Si pagas antes con Wompi, ahorras 10 %.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a toda Colombia ya está incluido en el precio.' },
];

/* candado: si un precio no está aprobado por James, la portada no lo muestra. Colombia: protector aprobado el 10-11. */
window.PRECIOS_APROBADOS = [119900, 107900];
