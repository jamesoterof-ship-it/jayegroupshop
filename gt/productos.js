/* ============================================================
   PRODUCTOS · Jaye Group GUATEMALA (jayegroupshop.com/gt/, desde el 11-11-2026; precios en QUETZALES).
   Copia de la tienda de Perú (/pe/productos.js), mismo formato.
   Los productos de Guatemala entran cuando James aprueba el producto y su escalera.
   Las fichas viven en /gt/<id>/ (cada una con su propio productos.js; aquí va lo que pinta la portada).
   ============================================================ */
window.PRODUCTOS = [
  /* 11-11 James ("19504 sí nos metemos"): Gotas de drenaje linfático MASVELD, Dropi GT 19504 (proveedor Ghilda, costo Q34).
     Escalera APROBADA por James 11-11: contra entrega 1 frasco Q139 · 2 frascos Q172 · 4 frascos Q295 ·
     con tarjeta −10 %: Q125 · Q155 · Q265. Tachado con el criterio de Chile: 1 frasco +30 %, los packs = frascos sueltos. */
  {
    id: 'drenaje', dropiId: 19504,
    nombre: 'Drenaje Linfático Masveld',
    sub: 'Extractos de hierbas en gotas',
    categoria: 'Bienestar',
    etiqueta: 'Nuevo en Guatemala',
    foto: 'gt/drenaje/img/prod-drenaje.webp?v=1',
    packs: [
      { cant: 1, precio: 139, antes: 181, texto: '1 frasco' },
      { cant: 2, precio: 172, antes: 278, texto: '2 frascos' },
      { cant: 4, precio: 295, antes: 556, texto: '4 frascos' },
    ],
    anticipado: { pct: 10, precios: [125, 155, 265] },
  },
];

/* preguntas de despacho y pago, iguales para todos */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas en efectivo cuando te llegue el pedido.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a toda Guatemala ya está incluido en el precio.' },
];

/* candado: si un precio no está aprobado por James, la portada no lo muestra. Guatemala: escalera del drenaje aprobada por James el 11-11. */
window.PRECIOS_APROBADOS = [139, 172, 295, 125, 155, 265];
