/* ============================================================
   MÉXICO · 04-11-2026 · CEBO MOONSPRY CONTRA CUCARACHAS · caja de 12 piezas
   Dropi México 38581 "Repelente De Cucarachas 12 comprimidos" (HYPER MODA IMPORTACIONES), costo $64, stock 3.010 (04-11).
   Dropdata MX 14 días: 965 ventas (598 la última semana contra 367 la anterior).
   Más barato en la Biblioteca de Meta MX (04-11): InpotGlob 1 × $492 / 3 × $662.
   Escalera APROBADA por James el 04-11 ("Dale"): 1 caja $449 · 2 cajas $599 · 3 cajas $649.
   Pago anticipado APROBADO el 04-11 ("Dale"): −10 % → $404 / $539 / $584, entrega prioritaria.
   Tachado = +40 %, como el Brain y los lentes (regla de James 28-10).
   Lo que se dice del producto: SOLO lo que se ve en la caja y en el video real (cebos verdes con gel, 12 por caja,
   se colocan en rincones). Nada de "sin químicos", "seguro para mascotas" ni "dura 90 días": el proveedor no lo confirma.
   ============================================================ */
window.PRODUCTOS = [{
  id: 'cucarachas', unidad: 'caja', promo: 2, promoRef: true,
  dropiId: 38581,

  nombre: 'Cebo MoonSpry contra Cucarachas',
  sub: 'Caja con 12 cebos en gel listos para colocar',
  categoria: 'Hogar',
  etiqueta: 'Nuevo en México',
  etiquetaOro: true,

  foto: 'img/cuc-pack1.webp?v=1',
  fotos: ['img/cuc-pack1.webp?v=1', 'img/cuc-fregadero.webp?v=1', 'img/cuc-bano.webp?v=1'],
  /* Video REAL del producto: TikTok @changlei008 7523493821003451679 (sin marca de agua), desde el segundo 2 para quitar
     la entrada hecha con IA, sin audio, 720 px. Abre la caja, coloca los cebos y se ven las cucarachas que caen. */
  video: 'img/cuc-video.mp4?v=1',
  videoPoster: 'img/cuc-video-poster.jpg?v=1',

  hero: {
    img: 'img/cuc-heroe.webp?v=1',
    kicker: 'Nuevo en México · 12 cebos por caja',
    titulo: 'Que las cucarachas<br><b>no vuelvan a salir.</b>',
    sub: 'Cebos en gel que se colocan donde ellas se esconden: bajo el fregadero, detrás del refrigerador y en el baño. Sin rociar nada.',
    datos: [
      ['envio', 'Envío gratis'],
      ['reloj', 'En 2 a 5 días'],
      ['pago', 'Pagas al recibir'],
    ],
  },
  acento: '#059669',   /* Accent/CTA de la skill (cucarachas-mexico, corrida 04-11 aprobada por James) */

  /* Stock REAL leído en Dropi México el 04-11-2026 (3.010). Dropdata: 124 el último día, 142 el mejor. */
  escasez: { hoy: 124, mejorDia: 142, quedan: 3010,
    nota: 'Se despacha desde la bodega en Ciudad de México por orden de pedido. Pagas cuando lo tienes en la mano.' },

  desc: 'Cada caja trae 12 cebos pequeños en estuche verde con gel atrayente adentro. Se abre la tapa y se deja el cebo en los rincones por donde caminan las cucarachas: debajo del fregadero, detrás del refrigerador y de la estufa, en el baño y en las esquinas de los muebles. No hay que rociar ni limpiar nada después.',
  fotoProblema: 'img/cuc-problema.webp?v=1',
  fotoSolucion: 'img/cuc-fregadero.webp?v=1',

  puntos: [
    '12 cebos por caja, listos para colocar',
    'Se ponen en rincones, sin rociar nada',
    'Pequeños y discretos: caben donde ellas se esconden',
    'El pack de 2 cajas es el más pedido: cocina y baño',
  ],

  formulaRotulo: 'Dónde se pone',
  formulaTitulo: 'Donde ellas se esconden.',
  formulaSub: 'Un cebo en cada rincón por donde las has visto pasar.',
  formula: [
    ['casa', 'Bajo el fregadero', 'Junto a la tubería, que es por donde suben y donde hay humedad.'],
    ['frio', 'Detrás del refrigerador', 'El calor del motor y las migajas las atraen: ahí va uno.'],
    ['gota', 'En el baño', 'En la esquina detrás del excusado y junto a la coladera.'],
    ['caja', 'En los muebles', 'En las esquinas de la alacena y de los cajones de la cocina.'],
  ],

  comparaTitulo: '¿Por qué cebo y no un aerosol?',
  compara: [
    'No se rocía nada en la cocina ni en la comida.',
    'Se queda puesto en el rincón: no hay que repetir cada día.',
    'Llega a donde el aerosol no alcanza: detrás de los muebles.',
    '12 piezas por caja para cubrir toda la casa.',
  ],

  preguntas: [
    { q: '¿Cómo se usa?', a: 'Abres la tapa del cebo y lo dejas en el rincón por donde has visto cucarachas: bajo el fregadero, detrás del refrigerador, en el baño. Una caja trae 12 cebos.' },
    { q: '¿Cuántas cajas necesito?', a: 'Para un departamento suele bastar una caja. Si es una casa grande, o quieres cubrir cocina y baño por separado, el pack de 2 es el más pedido.' },
    { q: '¿Tengo que rociar algo?', a: 'No. Solo se colocan los cebos. No se rocía nada en la cocina ni cerca de la comida.' },
    { q: '¿Cómo pago?', a: 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.' },
    { q: '¿A dónde envían y cuánto tarda?', a: 'A todo México, sin costo de envío. Entre 2 y 5 días hábiles según tu ciudad.' },
  ],

  /* 4 fotos REALES de compradores de MercadoLibre México del mismo cebo (ver resenas.js) */
  fotosResenas: ['img/rev/c1.webp?v=1', 'img/rev/c2.webp?v=1', 'img/rev/c3.webp?v=1', 'img/rev/c4.webp?v=1'],
  antesDespues: 'img/cuc-antes.webp?v=1',
  antesDespuesDespues: 'img/cuc-despues.webp?v=1',
  antesDespuesSub: 'Imagen ilustrativa: el mismo rincón de la cocina antes y después de colocar los cebos.',

  packs: [
    { cant: 1, precio: 449, antes: 629, texto: '1 caja' },
    { cant: 2, precio: 599, antes: 839, texto: '2 cajas' },
    { cant: 3, precio: 649, antes: 909, texto: '3 cajas' },
  ],
  popular: 1,

  anticipado: {
    pct: 10,
    envio: 'Entrega prioritaria: tu pedido sale primero',
    titulo: 'Paga ahora con tarjeta',
    sub: 'Con entrega prioritaria, sin costo. Se paga con tarjeta de débito o crédito o con PayPal.',
    precios: [404, 539, 584],
  },
}];
/* Candado: solo la escalera aprobada por James el 04-11 */
window.PRECIOS_APROBADOS = [449, 599, 649, 404, 539, 584];
