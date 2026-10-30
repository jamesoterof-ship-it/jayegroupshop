/* ============================================================
   CATALOGO · JAYE GROUP MÉXICO · /colageno/ (29-10-2026)
   Copia del colágeno NeoCell de Chile (shilajit/productos.js), SOLO ese producto.
   James 29-10: "déjala igualita. Lo único que vas a cambiar son los precios y el
   formulario de México". Precios MXN aprobados por James 29-10:
     1 frasco $779 · 2 frascos $1,079 · 3 frascos $1,549
     pago anticipado (−10 %): $699 · $969 · $1,389
   Tachado: el mismo % de Chile (29.900/22.500 · 49.900/34.500 · 64.900/42.500).
   Dropi México id 54981. Sin upsell (México no tiene).

   Los precios son la escalera aprobada, la misma que usa Camila.
   Las descripciones NO son inventadas: salen de la ficha que Camila ya le
   da a los clientes por WhatsApp (prompt del Bot Chile), asi la pagina y el
   bot dicen lo mismo.
   Las preguntas frecuentes salen de lo que los clientes preguntan de verdad
   en las conversaciones (medido sobre 7 dias).

   Para agregar un producto nuevo: se copia un bloque y listo.
   La tienda y las campañas apuntan aca — no hay que tocar nada mas.

   fotos: la primera es la de la tarjeta en la tienda; las demas arman la
   galeria de la ficha. Si un archivo no existe, la galeria lo salta sola.
   ============================================================ */
/* ============================================================
   REGLA FIJA · ESTA ESTRUCTURA NO SE CAMBIA

   Todos los productos usan el MISMO molde de pagina. Lo unico que se puede
   cambiar por producto son los COLORES (de botones y secciones) y el
   contenido de aca abajo. La estructura, el orden de las secciones y el
   formulario se quedan igual para todos.

   Orden de la ficha, para cualquier producto:
     galeria · estrellas · precio y nombre · boton
     que incluye · el cambio · resultados · que lo hace diferente
     descripcion · resenas · garantia 30 dias · preguntas
     con quien se despacha · tambien te puede interesar · formulario
     + boton flotante y WhatsApp

   Para agregar un producto nuevo: se copia un bloque de abajo y se cambian
   sus datos. Hereda toda la pagina solo.

   Campos por producto:
     id, nombre, sub, categoria, foto, fotos[]      lo basico
     acento                                          su color
     desc, puntos[]                                  descripcion
     formulaRotulo, formulaTitulo, formulaSub, formula[]
     comparaTitulo, compara[]                        la tabla
     fotosResenas[]                                  fotos de clientes
     packs[], popular                                precios
   ============================================================ */
