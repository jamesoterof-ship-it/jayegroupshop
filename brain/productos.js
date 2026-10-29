/* ============================================================
   CATALOGO DE LA TIENDA · JAYE GROUP ESPAÑA

   Primer producto (24-09-2026): Balsamo de colageno VITALIS.
   Elegido con el Radar (id 2287 de Dropi PRO, 105 unidades el 22->23 y 81
   en la foto parcial del 24: el que mas sostiene el ritmo del catalogo) y
   validado en la Biblioteca de Meta España (~110 anuncios activos, 12
   anunciantes, Rcocio.com pautandolo desde el 18-10-2024).

   Molde: jaye-landings/shilajit/productos.js. Lo unico que cambia por
   producto son los colores y el contenido; la estructura NO se toca.

   OJO CON EL LENGUAJE: en la UE las alegaciones cosmeticas estan reguladas
   (Reglamento UE 655/2013). Solo se puede hablar de la APARIENCIA de la piel.
   Prohibido: "elimina arrugas", "rejuvenece", "5 anos mas joven", cualquier
   promesa medica. La competencia (Vivelaespana) lo hace mal y por eso Meta
   les tumba anuncios. Se escribe como SevariQ: "ayuda a suavizar la
   apariencia de".
   ============================================================ */
window.PRODUCTOS = [
  {
    id: 'balsamo', unidad: 'uno', promo: 2,
    resenasTotal: 2137,   /* 03-10 James: el contador como la competencia (Vigoshop 1.972, Zayu 1.528, Nutriavelle 5.000) */

    /* Dropi PRO: id 2287 · SKU 75481-BALSAMO-VITALIS · coste 1,99 € sin IVA */
    dropiId: 2287,
    dropiSku: '75481-BALSAMO-VITALIS',

    nombre: 'Bálsamo de Colágeno VITALIS',
    sub: 'Stick hidratante multizona · 9 g',
    categoria: 'Belleza',
    etiqueta: 'Nuevo en España',
    etiquetaOro: true,

    /* 'foto' es la MINIATURA (tarjeta y packs). 'fotos' es la GALERÍA.
       Las tres las hizo James el 25-09. Se quitó la del catálogo del proveedor:
       era un collage con los rótulos FOREHEAD / FACE / LIPS / BODY en INGLÉS
       encima, y esto se vende en España.
       El hero NO se repite aquí: se veía dos veces en la misma pantalla. */
    foto: 'img/balsamo-mano.webp?v=1',
    fotos: [
      'img/balsamo-uso.webp?v=1',    // aplicándoselo en el pómulo: se entiende el gesto de un vistazo
      'img/balsamo-mano.webp?v=1',   // sosteniéndolo: se lee la etiqueta y el tamaño real
      'img/balsamo-bolso.webp?v=1',  // junto al bolso: los 9 g que caben en cualquier parte
    ],

    /* ---- VÍDEO DE LA FICHA ----
       Sale del vídeo del propio vendedor del producto (720x1280, sin marca de
       agua de ningún creador). Se mapeó a 2 fotogramas por segundo para
       localizar los rótulos en inglés y se cortaron SOLO los tramos limpios:
       quedan 7,2 s con cinco planos, sin una sola letra y SIN AUDIO (James:
       "nada de texto ni audio"). Los textos estaban en 4,0-5,3 · 7,0-7,3 ·
       10,5-11,3 y esos segundos no entran. */
    /* 28-09: re-cortado. El video anterior dejaba un cuadro con el nombre de OTRA marca
       ("Wrinkle Bounce Multi Balm", seg. 3,3), el antes/despues de las munecas (4,2-4,6) y un
       texto en ingles (5,9). En la UE y en Meta el antes/despues en cosmetica esta prohibido. */
    video: 'img/balsamo-ficha.mp4?v=2',

    /* ---- HERO ----
       La foto vertical 1024x1536 que hizo James: el bálsamo en primer plano y
       la modelo detrás, desenfocada. El producto manda.
       En 'titulo' se permite <b> para el trozo en dorado; el resto se escapa.
       OJO CON EL TITULAR: nada de "elimina arrugas" ni "rejuvenece". Solo se
       puede hablar de APARIENCIA (Reglamento UE 655/2013), y además Meta
       rechaza las promesas médicas en cosmética. */
    hero: {
      img: 'img/hero-balsamo.webp?v=1',
      kicker: 'Nuevo en España',
      titulo: 'Dos segundos,<br>y la piel<br><b>deja de tirar.</b>',   /* con coma y punto, como el titular de la máscara: la cursiva sin puntuación queda coja */
      sub: 'Bálsamo de colágeno en stick. Se desliza y listo: rostro, contorno, labios, cuello y escote.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Pagas al recibir'],
      ],
    },
    /* Rosa de acento. Era #B76E79 y daba 3,8:1 tanto en blanco sobre él (la
       cinta de la promo, el -32%, el contador) como al revés (el botón
       secundario). Pide 4,5. Este da 5,3:1 y sigue siendo el rosa del envase,
       solo un punto más cerrado. Regla: ux/contraste. */
    acento: '#A8505F',   /* oro rosa: cosmetica, y distinto del oro de la marca */

    /* ---- Escasez: SOLO datos reales del Radar. En España inventar urgencia
       es practica desleal (art. 5 y 7 Ley 3/1991). Estas cifras salen de
       radar_stock, pais='España', id 2287. ---- */
    escasez: { hoy: 81, mejorDia: 105, quedan: 3898,
      nota: 'Se despacha desde el almacén de Sevilla por orden de pedido. Pagas cuando lo tienes en la mano.' },

    desc: 'El Bálsamo VITALIS es un hidratante en formato stick con colágeno hidrolizado, ácido hialurónico y aceite de semilla de girasol. Se gira la base, se desliza sobre la piel y listo: no hay que untarse las manos ni calcular cantidad. Al hidratar, la piel se ve más suave y las líneas de expresión se marcan menos. Sirve en rostro, frente, contorno de ojos, labios, cuello y escote, y se puede usar antes del maquillaje o por encima, para retocar durante el día. Son 9 g que caben en cualquier bolso.',

    puntos: [
      'Colágeno hidrolizado y ácido hialurónico',
      'Ayuda a suavizar la apariencia de las líneas de expresión',
      'Aporta hidratación a la piel seca y tirante',
      'Se aplica directo, sin ensuciarte las manos',
      'Rostro, contorno, labios, cuello y escote',
    ],

    formulaRotulo: 'La fórmula',
    formulaTitulo: 'Tres activos y un formato que no ensucia.',
    formulaSub: 'Hidratación de verdad, en un gesto de dos segundos.',
    formula: [
      ['fibra', 'Colágeno hidrolizado', 'De bajo peso molecular, para que se reparta bien por la superficie de la piel.'],
      ['agua', 'Ácido hialurónico', 'Retiene el agua en la capa superficial: la piel deja de sentirse tirante.'],
      ['pluma', 'Aceite de semilla de girasol', 'Nutre y deja un acabado suave, sin sensación grasa ni brillos.'],
      ['ojo', 'Multizona', 'Rostro, frente, contorno de ojos, labios, cuello y escote. Un solo producto.'],
      ['llave', 'Stick giratorio', 'Giras la base y aplicas. Sin manos, sin derrames y sin gastar de más.'],
      ['casa', '9 g que caben en el bolso', 'Para retocar donde estés, antes o después del maquillaje.'],
    ],

    /* ---- Linea de tiempo: la seccion que mejor funciona en las paginas
       españolas que ya venden este producto. Sin porcentajes inventados. ---- */
    medida: {
      titulo: '¿Cuándo se nota?',
      filas: [['Día 1', 'la piel deja de tirar'], ['Día 7', 'se ve más hidratada'], ['Día 21', 'las líneas finas se marcan menos']],
      texto: 'Es un cosmético, no un tratamiento médico: trabaja sobre la apariencia de la piel. La hidratación se nota desde los primeros días. Para que las líneas finas se vean menos marcadas hay que usarlo a diario durante unas tres semanas, y el resultado depende de tu tipo de piel y de la constancia.',
      boton: 'Lo quiero, pago al recibir',
    },

    comparaTitulo: '¿Qué lo hace diferente?',
    compara: [
      'Se aplica directo sobre la piel: no hay que untarse las manos ni medir cantidad.',
      'Formato sólido: no se derrama en el bolso ni se reseca como una crema abierta.',
      'Un solo producto para rostro, labios, cuello y escote.',
      'Se puede usar antes del maquillaje o por encima, para retocar a media tarde.',
    ],

    /* ---- Preguntas del producto. Las de envio y pago van detras, iguales
       para todos los productos de la tienda. ---- */
    preguntas: [
      { q: '¿Dónde me lo puedo aplicar?', a: 'En rostro, frente, contorno de ojos, labios, cuello y escote. Evita el interior del ojo y las heridas abiertas.' },
      { q: '¿Se puede usar con maquillaje?', a: 'Sí. Antes, como base hidratante, o por encima para retocar durante el día. Al ser un stick no arrastra el maquillaje.' },
      { q: '¿Cuántas veces al día?', a: 'Las que necesites. Lo habitual es por la mañana y por la noche, y un retoque en las zonas que notes secas.' },
      { q: '¿Quita las arrugas?', a: 'No, y quien se lo diga le está engañando. Es un cosmético hidratante: cuando la piel está bien hidratada las líneas se marcan menos y se ven más suaves. No elimina arrugas ni sustituye ningún tratamiento médico.' },
      { q: '¿Cuánto me dura?', a: 'Trae 9 g. Lo que dure depende de cuántas zonas te apliques y con qué frecuencia.' },
      { q: '¿Sirve para piel sensible?', a: 'Es un cosmético de uso externo. Como con cualquier producto nuevo, conviene probarlo primero en una zona pequeña. Si tienes la piel reactiva o alguna afección dermatológica, consúltalo antes con tu dermatólogo.' },
    ],

    /* ---- Fotos de clientes: VACIO. No tenemos clientes en España todavia y
       en la UE no se pueden mostrar testimonios que no sean reales
       (Directiva UE 2019/2161). Se llena cuando haya pedidos entregados. ---- */
    fotosResenas: [],
    antesDespues: '',

    /* ---- PRECIOS aprobados por James el 24-09-2026 ----
       Contra entrega: 28,50 / 38,50 / 48,50
       Anticipado (-2 €): 26,50 / 36,50 / 46,50, con entrega prioritaria 14 h.
       'antes' va en 0 A PROPOSITO: producto nuevo. La Ley 7/1996 art. 20.1
       (Directiva Omnibus) exige que el precio tachado sea el mas bajo de los
       ULTIMOS 30 DIAS. Hasta el 24-10-2026 no se puede tachar nada. ---- */
    packs: [
      { cant: 1, precio: 28.50, antes: 56.99, texto: '1 unidad' },
      { cant: 2, precio: 38.50, antes: 76.99, texto: '2 unidades' },
      { cant: 3, precio: 48.50, antes: 96.99, texto: '3 unidades' },
    ],
    /* OJO: 'popular' es el INDICE del pack, no la cantidad. 1 = el segundo de
       la lista = el pack de 2 unidades, que es el que se empuja: el envio es
       fijo por pedido, asi que dos unidades parten el flete a la mitad. */
    popular: 1,

    /* ---- Pago anticipado: 2 € menos y envio prioritario de 14 h ----
       El descuento se justifica solo: el contra reembolso cuesta 1 € de COD
       y se pierde el 30 % de los pedidos. Se anuncia SIEMPRE como descuento
       por pagar ahora, NUNCA como recargo por pagar al recibir: el art. 60 ter
       TRLGDCU prohibe cobrar por un medio de pago mas de lo que cuesta. ---- */
    anticipado: {
      descuento: 2,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [26.50, 36.50, 46.50],
    },

    /* ---- REGALO con ruleta (regalo.js), 17-10 James: crema de contorno de ojos,
       una por pedido. La agrega el montador ES (pack PACKREC-76, 0,99 €). ---- */
    regalo: {
      casilla: 'Crema de regalo',
      titulo: 'Una crema de contorno de ojos de regalo',
      texto: 'Crema para el contorno de los ojos, en tubo de 15 g. Va gratis con tu pedido: una por pedido.',
      foto: 'img/balsamo-regalo-crema.webp?v=1',
      alt: 'Tubo y caja de la crema para el contorno de los ojos',
      okTitulo: 'Tu crema de regalo va con tu pedido',
      okSub: 'Crema para el contorno de los ojos, gratis.',
    },
  },

  /* ============================================================
     CABEZAL DE DUCHA · 29-09-2026
     Dropi PRO id 575 ("Alcachofa de ducha de alta presión"), coste 3,49 €.
     Radar: 7 de 7 días vendiendo; 5.189 en Sevilla y 13.600 más por llegar.
     Diseño PROPIO (ducha.css / ducha.js), salido de ui-ux-pro-max ORIGINAL:
     design-system/jaye-espana/pages/ducha.md. NO es el del bálsamo.
     Fotos: el héroe lo hizo James (29-09). Las otras son las de Chile, recortadas
     SIN "Envío a todo Chile", bandera ni precios en pesos. La de las ofertas en
     CLP no entra. Vídeo: el de Chile SIN la franja de subtítulos y SIN audio.
     Palabras de España: tubería (no cañería), fontanero (no gásfiter), cal (no sarro).
     ============================================================ */
  {
    id: 'ducha', unidad: 'uno', promo: 2,
    resenasTotal: 1846,
    dropiId: 575,

    nombre: 'Cabezal de Ducha Masajeadora Spa',
    sub: 'Alta presión con filtro · rosca universal',
    categoria: 'Hogar',
    etiqueta: 'Nuevo en España',
    etiquetaOro: true,

    /* 29-09: fotos de James (tienda y pelo). Las de Chile se van quedando fuera a medida que llegan las nuevas. */
    /* la infografía va SOLO en 'Qué trae' (ducha.js). James 29-09: "solo cambia esta, las demás déjalas igual" */
    foto: 'img/ducha-tienda.webp?v=1',
    fotos: ['img/ducha-tienda.webp?v=1', 'img/ducha-pelo.webp?v=1', 'img/ducha-3.webp?v=1'],
    video: 'img/ducha-ficha.mp4?v=1',

    hero: {
      img: 'img/hero-ducha.webp?v=1',
      kicker: 'Nuevo en España',
      titulo: 'Tu ducha,<br>con la fuerza<br><b>que le faltaba.</b>',
      sub: 'Cabezal de alta presión con filtro y masaje. Se enrosca a mano en dos minutos, sin fontanero.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Pagas al recibir'],
      ],
    },
    /* Azul del sistema de la ducha, un punto más cerrado (#0369A1) para que el
       blanco encima (cinta de la promo, contador) dé 5,9:1 y no 4,1:1. */
    acento: '#0369A1',

    /* Escasez: datos REALES de radar_stock (España, id 575): 5.882 → 5.552 → 5.227. */
    escasez: { hoy: 325, mejorDia: 330, quedan: 5189,
      nota: 'Se despacha desde el almacén de Sevilla por orden de pedido. Pagas cuando lo tienes en la mano.' },

    desc: 'El Cabezal de Ducha Masajeadora Spa concentra el agua en microboquillas, así que sale con más fuerza aunque la tubería sea la misma. Tiene tres modos, lluvia, masaje y mixto, y un filtro dentro que retiene el cloro y los sedimentos del agua. Si con el tiempo la cal va cerrando los agujeros, se limpia en un momento y la presión vuelve. Se enrosca a mano en la manguera que ya tienes, con la rosca universal de media pulgada: sin herramientas y sin llamar al fontanero.',

    puntos: [
      'Más presión con la misma tubería',
      'Tres modos: lluvia, masaje y mixto',
      'Filtro dentro: retiene cloro y sedimentos',
      'Se enrosca a mano, sin fontanero',
    ],

    formulaRotulo: 'Qué trae',
    formulaTitulo: 'Lo que tu ducha de siempre no tiene.',
    formulaSub: 'Cuatro cosas, en un cabezal que se cambia en dos minutos.',
    formula: [
      ['agua', 'Alta presión', 'Las microboquillas concentran el chorro: más fuerza con el mismo grifo.'],
      ['pluma', 'Masaje relajante', 'Puntas de silicona que masajean el cuero cabelludo, el cuello y la espalda.'],
      ['llave', '3 modos de agua', 'Lluvia, masaje y mixto. Se cambia con una sola mano.'],
      ['escudo', 'Filtro incorporado', 'Capas de bolitas minerales que retienen el cloro y los sedimentos del agua.'],
    ],

    comparaTitulo: '¿Por qué este y no otro?',
    compara: [
      'Más fuerza sin cambiar la tubería ni llamar al fontanero.',
      'Tres modos de verdad: lluvia, masaje y mixto.',
      'Cuando la cal lo tapa, se limpia en un momento: la presión vuelve.',
    ],

    preguntas: [
      { q: '¿Sirve para mi ducha?', a: 'Sí. La rosca es la universal de media pulgada, la que traen casi todas las duchas de mano en España. Se enrosca a mano, sin herramientas ni fontanero.' },
      { q: '¿De verdad sube la presión?', a: 'Sí, y te decimos cómo: las microboquillas achican la salida, así que el agua sale con más fuerza aunque llegue igual por la tubería. Lo que no hace es arreglar un problema de presión de toda la casa.' },
      { q: '¿Qué son los 3 modos?', a: 'Lluvia para el día a día, masaje para el cuello y la espalda, y mixto, que junta los dos. Se cambian con una mano.' },
      { q: '¿El filtro se cambia?', a: 'El filtro va dentro del mango y retiene el cloro y los sedimentos. Cuando lo notes cargado, se enjuaga con agua.' },
      /* 29-09 · ángulo de la CAL, contado sin mentir (ver ducha.js, sección "¿Tu agua tiene cal?") */
      { q: '¿Quita la cal del agua?', a: 'No, y quien te diga que un cabezal quita la cal te engaña: eso solo lo hace un descalcificador. Lo que pasa en las zonas con agua dura es que la cal va tapando los agujeros del cabezal y la ducha pierde fuerza. Con uno nuevo recuperas la presión, y si con los meses se vuelve a tapar, frotas la cara del cabezal o lo dejas un rato en vinagre y queda como el primer día. El filtro retiene el cloro y los sedimentos.' },
      { q: '¿Viene la manguera?', a: 'No. Viene el cabezal, que es lo que se cambia. Se conecta a la manguera que ya tienes en casa.' },
    ],

    /* Sin fotos de clientes: en España no hay compradores todavía y en la UE no
       se pueden enseñar testimonios que no sean reales (Directiva 2019/2161).
       Las de Chile NO se ponen aquí. */
    fotosResenas: [],
    antesDespues: 'img/ducha-ba.webp?v=1',
    antesDespuesSub: 'La misma ducha y la misma tubería: el hilo de agua de antes, y el chorro con el cabezal puesto.',

    /* PRECIOS aprobados por James el 29-09-2026 (1 € por debajo de la más barata:
       VELYN 24,99 / 39,99 / 49,99). 'antes' en 0: producto nuevo (Ley 7/1996 art. 20.1). */
    packs: [
      { cant: 1, precio: 23.99, antes: 47.99, texto: '1 unidad' },
      { cant: 2, precio: 32.99, antes: 65.99, texto: '2 unidades' },
      { cant: 3, precio: 41.99, antes: 83.99, texto: '3 unidades' },
    ],
    popular: 1,

    anticipado: {
      descuento: 2,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [21.99, 30.99, 39.99],
    },
  },

  /* ============================================================
     SELLADOR IMPERMEABLE EN SPRAY · 02-10-2026
     Dropi PRO id 2607 ("Spray impermeabilizante blanco 400ml"), coste 3,69 €.
     Marca SPSIL (Aspe, Alicante). Usos SOLO los de su ficha oficial (spsil.es):
     grietas, juntas y fisuras en cemento, metal, PVC, madera y plástico,
     interior y exterior. 🔴 NO tuberías de agua ni con presión (James 02-10:
     "no le mintamos a la gente, eso trae devolución y mala fama").
     Diseño PROPIO (sellador.css / sellador.js), opción B de ui-ux-pro-max:
     pizarra #334155 + verde #059669, Outfit / Work Sans. Imágenes Nano Banana
     aprobadas por James 02-10; vídeo = el oficial de SPSIL, solo los cortes
     con el sellador BLANCO (sin botes de otras marcas).
     ============================================================ */
  {
    id: 'sellador', unidad: 'uno', promo: 4,
    resenasTotal: 1124,
    dropiId: 2607,

    nombre: 'Spray Sellador Impermeable',
    sub: 'Sella grietas, juntas y fisuras · 400 ml · blanco',
    categoria: 'Hogar',
    etiqueta: 'Nuevo en España',
    etiquetaOro: true,

    foto: 'img/sellador-tienda.webp?v=1',
    fotos: ['img/sellador-tienda.webp?v=1', 'img/sellador-terraza.webp?v=1', 'img/sellador-ventana.webp?v=1'],
    video: 'img/sellador-ficha.mp4?v=1',

    hero: {
      img: 'img/hero-sellador.webp?v=1',
      kicker: 'Nuevo en España',
      titulo: 'Grietas selladas,<br><b>casa sin goteras.</b>',
      sub: 'Spray sellador impermeable de 400 ml. Lo rocías sobre la grieta o la junta y forma una capa blanca que no deja pasar el agua.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Pagas al recibir'],
      ],
    },
    acento: '#047857',

    /* Stock REAL leído en el panel de Dropi PRO el 01-10-2026 (2.999).
       Ventas diarias de Dropdata 18-09 → 01-10: entre 38 y 157. */
    escasez: { hoy: 157, mejorDia: 157, quedan: 2999,
      nota: 'Se despacha desde el almacén de Sevilla por orden de pedido. Pagas cuando lo tienes en la mano.' },

    desc: 'El Spray Sellador Impermeable forma una capa blanca, flexible y resistente al agua sobre grietas, juntas y fisuras. Se aplica en exterior e interior sobre cemento, metal, PVC, madera y plástico: tejados, terrazas, muros, alféizares, canalones y bajantes. Se pulveriza a 20-25 cm, en capas finas, sin goteos, y seca rápido: en menos de una hora puedes dar varias capas.',

    puntos: [
      'Sella grietas, juntas y fisuras',
      'Capa blanca que no deja pasar el agua',
      'Cemento, metal, PVC, madera y plástico',
      'Interior y exterior · secado rápido',
    ],

    formulaRotulo: 'Por qué funciona',
    formulaTitulo: 'Una capa que el agua no atraviesa.',
    formulaSub: 'Lo que hace el sellador en cuanto lo rocías.',
    formula: [
      ['agua', 'Impermeable', 'Forma una barrera blanca sobre la grieta: la lluvia resbala y no entra.'],
      ['escudo', 'Flexible y duradero', 'Se adhiere bien y aguanta la intemperie sin cuartearse.'],
      ['rayo', 'Secado rápido', 'Entre capa y capa, 15-20 minutos. Listo en menos de una hora.'],
      ['casa', 'Sin herramientas', 'Agitas, rocías a 20-25 cm y listo. Sin brocha, sin goteos.'],
    ],

    comparaTitulo: '¿Por qué un sellador en spray?',
    compara: [
      'Llega a juntas y rincones donde la brocha no entra.',
      'Capas finas y parejas, sin goteos ni manchas.',
      'Lo haces tú, sin obras ni albañil.',
    ],

    preguntas: [
      { q: '¿Dónde se puede usar?', a: 'En grietas, juntas y fisuras de tejados, terrazas, muros, alféizares de ventanas, canalones y bajantes de lluvia. Sobre cemento, metal, PVC, madera y plástico, por dentro y por fuera.' },
      { q: '¿Para qué NO sirve?', a: 'No es para tuberías de agua ni con presión (la del grifo o la entrada de agua), ni para tubos rotos o agujeros grandes: eso es trabajo de fontanero. Tampoco se aplica sobre una superficie mojada.' },
      { q: '¿Cómo se aplica?', a: 'Limpia y seca la zona, agita el bote 1-2 minutos y rocía a 20-25 cm en capas finas. Deja secar 15-20 minutos entre capa y capa. Para una grieta normal bastan 2 o 3 capas.' },
      { q: '¿De qué color queda?', a: 'Blanco. Queda una capa blanca, lisa y algo gomosa sobre la grieta.' },
      { q: '¿Cuánto rinde un bote?', a: 'Un bote de 400 ml da para varias grietas o juntas de tamaño normal. Para una terraza o un tejado con muchas fisuras, mejor el pack de 2 o de 4.' },
    ],

    fotosResenas: [],
    antesDespues: 'img/sellador-ba.webp?v=1',
    antesDespuesSub: 'La misma pared: la grieta por donde entraba el agua y la mancha de humedad, y después sellada y seca.',

    /* PRECIOS aprobados por James el 01-10-2026 (1 € por debajo de FlexSpray:
       30 / 40 / 60). 'antes' en 0: producto nuevo (Ley 7/1996 art. 20.1). */
    packs: [
      { cant: 1, precio: 28.99, antes: 57.99, texto: '1 bote' },
      { cant: 2, precio: 38.99, antes: 77.99, texto: '2 botes' },
      { cant: 4, precio: 58.99, antes: 117.99, texto: '4 botes' },
    ],
    popular: 1,

    /* Pago anticipado: 02-10 eran 2 € menos (26,99 / 36,99 / 56,99). 05-10 James: "dale el 10 %",
       igual que el spray → 25,99 / 34,99 / 52,99, con entrega prioritaria. */
    anticipado: {
      pct: 10,
      descuento: 3,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [25.99, 34.99, 52.99],
    },
  },

  /* ============================================================
     SPRAY REPARADOR DE ARAÑAZOS (CAR NANO) · 02-10-2026
     Dropi PRO id 1378 ("CAR NANO repairing spray 120 ml"), coste 1,99 € (2,41 con IVA).
     🔴 Solo rayitas SUPERFICIALES de la capa transparente: no arregla rayones que
     llegan a la imprimación o al metal, ni golpes (James 02-10: no prometer de más).
     Diseño PROPIO (aranazos.css / aranazos.js), ui-ux-pro-max "Motion-Driven":
     pizarra #1E293B + rojo #DC2626, Syncopate / Space Mono. Imágenes Nano Banana
     aprobadas por James 02-10 (persona con el bote EN LA MANO); vídeo = metraje real
     de clientes, sin la caja ni el bote de la otra marca y sin subtítulos.
     ============================================================ */
  {
    id: 'aranazos', unidad: 'uno', promo: 3,   /* la promoción es el pack de 3 (no hay pack de 4) */
    resenasTotal: 1389,
    dropiId: 1378,

    nombre: 'Spray Reparador de Arañazos',
    sub: 'Elimina los arañazos en 60 segundos · 120 ml',
    categoria: 'Coche',
    etiqueta: 'Nuevo en España',
    etiquetaOro: true,

    foto: 'img/aranazos-rocia.webp?v=2',
    fotos: ['img/aranazos-rocia.webp?v=2', 'img/aranazos-frota.webp?v=1', 'img/aranazos-brillo.webp?v=1'],
    video: 'img/aranazos-ficha.mp4?v=1',

    hero: {
      img: 'img/hero-aranazos.webp?v=1',
      kicker: 'Nuevo en España',
      titulo: 'Elimina los arañazos<br><b>en 60 segundos.</b>',
      sub: '¡Deja de pagar al taller! Rocías, frotas con un paño y los arañazos desaparecen. Tu coche brilla como nuevo y queda protegido del agua y el polvo.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Paga ahora o al recibir'],
      ],
    },
    acento: '#DC2626',

    /* Stock REAL leído en el panel de Dropi PRO el 01-10-2026 (5.846).
       Dropdata 18-09 → 01-10: 4.880 unidades en 14 días (~330 al día). */
    escasez: { hoy: 330, mejorDia: 330, quedan: 5846,
      nota: 'Se despacha desde el almacén de Sevilla por orden de pedido. Pagas cuando lo tienes en la mano.' },

    desc: 'El Spray Reparador de Arañazos elimina en 60 segundos los arañazos del día a día de tu coche: los del lavado, las uñas junto a la manilla, el roce de una rama o de una bolsa. Su fórmula nano rellena el arañazo, devuelve el brillo a la pintura opaca y deja una capa que repele el agua y el polvo. Rocías, frotas con un paño de microfibra y tu coche queda como nuevo, sin pasar por el taller.',

    puntos: [
      'Elimina los arañazos en 60 segundos',
      'Tu coche brilla como nuevo',
      'Lo protege del agua y del polvo',
      'Sin taller: ahorra cientos de euros',
    ],

    formulaRotulo: 'Por qué funciona',
    formulaTitulo: 'Una capa nano sobre la pintura.',
    formulaSub: 'Lo que hace el spray en cuanto lo extiendes.',
    formula: [
      ['escudo', 'Elimina el arañazo', 'Las partículas nano rellenan el arañazo y lo hacen desaparecer a la vista.'],
      ['rayo', 'Brilla como nuevo', 'La pintura opaca recupera el reflejo, como recién salida del concesionario.'],
      ['agua', 'Repele el agua', 'La lluvia hace gotas y resbala; el polvo se pega menos.'],
      ['casa', 'En tu garaje', 'Rocías, frotas con un paño y listo. Sin máquina pulidora.'],
    ],

    comparaTitulo: '¿Por qué un spray y no el taller?',
    compara: [
      'El taller te cobra cientos de euros por un arañazo.',
      'Lo haces tú en 60 segundos, con un paño.',
      'Un bote rinde para varias aplicaciones.',
    ],

    preguntas: [
      { q: '¿Qué arañazos quita?', a: 'Los arañazos del día a día: marcas del lavado, de las uñas junto a la manilla, roces de ramas o bolsas, y la pintura opaca por el sol. Los elimina y devuelve el brillo.' },
      { q: '¿Sirve para cualquier arañazo?', a: 'Sirve para los arañazos del barniz, que son la gran mayoría. Si el rayón llega hasta el metal o hay un golpe, eso ya es de chapa y pintura en el taller.' },
      { q: '¿Cómo se aplica?', a: 'Lava y seca la zona, a la sombra y con la chapa fría. Agita el bote, rocía sobre la rayita y extiende con un paño de microfibra en círculos. Repasa con la cara seca del paño. Si hace falta, repite.' },
      { q: '¿Sirve para cualquier color?', a: 'Sí. No es pintura: es una capa transparente, así que vale para coches blancos, negros, rojos, grises o de cualquier color.' },
      { q: '¿Viene con paño?', a: 'No. Se vende el bote de 120 ml. Sirve cualquier paño de microfibra limpio que tengas en casa.' },
      { q: '¿Cuánto rinde un bote?', a: 'Un bote de 120 ml da para varias zonas con rayitas, o para repasar varias veces el mismo coche. Para dos coches o para tenerlo a mano, mejor el pack de 2 o de 3.' },
    ],

    fotosResenas: [],
    antesDespues: 'img/aranazos-ba.webp?v=2',
    antesDespuesSub: 'La misma puerta al sol: llena de arañazos del lavado, y después del spray: brillante como nueva.',

    /* PRECIOS aprobados por James el 01-10-2026 (~1 € por debajo del más barato con
       envío: Revine 18,99 + 3,49 envío / 34,98 / 43,47). 'antes' en 0: producto nuevo. */
    packs: [
      { cant: 1, precio: 20.99, antes: 41.99, texto: '1 bote' },
      { cant: 2, precio: 28.99, antes: 57.99, texto: '2 botes' },
      { cant: 3, precio: 41.99, antes: 83.99, texto: '3 botes' },
    ],
    popular: 1,

    /* Pago anticipado aprobado por James el 02-10-2026: 10 % menos ("vamos con el
       10%": pagar antes ahorra el % de devolución) y entrega prioritaria. */
    anticipado: {
      pct: 10,
      descuento: 2.10,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [18.99, 25.99, 37.79],
    },
  },

  /* ============================================================
     PULSERA MAGNÉTICA ANTITABACO · 07-10-2026
     Dropi PRO id 2781 ("Pulsera Magnética Antitabaco de Terapia Avanzada"), 1,65 € + IVA.
     Modelo EXACTO: cuentas de piedra volcánica negra, mate y porosa, y UN dije redondo
     plateado con imán. 🔴 NO es un tratamiento: es un recordatorio que acompaña la
     decisión de dejar el tabaco. Nada de "cura", "elimina la adicción" ni "en X días".
     Diseño PROPIO (pulsera.css / pulsera.js), ui-ux-pro-max 07-10 (aprobado por James):
     negro piedra #1C1917 + dorado #A16207, Cormorant / Montserrat, historia por capítulos.
     Imágenes: OpenAI con la foto real de la ficha de Dropi PRO como referencia.
     ============================================================ */
  {
    id: 'pulsera', unidad: 'una', promo: 2,
    dropiId: 2945,   /* 26-10 James: la pulsera nueva llega en estuche de regalo (PULSANTITABACO-CAJA); antes 2781 sin caja */

    nombre: 'Pulsera Magnética Antitabaco',
    sub: 'Piedra volcánica natural con imán · para él y para ella',
    categoria: 'Bienestar',
    etiqueta: 'Lanzamiento en España',
    etiquetaOro: true,

    foto: 'img/pulsera-palma.webp?v=2',
    fotos: ['img/pulsera-palma.webp?v=2', 'img/pulsera-muneca.webp?v=2', 'img/pulsera-pareja.webp?v=2'],
    video: 'img/pulsera-ficha.mp4?v=1',

    hero: {
      img: 'img/hero-pulsera.webp?v=3',   /* 07-10 la hizo James en Gemini: pulsera idéntica a la real, imán al centro, sin textos */
      kicker: 'Lanzamiento en España',
      titulo: '¿Otra vez con el cigarro<br><b>en la mano?</b>',
      sub: 'La pulsera magnética de piedra volcánica que llevas en la muñeca y te recuerda tu decisión cada vez que llegan las ganas. Discreta, cómoda, para él y para ella.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Pagas al recibir'],
      ],
    },
    acento: '#A16207',

    /* Stock REAL leído en el panel de Dropi PRO el 07-10-2026: 717 + 12.000 por llegar.
       Dropdata ES 24-09 → 07-10: 1.925 unidades en 14 días, los 14 días con venta (~150 al día). */
    escasez: { hoy: 150, mejorDia: 213, quedan: 717,
      nota: 'Se despacha desde el almacén de Sevilla por orden de pedido. Pagas cuando la tienes en la mano.' },

    desc: 'La Pulsera Magnética Antitabaco está hecha con cuentas de piedra volcánica natural, negra y porosa, y un pequeño dije plateado con imán. Llega en su estuche y caja de regalo. Es elástica, se ajusta sola a la muñeca y combina con todo. La idea es sencilla: la llevas puesta todo el día y, cuando llegan las ganas de fumar, la tocas, sientes el imán y recuerdas por qué has decidido dejarlo. Un gesto pequeño que te ayuda a frenar el impulso.',

    puntos: [
      'Piedra volcánica natural y un imán discreto',
      'Te recuerda tu decisión cuando llegan las ganas',
      'Elástica: se ajusta a cualquier muñeca',
      'Para él y para ella · el pack de 2 es para regalar',
      'Llega en su estuche y caja de regalo',
    ],

    formulaRotulo: 'Por qué ayuda',
    formulaTitulo: 'Un recordatorio que no se queda en casa.',
    formulaSub: 'Lo que hace la pulsera cuando la llevas puesta.',
    formula: [
      ['escudo', 'Frena el impulso', 'Las ganas llegan de golpe. Tocar la pulsera es la pausa que necesitas para no encender el cigarro.'],
      ['rayo', 'Siempre contigo', 'En el trabajo, en el coche o con el café: va en la muñeca todo el día.'],
      ['agua', 'Piedra volcánica', 'Cuentas naturales, ligeras y porosas, con un pequeño dije plateado con imán.'],
      ['casa', 'Discreta', 'Parece una pulsera más. Nadie tiene por qué saber que la llevas por eso.'],
    ],

    comparaTitulo: '¿Por qué una pulsera?',
    compara: [
      'No lleva parches, chicles ni nada que tomar.',
      'La llevas puesta: está contigo en cada momento difícil.',
      'Un regalo con intención para alguien que quiere dejarlo.',
    ],

    preguntas: [
      { q: '¿Me va a quitar las ganas de fumar?', a: 'No es un medicamento ni un tratamiento. Es un recordatorio que llevas en la muñeca: cuando llegan las ganas, la tocas y te ayuda a pararte un momento y recordar tu decisión. Si quieres apoyo médico para dejar el tabaco, consulta con tu médico o farmacéutico.' },
      { q: '¿De qué está hecha?', a: 'De cuentas de piedra volcánica natural, negra, mate y porosa, montadas en un hilo elástico, con un pequeño dije plateado que lleva un imán. Llega en un estuche negro transparente dentro de una caja de regalo.' },
      { q: '¿Me queda bien la talla?', a: 'Es elástica y se ajusta a la mayoría de muñecas de adulto, de hombre y de mujer.' },
      { q: '¿Se puede mojar?', a: 'Mejor quitártela para ducharte, nadar o fregar: así el hilo y el imán duran más.' },
      { q: '¿Quién no debe usarla?', a: 'Por el imán, no la uses si llevas marcapasos u otro dispositivo médico implantado, ni durante el embarazo sin consultar antes a tu médico.' },
      { q: '¿Por qué el pack de 2?', a: 'Es el más elegido: una para ti y otra para regalar a alguien que también quiere dejarlo, o para tener de repuesto.' },
    ],

    fotosResenas: [],
    antesDespues: 'img/pulsera-ba.webp?v=1',
    antesDespuesSub: 'El mismo café de cada día: antes con el paquete en la mano, después con la pulsera en la muñeca.',

    /* PRECIOS aprobados por James el 07-10-2026 ("sal con 25.95 2x37.95 3x47.95").
       'antes' en 0: producto nuevo, no hay precio anterior (Ley 7/1996 art. 20.1). */
    packs: [
      { cant: 1, precio: 25.95, antes: 0, texto: '1 pulsera' },
      { cant: 2, precio: 37.95, antes: 0, texto: '2 pulseras' },
      { cant: 3, precio: 47.95, antes: 0, texto: '3 pulseras' },
    ],
    popular: 1,

    /* Pago anticipado: James 07-10 pidió el "−10 %" en la imagen aprobada de la campaña.
       10 % exacto de cada pack, como el spray. */
    anticipado: {
      pct: 10,
      descuento: 2.60,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [23.35, 34.15, 43.15],
    },
  },

  /* ============================================================
     PISTOLA DE ALTA PRESIÓN 48 V · ESPAÑA (09-10-2026, James: "vamos con la pistola").
     Dropi PRO 1152 "Pistola Alta Presión Profesional Portátil Doble Batería", 16,49 € + IVA, 2,18 kg.
     Kit real (fotos del almacén de Dropi PRO): maletín, pistola, 2 baterías 48 V, cargador,
     manguera de 5 m con filtro, botella de espuma, lanza con boquillas, adaptador de grifo.
     🔴 Nada de bares, litros ni minutos de batería: el proveedor no los da y no se prometen.
     Diseño propio: pistola.css / pistola.js (ui-ux-pro-max, pizarra industrial + verde).
     ============================================================ */
  {
    id: 'pistola', unidad: 'una', promo: 2,   /* promo = el pack de 2 (84,95 frente a 95,90 sueltas) */
    dropiId: 1152,

    nombre: 'Pistola de Alta Presión 48 V',
    sub: 'Sin cables · 2 baterías · maletín completo',
    categoria: 'Bricolaje',
    etiqueta: 'Lanzamiento en España',
    etiquetaOro: false,

    foto: 'img/pistola-kit.webp?v=1',
    fotos: ['img/pistola-kit.webp?v=1', 'img/pistola-maletin.webp?v=1', 'img/pistola-contenido-2.webp?v=1'],
    video: 'img/pistola-ficha-6.mp4?v=1'   /* 09-10 James: el tt_7554 traía la marca @ddc.tecnology en el centro; borrada con delogo (t 0-10 s); 09-10 James: fuera el rótulo grande 48V del arranque (recortado desde 1,15 s; marca JAYE más chica y difuminada, borde inferior recortado por un icono azul del creador; parche con desenfoque suave y bordes difuminados en vez de delogo) y encima la de JAYE GROUP difuminada */,

    hero: {
      img: 'img/hero-pistola-v2.webp?v=1',   /* 09-10 James: foto GRANDE a pantalla completa con las letras encima, como el foco. v2: lanza enroscada en la pistola y manguera conectada (la v1 tenía la lanza suelta en la mano) */
      kicker: 'Lanzamiento en España',
      titulo: '¿El coche lleno de barro<br><b>y sin manguera a mano?</b>',
      sub: 'Pistola de alta presión sin cables, con dos baterías de 48 V. Coge el agua de un cubo, una garrafa o el grifo y limpia el coche, la terraza o la bici donde estés.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Paga ahora o al recibir'],
      ],
    },
    acento: '#DC2626',   /* 09-10 James: el producto es negro con ROJO (cierres, gatillo, batería): el acento va en rojo, no en verde */

    /* Stock REAL leído en el panel de Dropi PRO el 09-10-2026: 5.445.
       Dropdata ES: 82 al día la última semana, 21 de 21 días con venta, mejor día 115. */
    escasez: { hoy: 82, mejorDia: 115, quedan: 5445,
      nota: 'Se despacha desde el almacén de Sevilla por orden de pedido. Pagas cuando la tienes en la mano.' },

    desc: 'La Pistola de Alta Presión 48 V es una hidrolimpiadora de mano sin cables. Viene en su maletín con dos baterías de litio de 48 V y el cargador, una manguera de 5 metros con filtro para coger agua de un cubo o una garrafa, un adaptador para conectarla al grifo, una lanza metálica con boquillas para elegir el tipo de chorro y una botella para echar jabón o espuma. Sirve para lavar el coche, la moto o la bici, baldear la terraza, el patio o la fachada, limpiar los muebles de jardín, las persianas o las herramientas, y regar. Sin enchufe, sin manguera larga y sin máquina pesada.',

    puntos: [
      'Sin cables: funciona con batería de 48 V, y trae dos',
      'Coge el agua de un cubo, una garrafa o el grifo',
      'Maletín con manguera de 5 m, lanza, boquillas y espuma',
      'Coche, terraza, bici, muebles de jardín y riego',
    ],

    formulaRotulo: 'Qué trae el maletín',
    formulaTitulo: 'Todo lo que hace falta, en una caja.',
    formulaSub: 'Lo abres y está listo para trabajar.',
    formula: [
      ['rayo', 'Dos baterías de 48 V', 'Una puesta y otra cargando. Con el cargador incluido.'],
      ['agua', 'Manguera de 5 m con filtro', 'La metes en un cubo o una garrafa y la pistola chupa el agua sola. También va al grifo.'],
      ['escudo', 'Lanza con boquillas', 'Chorro fino para el barro pegado o abanico para aclarar. Con la botella de espuma para el jabón.'],
      ['casa', 'Maletín rígido', 'Todo recogido y protegido. Cabe en el maletero o en una balda del garaje.'],
    ],

    comparaTitulo: '¿Por qué esta y no la hidrolimpiadora grande?',
    compara: [
      'No necesita enchufe ni toma de agua cerca: la llevas donde está la suciedad.',
      'Pesa poco más de 2 kilos con la batería puesta: se usa con una mano.',
      'Dos baterías en vez de una: terminas el coche sin esperar la carga.',
    ],

    preguntas: [
      { q: '¿De dónde coge el agua?', a: 'De un cubo, una garrafa o una botella grande, con la manguera de 5 metros que lleva un filtro en la punta. Si tienes grifo cerca, también trae el adaptador para conectarla directamente.' },
      { q: '¿Qué trae el maletín?', a: 'La pistola, dos baterías de litio de 48 V, el cargador, la manguera de 5 metros con filtro, el adaptador de grifo, la lanza metálica con boquillas y la botella para la espuma. Todo dentro del maletín rígido.' },
      { q: '¿Para qué sirve?', a: 'Para lavar el coche, la moto o la bici, baldear la terraza, el patio o la fachada, limpiar los muebles de jardín, las persianas o las herramientas, y para regar. Es una hidrolimpiadora de mano: para suciedad del día a día, no para trabajos industriales.' },
      { q: '¿Necesita enchufe?', a: 'No. Funciona con la batería. Las baterías se cargan en el enchufe de casa con el cargador que viene en el maletín.' },
      { q: '¿Cuánto pesa?', a: 'Unos 2 kilos con la batería puesta. Se maneja con una sola mano.' },
      { q: '¿Tiene garantía?', a: 'Tienes 14 días desde que la recibes para devolverla si no te convence, y la garantía legal de conformidad que marca la ley en España. Si llega con algún fallo, nos escribes por WhatsApp y lo resolvemos.' },
    ],

    fotosResenas: [],
    antesDespues: 'img/pistola-ba.webp?v=1',
    antesDespuesSub: 'El mismo coche, el mismo patio: antes con el barro del campo, después tras un par de minutos de pistola.',

    /* PRECIOS propuestos el 09-10-2026 (47,95 · 2 × 84,95), James: "Vale, vamos a trabajarle".
       Competencia contra reembolso en España: Wortek 49,95 · Vivelaespana 59,95 · All Hogar 39 (modelo de 21 V).
       'antes' en 0: producto nuevo (Ley 7/1996 art. 20.1). */
    packs: [
      { cant: 1, precio: 47.95, antes: 0, texto: '1 pistola' },
      { cant: 2, precio: 84.95, antes: 0, texto: '2 pistolas' },
    ],
    popular: 0,

    /* Pago anticipado: −10 % como el resto de España. */
    anticipado: {
      pct: 10,
      descuento: 4.80,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [43.15, 76.45],
    },
  },

  /* ============================================================
     GAFAS MULTIFOCALES CON FILTRO AZUL · ESPAÑA (19-10-2026, James: "vamos activar los lentes").
     Dropi PRO 2816 "Gafas antirayos azules multifocales autograduable mas funda", 1,79 € + IVA.
     Modelo EXACTO: sin marco (lente al aire), patas negras, cristal transparente con reflejo azul,
     funda blanda marrón. 🔴 NO es el de Colombia (TR90 por graduación, estuche rígido): aquí no se
     elige graduación y no hay estuche rígido ni paño.
     🔴 Nada de "corrige la vista", "cura" ni plazos: son gafas de lectura multifocales.
     Concepto de la página de Colombia (cinta de frases + lupa sobre la letra, cifras, cerca y lejos),
     diseño propio: gafas.css / gafas.js (ui-ux-pro-max corrida #25, James 20-10 "DAEL": HUD oscuro,
     #0B0B10 / #1E1E23, texto #F8FAFC, azul #3B82F6, Exo / Roboto Mono).
     ============================================================ */
  {
    id: 'gafas', unidad: 'par', promo: 2,
    dropiId: 2816,

    nombre: 'Gafas Multifocales con Filtro Azul',
    sub: 'Sin marco · de cerca y de lejos · con funda',
    categoria: 'Salud y cuidado',
    etiqueta: 'Lanzamiento en España',
    etiquetaOro: false,

    foto: 'img/gafas-letra.webp?v=1',
    fotos: ['img/gafas-letra.webp?v=1', 'img/gafas-pantalla.webp?v=1', 'img/gafas-terraza.webp?v=1'],
    video: 'img/gafas-ficha-h.mp4?v=1',   /* 20-10 James "video": video del anuncio de AliExpress del MISMO modelo (1005006995827757).
                                           Horizontal, ancho completo y a su resolución (1280 px): solo se quitó la franja de arriba
                                           con el rótulo "Blue light test card". El recorte 9:16 lo deformaba ("así no vale"). Sin sonido. */

    hero: {
      img: 'img/hero-gafas.webp?v=1',
      kicker: 'Lanzamiento en España',
      titulo: 'Vuelve a leer de cerca,<br><b>sin alejar el papel.</b>',
      sub: 'Gafas multifocales sin marco: miras por abajo para leer y por arriba para ver de lejos, sin quitártelas. Con filtro de luz azul para el móvil y el ordenador.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Paga ahora o al recibir'],
      ],
    },
    acento: '#3B82F6',   /* 20-10 propuesta A de la skill (corrida #25, James "DAEL"): azul, nada de verde */

    desc: 'Las Gafas Multifocales con Filtro Azul son gafas de lectura sin marco: el cristal va al aire, sujeto solo por el puente y las patas, y por eso casi no pesan. El cristal es multifocal: la parte de abajo es para leer de cerca y la de arriba para mirar más lejos, así no tienes que quitártelas y ponértelas cada vez que levantas la vista. Llevan filtro de luz azul, más cómodo delante del móvil, la tablet o el ordenador. Cada par viene con su funda blanda.',

    puntos: [
      'Multifocales: de cerca por abajo, de lejos por arriba',
      'Filtro de luz azul para el móvil y el ordenador',
      'Sin marco: ligeras, casi no se notan',
      'Cada par con su funda · el pack de 2 es el más pedido',
    ],

    formulaRotulo: 'Lo que tienen',
    formulaTitulo: 'Pensadas para llevarlas todo el día.',
    formulaSub: 'Ligeras, cómodas y sin quitártelas a cada rato.',
    formula: [
      ['libro', 'Leer de cerca', 'El periódico, el móvil, la receta o el precio de la etiqueta, mirando por la parte de abajo.'],
      ['ojo', 'Mirar de lejos', 'Levantas la vista por la parte de arriba y sigues viendo la tele o la calle.'],
      ['rayo', 'Filtro de luz azul', 'Más cómodas delante del móvil, la tablet y el ordenador.'],
      ['pluma', 'Sin marco', 'El cristal va al aire: pesan muy poco y combinan con todo.'],
    ],

    comparaTitulo: '¿Por qué estas y no unas cualquiera?',
    compara: [
      'Multifocales: no hay que quitárselas para mirar lejos.',
      'Sin marco: mucho más ligeras que unas de pasta.',
      'Filtro de luz azul para las pantallas.',
      'Cada par con su funda para llevarlas en el bolso.',
    ],

    preguntas: [
      { q: '¿Tengo que elegir graduación?', a: 'No. Es un solo modelo multifocal para lectura: miras por la parte de abajo para leer de cerca y por la de arriba para ver más lejos. Si tienes una graduación alta o algún problema de vista, consulta con tu óptico.' },
      { q: '¿Me sirven para el móvil y el ordenador?', a: 'Sí. Llevan filtro de luz azul, más cómodo cuando pasas rato delante de pantallas.' },
      { q: '¿Qué viene en la caja?', a: 'Las gafas y una funda blanda para guardarlas. En el pack de 2 o de 3, cada par con su funda.' },
      { q: '¿Cuesta acostumbrarse?', a: 'Como todas las multifocales, los primeros días hay que acostumbrarse a mirar por abajo para leer y por arriba para lo lejano. Después se usan sin pensar.' },
      { q: '¿Por qué el pack de 2?', a: 'Es el más elegido: unas para casa y otras para el bolso o el coche, o un par para ti y otro para tu pareja.' },
      { q: '¿Y si no me convencen?', a: 'Tienes 14 días desde que las recibes para devolverlas. Si llegan con algún fallo, nos escribes por WhatsApp y lo resolvemos.' },
    ],

    fotosResenas: [],
    antesDespues: 'img/gafas-ba.webp?v=1',
    antesDespuesSub: 'La misma carta del restaurante: antes borrosa, después con las gafas puestas.',

    /* PRECIOS aprobados por James (opción A, 17-10-2026): 19,95 · 28,95 · 37,95.
       Competencia contra reembolso en España: Avunora, tiendacontraentrega.es, tiendadcb a 29,95 el 2x1.
       'antes' en 0: producto nuevo (Ley 7/1996 art. 20.1). */
    packs: [
      { cant: 1, precio: 19.95, antes: 0, texto: '1 par' },
      { cant: 2, precio: 28.95, antes: 0, texto: '2 pares' },
      { cant: 3, precio: 37.95, antes: 0, texto: '3 pares' },
    ],
    popular: 1,

    /* Pago anticipado: −10 % como el resto de España. */
    anticipado: {
      pct: 10,
      descuento: 2.00,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [17.95, 26.05, 34.15],
    },
  },

  {
    /* 25-10-2026 · CREMA SANGRE DE DRAGÓN (EELHOE "Dragon Blood Anti-aging Face Cream", 50 g).
       Dropi PRO 1568 · SKU CREMA-DRAGON · coste 2,89 € · 11.031 u. el 24-10. En Dropi figura como "placenta de dragón",
       pero la caja y el frasco dicen DRAGON BLOOD: se vende como Sangre de Dragón (lo que el cliente ve en el envase).
       Diseño: skill ui-ux-pro-max corrida #38 (Soft UI Evolution, rosa #EC4899 + lavanda #8B5CF6, Playfair Display / Inter),
       James "Vale… lo quiero con aspecto imponente" (25-10). Estilos en crema.css, bloques propios en crema.js.
       OJO alegaciones (Reglamento UE 655/2013): solo la APARIENCIA de la piel, nada de "elimina arrugas" ni "rejuvenece". */
    id: 'crema', unidad: 'crema', promo: 4, promoRef: true,   /* promoción de la plantilla con el pack de 2 como referencia (ficha.js) */
    resenasTotal: 141,   /* 25-10: valoraciones REALES de la crema EELHOE Dragon Blood en AliExpress (141; 117 de 4-5 estrellas); escritas solo ~20 */
    dropiId: 1568,
    dropiSku: 'CREMA-DRAGON',

    nombre: 'Crema Sangre de Dragón',
    sub: 'Crema facial en gel · 50 g · rostro y cuello',
    categoria: 'Belleza',
    etiqueta: 'Nuevo en España',
    etiquetaOro: false,

    foto: 'img/crema-caja.webp?v=1',
    fotos: ['img/crema-mano.webp?v=1', 'img/crema-noche.webp?v=1', 'img/crema-caja.webp?v=1'],
    video: 'img/crema-ficha.mp4?v=1',   /* 25-10: video del anuncio de AliExpress de la MISMA crema EELHOE (1005007137354736),
                                           720 x 728: se recortó por abajo la franja de subtítulos en inglés. Sin sonido. */

    hero: {
      img: 'img/crema-hero3.webp?v=1',   /* 25-10 James "busca un diseño diferente… ¿cómo está la de Chile?": escena con la clienta
                                            usando la crema, como los héroes de Chile (Neocell, máscara), no el frasco en un pedestal */
      kicker: 'Sangre de Dragón · EELHOE',
      titulo: 'Despierta tu piel<br><b>en un minuto al día.</b>',
      sub: 'Crema facial en gel con partículas doradas: hidrata, deja la piel suave y luminosa, y ayuda a suavizar la apariencia de las líneas de expresión.',
      datos: [
        ['envio', 'Envío gratis'],
        ['reloj', 'En 24-48 h'],
        ['pago', 'Paga ahora o al recibir'],
      ],
    },
    acento: '#DC2626',   /* 25-10 skill "Gift red + gold + surprise pink": los colores de la caja, la tapa y el gel (James: fondo negro no) */

    desc: 'La Crema Sangre de Dragón de EELHOE es una crema facial en gel, rosada y con pequeñas partículas doradas, que se extiende fácil y se absorbe rápido sin dejar la piel grasa. Hidrata el rostro y el cuello, deja la piel más suave y con un aspecto más luminoso y uniforme, y ayuda a suavizar la apariencia de las líneas de expresión con el uso diario. Viene en tarro de cristal de 50 g con tapa dorada, en su caja.',

    puntos: [
      'Hidrata y deja la piel suave, sin sensación grasa',
      'Piel con aspecto más luminoso y uniforme',
      'Ayuda a suavizar la apariencia de las líneas de expresión',
      'Tarro de 50 g · el pack de 2 es el más pedido',
    ],

    formulaRotulo: 'Cómo es',
    formulaTitulo: 'Un gel que tu piel bebe.',
    formulaSub: 'Ligera, rápida de absorber y agradable de usar cada día.',
    formula: [
      ['agua', 'Hidratación', 'Textura de gel que se absorbe rápido y deja la piel jugosa, no grasa.'],
      ['sol', 'Luminosidad', 'Piel con un aspecto más luminoso y un tono más uniforme.'],
      ['pluma', 'Suavidad', 'Deja el rostro y el cuello suaves al tacto desde la primera aplicación.'],
      ['escudo', 'Para cada día', 'Por la mañana y por la noche, sobre la piel limpia.'],
    ],

    comparaTitulo: '¿Por qué esta y no otra crema?',
    compara: [
      'Textura de gel: se absorbe rápido y no deja la piel grasa.',
      'Rostro y cuello con una sola crema.',
      'Tarro de cristal de 50 g, en su caja.',
      'El pack de 2: una para ti y otra para regalar, o para no quedarte sin ella.',
    ],

    preguntas: [
      { q: '¿Cómo se usa?', a: 'Sobre la piel limpia del rostro y el cuello, por la mañana y por la noche. Toma un poco con la yema de los dedos y extiéndela con un masaje suave hasta que se absorba.' },
      { q: '¿Deja la piel grasa?', a: 'No. Es una crema en gel: se absorbe rápido y deja la piel suave, sin sensación grasa ni pegajosa.' },
      { q: '¿Cuánto dura un tarro?', a: 'Depende de cuánto uses, pero con un uso diario normal, en rostro y cuello, un tarro de 50 g suele dar para varias semanas.' },
      { q: '¿Sirve para mi tipo de piel?', a: 'Es una crema hidratante para el día a día. Si tienes la piel muy sensible, pruébala primero en una zona pequeña. No la apliques sobre heridas ni cerca de los ojos.' },
      { q: '¿Por qué el pack de 2?', a: 'Es el más elegido: una para ti y otra para regalar, o dos para no quedarte sin ella a mitad del tratamiento.' },
      { q: '¿Y si no me convence?', a: 'Tienes 14 días desde que la recibes para devolverla sin abrir. Si llega con algún fallo, nos escribes por WhatsApp y lo resolvemos.' },
    ],

    fotosResenas: [],
    antesDespues: 'img/crema-ba.webp?v=1',
    antesDespuesSub: 'Imagen ilustrativa: el aspecto de la piel con el uso diario de la crema. Los resultados varían de una persona a otra.',

    /* PRECIOS aprobados por James 25-10-2026 ("dale"): 2 cremas 28,95 € · 4 cremas 48,95 €.
       Competencia contra reembolso en España (Biblioteca de Meta, 25-10): Verabelleza 29,90 € (1+1, el más barato),
       Zenovix 29,99 € (2) y 49,99 € (4), Esencia Divina 29,99 € (2 + sérum). Nadie la vende suelta.
       'antes' en 0: producto nuevo (Ley 7/1996 art. 20.1). */
    packs: [
      { cant: 2, precio: 28.95, antes: 0, texto: '2 cremas' },
      { cant: 4, precio: 48.95, antes: 0, texto: '4 cremas' },
    ],
    popular: 0,

    /* Pago anticipado: −10 % como el resto de España (26,05 ya aprobado para las gafas; 44,05 = 48,95 − 10 %). */
    anticipado: {
      pct: 10,
      descuento: 2.00,
      envio: 'Entrega prioritaria en 14 h',
      titulo: 'Paga ahora',
      sub: 'Con entrega prioritaria en 14 h, sin coste. Se paga con tarjeta o PayPal.',
      precios: [26.05, 44.05],
    },
  },
];

