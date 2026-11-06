/* ============================================================
   MÉXICO · 05-11-2026 · NAD+ RESVERATROL ZOOONE · caja de 30 sobres líquidos de 10 g
   Dropi México 51134 "Suplemento NAD+ Resveratrol Zoone" (HYPER MODA IMPORTACIONES, bodega Gustavo A. Madero), costo $250,
   sugerido $899, stock 1.575 (05-11), público. OJO: NO son cápsulas: es una caja con 30 sobres líquidos (foto real de Dropi).
   Dropdata MX 14 días: 1.369 ventas (1.021 la última semana contra 348 la anterior), 14 de 14 días con venta.
   Misma marca en la Biblioteca de Meta MX (05-11): CeloMX 2 × $1,290 / 3 × $1,590 · Tienda México 1 × $999 / 2 × $1,299 / 3 × $1,599.
   Escalera APROBADA por James el 05-11 ("Sí, esos dos"): 1 caja $899 · 2 cajas $1,199 · 3 cajas $1,499.
   Pago anticipado APROBADO el 05-11 ("Sí, apruebo"): −10 % → $809 / $1,079 / $1,349, entrega prioritaria. Tachado = +40 %.
   🔴 LENGUAJE: suplemento. Solo lo que declara la caja: NAD+, resveratrol, CoQ10, D-ribosa y PQQ, 1000 mg, 30 sobres de 10 g.
   Nada de "rejuvenece", "repara el ADN", "cura" ni dosis.
   ============================================================ */