window.PRODUCTOS = [
  {
    /* 13-10 · COLÁGENO NEOCELL Bio-Peptides 567 g — Dropi 142607 (VITALCOM), costo $6.500. Lo trajo James (Dropdata 27/30 días
       con venta, ~70/día) y 11 anunciantes lo pautan en Meta Chile. Escalera APROBADA por James 13-10 ("dale"): 1 frasco $22.500 ·
       2 $34.500 (la que se impulsa: deja $13.800) · 3 $42.500 = $500 bajo el más barato (Clicka 22.990 · Tu compra segura 34.990/42.990).
       Diseño propio (neocell.css/.js), catálogo de la skill ui-ux-pro-max 13-10: celeste #0EA5E9 / #38BDF8 (el del frasco), botón naranja
       #EA580C, letra Outfit + Work Sans; para hombres y mujeres (James: "el rosado no queda bien").
       🔴 SUPLEMENTO ALIMENTARIO (D.S. 977/96, igual que la clorofila): nada de "cura", "trata" ni "previene" enfermedades. */
    id: 'neocell', unidad: 'frasco', promo: 2, promoAntesDelPack: true,   /* la promo usa el tachado del pack de 2, no el +80 % */
    dropiId: 54981,   /* 29-10 MÉXICO: Dropi MX */
    /* video REAL (TikTok @sam_orellana_ 7610255091370626317: el mismo pote celeste de círculos blancos), sin textos ni marcas
       ajenas: abre el pote, saca la medida, el cabello y el frasco de frente. NADA con IA. */
    video: 'img/neo-ficha.mp4?v=1',
    /* 13-10 · reseñas REALES de Falabella Chile y Perú de colágeno en polvo (+ 1 del NeoCell, Susana), copiadas tal cual,
       sin foto (eran envases de otras marcas) y sin las de cápsulas, sobres, sabores u otras marcas
       (_kn_scratch/neocell/_resenas_a_pagina.js). NINGUNA escrita por nosotros. */
    resenasRotulo: 'Lo que dicen quienes toman colágeno en polvo',
    resenasFuente: 'Opiniones reales de compradores de colágeno en polvo, tal como las escribieron.',
    resenasMas: 'Más opiniones de quienes toman colágeno',
    resenasResumen: { total: 99, nota: 4.9, rotulo: 'opiniones de 4 y 5 estrellas', barras: { 5: 90, 4: 9 } },
    /* 14-10 · James: "mínimo 100… unos tres con imágenes… nombres latinos". 3 con foto = personas reales con NUESTRO pote en TikTok
       (Verónica @vero.sin.filtro, Mike Narváez @oneredmike, Sam Orellana @sam_orellana_), con sus palabras y un cuadro de su video;
       el resto, reseñas reales de Falabella CL/CO/PE de colágeno en polvo (_kn_scratch/neocell/_resenas_100_a_pagina.js). Tal cual. */
    resenasReales: [
      { nombre: 'Verónica', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-neocell/n01.webp?v=1', texto: 'Es este de NeoCell porque es hidrolizado y tiene 20 gramos de colágeno, que es lo más que yo he visto en un colágeno. Además de los 20 gramos de colágeno, también tiene 18 gramos de proteína.' },
      { nombre: 'Mike Narváez', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-neocell/n02.webp?v=1', texto: 'Yo el que uso es el NeoCell, el grass-fed, no sabe a nada, no huele a nada, lo puedes añadir en café, jugo, agua, lo que te dé la gana.' },
      { nombre: 'Sam Orellana', comuna: '', fecha: '', estrellas: 5, foto: 'img/resenas-neocell/n03.webp?v=1', texto: 'Este colágeno no te trae sabor, no te trae color, por eso lo puedes disolver en tu bebida favorita. Yo en lo particular me lo tomo con café y esto sabe delicioso.' },
      { nombre: 'Compra verificada', comuna: 'AliExpress', fecha: '', estrellas: 5, foto: 'img/resenas-neocell/n04.webp?v=1', texto: 'Primero, es muy fácil de usar. Se disuelve bien, especialmente en bebidas calientes como el café, y no tiene un sabor fuerte, lo cual valoro mucho. He notado que mi piel se ve más hidratada y se siente más suave. No es un producto milagroso, pero con consistencia, sí noto una diferencia.' },
      { nombre: 'Compra verificada', comuna: 'AliExpress', fecha: '', estrellas: 5, foto: 'img/resenas-neocell/n05.webp?v=1', texto: 'Excelente collagen me encanta tiene muchos bendicios' },
      { nombre: 'Romina rivera', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto, desde que lo tomo ya no se rompen mis uñas lo compre por los buenos comentarios que tiene el producto veremos con el tiempo si cumple con lo que promete :)' },
      { nombre: 'Patricia', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto e notado un cambio muy notorio en mi piel y en el dolor de las articulaciones además y no se si tendrá que ver,pero no me e resfriado' },
      { nombre: 'Anita', comuna: '', fecha: '', estrellas: 5, texto: 'Adquirí este producto para que ayude a mi madre con su problema en las rodillas y está teniendo resultados favorables por su consumo diario.' },
      /* 14-10 James: "cinco con imagen… búscalas en AliExpress". Reseñas REALES del NeoCell Collagen Bio-Peptides en AliExpress
         (artículo 1005012194402082, _kn_scratch/neocell/_ali_neocell.json), foto del cliente; texto traducido por AliExpress, frases tal cual. */
      { nombre: 'Patricia', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño real, sabor agradable y lo mejor es que las molestias en mis articulaciones de los pies están en franca regresión Lo máximo' },
      { nombre: 'Caro', comuna: '', fecha: '', estrellas: 5, texto: 'Después de 7 días usándolo noté que mis uñas ya no se quebraban, si hace eso por ellas imagino lo que hará por mís articulaciones' },
      { nombre: 'Mary', comuna: '', fecha: '', estrellas: 5, texto: 'Colágeno hidrolizado es muy bueno por sus propiedades hay ser constante para seguir adelante y tener una piel hermosa y fuerte' },
      { nombre: 'Melany', comuna: '', fecha: '', estrellas: 5, texto: 'Me encanta desde que comencé a tomarlo automáticamente deje de sentir dolor de rodillas y hombros al entrenar 1000/10' },
      { nombre: 'Mara', comuna: '', fecha: '', estrellas: 5, texto: 'desde que lo tomo,ya no se me cae el pelo y mis uñas están más fuertes, además me sirve para mí dolor de huesos' },
      { nombre: 'Angela', comuna: '', fecha: '', estrellas: 5, texto: 'Este colageno es de facil absorción y mi padre ha sentido mejoría en sus rodillas, lo recomiendo totalmente.' },
      { nombre: 'Jackelin', comuna: '', fecha: '', estrellas: 5, texto: 'El producto cumple con su función. Se lo regalé a mi papá y el dolor en la articulacion de la rodilla' },
      { nombre: 'María Teresa', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es de buena calidad, ayuda mucho con las articulaciones y fortifica todos los ligamentos' },
      { nombre: 'Maria', comuna: '', fecha: '', estrellas: 5, texto: 'Es un producto que otorga resultados inmediatos dejando la piel súper hidratada con un glow up lindo' },
      { nombre: 'Esther', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy bueno desde la primera toma me bajó un montón el dolor de rodilla … se los recomiendo' },
      { nombre: 'Andrea', comuna: '', fecha: '', estrellas: 5, texto: 'no tiene Mal savor y me a quitado las molestias dela rodilla y mi piel se ve mas radiante' },
      { nombre: 'Miguelon', comuna: '', fecha: '', estrellas: 5, texto: 'Rodillas nuevas, como las tenía hace 20años. Me va súper bien. Reecontra recomendado.' },
      { nombre: 'Luis', comuna: '', fecha: '', estrellas: 5, texto: 'Desde que tomo con cafecito todos los días me he sentido mejor y más firme de huesos' },
      { nombre: 'Franco', comuna: '', fecha: '', estrellas: 5, texto: 'luego de unos meses de tomarlo ya no me tronan la rodilla y cadera' },
      { nombre: 'Monica Rosales', comuna: '', fecha: '', estrellas: 5, texto: 'Maravilloso, me calmó mi dolor de cadera!! me siento muy bien!!' },
      { nombre: 'Marcelo', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente Producto, estoy viendo cambios en mi piel excelentes' },
      { nombre: 'Lidia', comuna: '', fecha: '', estrellas: 5, texto: 'Muy bueno ; ayuda a mantener sanas las articulaciones' },
      { nombre: 'Alfredo', comuna: '', fecha: '', estrellas: 5, texto: 'Anoche lo tomé y me siento mucho mejor de la rodilla.' },
      { nombre: 'Michelle', comuna: '', fecha: '', estrellas: 5, texto: 'Buena calidad, me ayuda con los dolores articulares' },
      { nombre: 'GLORITA', comuna: '', fecha: '', estrellas: 5, texto: 'UN POCO GRANDE EL ENVASE, NO VIENE CON CUCHARA DOSIFICADORA, PERO TIENE BONITA PRESENTACIÓN Y LO TOME CON LECHE, NO SE SIENTE NINGUN SABOR DESAGRADABLE Y SE DISUELVE BIEN, ESPERARE LOS RESULTADOS AHORA' },
      { nombre: 'Dayan', comuna: '', fecha: '', estrellas: 5, texto: 'Viene en tarro, si lo consumen traten de hacerlo con yogurt porque yo lo probé con te o cafe y no es rico el sabor :/ . Pero con yogurt te queda una sensación con gusto a poco.' },
      { nombre: 'Rocio', comuna: '', fecha: '', estrellas: 5, texto: 'Me encanta, no me animaba a comprar porque dicen que el colageno sabe mal, pero este lo mezclo con leche en la mañana y no sabe a nada, me encanta' },
      { nombre: 'Gaby', comuna: '', fecha: '', estrellas: 4, texto: 'Tal cual la descripción. Tiene un sabor aceptable, se disuelve fácil. No se si se notará el efecto pero hasta ahora bien.' },
      { nombre: 'Eduardo', comuna: '', fecha: '', estrellas: 5, texto: 'El producto tiene buen sabor, se disuelve bien, y rinde harto. Por lo cual es uno de los más convenientes del mercado' },
      { nombre: 'Pilar', comuna: '', fecha: '', estrellas: 5, texto: 'Me tomo uno diario, con jugo o leche con platano, también lo agrego al yogurt queda muy rico, me lo tomo con gusto!' },
      { nombre: 'Daniela', comuna: '', fecha: '', estrellas: 5, texto: 'Primer colageno que efectivamente no tiene sabor. Muy versátil.. veremos los resultados en el futuro..' },
      { nombre: 'Miriam', comuna: '', fecha: '', estrellas: 5, texto: 'Me gusto el formato, ideal para viajes y sin sabor para pinerlo en jugos cafe y leche.. Gracias' },
      { nombre: 'Stephanie', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto muy buena calidad sabor exquisito cremoso no se siente en los batidos' },
      { nombre: 'Carolaine', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde a la foto exelente calidad, se disuelve rápido' },
      { nombre: 'Romina Rubilar', comuna: '', fecha: '', estrellas: 5, texto: 'Me gusto es fácil de disolver y lo puedes mezclar con yogurt o café' },
      { nombre: 'Mario', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto se disuelve sin ningún problema. Feliz con la compra' },
      { nombre: 'María José', comuna: '', fecha: '', estrellas: 5, texto: 'Se disuelve facil y tiene muy buen sabor' },
      { nombre: 'María', comuna: '', fecha: '', estrellas: 5, texto: 'Producto sin sabor . Recomendable.' },
      { nombre: 'Leslie', comuna: '', fecha: '', estrellas: 5, texto: 'Se diluye bien Buen sabor' },
      { nombre: 'Valentina', comuna: '', fecha: '', estrellas: 5, texto: 'Lo bueno q no tiene sabor' },
      { nombre: 'PAMELA', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es igual al mostrado en la foto , de muy buena calidad, facil de disolver , facil de preparar y sobre todo muy , muy bueno ...es mi segundo pote ..' },
      { nombre: 'Juan', comuna: '', fecha: '', estrellas: 5, texto: 'El producto conforme a lo indicado la experiencia muy fluida en tamaño correspondiente de lo indicado en foto y la calidad del producto muy buena' },
      { nombre: 'Estefania', comuna: '', fecha: '', estrellas: 5, texto: 'Son los mejores peptidos de colágeno ya es segunda oportunidad que los compro y me encantan, los sabores son ricos y suaves por eso me gustan' },
      { nombre: 'Carolina', comuna: '', fecha: '', estrellas: 5, texto: 'Tiene rico sabor y me a Ayudado a no comer tanto Recién llevo tomándolo 2 semanas así que no veo más resultados por ahora' },
      { nombre: 'Angela', comuna: '', fecha: '', estrellas: 5, texto: 'Segunda compra, hago la reseña después de casi tres meses de uso, muy eficaz, altamente recomendado.' },
      { nombre: 'Valeska', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño es igual a la foto de muy buena calidad El tamaño es igual a la foto de muy buena calidad' },
      { nombre: 'Camila', comuna: '', fecha: '', estrellas: 5, texto: 'Me gustó… es super liviano, no tiene olor, tampoco sabor. Yo lo mezclo con un scooo de proteína' },
      { nombre: 'Marco', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es cual indica el producto, su calidad es la ideal y me viene funcionando genial' },
      { nombre: 'Marcela', comuna: '', fecha: '', estrellas: 4, texto: 'Es igual a la foto, lo único es que el sabor no es muy rico igual que todos los colágenos' },
      { nombre: 'Gianmarco', comuna: '', fecha: '', estrellas: 4, texto: 'Aún no tengo resultados ya que voy tomando casi dos semanas pero si siento una mejoría' },
      { nombre: 'Diego', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño y producto, excelente calidad muy aparte de lo que aporta y ayuda a uno' },
      { nombre: 'Barbara', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto 100% recomendado exquisito sabor lo recomiendo al 1000%' },
      { nombre: 'Susana', comuna: '', fecha: '', estrellas: 5, texto: 'Si el tamaño es buenísimo porque dura el mes Y la calidad lo estoy viendo' },
      { nombre: 'Andrea', comuna: '', fecha: '', estrellas: 5, texto: 'Si es igual al de la foto el tamaño, increible colágeno... Yo quede feliz' },
      { nombre: 'Adriana Ruiz', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la foto, el tamaño corresponde, y la descripcion corresponde.' },
      { nombre: 'Lucila', comuna: '', fecha: '', estrellas: 5, texto: 'Es buena Calidad. pero el tarro es muy grande para la cantidad que trae' },
      { nombre: 'Raúl Junior', comuna: '', fecha: '', estrellas: 5, texto: 'Te rejuvenece y te da fuerza en todo el cuerpo. Muy bueno y recomendado' },
      { nombre: 'Amparito', comuna: '', fecha: '', estrellas: 5, texto: 'Muy buen producto. Igual al de la foto muy bueno me a echo muy BN' },
      { nombre: 'Nicol', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde y su sabor es súper rico, lo recomiendo' },
      { nombre: 'Carmen', comuna: '', fecha: '', estrellas: 5, texto: 'Todavía no puedo ver los resultados, pero debiese fincionar.' },
      { nombre: 'Marco', comuna: '', fecha: '', estrellas: 5, texto: 'Cumple la calidad, cumple la capacidad y eficiente en su uso' },
      { nombre: 'Mariannys', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente tamaño producto facilidad de usar y buena calidad' },
      { nombre: 'Susana Urzua', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual a la de la foto, cumple con su función. Lo ame 😍' },
      { nombre: 'Lourdes Pinto', comuna: '', fecha: '', estrellas: 5, texto: 'Lo estoy tomando hace poco espero que tenga los resultados' },
      { nombre: 'Angela', comuna: '', fecha: '', estrellas: 5, texto: 'TERCERA VEZ QUE COMPRO Y ESTOY CONTENTA CON LOS RESULTADOS' },
      { nombre: 'Sebastian', comuna: '', fecha: '', estrellas: 5, texto: 'Producto de buena calidad, buen sabor, volveré a comprar' },
      { nombre: 'Loreto', comuna: '', fecha: '', estrellas: 5, texto: 'Muy rico su sabor y cumple todo lo k buscaba recomendado' },
      { nombre: 'Janet', comuna: '', fecha: '', estrellas: 5, texto: 'Los resultados los percibí a partir de la segunda semana' },
      { nombre: 'Valeria', comuna: '', fecha: '', estrellas: 5, texto: 'Tiene mejor sabor que otros colagenos que he probado' },
      { nombre: 'Franccesca', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño corresponde espero tener buenos resultados' },
      { nombre: 'Luis Gelvez', comuna: '', fecha: '', estrellas: 5, texto: 'Buen tamaño, es el mismo ofrecido en la publicacion' },
      { nombre: 'Valeska', comuna: '', fecha: '', estrellas: 4, texto: 'El tamaño es igual a la foto de muy buena calidad' },
      { nombre: 'Luciano', comuna: '', fecha: '', estrellas: 5, texto: 'Es un buen producto ,,ya probado hace un tiempo..' },
      { nombre: 'Josefina', comuna: '', fecha: '', estrellas: 5, texto: 'Me encantó, tiene buen sabor, esperaré los resuy' },
      { nombre: 'Vanessa', comuna: '', fecha: '', estrellas: 5, texto: 'Super bueno, de alta calidad y buenos resultados' },
      { nombre: 'Ricardo', comuna: '', fecha: '', estrellas: 5, texto: 'Siempre lo consumo y si cumple con lo prometido' },
      { nombre: 'Macarena', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño corresponde, y es excelente calidad' },
      { nombre: 'Julia', comuna: '', fecha: '', estrellas: 5, texto: 'Es un excelente producto y de agradable sabor' },
      { nombre: 'Luis', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto, buen tamaño de la presentación' },
      { nombre: 'Evelyn', comuna: '', fecha: '', estrellas: 5, texto: 'El tamaño es igual a la foto y buena calidad' },
      { nombre: 'Ricardo', comuna: '', fecha: '', estrellas: 5, texto: 'Lo acabo de abrir y cumple con lo prometido' },
      { nombre: 'Fredy', comuna: '', fecha: '', estrellas: 5, texto: 'Es un producto excelente que me ayuda mucho' },
      { nombre: 'Esteban', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente producto, cumple con su función' },
      { nombre: 'Celeste', comuna: '', fecha: '', estrellas: 5, texto: 'Es muy buen producto exelentes resultados' },
      { nombre: 'Claudia', comuna: '', fecha: '', estrellas: 5, texto: 'Me encantó 💕 lo voy recomendar..saludos' },
      { nombre: 'Victor', comuna: '', fecha: '', estrellas: 5, texto: 'Producto tal cual la foto y de calidad' },
      { nombre: 'Elvira', comuna: '', fecha: '', estrellas: 5, texto: 'Tamaño corresponde y muy buena calidad' },
      { nombre: 'Camila', comuna: '', fecha: '', estrellas: 4, texto: 'Lo consumo hace tiempo. Buen producto.' },
      { nombre: 'Cynthya', comuna: '', fecha: '', estrellas: 5, texto: 'Es igual al de la foto y buena calidad' },
      { nombre: 'Jeannette', comuna: '', fecha: '', estrellas: 5, texto: 'Es excelente calidad igual a la foto' },
      { nombre: 'Faviola', comuna: '', fecha: '', estrellas: 5, texto: 'Fácil de preparar y sabor exquisito.' },
      { nombre: 'Elizabeth', comuna: '', fecha: '', estrellas: 5, texto: 'Buen producto es igual al de la foto' },
      { nombre: 'Mary', comuna: '', fecha: '', estrellas: 5, texto: 'He probado con varios, y es el mejor' },
      { nombre: 'Benjanin', comuna: '', fecha: '', estrellas: 5, texto: 'El producto es de muy buena calidad' },
      { nombre: 'Carolina', comuna: '', fecha: '', estrellas: 4, texto: 'buen producto. feliz con mi compra' },
      { nombre: 'Claudia Zapata Mora', comuna: '', fecha: '', estrellas: 5, texto: 'Excelente el tamaño y dura el mes' },
      { nombre: 'Viviana Palomino', comuna: '', fecha: '', estrellas: 5, texto: 'lo tomo hace 2 meses , muy bueno' },
    ],
    antesDespues: 'img/neo-ba-hombre.webp?v=1',   /* 14-10 James: "deja la del señor" (v4: rodillas rígidas → más movimiento). Imagen ilustrativa */
    antesDespuesSub: 'Con los años el cuerpo produce menos colágeno y se nota al moverse, en la piel y en la energía del día.',
    preguntas: [
      { q: '¿Cómo se toma?', a: 'Una medida al día (20 g) disuelta en café, agua, jugo, leche o un batido. No tiene sabor, así que no cambia el gusto de lo que tomas.' },
      { q: '¿Cuánto dura un frasco?', a: 'Cada frasco trae 567 g: alrededor de 28 porciones, casi un mes tomando una medida diaria.' },
      { q: '¿Sirve para hombres y mujeres?', a: 'Sí. Lo pueden tomar hombres y mujeres adultos como parte de su alimentación diaria.' },
      { q: '¿Tiene sabor?', a: 'No. Es colágeno en polvo sin sabor que se disuelve fácil, en frío o en caliente.' },
      { q: '¿Cuándo se notan los cambios?', a: 'Depende de cada persona. Lo importante es tomarlo todos los días: por eso conviene el pack de 2 o 3 frascos.' },
      { q: '¿Cómo pago?', a: 'Pagas cuando lo recibes, en efectivo o con tarjeta de débito. El envío es gratis a todo México.' },
    ],
    formulaRotulo: 'Lo que aporta',
    formulaTitulo: '20 g de colágeno en cada medida.',
    formulaSub: 'Colágeno hidrolizado en polvo, sin sabor, para tomar todos los días.',
    formula: [
      ['sol', 'Piel', 'El colágeno es parte de la piel: ayuda a que se vea más firme y luminosa.'],
      ['fibra', 'Cabello', 'Un aporte diario de proteína para un cabello que se ve más fuerte.'],
      ['escudo', 'Uñas', 'Para uñas que se ven más resistentes.'],
      ['rayo', 'Articulaciones y huesos', 'El colágeno también forma parte de articulaciones y huesos.'],
      ['agua', 'Sin sabor', 'Se disuelve en café, agua, jugo o batido sin cambiar el gusto.'],
      ['casa', 'Una medida al día', '20 g por porción · 567 g, unas 28 porciones por frasco.'],
    ],
    comparaTitulo: 'Por qué en polvo',
    compara: [
      'Una medida trae 20 g de colágeno: lo que en cápsulas serían muchas pastillas al día.',
      'Sin sabor: lo agregas al café de la mañana y listo, sin cambiar tu rutina.',
      'Con el pack de 2 frascos tienes para casi dos meses seguidos.',
    ],
    nombre: 'Colágeno NeoCell Bio-Peptides',
    sub: 'Una medida al día en tu café: 20 g de colágeno para piel, cabello, uñas y articulaciones',
    categoria: 'Salud',
    foto: 'img/neo-heroe.webp?v=1',
    fotos: ['img/neo-pasos.webp?v=1'],   /* 14-10: imágenes nuevas (James), solo el héroe se mantiene */
    acento: '#EA580C', acento2Manual: '#0EA5E9',   /* catálogo de la skill ui-ux-pro-max 13-10: botón naranja sobre celeste */
    desc: 'Colágeno hidrolizado en polvo NeoCell Collagen Bio-Peptides, frasco de 567 g. Cada medida aporta 20 g de colágeno. No tiene sabor: se disuelve en café, agua, jugo, leche o batidos, en frío o en caliente. Suplemento alimentario para hombres y mujeres adultos; trae alrededor de 28 porciones.',
    puntos: [
      '20 g de colágeno en cada medida',
      'Para piel, cabello, uñas y articulaciones',
      'Sin sabor: en café, agua o batido',
      'Frasco de 567 g, unas 28 porciones',
      'Para hombres y mujeres',
    ],
    packs: [
      /* 29-10 MÉXICO (MXN). `pre` = pago anticipado −10 % aprobado por James (no se calcula: 1,079 × 0,9 redondeado a la centena daría 900) */
      { cant: 1, precio: 779,  antes: 1039, pre: 699,  texto: '1 frasco · 567 g' },
      { cant: 2, precio: 1079, antes: 1559, pre: 969,  texto: '2 frascos · casi 2 meses' },
      { cant: 3, precio: 1549, antes: 2369, pre: 1389, texto: '3 frascos · casi 3 meses' },
    ],
    popular: 1,   /* James 13-10: impulsar el de 2 */
  },
];

/* Preguntas generales (las 4 primeras salen debajo de las del producto). Las de Chile, con el envío de México. */
window.PREGUNTAS = [
  { q: '¿Cuándo me llega?', a: 'Llega en 2 a 5 días hábiles. Apenas se despacha te mandamos el número de guía por WhatsApp para que lo sigas.' },
  { q: '¿Tiene garantía?', a: 'Sí. Tienes 30 días desde que lo recibes para pedir la devolución si no quedas conforme. Revisa la Política de Reembolso.' },
  { q: '¿Cómo pago?', a: 'Pagas en efectivo cuando recibes el producto, en tu propia dirección. No pagas nada por adelantado ni dejas datos de tarjeta.' },
  { q: '¿Llegan a mi municipio?', a: 'Enviamos a todo México, a todos los estados y municipios. Si tu zona es lejana puede demorar un poco más.' },
  { q: '¿Puedo revisarlo antes de pagar?', a: 'Sí. Recibes el paquete, lo revisas y recién ahí pagas.' },
  { q: '¿El envío tiene costo?', a: 'No. El envío es gratis a todo México. Solo pagas el valor del producto.' },
  { q: '¿Puedo pedir más de uno?', a: 'Sí, y sale más barato: los packs de 2 o 3 bajan bastante el precio por unidad.' },
];

/* Candado de precios: si un pack tiene un precio que no está aquí, la ficha NO lo vende. */
window.PRECIOS_APROBADOS = [
  779, 1079, 1549,   /* colágeno NeoCell México: 1 · 2 · 3 frascos (James, 29-10) */
];
