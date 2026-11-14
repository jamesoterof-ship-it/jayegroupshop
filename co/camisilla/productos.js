/* ============================================================
   COLOMBIA · 14-11-2026 · CAMISILLA DE COMPRESIÓN IONFIT PRO
   Dropi Colombia 2082390 (proveedor Millerlay, bodega Cali). Costo $22.000 por unidad. 15 variantes: negro, gris y blanco,
   tallas S a 2XL (54.039 u. el 14-11). Las variantes viajan con el NOMBRE EXACTO de Dropi ("NEGRO/L") para el montador.
   PRECIOS APROBADOS por James el 14-11 (contra entrega, envío incluido):
     1 camisilla $84.900 · 2 camisillas $129.900 · 3 camisillas $155.000 (igual que MODA SAFER)
   Sin pago anticipado hasta que James apruebe esos precios.
   Formato estándar de las fichas (lo lee ../ficha.js).
   ============================================================ */
window.__P = 'camisilla';
window.PRODUCTOS = [{
  id: 'camisilla', dropiId: 2082390,
  nombre: 'Camisilla de Compresión Ionfit Pro',
  corto: 'Camisilla Compresión Ionfit',
  unidad: 'pack',
  packs: [
    { cant: 1, precio: 84900, texto: '1 camisilla', detalle: 'para probarla' },
    { cant: 2, precio: 129900, antes: 169800, texto: '2 camisillas', detalle: 'una puesta y otra lavándose', nivel: 'Promoción' },
    { cant: 3, precio: 155000, antes: 254700, texto: '3 camisillas', detalle: 'una para cada color' },
  ],
  popular: 1,   /* James 14-11: se promociona la de 2, la que más deja */
  disenoUnidad: 'camisilla',
  disenosTitulo: 'Elige color y talla de cada camisilla',
  disenoVacio: 'Escoge color y talla',
  disenoError: 'Escoge el color y la talla de cada camisilla',
  disenos: [
    ['NEGRO/S', 'Negra · talla S'], ['NEGRO/M', 'Negra · talla M'], ['NEGRO/L', 'Negra · talla L'], ['NEGRO/XL', 'Negra · talla XL'], ['NEGRO/2XL', 'Negra · talla 2XL'],
    ['GRIS/S', 'Gris · talla S'], ['GRIS/M', 'Gris · talla M'], ['GRIS/L', 'Gris · talla L'], ['GRIS/XL', 'Gris · talla XL'], ['GRIS/2XL', 'Gris · talla 2XL'],
    ['BLANCO/S', 'Blanca · talla S'], ['BLANCO/M', 'Blanca · talla M'], ['BLANCO/L', 'Blanca · talla L'], ['BLANCO/XL', 'Blanca · talla XL'], ['BLANCO/2XL', 'Blanca · talla 2XL'],
  ],
}];
window.PRODUCTO_CO = window.PRODUCTOS[0];
/* Candado: la página solo vende con los precios que aprobó James (14-11) */
window.PRECIOS_APROBADOS = [84900, 129900, 155000];