/* ============================================================
   OJO CON EL PRECIO TACHADO (el campo 'antes' de cada pack)
   Ley 7/1996 art. 20.1 (reformado por el RD-ley 1/2021, Directiva Omnibus):
   cuando se anuncia una rebaja, el precio tachado tiene que ser EL MAS BAJO
   que se haya aplicado en los ULTIMOS 30 DIAS. Inventar un precio anterior
   mas alto es practica desleal y lo sancionan las CCAA.
   Regla practica: producto nuevo => 'antes' en 0 hasta llevar 30 dias
   vendiendo al precio normal.
   ============================================================ */

/* Precios aprobados por James para España (24-09-2026).
   Si un precio no esta en esta lista, el producto NO se pinta en la tienda.
   Es el mismo candado de Chile. */
window.PRECIOS_APROBADOS = [28.50, 38.50, 48.50, 26.50, 36.50, 46.50,
  /* pistola de alta presión 48 V, 09-10-2026: 47,95 · 2 × 84,95 y anticipado −10 % 43,15 · 76,45 */
  47.95, 84.95, 43.15, 76.45,
  /* cabezal de ducha, aprobados 29-09-2026 */
  23.99, 32.99, 41.99, 21.99, 30.99, 39.99,
  /* sellador impermeable, aprobados 01-10-2026 */
  28.99, 38.99, 58.99,
  /* sellador, pago anticipado, aprobados 02-10-2026 (−2 €) y 05-10-2026 (−10 %, "dale el 10 %") */
  26.99, 36.99, 56.99, 34.99, 52.99,
  /* spray de arañazos, aprobados 01-10-2026 (41,99 ya está, la del cabezal) */
  20.99, 28.99,
  /* spray de arañazos, pago anticipado (−10 %), aprobados 02-10-2026 */
  18.99, 25.99, 37.79,
  /* pulsera antitabaco, aprobados 07-10-2026, y su pago anticipado −10 % (James 07-10: "pago anticipado con el menos 10 %") */
  25.95, 37.95, 47.95, 23.35, 34.15, 43.15,
  /* gafas multifocales 2816, aprobados 17-10-2026 (opción A) y su pago anticipado −10 % (37,95 y 34,15 ya están) */
  19.95, 28.95, 17.95, 26.05,
  /* crema sangre de dragón 1568, aprobados 25-10-2026 (2 cremas 28,95 ya está) y su pago anticipado −10 % (26,05 ya está) */
  48.95, 44.05];

