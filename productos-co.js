/* ============================================================
   PRODUCTOS · Jaye Group ECUADOR (desde el 28-10-2026; precios en DÓLARES).
   Mismo formato que nadplus/productos.js (la tienda de Chile), para que la
   ficha se arme con el mismo diseño.
   Por ahora VACÍO: los productos de México entran cuando James los apruebe,
   con sus precios aprobados en PRECIOS_APROBADOS (abajo).
   Los dos productos de Colombia (gafas TR90 y Kit Chao Canas) quedaron
   guardados en la rama "colombia" del repo.
   ============================================================ */

/* 29-10 MÉXICO: el Brain (Dropi MX 61103) en la portada, con los precios aprobados por James el 28-10.
   La ficha vive en /brain/. */
window.PRODUCTOS = [
  {
    id: 'brain', nombre: 'Brain Memory & Mood', sub: 'Memoria, concentración y ánimo · 60 cápsulas',
    categoria: 'Bienestar', etiqueta: 'Nuevo en México', etiquetaOro: true,
    foto: 'brain/img/brain-frasco-v2.webp',
    packs: [{ cant: 2, precio: 799, antes: 1119, texto: '2 frascos' }, { cant: 3, precio: 1200, antes: 1680, texto: '3 frascos' }],
    anticipado: { pct: 10, precios: [719, 1080] },
  },
  /* 29-10: colágeno NeoCell (Dropi MX 54981), aprobado por James ("Dale de una, móntala"). La ficha vive en /colageno/. */
  {
    id: 'colageno', nombre: 'Colágeno NeoCell Bio-Peptides', sub: 'Colágeno hidrolizado en polvo · 567 g',
    categoria: 'Bienestar',
    foto: 'colageno/img/neo-heroe.webp',
    packs: [{ cant: 1, precio: 779, antes: 1039, texto: '1 frasco' }, { cant: 2, precio: 1079, antes: 1559, texto: '2 frascos' }, { cant: 3, precio: 1549, antes: 2369, texto: '3 frascos' }],
    anticipado: { pct: 10, precios: [699, 969, 1389] },
  },
];

/* preguntas de despacho y pago, iguales para todos (como en Chile) */
window.PREGUNTAS = [
  { q: '¿Cuánto tarda en llegar?', a: 'Normalmente entre 2 y 5 días hábiles, según tu ciudad.' },
  { q: '¿Puedo pagar contra entrega?', a: 'Sí. Pagas en efectivo cuando te llegue el pedido.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío a todo México ya está incluido en el precio.' },
];

/* candado de Chile: si un precio no está aprobado, la ficha no vende.
   México: vacío hasta que entre el Brain 61103 (2 × $799 · 3 × $1.200 MXN, aprobado el 28-10). */
window.PRECIOS_APROBADOS = [799, 1200, 719, 1080,   /* Brain: contra entrega y pago anticipado (James 28-10) */
  779, 1079, 1549, 699, 969, 1389];                   /* Colágeno: contra entrega y pago anticipado (James 29-10) */
