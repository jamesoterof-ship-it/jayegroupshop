/* ============================================================
   MÉXICO · 06-11-2026 · BOQUILLA DE ALTA PRESIÓN para manguera
   Dropi México 56235 "boquilla pistola de alta presion agua" (IMPORSHOP), costo $89, stock 1.412 (06-11), público.
   Ficha del proveedor: boquilla tipo lápiz de metal, acabado negro y conector dorado · chorro ajustable girando la punta
   (niebla → chorro potente) · corte de agua incluido · conector rápido universal para manguera estándar.
   Dropdata MX 14 días: 1.189 ventas (85 por día), vende los 14 días y va subiendo (639 la última semana contra 550).
   Competencia Meta MX (06-11): Tusti 2 × $799 · Melopido 2 × $799 · Megaofertas 2 × $990.
   Escalera APROBADA por James el 06-11 ("Sí, la boquilla"): 1 × $499 · 2 × $749 · 3 × $899.
   Pago anticipado APROBADO el 06-11 ("Sí, arma"): −10 % → $449 / $674 / $809, entrega prioritaria. Tachado = +40 %.
   ============================================================ */
window.PRODUCTOS = [{
  id: 'boquilla', unidad: 'boquilla', promo: 2, promoRef: true,
  dropiId: 56235,
  nombre: 'Boquilla de Alta Presión',
  sub: 'Boquilla tipo lápiz de metal con conector rápido de latón',
  categoria: 'Hogar y jardín',
  etiqueta: 'Nuevo en México',
  etiquetaOro: true,
  foto: 'img/boq-packs.webp?v=1',
  fotos: ['img/boq-packs.webp?v=1', 'img/boq-paso-auto.webp?v=1', 'img/boq-paso-girar.webp?v=1'],
  acento: '#2563EB',   /* Accent/CTA del plano boquilla-mexico (corrida 3), aprobado por James el 06-11 */
  escasez: { hoy: 81, mejorDia: 131, quedan: 1412,
    nota: 'Se despacha desde la bodega en México por orden de pedido. Pagas cuando la tienes en la mano.' },
  desc: 'Boquilla de metal tipo lápiz para tu manguera. Girando la punta pasas de lluvia fina a chorro potente para lavar el auto, el patio y regar el jardín.',
  puntos: [
    'Cuerpo de metal con acabado negro y conector de latón',
    'Gira la punta: de lluvia fina a chorro potente',
    'Corte de agua incluido',
    'Pagas al recibir, con envío gratis a todo México',
  ],
  preguntas: [
    { q: '¿Cómo pago?', a: 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.' },
  ],
  packs: [
    { cant: 1, precio: 499, antes: 699, texto: '1 boquilla' },
    { cant: 2, precio: 749, antes: 1049, texto: '2 boquillas' },
    { cant: 3, precio: 899, antes: 1259, texto: '3 boquillas' },
  ],
  popular: 1,
  anticipado: {
    pct: 10,
    envio: 'Entrega prioritaria: tu pedido sale primero',
    titulo: 'Paga ahora con tarjeta',
    sub: 'Con entrega prioritaria, sin costo. Se paga con tarjeta de débito o crédito o con PayPal.',
    precios: [449, 674, 809],
  },
}];
/* Candado: solo la escalera aprobada por James el 06-11 */
window.PRECIOS_APROBADOS = [499, 749, 899, 449, 674, 809];

/* Textos de la página (orden de secciones de Lymphoria; estilo del plano boquilla-mexico) */
window.PAGINA = {
  efecto: 'gotas',
  heroe: {
    img: 'img/boq-heroe.webp?v=1', alt: 'Boquilla negra de alta presión conectada a la manguera, soltando un chorro de agua',
    rotulo: 'Nuevo en México · Hogar y jardín',
    titulo: 'Tu manguera, con <b>fuerza</b>.',
    frase: 'Boquilla de metal: de lluvia fina a chorro potente con solo girar la punta.',
    datos: [['Metal', 'cuerpo y conector de latón'], ['2 en 1', 'chorro y lluvia'], ['$0', 'envío a todo México']],
  },
  notaEstrellas: 'Opiniones de compradores',
  pasos: {
    rotulo: 'Tres pasos y listo', titulo: 'Así de fácil',
    lista: [
      ['img/boq-paso-conectar.webp?v=1', '<b>Conecta</b> la boquilla a tu manguera', 'Manos conectando la boquilla a la manguera'],
      ['img/boq-paso-girar.webp?v=1', '<b>Gira</b> la punta: lluvia fina o chorro', 'Mano regando plantas con lluvia fina'],
      ['img/boq-paso-auto.webp?v=1', '<b>Lava</b> el auto, el patio y la cochera', 'Chorro de agua quitando el lodo del rin de un auto'],
    ],
  },
  quees: {
    img: 'img/boq-dos.webp?v=1', alt: 'Dos boquillas negras de alta presión con conector de latón',
    titulo: 'La boquilla que le faltaba a tu manguera',
    texto: 'Es una boquilla de metal tipo lápiz, con acabado negro y conector rápido de latón. Se conecta a tu manguera y, con solo girar la punta, cambias de una lluvia fina para regar a un chorro potente para lavar. Trae corte de agua para cerrar el paso sin ir a la llave.',
    puntos: ['Cuerpo de metal, resistente', 'Gira la punta: lluvia fina o chorro potente', 'Corte de agua incluido', 'Conector rápido universal para manguera'],
    fichas: [
      ['img/boq-paso-auto.webp?v=1', 'Para qué sirve', 'Para lavar el auto, las llantas, el patio, la cochera y las paredes, y para regar el jardín.'],
      ['img/boq-paso-girar.webp?v=1', 'Cómo se usa', 'Conéctala a la manguera, abre la llave y gira la punta hasta el chorro que necesitas.'],
      ['img/boq-packs.webp?v=1', 'Qué recibes', 'Tu boquilla nueva, en la puerta de tu casa y con envío gratis.'],
    ],
  },
  promoImg: 'img/boq-promo-2.webp?v=1',
  promoTitulo: 'Paquete de 2 boquillas · el más pedido',
  video: 'img/boq-video.mp4', videoPoster: 'img/boq-video-poster.webp', videoAlt: 'Boquilla negra lavando el rin de un auto',   /* 06-11: metraje real (TikTok), 9,5 s, sin audio ni textos */
  formula: {
    rotulo: 'Qué la hace diferente', titulo: 'Hecha para durar.',
    sub: 'Boquilla tipo lápiz de metal con acabado negro y conector dorado.',
    lista: [
      ['escudo', 'Cuerpo de metal', 'Resistente y duradera: no es de plástico.'],
      ['gota', 'Chorro ajustable', 'Girando la punta pasas de niebla a chorro potente.'],
      ['reloj', 'Corte de agua', 'Cierras el paso del agua desde la boquilla.'],
      ['caja', 'Conector rápido', 'Conector de latón universal para manguera estándar.'],
      ['sol', 'Para todo', 'Auto, llantas, patio, cochera, paredes y jardín.'],
    ],
  },
  compara: {
    titulo: '¿Por qué una boquilla y no el dedo en la manguera?', nos: 'Boquilla', otro: 'Dedo',
    filas: ['Chorro fuerte y parejo', 'Lluvia fina para regar sin maltratar las plantas', 'Cierras el agua sin ir a la llave', 'No te mojas la mano'],
  },
  notaResenas: 'Opiniones reales de compradores de esta boquilla.',
  cambio: {
    rotulo: 'El cambio', titulo: 'Del hilito de agua al chorro',
    sub: 'La misma manguera, antes y después de ponerle la boquilla.',
    una: 'img/boq-antes-despues.webp?v=1',
    altA: 'Señor tapando la manguera con el dedo junto a un auto con lodo', altD: 'El mismo señor lavando el auto con la boquilla',
    etA: 'ANTES', etD: 'DESPUÉS',
  },
  preguntas: [
    ['¿Qué es?', 'Una boquilla de metal tipo lápiz para la manguera. Girando la punta cambias de lluvia fina a chorro potente.'],
    ['¿Le queda a mi manguera?', 'Trae conector rápido universal de latón para manguera estándar.'],
    ['¿Cómo se cierra el agua?', 'Trae corte de agua: cierras el paso desde la misma boquilla, sin ir a la llave.'],
    ['¿Qué tan fuerte sale el chorro?', 'La boquilla concentra el agua en un chorro potente. La fuerza también depende de la presión del agua de tu casa.'],
    ['¿Cómo pago?', 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.'],
    ['¿A dónde envían y cuánto tarda?', 'A todo México, sin costo de envío. Entre 2 y 5 días hábiles según tu ciudad.'],
    ['¿Tiene garantía?', 'Sí: 30 días de garantía de satisfacción. Si no quedas conforme, te devolvemos tu dinero.'],
  ],
  cierre: [
    'Boquilla de metal con conector de latón',
    'Lluvia fina o chorro potente: solo gira la punta',
    'Paquetes de 1, 2 y 3 boquillas',
    'Desde $499 · envío gratis y pagas cuando la recibes',
  ],
};