/* ============================================================
   MÉXICO · 28-10-2026 · BRAIN MEMORY & MOOD (Healthybeat), 60 cápsulas
   Dropi México 61103 (proveedor HYPER MODA IMPORTACIONES), costo $205, sugerido $599, stock 7.123 (28-10).
   Dropdata MX 14 días: 115 al día en promedio, 167 los últimos 7, 420 el 27-10.
   Ingredientes SOLO los de la etiqueta y la ficha de Dropi (fosfatidilserina, omega-3, B1, B6, B12, folato,
   zinc, triple magnesio, cardo mariano, DHM). Es suplemento: nada de promesas médicas.
   Escalera APROBADA por James el 28-10: 2 frascos $799 (oferta principal) · 3 frascos $1.200. Sin frasco suelto.
   Sin pago anticipado hasta que James apruebe su precio. Sin opiniones hasta tener reales.
   ============================================================ */
window.PRODUCTOS.push({
  id: 'brain', unidad: 'uno', promo: 3, promoRef: true,
  dropiId: 61103,

  nombre: 'Brain Memory & Mood',
  sub: 'Memoria, concentración y ánimo · 60 cápsulas',
  categoria: 'Bienestar',
  etiqueta: 'Nuevo en México',
  etiquetaOro: true,

  foto: 'img/brain-pack2.webp?v=1',
  /* 29-10 rediseño oscuro: fuera la oferta con precios pegados en la foto; g3 rehecha con las cápsulas beige reales */
  fotos: ['img/brain-g1.webp?v=1', 'img/brain-g2.webp?v=1', 'img/brain-g3-v2.webp?v=1'],
  fotoOferta: 'img/brain-promo-v2.webp?v=1',   /* 29-10 James: en la promoción "nada más potes solos, sin personas" (3 frascos, sin texto) */
  fotoFrasco: 'img/brain-frasco-v2.webp?v=1',  /* 29-10 James: "crea otra imagen mejor" para "Qué es" (frasco solo con cápsulas) */
  /* 28-10 James: el video anterior (TikTok, frasco en español sobre una alfombra) era malo. Este es el del frasco en INGLÉS
     (el que se vende, Dropi 61103): TikTok @promexobl48 7599932194680851733, s 11-31,5, recortado desde y 300 para sacar
     el letrero "Memory & Mood – Brain" del creador, sin audio. */
  video: 'img/brain-ficha-v4.mp4?v=1',   /* 28-10 James: mismo video, al tamaño del colágeno: 720×1280 (9:16 exacto), recortado del original */

  hero: {
    img: 'img/brain-heroe-v3.webp?v=1',   /* 28-10 James: "ese hero está bien" (frasco solo, fondo impactante, tercio de arriba libre) */
    kicker: 'Nuevo en México · 60 cápsulas',
    titulo: 'Memoria clara.<br><b>Mente despierta.</b>',
    sub: 'Fosfatidilserina, omega-3 y vitaminas B: lo que el cerebro usa para recordar, concentrarse y estar de buen ánimo.',
    datos: [
      ['envio', 'Envío gratis'],
      ['reloj', 'En 2 a 5 días'],
      ['pago', 'Pagas al recibir'],
    ],
  },
  acento: '#16A34A',   /* 29-10 rediseño oscuro: Accent/CTA de la skill (brain-mx-rediseno, verde salud) */

  /* Stock REAL leído en Dropi México el 28-10-2026 (7.123). Ventas diarias de Dropdata: 115 en promedio, 420 el mejor día. */
  escasez: { hoy: 167, mejorDia: 420, quedan: 7123,
    nota: 'Se despacha desde nuestra bodega en Ciudad de México por orden de pedido. Pagas cuando lo tienes en la mano.' },

  /* 29-10 James: las secciones de las páginas de Chile (Nerve): el problema y la solución van en su propia sección con
     fotos (brain.js); "Qué es y para qué sirve" lleva esta descripción. */
  desc: 'Brain Memory & Mood es un suplemento en cápsulas para el día a día de la mente: en cada toma de 2 cápsulas trae fosfatidilserina y omega-3, vitaminas del complejo B, zinc y tres formas de magnesio. Se toma una vez al día con un vaso de agua y un frasco dura 30 días.',
  fotoProblema: 'img/brain-problema.webp?v=1',   /* la mitad "antes" del antes y después, recortada cuadrada */
  fotoSolucion: 'img/brain-g1.webp?v=1',

  puntos: [
    'Fosfatidilserina y omega-3 en la misma cápsula',
    'Vitaminas B1, B6, B12 y folato',
    'Zinc y complejo triple de magnesio',
    'Sin cafeína ni estimulantes',
    '2 cápsulas al día · 60 cápsulas por frasco',
  ],

  formulaRotulo: 'Lo que trae',
  formulaTitulo: 'Lo que dice la etiqueta.',
  formulaSub: 'Por toma de 2 cápsulas · 30 tomas por frasco.',
  formula: [
    ['libro', 'Fosfatidilserina + omega-3', 'Forman parte de la membrana de las neuronas: la pareja clásica para la memoria.'],
    ['rayo', 'B1, B6, B12 y folato', 'Las vitaminas de la energía mental, sin café ni estimulantes.'],
    ['escudo', 'Zinc + triple magnesio', 'Glicinato, malato y acetiltaurinato de magnesio con zinc, para el ánimo y el descanso.'],
    ['sol', 'Una toma al día', 'Dos cápsulas por la mañana con un vaso de agua. Un frasco dura 30 días.'],
  ],

  comparaTitulo: '¿Por qué este y no otro?',
  compara: [
    'Fosfatidilserina y omega-3 juntos en la misma cápsula.',
    'Vitamina B12 en su forma activa (metilcobalamina) y folato.',
    'Sin cafeína ni estimulantes: no quita el sueño.',
  ],

  preguntas: [
    { q: '¿Cómo se toma?', a: 'Dos cápsulas al día con agua, de preferencia por la mañana con el desayuno. Un frasco trae 60 cápsulas: dura 30 días.' },
    { q: '¿Tiene cafeína o algo que quite el sueño?', a: 'No. No lleva cafeína ni estimulantes: son vitaminas, minerales, fosfatidilserina y omega-3.' },
    { q: '¿Puedo tomarlo si tomo medicamentos?', a: 'Es un suplemento alimenticio, no un medicamento. Si tomas medicamentos, estás embarazada o en lactancia, consulta antes con tu médico.' },
    { q: '¿Por qué el pack de 2 frascos?', a: 'Es el más elegido: son dos meses completos de toma diaria, y sale a $399,50 cada frasco.' },
    { q: '¿Cómo pago?', a: 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. No pagas nada por adelantado.' },
    { q: '¿A dónde envían y cuánto tarda?', a: 'A todo México, sin costo de envío. Entre 2 y 5 días hábiles según tu ciudad.' },
  ],

  fotosResenas: [],
  antesDespues: 'img/brain-ba-v2.webp?v=1',   /* 29-10: sin letras dentro; ANTES / DESPUÉS van en HTML (brain.js) */
  antesDespuesSub: 'La misma persona y el mismo escritorio: cansada y sin foco, y después despejada, con el frasco a su lado.',

  /* PRECIOS aprobados por James el 28-10-2026 ("2 frascos 799 … 3 frascos 1200"). 'antes' en 0: no hay precio anterior. */
  packs: [
    /* 28-10 James: el precio tachado va "un 40 % más arriba de lo que lo estamos vendiendo": 799 × 1,4 = 1.119 · 1.200 × 1,4 = 1.680 */
    { cant: 2, precio: 799, antes: 1119, texto: '2 frascos' },
    { cant: 3, precio: 1200, antes: 1680, texto: '3 frascos' },
  ],
  popular: 0,

  /* PAGO ANTICIPADO aprobado por James el 28-10-2026 ("Sí, aprobados"): 10 % menos y entrega prioritaria.
     Cobra la cuenta de PayPal de siempre (la de España) en pesos mexicanos: flujos paypal-orden-mx / paypal-captura-mx. */
  anticipado: {
    pct: 10,
    envio: 'Entrega prioritaria: tu pedido sale primero',
    titulo: 'Paga ahora con tarjeta',
    sub: 'Con entrega prioritaria, sin costo. Se paga con tarjeta de débito o crédito o con PayPal.',
    precios: [719, 1080],
  },
});

/* 28-10 MÉXICO: en esta carpeta solo vive el Brain. Los demás productos de España quedan en el archivo
   (copia autorizada por James) pero NO se muestran ni se venden aquí. Candado: solo la escalera aprobada el 28-10. */
window.PRODUCTOS = window.PRODUCTOS.filter(function (x) { return x.id === 'brain'; });
window.PRECIOS_APROBADOS = [799, 1200, 719, 1080];   /* contra entrega 799/1200 · pago anticipado 719/1080 (James 28-10) */
