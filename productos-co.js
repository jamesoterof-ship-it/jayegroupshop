/* ============================================================
   PRODUCTOS · Jaye Group ECUADOR (desde el 28-10-2026; precios en DÓLARES).
   Mismo formato que nadplus/productos.js (la tienda de Chile), para que la
   ficha se arme con el mismo diseño.
   Por ahora VACÍO: los productos de Ecuador entran cuando James los apruebe,
   con sus precios aprobados en PRECIOS_APROBADOS (abajo).
   Los dos productos de Colombia (gafas TR90 y Kit Chao Canas) quedaron
   guardados en la rama "colombia" del repo.
   ============================================================ */

window.PRODUCTOS = [];

/* preguntas de despacho y pago, iguales para todos (como en Chile) */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas en efectivo cuando te llegue el pedido.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a todo Ecuador ya está incluido en el precio.' },
];

/* candado de Chile: si un precio no está aprobado, la ficha no vende.
   Ecuador: vacío hasta que James apruebe los precios (en dólares). */
window.PRECIOS_APROBADOS = [];