window.PRODUCTOS = [{
  id: 'nad', unidad: 'caja', promo: 2, promoRef: true,
  dropiId: 51134,
  nombre: 'NAD+ Resveratrol Zooone',
  sub: 'Caja con 30 sobres líquidos de 10 g · 1000 mg',
  categoria: 'Bienestar',
  etiqueta: 'Nuevo en México',
  etiquetaOro: true,
  foto: 'img/nad-packs.webp?v=1',
  fotos: ['img/nad-packs.webp?v=1', 'img/nad-tarjeta-sobre.webp?v=1', 'img/nad-tarjeta-escritorio.webp?v=1'],
  acento: '#D97706',   /* Accent/CTA del plano nº 101 (nad-mexico), aprobado por James */
  escasez: { hoy: 206, mejorDia: 206, quedan: 1575,
    nota: 'Se despacha desde la bodega en Ciudad de México por orden de pedido. Pagas cuando lo tienes en la mano.' },
  desc: 'Una caja con 30 sobres líquidos de NAD+ con resveratrol, CoQ10, D-ribosa y PQQ, como lo declara su envase. Un sobre al día, directo o en un vaso de agua.',
  puntos: [
    'NAD+ con resveratrol, CoQ10, D-ribosa y PQQ, como lo declara la caja',
    '30 sobres líquidos de 10 g por caja',
    'Nada de cápsulas: se toma directo del sobre',
    'Pagas al recibir, con envío gratis a todo México',
  ],
  preguntas: [
    { q: '¿Cómo pago?', a: 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.' },
  ],
  packs: [
    { cant: 1, precio: 899, antes: 1259, texto: '1 caja' },
    { cant: 2, precio: 1199, antes: 1679, texto: '2 cajas' },
    { cant: 3, precio: 1499, antes: 2099, texto: '3 cajas' },
  ],
  popular: 1,
  anticipado: {
    pct: 10,
    envio: 'Entrega prioritaria: tu pedido sale primero',
    titulo: 'Paga ahora con tarjeta',
    sub: 'Con entrega prioritaria, sin costo. Se paga con tarjeta de débito o crédito o con PayPal.',
    precios: [809, 1079, 1349],
  },
}];
/* Candado: solo la escalera aprobada por James el 05-11 */
window.PRECIOS_APROBADOS = [899, 1199, 1499, 809, 1079, 1349];

/* Textos de la página (orden de secciones de Lymphoria; forma y estilo del plano nº 101) */
window.PAGINA = {
  efecto: 'celulas',
  heroe: {
    img: 'img/nad-heroe.webp?v=1', alt: 'Caja de NAD+ Resveratrol Zooone con un sobre y frutos rojos',
    rotulo: 'Nuevo en México · 30 sobres',
    titulo: 'Tu <b>NAD+</b> de cada mañana.',
    frase: 'NAD+ con resveratrol, CoQ10 y PQQ en sobres líquidos. Sin cápsulas.',
    datos: [['30', 'sobres por caja'], ['1000 mg', 'como dice la caja'], ['$0', 'envío a todo México']],
  },
  notaEstrellas: 'Opiniones de compradores',
  pasos: {
    rotulo: 'Tres pasos y listo', titulo: 'Un sobre al día',
    lista: [
      ['img/nad-tarjeta-sobre.webp?v=1', '<b>Abre</b> un sobre en la mañana', 'Mano abriendo un sobre de NAD+ junto a un vaso de agua'],
      ['img/nad-tarjeta-escritorio.webp?v=1', '<b>Tómalo</b> directo o en tu vaso de agua', 'Caja y sobres en el escritorio junto a un café'],
      ['img/nad-tarjeta-caminar.webp?v=1', '<b>Sigue</b> con tu día, sin cápsulas', 'Señor caminando en el parque con un sobre en la mano'],
    ],
  },
  quees: {
    img: 'img/nad-heroe.webp?v=1', alt: 'Caja de NAD+ Resveratrol Zooone',
    titulo: 'NAD+ en sobres líquidos',
    texto: 'Es un suplemento de NAD+ en sobres líquidos de 10 g. Según su caja, cada sobre combina NAD+ con resveratrol, CoQ10, D-ribosa y PQQ en su fórmula Cel+Blend de 1000 mg. Se toma directo del sobre: nada de tragar cápsulas.',
    puntos: ['NAD+, resveratrol, CoQ10, D-ribosa y PQQ', '30 sobres líquidos por caja', 'Fácil de llevar: un sobre cabe en cualquier bolsa', 'Pagas al recibir, con envío gratis a todo México'],
    fichas: [
      ['img/nad-tarjeta-escritorio.webp?v=1', 'Para qué sirve', 'Para sumar NAD+ y resveratrol a tu rutina diaria, como lo describe su fabricante.'],
      ['img/nad-tarjeta-sobre.webp?v=1', 'Cómo se toma', 'Un sobre, directo o en un vaso de agua. La dosis sugerida viene indicada en la caja.'],
      ['img/nad-packs.webp?v=1', 'Qué recibes', 'Tu caja con 30 sobres sellados, en la puerta de tu casa y con envío gratis.'],
    ],
  },
  promoImg: 'img/nad-promo-2.webp?v=1',
  promoTitulo: 'Paquete de 2 cajas · el más pedido',
  video: null,
  formula: {
    rotulo: 'Qué trae dentro', titulo: 'Cinco ingredientes en cada sobre.',
    sub: 'Lo que declara la caja: fórmula Cel+Blend de 1000 mg en sobres líquidos de 10 g.',
    lista: [
      ['sol', 'NAD+', 'El ingrediente que le da nombre a la fórmula.'],
      ['hoja', 'Resveratrol', 'El compuesto de la uva que acompaña al NAD+ en la mezcla.'],
      ['gota', 'CoQ10', 'La coenzima Q10, incluida en la misma fórmula.'],
      ['caja', 'D-ribosa', 'Un azúcar simple que forma parte de la mezcla.'],
      ['escudo', 'PQQ', 'La pirroloquinolina quinona, el quinto ingrediente de la caja.'],
    ],
  },
  compara: {
    titulo: '¿Por qué en sobre y no en cápsulas?', nos: 'Sobre líquido', otro: 'Cápsulas',
    filas: ['Se toma directo: no hay que tragar pastillas', 'Un sobre ya trae la porción: nada de contar', 'Cabe en la bolsa o en el bolsillo', '30 sobres por caja'],
  },
  notaResenas: 'Opiniones reales de compradores del mismo producto, tal como las escribieron.',
  cambio: {
    rotulo: 'El cambio', titulo: 'Tus mañanas, otra vez',
    sub: 'La misma mañana, antes y después de sumar un sobre a la rutina.',
    una: 'img/nad-antes-despues.webp?v=1',
    altA: 'Señora cansada en la cocina con un café', altD: 'La misma señora con energía y un sobre de NAD+',
    etA: 'ANTES', etD: 'DESPUÉS',
  },
  preguntas: [
    ['¿Qué es?', 'Un suplemento de NAD+ en sobres líquidos de 10 g. Según su caja, combina NAD+ con resveratrol, CoQ10, D-ribosa y PQQ. No reemplaza una alimentación equilibrada ni un tratamiento médico.'],
    ['¿Son cápsulas?', 'No. Vienen 30 sobres líquidos por caja. Se toman directo del sobre o en un vaso de agua.'],
    ['¿Cómo se toma?', 'La dosis sugerida viene indicada en la caja. La mayoría toma un sobre en la mañana.'],
    ['¿Cuánto me dura una caja?', 'Depende de la dosis que indica la caja. Por eso la mayoría se lleva el paquete de 2 cajas: sale más conveniente y no se queda sin.'],
    ['¿Quién no debería tomarlo?', 'No se recomienda para menores de edad, embarazadas ni mujeres que están amamantando, ni a quien toma medicamentos, salvo indicación de un profesional de la salud.'],
    ['¿Cómo pago?', 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.'],
    ['¿A dónde envían y cuánto tarda?', 'A todo México, sin costo de envío. Entre 2 y 5 días hábiles según tu ciudad.'],
    ['¿Tiene garantía?', 'Sí: 30 días de garantía de satisfacción. Si no quedas conforme, te devolvemos tu dinero.'],
  ],
  cierre: [
    'NAD+ con resveratrol, CoQ10, D-ribosa y PQQ',
    '30 sobres líquidos por caja: sin cápsulas',
    'Paquetes de 1, 2 y 3 cajas',
    'Desde $899 · envío gratis y pagas cuando lo recibes',
  ],
};
