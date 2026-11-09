/* ============================================================
   PRODUCTOS · Jaye Group PERÚ (jayegroupshop.com/pe/, desde el 09-11-2026; precios en SOLES).
   Mismo formato que /productos-co.js (la tienda de México), para que la portada se arme igual.
   Por ahora VACÍO: los productos de Perú entran cuando James apruebe el producto y su escalera.
   Candidato (sin aprobar): Creatina en gomitas Beast Bites, Dropi Perú 9707.
   Las fichas viven en /pe/<id>/.
   ============================================================ */
window.PRODUCTOS = [];

/* preguntas de despacho y pago, iguales para todos */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Depende de tu distrito: en Lima llega antes y a provincias toma unos días más. Te enviamos la guía por WhatsApp.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas cuando te llegue el pedido.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a todo el Perú ya está incluido en el precio.' },
];

/* candado: si un precio no está aprobado por James, la portada no lo muestra. Perú: vacío hasta su aprobación. */
window.PRECIOS_APROBADOS = [];
