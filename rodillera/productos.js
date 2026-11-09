/* ============================================================
   MÉXICO · 08-11-2026 · RODILLERA CON RESORTES (par)
   Dropi México 47695 "Par de Rodillera Ortopedica Con Resorte" (HYPER MODA), costo $230 el par, stock 672 (08-11), público.
   Ficha del proveedor: rodillera de neopreno negro con dos correas de velcro (arriba y abajo de la rodilla) y bisagra lateral
   con resortes de acero que acompañan el movimiento al doblar y estirar la pierna. Viene el PAR (dos rodilleras).
   Competencia Meta MX (07-11, 6 anunciantes): Benivox par $949 (el más barato) · Amekro $990 · Compra Inteligente $999 ·
   Casa Zohelo $1.199 · Smart Finds $1.499 · Diacaz 1 pieza $749.
   Escalera APROBADA por James el 07-11 ("Sí, esos precios"): 1 par $899 · 2 pares $1.299 · 3 pares $1.649.
   Pago anticipado −10 % (aprobado junto con la escalera): $809 / $1.169 / $1.484, entrega prioritaria. Tachado = +40 %.
   Sin barra de "salieron hoy": Dropdata de la 47695 casi no tiene movimiento propio y no se pone el de otro proveedor.
   ============================================================ */
