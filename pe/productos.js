/* ============================================================
   PRODUCTOS · Jaye Group PERÚ (jayegroupshop.com/pe/, desde el 09-11-2026; precios en SOLES).
   Mismo formato que /productos-co.js (la tienda de México), para que la portada se arme igual.
   Los productos de Perú entran cuando James aprueba el producto y su escalera.
   Las fichas viven en /pe/<id>/ (cada una con su propio productos.js; aquí va lo que pinta la portada).
   ============================================================ */
window.PRODUCTOS = [
  /* 09-11 James ("Avanza"; 1 u. subida a S/ 87 por James el 09-11): Creatina en gomitas Beast Bites, Dropi Perú 9707.
     Contra entrega 1 u. S/ 87 · 2 u. S/ 145 · 3 u. S/ 175 · con tarjeta −10 %: S/ 78 · S/ 131 · S/ 158 · tachado +40 %. */
  {
    id: 'creatina', dropiId: 9707,
    nombre: 'Creatina en Gomitas Beast Bites',
    sub: 'Gomitas con creatina sabor frambuesa azul · frasco de 150 g',
    categoria: 'Deporte y bienestar',
    etiqueta: 'Nuevo en Perú',
    foto: 'pe/creatina/img/cr-frasco.webp?v=1',
    packs: [
      { cant: 1, precio: 87, antes: 122, texto: '1 frasco' },
      { cant: 2, precio: 145, antes: 203, texto: '2 frascos' },
      { cant: 3, precio: 175, antes: 245, texto: '3 frascos' },
    ],
    anticipado: { pct: 10, precios: [78, 131, 158] },
  },
];

/* preguntas de despacho y pago, iguales para todos */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas en efectivo cuando te llegue el pedido.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a todo el Perú ya está incluido en el precio.' },
];

/* candado: si un precio no está aprobado por James, la portada no lo muestra. Perú: escalera de la creatina aprobada el 09-11. */
window.PRECIOS_APROBADOS = [87, 145, 175, 78, 131, 158];
