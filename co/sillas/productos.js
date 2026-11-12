/* ============================================================
   COLOMBIA · 11-11-2026 · FUNDAS NAVIDEÑAS PARA SILLA
   Dropi Colombia 2295051 (combo x4, costo $38.000) y 2296349 (combo x6, costo $57.000), proveedor Julio (user 496158),
   el mismo de la funda de puerta 1979374. Piel de durazno 190 g, cubre respaldo y asiento (respaldo 45-65 cm, asiento 40-50 cm).
   8 diseños, los mismos de la puerta. Costos = precio de la variante (verificado 11-11); la descripción dice $52.000/$78.000 → confirmar con Julio.
   Competencia 11-11 (Meta CO): NOVA STORE 4×99.900 / 6×119.900 / 8×149.900 · Daily Essentials 4×99.900 · Bum chicabum 6×110.000.
   PRECIOS APROBADOS por James el 11-11 (contra entrega, envío gratis):
     12-11 James "dale así" (el precio que estipula el proveedor): 4 sillas $70.000 · 6 sillas $90.000. Sin pack de 8.
     Adicional, mismo envío: + 1 funda de puerta $35.000 (Dropi 1979374)
   ============================================================ */
window.__P = 'sillas';
/* 11-11 James: los diseños se escogen tocando su FOTO */
var _SILLA = [
  ['BIENVENIDO', 'Bienvenido', 'img/si-bienvenido.webp'], ['CHIMENEA', 'Chimenea', 'img/si-chimenea.webp'],
  ['PAPA Y MAMA NOEL', 'Papá y Mamá Noel', 'img/si-papa-y-mama-noel.webp'], ['PESEBRE ESTRELLA GRANDE', 'Pesebre estrella', 'img/si-pesebre-estrella-grande.webp'],
  ['ANGEL', 'Ángel', 'img/si-angel.webp'], ['MERRY CHRISTMAS CORAZON', 'Merry Christmas', 'img/si-merry-christmas-corazon.webp'],
  ['COPO DE NIEVE BUFANDA ROJA', 'Muñeco de nieve', 'img/si-copo-de-nieve-bufanda-roja.webp'], ['BAMBI BUFANDA ROJA', 'Bambi', 'img/si-bambi-bufanda-roja.webp'],
];
/* para la puerta: los mismos 8 diseños, así el comedor y la puerta quedan a juego (nombre exacto de la variante de Dropi 1979374) */
var _PUERTA = [
  ['BIENVENIDO', 'Bienvenido', '../funda/img/fp-10.webp'], ['CHIMENEA', 'Chimenea', '../funda/img/fp-18.webp'],
  ['PAPA Y MAMA NOEL', 'Papá y Mamá Noel', '../funda/img/fp-33.webp'], ['PESEBRE ESTRELLA GRANDE', 'Pesebre estrella', '../funda/img/fp-23.webp'],
  ['ANGEL', 'Ángel', '../funda/img/fp-26.webp'], ['MERRY CHRISTMAN CORAZON', 'Merry Christmas', '../funda/img/fp-29.webp'],
  ['COPO DE NIEVE BUFANDA ROJA', 'Muñeco de nieve', '../funda/img/fp-12.webp'], ['BAMBI BUFANDA ROJA', 'Bambi', '../funda/img/fp-14.webp'],
];
window.PRODUCTOS = [{
  id: 'sillas', dropiId: 2295051,
  nombre: 'Fundas Navideñas para Silla',
  corto: 'Fundas Navideñas Silla',
  unidad: 'pack',
  packs: [
    { cant: 4, disenos: 1, precio: 70000, texto: '4 sillas', detalle: 'comedor de 4 puestos' },
    { cant: 6, disenos: 1, precio: 90000, texto: '6 sillas', detalle: 'comedor de 6 puestos', nivel: 'Promoción' },
  ],
  popular: 1,
  /* 12-11 James "10% anticipado" → "Sí, ponlos": pago con Wompi, 10 % menos sobre el pack (la puerta adicional va a su precio) */
  anticipado: { pct: 10, precios: [63000, 81000] },
  disenoUnidad: 'juego',
  disenosTitulo: 'Toca el diseño',
  disenos: _SILLA,
  adicTitulo: '¿Le agregas la puerta a juego? (mismo envío)',
  adicNinguno: 'Sin puerta',
  adicionales: [
    { id: 'PUERTA1', codigo: '1 PUERTA', texto: '+ 1 funda para tu puerta', detalle: 'Solo con tus sillas · toca aquí y escoge el diseño', precio: 35000, foto: '../funda/img/fp-10.webp', disenos: _PUERTA, rotuloDiseno: 'Diseño de la puerta' },
  ],
}];
window.PRODUCTO_CO = window.PRODUCTOS[0];
/* Candado: la página solo vende con los precios que aprobó James (11-11) */
window.PRECIOS_APROBADOS = [70000, 90000, 35000, 63000, 81000]; /* James 12-11 "dale así": el precio que estipula el proveedor, sin pack de 8 */