window.PRODUCTOS = [{
  id: 'rodillera', unidad: 'par', promo: 2, promoRef: true,
  dropiId: 47695,
  nombre: 'Rodillera con Resortes',
  sub: 'Par de rodilleras de neopreno con bisagra de resortes de acero',
  categoria: 'Salud y bienestar',
  etiqueta: 'Nuevo en México',
  etiquetaOro: true,
  foto: 'img/rod-packs.webp?v=1',
  fotos: ['img/rod-packs.webp?v=1', 'img/rod-heroe.webp?v=1', 'img/rod-escaleras.webp?v=1'],
  acento: '#16A34A',   /* Accent/CTA del plano Azul clínico, aprobado por James el 07-11 */
  desc: 'Par de rodilleras de neopreno con bisagra de resortes de acero. Los resortes acompañan a tu rodilla cuando subes escaleras, te agachas o te levantas de la silla.',
  puntos: [
    'Viene el par: una rodillera para cada pierna',
    'Bisagra lateral con resortes de acero',
    'Neopreno con dos correas de velcro ajustables',
    'Pagas al recibir, con envío gratis a todo México',
  ],
  preguntas: [
    { q: '¿Cómo pago?', a: 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.' },
  ],
  packs: [
    { cant: 1, precio: 899, antes: 1259, texto: '1 par' },
    { cant: 2, precio: 1299, antes: 1819, texto: '2 pares' },
    { cant: 3, precio: 1649, antes: 2309, texto: '3 pares' },
  ],
  popular: 1,
  anticipado: {
    pct: 10,
    envio: 'Entrega prioritaria: tu pedido sale primero',
    titulo: 'Paga ahora con tarjeta',
    sub: 'Con entrega prioritaria, sin costo. Se paga con tarjeta de débito o crédito o con PayPal.',
    precios: [809, 1169, 1484],
  },
}];
/* Candado: solo la escalera aprobada por James el 07-11 */
window.PRECIOS_APROBADOS = [899, 1299, 1649, 809, 1169, 1484];

/* Textos de la página v2 (08-11): orden de secciones del ORGANIZADOR de Chile, cada sección con su foto grande. */
window.PAGINA = {
  heroe: {
    img: 'img/rod-heroe2.webp?v=1', alt: 'Par de rodilleras negras con resortes de acero sobre un escalón de madera',
    rotulo: 'Rodillera con resortes · el par',
    l1: 'Tu rodilla,', l2: 'con', clave: 'impulso.',
    frase: 'Resortes de acero que acompañan a tu rodilla al subir escaleras, agacharte y levantarte.',
    datos: [['Par', 'dos rodilleras'], ['Acero', 'resortes'], ['Velcro', 'ajustable']],
  },
  hace: { rotulo: 'Lo que hace por ti', lista: [['1', 'Subir y bajar escaleras con más confianza'], ['2', 'Levantarte de la silla o del sillón'], ['3', 'Agacharte en la casa, el trabajo o el jardín']] },
  video: { rotulo: 'Así se pone', titulo: 'Mírala de cerca', texto: 'La bisagra con sus resortes de acero, cómo se coloca en la rodilla y cómo se cierran las correas.',
    src: 'img/rod-video.mp4?v=1', poster: 'img/rod-video-poster.webp?v=1', alt: 'Video: la rodillera negra con resortes en las manos y puesta en la rodilla' },
  producto: { rotulo: 'El producto', titulo: 'Qué es y para qué sirve', img: 'img/rod-heroe.webp?v=1', alt: 'Par de rodilleras negras con resortes de acero',
    texto: 'Es un <b>par de rodilleras</b> de neopreno negro con una bisagra al costado de la rodilla. Esa bisagra lleva <b>resortes de acero</b>: cuando doblas la pierna se cargan y cuando la estiras acompañan el movimiento. Por eso se siente el apoyo al <b>subir escaleras, levantarte y agacharte</b>.' },
  resortes: { rotulo: 'Cómo funciona', titulo: 'Resortes de acero en la bisagra', img: 'img/rod-resortes.webp?v=1', alt: 'Bisagra lateral de la rodillera con resortes de acero, de cerca',
    texto: 'Los resortes van en una <b>bisagra lateral</b>, al costado de la rodilla, donde la pierna se dobla. No van sobre la rótula: la rodilla queda libre en el centro y la bisagra trabaja contigo en cada paso.' },
  sePone: { rotulo: 'Cómo se pone', titulo: 'Centrada en la rodilla, en un minuto', img: 'img/rod-se-pone.webp?v=1', alt: 'Rodillera negra con resortes bien puesta sobre el jean, centrada en la rodilla',
    pasos: ['<b>Centra</b> la rodillera en la rodilla, con la bisagra al costado.', '<b>Cierra</b> la correa de arriba en el muslo y la de abajo en la pantorrilla.', '<b>Ajusta</b> el velcro a tu medida. Se puede usar sobre el pantalón.'] },
  hecha: { rotulo: 'De qué está hecha', titulo: 'Hecha para el uso de todos los días', lista: [
    ['Resortes de acero', 'En la bisagra lateral: se cargan al doblar la pierna y empujan al estirarla.'],
    ['Neopreno', 'Abraza la pierna arriba y abajo de la rodilla.'],
    ['Dos correas de velcro', 'Ajustas la rodillera a tu medida, también sobre la ropa.'],
    ['Viene el par', 'Una rodillera para cada pierna.'] ] },
  promoImg: 'img/rod-promo.webp?v=1', packsImg: 'img/rod-packs.webp?v=1',
  promoTitulo: '2 pares · el paquete más pedido',
  dia: { rotulo: 'Para tu día a día', titulo: 'Donde la rodilla más se siente', escenas: [
    ['img/rod-caminando.webp?v=1', 'Al caminar', 'En la calle, en el mercado o en el parque.', 'Señor mayor caminando por la calle con la rodillera puesta'],
    ['img/rod-escaleras.webp?v=1', 'Al subir escaleras', 'El resorte acompaña a la rodilla en cada escalón.', 'Señor subiendo la escalera de su casa con la rodillera puesta'],
    ['img/rod-sillon.webp?v=1', 'Al levantarte', 'Del sillón, de la silla o de la cama.', 'Señora levantándose del sillón con la rodillera puesta'],
    ['img/rod-trabajo.webp?v=1', 'Al agacharte', 'En el trabajo, la bodega o el jardín.', 'Trabajador agachándose a levantar una caja con rodilleras en las dos piernas'] ] },
  compara: { titulo: 'Con rodillera de resortes o sin ella', nos: 'Con resortes', otro: 'Sin rodillera',
    filas: ['Impulso al estirar la pierna', 'Apoyo a los lados de la rodilla', 'Se ajusta con velcro sobre la ropa', 'Para las dos rodillas'] },
  cambio: { rotulo: 'El cambio', titulo: 'El antes y después que se nota', texto: 'La misma persona, la misma escalera: sin rodillera y con la rodillera de resortes puesta.',
    img: 'img/rod-antes-despues.webp?v=1', alt: 'Antes: señora con dolor de rodilla en la escalera. Después: la misma señora subiendo con la rodillera puesta' },
  preguntas: [
    ['¿Qué es?', 'Un par de rodilleras de neopreno con una bisagra lateral de resortes de acero que acompañan el movimiento de la rodilla.'],
    ['¿Cuántas vienen?', 'Viene el par: dos rodilleras, una para cada pierna.'],
    ['¿Cómo me la pongo?', 'Se coloca centrada en la rodilla: una correa de velcro va arriba, en el muslo, y la otra abajo, en la pantorrilla. La bisagra queda al costado de la rodilla.'],
    ['¿Se usa sobre la ropa?', 'Sí, se ajusta con velcro y se puede usar sobre el pantalón.'],
    ['¿Sirve si tengo una lesión?', 'Es un apoyo para la rodilla, no un tratamiento médico. Si tienes una lesión o una indicación de tu doctor, consúltalo con él.'],
    ['¿Cómo pago?', 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.'],
    ['¿A dónde envían y cuánto tarda?', 'A todo México, sin costo de envío. Entre 2 y 5 días hábiles según tu ciudad.'],
    ['¿Tiene garantía?', 'Sí: 30 días de garantía de satisfacción. Si no quedas conforme, te devolvemos tu dinero.'],
  ],
  porque: { rotulo: 'Por qué la quieres', titulo: 'Rodillera con resortes, el par', lista: [
    'Resortes de acero que acompañan a la rodilla al estirar la pierna',
    'Ayuda al subir escaleras, levantarte y agacharte',
    'Neopreno con velcro: se ajusta a tu medida y sobre la ropa',
    'Viene el par: una para cada rodilla',
    'Envío gratis a todo México y pagas cuando la recibes'] },
};
