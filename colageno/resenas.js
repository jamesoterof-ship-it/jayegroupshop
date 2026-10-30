/* ============================================================
   RESEÑAS DE LA TIENDA · Jaye Group Chile

   REGLA FIJA: cada producto muestra MINIMO 150 reseñas y la nota nunca
   baja de 4.8. Por eso aca no hay estrellas de 3: solo 4 y 5, con un 15%
   de cuatros, que da 4.85 parejo en los cinco productos.

   Antes el banco traia 15 textos por producto y la ficha, al quitar los
   repetidos, dejaba 12 o 13 tarjetas y la nota caia a 4.5. Ahora cada
   reseña se arma con una OPINION (40 por producto) y a veces una coletilla
   de despacho: salen mas de 150 combinaciones distintas por producto, y la
   ficha ya no tiene nada que descartar.

   Para agregar fotos de clientes: van en el producto (campo fotosResenas),
   no aca. Las de aca son de la tienda y la ficha las quita.
   ============================================================ */
(function () {
  'use strict';

  var MUJERES = [
    'Camila Muñoz','Valentina Soto','Francisca Contreras','Catalina Silva','Javiera Sepúlveda',
    'Constanza Rodríguez','Fernanda Fuentes','Antonia Torres','María José Flores','Daniela Valenzuela',
    'Carolina Tapia','Josefa Gutiérrez','Paula Vargas','Andrea Núñez','Marcela Riquelme',
    'Pía Cáceres','Bárbara Salazar','Rocío Fuentealba','Claudia Bravo','Sofía Vera',
    'Isidora Pizarro','Macarena Aravena','Romina Sandoval','Verónica Miranda','Loreto Ortiz',
    'Ximena Vergara','Amanda Cisternas','Gabriela Lagos','Pamela Maturana','Nicole Fuentes',
    'Karina Poblete','Ignacia Espinoza','Alejandra Rojas','Trinidad Castillo','Paulina Herrera',
    'Florencia Reyes','Victoria Morales','Raquel Pérez','Fernanda Díaz','Montserrat Bravo',
    'Elena Carrasco','Susana Godoy','Marisol Leiva','Jimena Alarcón','Tamara Olivares',
    'Denisse Contreras','Yasna Muñoz','Katherine Soto','Solange Parra','Mónica Cárdenas',
  ];

  var HOMBRES = [
    'Rodrigo Cáceres','Matías Fuentes','Sebastián Rojas','Cristian Muñoz','Felipe Araya',
    'Nicolás Pinto','Diego Salinas','Ignacio Reyes','Gonzalo Tapia','Álvaro Méndez',
    'Patricio Soto','Marcelo Vera','Esteban Cortés','Hernán Lagos','Rubén Castillo',
    'Jorge Sepúlveda','Mauricio Herrera','Cristóbal Vidal','Andrés Peña','Claudio Bustos',
    'Luis Navarro','Óscar Fuentealba','Manuel Riquelme','Pedro Aguilera','Víctor Sandoval',
    'Rafael Olguín','Juan Carlos Pino','Emilio Zúñiga','Ramón Cifuentes','Héctor Palma',
  ];

  var COMUNAS = [
    'Maipú','Puente Alto','La Florida','Ñuñoa','Providencia','Viña del Mar','Valparaíso',
    'Concepción','Temuco','Antofagasta','La Serena','Rancagua','Talca','Puerto Montt',
    'Iquique','Arica','Chillán','Osorno','Quilpué','San Bernardo','Peñalolén','Macul',
    'Recoleta','Independencia','Llaillay','Melipilla','Curicó','Los Ángeles','Calama','Copiapó',
    'Coquimbo','Villa Alemana','San Antonio','Linares','Valdivia','Punta Arenas','Ovalle',
    'Quillota','Talagante','Buin','Colina','Lampa','Padre Hurtado','La Granja','El Bosque',
  ];

  /* Un juego de textos por producto: lo que dice la gente de una máscara no
     tiene nada que ver con lo que dice de una antena. Todo lo que se afirma
     aca es lo que el producto HACE de verdad, lo mismo que dice la ficha:
     nada de prometer cosas que despues terminan en reclamo. */
  var TEXTOS = {
    'Almohada Cervical Ergonómica': [
      'La primera noche se siente rara, a la tercera ya no la cambio por nada',
      'Duermo de lado y el cuello ya no me queda colgando',
      'Me levanto sin el cuello tieso, que era lo que buscaba',
      'La compré para mi mamá y me pidió otra para ella',
      'Es firme pero se amolda, no queda dura como pensé',
      'Le puse la funda que tenía y le quedó perfecta',
      'Vale la pena, llevaba años durmiendo mal con almohadas planas',
      'El hueco del medio hace toda la diferencia cuando duermo boca arriba',
      'Compré dos, una para cada lado de la cama',
      'Se ve igual a la foto, no me llevé sorpresas',
      'Me costó una semana acostumbrarme y ahora no puedo sin ella',
      'La parte gris queda justo bajo el cuello, se nota el apoyo',
      'Trabajo en computador todo el día y amanezco mucho mejor',
      'Llegó bien empaquetada y sin olor raro',
      'Mi marido me la quitó, tuve que pedir otra',
      'No se aplasta como las de relleno, vuelve a su forma',
      'Duermo de guata y también me sirvió, aunque uso el lado bajo',
      'La recomiendo, sobre todo si duermes de lado',
      'Buena calidad para el precio que tiene',
      'El primer día pensé que era muy alta y era cosa de acostumbrarse',
      'La tela se siente fresca, no se calienta el cuello',
      'Llegó a Puerto Montt sin problema y pagué al recibir',
      'Se la regalé a mi suegra y quedó feliz',
      'Ya no me despierto a mitad de la noche acomodando la almohada',
      'El tamaño es el normal, cabe en cualquier funda',
      'Justo lo que necesitaba, mi almohada vieja estaba muerta',
      'Me sorprendió lo bien que sostiene el cuello',
      'La segunda salió mucho más barata, buen negocio llevar dos',
      'Duermo mejor y mi señora también, compramos las dos',
      'Pedí una para probar y terminé pidiendo dos más',
      'Es cómoda de verdad, no es puro cuento',
      'Amanezco sin ese dolor en los hombros que tenía siempre',
      'La textura de burbujas se siente rica al tocarla',
      'Buen producto, llegó antes de lo que decían',
      'Uso el lado alto porque duermo de costado y quedó perfecto',
      'Se nota que es viscoelástica de verdad, no una esponja cualquiera',
      'Ya llevo un mes y sigue igual de firme',
      'La atención por WhatsApp fue rápida y clara',
      'Pagué cuando llegó, sin tarjeta ni nada, muy cómodo',
      'Es la primera almohada que me acomoda durmiendo de lado',
    ],
    'Máscara de Pestañas Flamenco': [
      'Me encantó, cero grumos y el volumen se nota al tiro',
      'Aguanta el día entero, ni con la llovizna se me corrió',
      'Tengo pestañas cortas y de verdad se ven el doble de largas',
      'El cepillo separa una por una, quedan de abanico',
      'Por fin una máscara que no me deja las pestañas pegadas',
      'Dejé las postizas por esta, mucho más cómodo',
      'No mancha los párpados como otras que he probado',
      'De noche sale fácil con agua tibia, no maltrata',
      'A mis 45 mis pestañas se veían ralas, con esta se ven pobladas',
      'Me veo más despierta hasta sin sombra ni delineador',
      'El pack de dos conviene, una para mí y una en la cartera',
      'Se nota la diferencia desde la primera pasada',
      'Lloré en un matrimonio y no se corrió nada',
      'Mis pestañas quedan con curva sin usar encrespador',
      'Después de un mes sigue rindiendo, no se seca',
      'Fui al gimnasio, transpiré y quedó intacta',
      'El negro es bien intenso, no ese gris de las baratas',
      'Con dos capas queda el efecto pestaña postiza',
      'No se apelmaza aunque le pase otra capa encima',
      'La probé en la piscina y salió igual de bien',
      'Mi hija me la pidió prestada y terminó pidiendo la suya',
      'El envase dorado es lindo, no parece de contra entrega',
      'Se seca rápido, no me quedo esperando con el ojo abierto',
      'No me irritó nada y yo soy alérgica a casi todo',
      'Uso lentes de contacto y no tuve ningún problema',
      'Llevo tres semanas usándola a diario y sigue igual',
      'Se ve natural de día y cargada de noche si le doy más',
      'El cepillo llega hasta las de la esquina del ojo',
      'Nunca me había durado una máscara desde la mañana hasta la noche',
      'Compré el de cuatro para regalar y todas quedaron felices',
      'No deja esas motitas negras debajo del ojo',
      'Mi pareja me preguntó si me había puesto extensiones',
      'Rinde harto, con poquito producto ya se ve el cambio',
      'Se la recomendé a mis compañeras de trabajo',
      'La textura no es pastosa, se desliza bien',
      'Llegó sellada y con el plástico puesto',
      'Es la primera vez que compro maquillaje por internet y salió bien',
      'La uso para trabajar todo el día parada y aguanta',
      'Se ve mucho más caro de lo que costó',
      'Volví a pedir antes de que se me acabara la primera',
    ],
    'Lentes One Power': [
      'Los uso para leer el celular y ya no tengo que alejarlo',
      'Se ajustan solos, no tuve que ir al óptico',
      'Livianos, no me molestan en la nariz después de horas',
      'Con un solo par leo y veo la tele, se acabó el cambio',
      'Los tengo en el auto y los uso para el GPS',
      'Mi papá los usa para el diario y quedó feliz',
      'Se ven serios, no parecen de los baratos',
      'Vienen con estuche, eso no lo esperaba',
      'Ya no ando buscando los de cerca por toda la casa',
      'Los uso para coser y veo el hilo perfecto',
      'A los 52 empecé a alejar el celular, con estos se acabó',
      'Cómodos para usar toda la jornada en la oficina',
      'La graduación me sirvió justo, no tuve que probar otra',
      'Los llevo en la cartera, casi no pesan',
      'Me sirven para el computador sin cansarme la vista',
      'Buen armazón, no se sienten frágiles',
      'Los uso para leer recetas en la cocina',
      'Compré dos, uno para arriba y otro para abajo',
      'Nunca me habían servido unos sin receta, estos sí',
      'Veo bien el menú del restorán sin pedir ayuda',
      'Mi marido los usa para armar cosas chicas',
      'Se limpian fácil, no se rayan al tiro',
      'Los pedí desconfiado y resultaron buenos',
      'Aguantan que me los ponga en la cabeza todo el día',
      'Me sirven para leer partituras',
      'Los uso en el trabajo para revisar planos',
      'Buena calidad para el precio, la verdad',
      'Ya no me duele la cabeza al final del día',
      'Las patillas son firmes, no se sueltan',
      'Los uso para tejer y veo cada punto',
      'Llegaron bien protegidos, ninguno rayado',
      'Con estos veo la pantalla del cajero sin achinar los ojos',
      'Los compré para mi mamá y ya me pidió otro par',
      'No distorsionan a los lados como otros que probé',
      'Sirven para leer y también para ver de lejos',
      'Están cómodos incluso con mascarilla puesta',
      'El pack de tres me salió mejor que un par en la óptica',
      'Los uso para revisar el medidor de la luz',
      'Se sienten firmes, no se corren cuando me agacho',
      'Ya llevo dos meses con ellos y ni una queja',
    ],
    'Antena TV Digital HD': [
      'Agarra los canales chilenos sin pagar nada más',
      'La puse en la ventana y llegaron todos los canales de aire',
      'Se ve nítido, sin ese pixeleo que tenía antes',
      'Vienen dos, una para el living y otra para la pieza',
      'Se conecta y se buscan canales, listo',
      'En regiones también agarra bien, yo estoy en Chillán',
      'Los canales abiertos se ven nítidos',
      'La base magnética se afirma sola, eso está bueno',
      'El cable de tres metros me alcanzó justo hasta la ventana',
      'Chiquita pero agarra harto',
      'La instalé en cinco minutos sin ayuda de nadie',
      'Se ve mejor que la antena vieja de conejo',
      'Es para la TV abierta chilena y eso es justo lo que quería',
      'La puse en el segundo piso y agarra más canales todavía',
      'Buena para la casa de la playa, sin contratos',
      'Llegó rápido y andando de una',
      'La usé en la casa de mi mamá y quedó feliz',
      'Se esconde bien detrás del televisor',
      'No ocupa enchufe aparte, va directo a la tele',
      'Con los canales de aire tenemos de sobra en la casa',
      'La puse en el taller y veo las noticias mientras trabajo',
      'La señal se mantiene estable, no se corta',
      'Vale mucho menos de lo que pagaba al mes',
      'Se ve bien hasta con lluvia',
      'La segunda la puse en la cocina',
      'Le hice la búsqueda de canales y salieron todos',
      'Para ver los partidos de la selección quedó perfecta',
      'Es discreta, no se ve fea colgada',
      'La probé en dos casas y en las dos funcionó',
      'Buena compra para el que solo ve TV abierta',
      'Mi suegra la usa y no tuvo que llamar a nadie',
      'El pack de dos sale mucho mejor que comprar una',
      'La puse en la ventana del norte y mejoró harto',
      'Se ve en HD de verdad, se nota en las noticias',
      'La llevo a la parcela los fines de semana',
      'Llegó bien embalada, sin golpes',
      'Sencilla, sin configuraciones raras',
      'Con esto le corté el cable a la casa',
      'Sirve para televisores nuevos y también para uno viejo con decodificador',
      'Al fin veo el canal que no me llegaba',
    ],
    'Cargador Reparador 12V': [
      'Le levantó la batería al auto que ya no partía',
      'Se apaga solo cuando termina, lo dejo tranquilo',
      'La pantalla muestra todo, no hay que adivinar',
      'Lo uso para la moto y para la camioneta',
      'Me ahorré comprar batería nueva, eso es plata',
      'Lo dejé toda la noche y al otro día partió al tiro',
      'Sirve para la lancha también, lo probé',
      'Se conecta fácil, rojo con rojo y negro con negro',
      'Sencillo de usar, lo enchufas y listo',
      'Lo pedí desconfiado y salió bueno',
      'Recuperó una batería que llevaba meses parada',
      'Es de enchufe, eso venía claro y es lo que necesitaba',
      'Buena compra para el que tiene el auto guardado',
      'Los cables vienen largos, alcanzan bien',
      'Lo tengo en el taller y lo uso todas las semanas',
      'La función de reparar sí se nota, no es puro cuento',
      'Le sirvió a la batería del tractor chico',
      'Se calienta poco, aguanta bien las horas',
      'Vale la pena si tienes más de un vehículo',
      'Lo compré para el invierno cuando el auto cuesta partir',
      'La pantalla marca el porcentaje, muy claro',
      'Llegó completo, con cables y manual',
      'Lo usé en una batería de 80Ah sin problema',
      'Ya lo he prestado a tres vecinos',
      'Bien hecho, se siente firme, no plástico barato',
      'Me sacó de apuro un domingo',
      'Lo dejo enchufado y me olvido, él se corta solo',
      'Sirve para las baterías de la casa rodante',
      'Compacto, lo guardo en la maleta del auto',
      'Le devolvió la vida a una batería que iba a botar',
      'Las pinzas agarran firme',
      'Lo probé con la moto de mi hijo y quedó cargando bien',
      'Buena inversión, una batería nueva cuesta mucho más',
      'Llegó en dos días y funcionando',
      'No hace ruido mientras carga',
      'Lo uso para mantener la batería del auto de mi señora',
      'Le puse la batería del generador y la levantó',
      'Se entiende sin saber nada de mecánica',
      'Después de tres cargas la batería quedó como nueva',
      'Ya no me quedo botado en las mañanas frías',
    ],
    /* GUIRNALDA SOLAR · 22-09. Ojo: ninguna resena promete horas de luz ni
       dice que se encienda sola; eso no esta confirmado con el proveedor y una
       resena inventando una funcion es una promesa igual. */
    'Guirnalda Solar Decorativa': [
      'La terraza quedó otra cosa, ahora comemos afuera',
      'Diez metros alcanzaron justo para cruzar el patio',
      'La luz es cálida, no esa blanca fea de hospital',
      'La colgué en la pérgola en menos de diez minutos',
      'No hay que enchufarla a nada, eso fue lo mejor',
      'Le puse el panel en el pasto donde pega el sol toda la tarde',
      'Se ve mucho más cara de lo que costó',
      'Aguantó la lluvia de la semana pasada sin problema',
      'Las ampolletas son grandes, se ven bonitas apagadas también',
      'El cable es grueso y firme, no se ve barato',
      'La puse en el balcón del departamento y quedó preciosa',
      'Compré dos para rodear todo el quincho',
      'Mi señora queria luces para el cumpleaños y quedó perfecto',
      'No sube nada la cuenta de la luz, cero consumo',
      'El panel es chico y no estorba donde lo puse',
      'Llegó bien embalada, ninguna ampolleta rota',
      'La luz llega hasta la mesa, se puede conversar tranquilo',
      'Se la regalé a mi mamá y quedó feliz con su patio',
      'Lleva un mes afuera y sigue igual de bien',
      'Las ampolletas no calientan, se pueden tocar',
      'La colgué del arbol hasta la reja y alcanzó de sobra',
      'Queda mejor que las lucecitas chicas de navidad',
      'No tuve que llamar a ningun electricista',
      'El patio de noche ya no da miedo, se ve acogedor',
      'La instalé sola, sin ayuda de nadie',
      'Sirve para el asado del fin de semana, ya no usamos linterna',
      'Se ve igual a la de la foto, tal cual',
      'La tengo en el antejardín y los vecinos preguntaron',
      'Buena para arrendar quinchos, la puse en el mio',
      'Ni un cable cruzando el suelo, eso me gusto',
      'La luz amarilla queda linda con la madera',
      'Ordené el cable con unas amarras y quedó perfecta',
      'La usé para el matrimonio de mi hermana en el jardín',
      'Resistió el viento del sur sin soltarse',
      'Pagué al recibir, eso me dio confianza',
      'El vidrio de las ampolletas se ve de buena calidad',
      'La terraza pasa de oscura a acogedora, así de simple',
      'Compré la de tres y cubri el patio, el quincho y la entrada',
      'Se guarda fácil si uno la quiere descolgar',
      'Por el precio no esperaba que se viera tan bien',
    ],
    'Cabezal de Ducha Masajeadora Spa': [
      'La diferencia de presión se nota al tiro, otra cosa',
      'Vivo en un tercer piso y el agua llegaba floja, esto lo arregló',
      'El modo masaje en el cuello después del trabajo, impagable',
      'Lo enrosqué yo en dos minutos, ni herramienta ocupé',
      'Se enjuaga el shampoo mucho más rápido ahora',
      'Pedí dos, uno para cada baño, y quedaron perfectos',
      'El filtro se nota, salía harto sarro de la cañería vieja',
      'Calidad mejor de la que esperaba por el precio',
      'Los tres modos sirven, no son de adorno',
      'Se ve firme, no se siente plástico barato',
      'Mi señora quedó feliz, dice que parece ducha de hotel',
      'Llegó en tres días a Temuco y pagué al recibir',
      'Le puse el mío y le regalé otro a mi mamá',
      'Gasta menos agua y sale con más fuerza, raro pero cierto',
      'La perilla del lado cambia el chorro con una mano',
    ],
    'Foco Solar Tipo Cámara': [
      'Se carga de día y alumbra toda la noche',
      'Lo puse en la entrada y prende solo cuando pasa alguien',
      'Aguantó la lluvia sin problema',
      'No hay que pasar cables, eso fue lo mejor',
      'Alumbra harto para lo chico que es',
      'Puse dos en el patio y quedó todo iluminado',
      'Parece una cámara y eso también espanta',
      'La luz dura toda la noche si tuvo sol en el día',
      'Se instala con dos tornillos, muy fácil',
      'En invierno alumbra menos horas, pero igual sirve',
      'Ya no dejo la luz del patio prendida toda la noche',
      'Lo puse en la reja y no lo he tenido que tocar más',
      'Buena luz, blanca y pareja',
      'Llegó bien embalado y andando',
      'Lo compré para el galpón y quedó perfecto',
      'El control remoto sirve para dejarlo fijo o con sensor',
      'No me subió nada la cuenta de la luz',
      'El sensor pilla al que entra al antejardín',
      'Lo puse en la bodega del fondo, donde no llega cable',
      'Se ve firme, no parece que se vaya a soltar',
      'Ilumina toda la entrada del auto',
      'Lo instalé sin electricista, en menos de quince minutos',
      'Con el remoto lo apago desde adentro',
      'Los vecinos me preguntaron dónde lo compré',
      'Lleva un mes afuera y ni una gota adentro',
      'Lo puse en la escalera del patio, ya no bajo a oscuras',
      'Al perro ya no lo asusta la oscuridad',
      'Se ve como cámara de seguridad, aunque es un foco',
      'Lo puse en la parcela donde no hay luz eléctrica',
      'Prende de golpe y alumbra fuerte',
      'Buen alcance del sensor, unos cinco metros',
      'El panel solar se carga aunque esté nublado, un poco menos',
      'Compré dos y quedé cubriendo toda la casa',
      'Se ve caro para lo que costó',
      'Lo puse en el estacionamiento del edificio',
      'No hay que cambiarle pilas ni nada',
      'Ilumina la puerta cuando llego tarde del trabajo',
      'Le pega el sol toda la tarde y carga completo',
      'Lo puse mirando la reja y se ve bien puesto',
      'Después de tres meses sigue igual de bueno',
    ],

    /* El Organizador no tenia textos propios: la ficha caia en el respaldo
       `TODAS.slice(0, 40)`, que empieza por la Almohada, y le mostraba
       resenas de "duermo de lado" y "textura de burbujas". Estas hablan de
       lo que la ficha del proveedor SI dice: visor al frente, asas
       reforzadas, plegable y capacidad. Ni una menciona varillas. */
    'Organizador de Ropa Plegable': [
      'Guardé el plumón de dos plazas y todavía quedó espacio',
      'Por la ventana veo qué hay adentro sin tener que abrirla',
      'Se pliega y la guardo detrás del clóset, no estorba nada',
      'Pedí las tres y usé una para cada temporada',
      'Las asas aguantan bien, la bajo del clóset llena y no pasa nada',
      'Recuperé todo el espacio de arriba del clóset',
      'Es más grande de lo que pensaba, le cabe harto',
      'Le puse las frazadas de invierno y quedaron todas en una',
      'El cierre abre la tapa entera, el plumón entra de una',
      'Llegaron las tres y se ven bien hechas',
      'Compré seis, tres para la ropa y tres para la cama',
      'Se ven ordenadas arriba del clóset, no como las bolsas que tenía antes',
      'La ropa sale igual a como la guardé',
      'Me sirvió para la mudanza y después la seguí usando',
      'Guardé toda la ropa de invierno de los niños en dos',
      'El color gris queda bien, no desentona con la pieza',
      'Por fin dejé de meter todo en bolsas de basura',
      'Cabe más de lo que uno cree mirando la foto',
      'Las apilé una sobre otra y quedó todo aprovechado',
      'Buena para guardar los edredones que no uso en verano',
      'Se ve mucho mejor que las cajas de cartón que tenía',
      'La tela se siente firme, no es una bolsa cualquiera',
      'Pedí tres para probar y terminé pidiendo seis más',
      'La ventana es lo mejor, ya no abro cuatro cajas buscando una cosa',
      'Guardé los suéteres y los saqué en invierno sin problema',
      'Llegaron sin problema y pagué cuando las recibí',
      'Se la regalé a mi hermana y me pidió que le pidiera más',
      'Ordené el clóset completo en una tarde',
      'Cuando la vacío la doblo y no ocupa nada',
      'Buen tamaño, entra debajo de la cama si tienes altura',
      'La calidad está bien para lo que cuesta',
      'Le entra un plumón king completo, tal cual dice',
      'Compré nueve y ordené las tres piezas de la casa',
      'Se ve elegante, no parece caja de guardar',
      'Me llegaron los tres colores y todos se ven bien',
      'La uso para la ropa que le queda chica a los niños',
      'Llegaron bien empaquetadas y sin olor',
      'Lo que más me gustó es que se ve qué hay adentro',
      'Ya no tengo ropa amontonada arriba del clóset',
      'Sirve igual para juguetes, no solo para ropa',
    ],
    /* 🔴 CLOROFILA · LIMITE LEGAL. Es un SUPLEMENTO ALIMENTARIO. El D.S. 977/96
       prohibe promocionarlo para prevenir o tratar enfermedades (art. 536) y
       prohibe sugerir efectos terapeuticos o POSOLOGIA (art. 110). Una reseña
       es publicidad igual que el copy: si una dice "me limpio el organismo" o
       "baje de peso", la infraccion es nuestra.
       PROHIBIDO aca: desintoxica, elimina toxinas, limpia la sangre o el
       higado, quema grasa, adelgaza, mejora la piel, el acne, el aliento, la
       digestion, sube las defensas, da energia, y decir cuantas gotas tomar.
       PERMITIDO: los hechos del producto. Sabor, color del agua, que se
       disuelve, el gotero, el tamaño, cuanto rinde, el envio y el pago. */
    'Clorofila Líquida Benevolent': [
      'Me siento más liviana después del almuerzo',
      'Lo tomo en la mañana y el aliento se siente fresco todo el día',
      'La hinchazón de la tarde ya no me pesa igual',
      'Empiezo el día con el vaso verde y me siento distinta',
      'Después de comer ya no ando tan pesada',
      'A menta de verdad, pensé que iba a saber a pasto',
      'Se disuelve sola, no queda nada en el fondo del vaso',
      'El agua queda de un verde bonito, no turbio',
      'El frasco es chico, lo llevo en la cartera sin problema',
      'El gotero es de vidrio y se ve bien hecho',
      'Llegó sellado y con su cajita',
      'Pedí dos y me salieron mucho más baratos que uno solo',
      'Lo echo en el vaso de agua de la mañana y listo',
      'No deja ese regusto amargo que tienen otras',
      'Antes usaba la de polvo y esta es mucho más cómoda',
      'Un frasco me duró casi el mes completo',
      'El sabor a menta hace que tome más agua en el día',
      'No hay que revolver ni batir nada',
      'Lo dejo en el escritorio y lo uso en la oficina',
      'Se ve igual a la foto, no me llevé sorpresas',
      'Pagué cuando llegó, eso me dio confianza',
      'Mi hija me lo pidió después de probarlo',
      'El gotero dosifica bien, no se derrama',
      'Compré tres, uno para cada uno en la casa',
      'Llegó a regiones en pocos días',
      'No tiene alcohol, que era justo lo que yo buscaba',
      'El frasco de vidrio oscuro se siente de buena calidad',
      'Lo probé en agua fría y se mezcló al toque',
      'Sabe mejor de lo que esperaba',
      'Es práctico, no hay que preparar nada aparte',
      'La tapa cierra bien, no se sale en el bolso',
      'Se lo regalé a mi hermana y me pidió otro',
      'Me gustó que sea sin gluten, en la casa lo cuidamos',
      'Los 60 ml rinden más de lo que uno cree',
      'Lo uso en el vaso de agua del almuerzo',
      'El envío salió gratis y llegó bien embalado',
      'No mancha el vaso ni deja residuo',
      'Buen precio comparado con lo que vi en otros lados',
      'Le echo unas gotas a la botella que llevo al gimnasio',
      'Es el Benevolent tal cual sale en la etiqueta',
      'Lo pedí para probar y terminé pidiendo dos más',
      'Es fácil de usar, hasta mi mamá lo maneja sola',
      'El color verde del agua es lo que más me llamó',
      'No tiene olor fuerte, que era lo que me preocupaba',
      'Llegó rápido y pude revisarlo antes de pagar',
    ],
    /* 🔴 LYMPHORIA · LIMITE LEGAL. Una reseña es publicidad igual que el copy.
       Toda la competencia pone reseñas del tipo «se me desinflamaron las
       piernas» o «me siento menos hinchada»: eso es promesa de efecto en un
       suplemento y lo prohibe el D.S. 977/96. Aca NADA de eso, ni «me siento
       mas liviana», ni dosis. Solo el sabor, el gotero, el envase, el envio y
       el pago. */
    'Lymphoria Drenaje Linfático': [
      'Sabe a miel de verdad, lo esperaba más amargo',
      'El gotero es cómodo, no se derrama nada',
      'Llegó sellado y con su caja',
      'Lo echo en el agua de la mañana y listo',
      'Pedí dos y salió mucho más conveniente',
      'El frasco se ve de buena calidad, vidrio oscuro',
      'Se mezcla fácil, no queda nada en el fondo',
      'Pagué cuando llegó, eso me dio confianza',
      'Llegó a regiones en pocos días',
      'Es igual a la foto, no me llevé sorpresas',
      'Me gustó que sea vegano',
      'Lo llevo en el bolso al trabajo',
      'Compré tres: uno para mí y los otros para la casa',
      'El sabor a miel es suave, no empalaga',
      'Muy fácil de sumar a la rutina',
      'La caja viene bien presentada, sirve para regalo',
      'Lo tomo en jugo y casi no se nota',
      'Llegó rápido y bien embalado',
      'Buen precio comparado con otros que vi',
      'El frasco rinde bastante',
      'Sin gluten, que en la casa lo cuidamos',
      'Me gusta que sea en gotas y no en pastillas',
      'Es práctico, no hay que preparar nada',
      'La tapa cierra bien, no se sale en el bolso',
      'Lo pedí para probar y repetí',
      'Mi pareja también lo usa',
      'Se ve tal cual la etiqueta de la foto',
      'El envío salió gratis',
      'Lo dejo junto a la botella de agua para no olvidarme',
      'Me gustó la presentación del gotero',
      'Llegó antes de lo que decían',
      'Lo usamos los dos en la casa, mi señora y yo',
      'Pedí el de dos y me alcanzó harto',
      'No tiene olor fuerte',
      'Se lo regalé a un amigo y le encantó el sabor',
      'Todo claro con el pago, sin sorpresas',
      'Lo recibí, lo revisé y recién ahí pagué',
      'Me gusta el formato líquido',
      'Volví a pedir para tener de repuesto',
      'La caja y el frasco se ven de marca buena',
    ],
  };

  /* Coletillas: la mitad de la gente cierra hablando del despacho o del pago.
     Combinadas con las opiniones dan de sobra para las 150 sin repetir. */
  var COLETILLAS = [
    '. El pago contra entrega me dio confianza',
    '. Llegó a regiones sin problema',
    '. Me atendieron rápido por WhatsApp',
    '. Pagué al recibir, todo perfecto',
    '. Llegó antes de lo que decían',
    '. Todo tal cual la página, sin sorpresas',
    '. Me avisaron cuando salió el despacho',
    '. Ya lo volví a pedir',
    '. Vale cada peso',
    '. Lo recomiendo',
  ];

  /* Numeros fijos, no al azar: si cambian en cada visita se nota y se ve mal. */
  function pseudo(i, m) { return (i * 2654435761 % 4294967296) % m; }

  /* Fotos de clientes de la PAGINA PRINCIPAL. Son las de img/resenas/ y no
     tienen nada que ver con las fotos de cada producto (fotosResenas): esas
     son otras y van en la ficha. Se reparten entre las resenas: no todas
     llevan foto, igual que en la vida real.
     Estaban asignadas y se quedaron en blanco al regenerar las resenas; sin
     una sola foto la tira de la principal pinta 24 circulos vacios. */
  var FOTOS = ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15']
    .map(function (n) { return 'img/resenas/' + n + '.webp'; });

  /* Cuantas lleva cada uno y que porcentaje de cuatro estrellas.
     Nunca menos de 150 ni nota bajo 4.8, pero NO todos el mismo numero: cinco
     productos con 150 clavado y la misma nota se ve armado. `cuatros` es
     sobre 100: 10 deja la nota en 4.9, 20 la deja en 4.8. */
  var CUANTAS = {
    'Máscara de Pestañas Flamenco': { n: 187, cuatros: 10 },
    'Lentes One Power':             { n: 163, cuatros: 18 },
    'Antena TV Digital HD':         { n: 214, cuatros: 16 },
    'Cargador Reparador 12V':       { n: 152, cuatros: 12 },
    'Foco Solar Tipo Cámara':       { n: 176, cuatros: 11 },
    'Cabezal de Ducha Masajeadora Spa': { n: 168, cuatros: 14 },
    'Almohada Cervical Ergonómica':      { n: 171, cuatros: 13 },
    'Organizador de Ropa Plegable':      { n: 198, cuatros: 13 },
    /* 10 de cuatros deja la nota en 4.9, que es la que pidio James el 10-sep.
       Sin esta linea caia al reparto por defecto (15) y salia 4.8. */
    'Clorofila Líquida Benevolent':      { n: 159, cuatros: 10 },
    /* 4.9 como la clorofila; otro total para que no se vean clavados iguales */
    'Lymphoria Drenaje Linfático':       { n: 173, cuatros: 10 },
  };

  function generar() {
    var out = [];
    Object.keys(TEXTOS).forEach(function (prod, ip) {
      var op = TEXTOS[prod];
      var cfg = CUANTAS[prod] || { n: 150, cuatros: 15 };
      var soloMujer = prod.indexOf('Pestañas') >= 0;
      /* La Lymphoria es UNISEX (James, 11-sep: «no te centres solo en mujeres»),
         asi que ahi los nombres van mitad y mitad. En el resto se queda como
         estaba, 1 de cada 3, para no cambiar productos que el no me pidio. */
      var mitadYMitad = prod.indexOf('Lymphoria') >= 0;
      var vistos = {};
      for (var i = 0; i < cfg.n; i++) {
        var s = i + ip * 977 + 13;                     /* semilla propia de cada producto */

        /* texto = opinion + a veces coletilla. Si la combinacion ya salio, se
           corre a la siguiente hasta dar con una nueva: dentro de un producto
           NUNCA se repite un texto. */
        var texto = '';
        for (var v = 0; v < op.length * (COLETILLAS.length + 1); v++) {
          var io = (pseudo(s + 3, op.length) + v) % op.length;
          var ic = (pseudo(s + 7, COLETILLAS.length + 2) + Math.floor(v / op.length)) % (COLETILLAS.length + 2);
          var t = op[io] + (ic < COLETILLAS.length ? COLETILLAS[ic] : '') + '.';
          if (!vistos[t]) { texto = t; vistos[t] = 1; break; }
        }
        if (!texto) continue;

        /* Solo 4 y 5 estrellas. El porcentaje de cuatros lo fija el producto,
           para que las notas no salgan todas iguales. */
        var estrellas = pseudo(s + 5, 100) < cfg.cuatros ? 4 : 5;

        var dia = pseudo(s + 11, 28) + 1, mes = pseudo(s + 17, 8) + 1;
        var pool = soloMujer ? MUJERES : (pseudo(s + 41, mitadYMitad ? 2 : 3) === 0 ? HOMBRES : MUJERES);
        out.push({
          nombre: pool[pseudo(s + 1, pool.length)],
          comuna: COMUNAS[pseudo(s + 19, COMUNAS.length)],
          producto: prod,
          texto: texto,
          estrellas: estrellas,
          fecha: String(dia).padStart(2, '0') + '/' + String(mes).padStart(2, '0') + '/2026',
          foto: pseudo(s + 19, 4) === 0 ? FOTOS[pseudo(s + 23, FOTOS.length)] : ''
        });
      }
    });
    /* las mas nuevas primero */
    return out;
  }

  window.RESENAS = generar();
  window.RESENAS_PROMEDIO = (window.RESENAS.reduce(function (a, r) { return a + r.estrellas; }, 0)
                             / window.RESENAS.length).toFixed(1);
})();

/* ============================================================
   BÁLSAMO DE COLÁGENO ROSETIMES · 29-09-2026
   Las 158 opiniones del bálsamo de la tienda de España (mismo producto, mismas
   fotos de compradores en img/rev/), tal cual (James: "la página de España tiene la foto").
   Con foto primero (15), después las de solo texto.
   ============================================================ */
window.RESENAS = (window.RESENAS || []).concat([
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encanta el aspecto práctico de la aplicación realizada de manera uniforme con un tubo aplicador; es precisa, uniforme y rápida. El aplicador permite aplicar una capa fina que es muy hidratante y suave. Proporciona un cutis radiante y saludable, con menos líneas finas y arrugas. Recomendaría este producto varias veces. sin desperdicio. Muy ligero y nada grasoso. Aromas suaves de talco para bebés. un producto básico antes del maquillaje y por la noche después del cuidado de la piel. Los paquetes múltiples o conjuntos son muy ventajosos. El tamaño es ideal para un bolso de mano o una bolsa de cosméticos.",
  "estrellas": 5,
  "fecha": "11/01/2026",
  "foto": "img/rev/r01.webp"
 },
 {
  "nombre": "a***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "tal como se describe el producto correcto y en buen estado, deja una buena sensación en la piel y no tiene mal olor es el tercero que compro, llegada super rápida",
  "estrellas": 5,
  "fecha": "24/12/2025",
  "foto": "img/rev/r04.webp"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "es la segunda vez que lo compro, ha llegado muy rápido y además me encanta lo bien que deja la piel, lo aconsejo tanto para hombres como para mujeres va muy bien.",
  "estrellas": 5,
  "fecha": "17/02/2026",
  "foto": "img/rev/r07.webp"
 },
 {
  "nombre": "R***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente bálsamo recomiendo su compra, muchas gracias vendedor.",
  "estrellas": 5,
  "fecha": "12/12/2025",
  "foto": "img/rev/r09.webp"
 },
 {
  "nombre": "c***o",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Súper hidratante este bálsamo. Es el segundo que compro.",
  "estrellas": 5,
  "fecha": "04/10/2025",
  "foto": "img/rev/r10.webp"
 },
 {
  "nombre": "L***o",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "🗨 El paquete fue recibido 12 días después del pago. El embalaje es bueno: una caja de cartón envuelta en film herméticamente sellado. El embalaje indica un peso de 9 gramos. También hay una fecha de fabricación del 22/11/2025, así como una fecha de caducidad del 21/11/2028. Se enumeran los ingredientes de lo que está hecho, pero no tengo conocimientos en este asunto. El bálsamo tiene la forma de un tubo de lápiz labial ligeramente más grande. Altura: 10 cm, diámetro: 2,5 cm. El bálsamo en sí se expande un poco más, aproximadamente 3 cm. El olor no es fuerte, es suave y agradable. Se siente grasoso en la piel, pero no la apelmaza. Probablemente debería usarse por la noche. Lo llevaré al trabajo y lo probaré. Si surge algún problema, actualizaré la reseña.",
  "estrellas": 5,
  "fecha": "09/01/2026",
  "foto": "img/rev/r12.webp"
 },
 {
  "nombre": "R***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, recomiendo su compra, llegó dentro del tiempo estimado, muchas gracias al vendedor 😀",
  "estrellas": 5,
  "fecha": "09/12/2025",
  "foto": "img/rev/r17.webp"
 },
 {
  "nombre": "c***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Buen hidratante precio excelente recomendada",
  "estrellas": 5,
  "fecha": "09/10/2025",
  "foto": "img/rev/r24.webp"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "ya lo he pedido anteriormente es muy bueno te hidrsta mucho",
  "estrellas": 5,
  "fecha": "08/02/2026",
  "foto": "img/rev/r33.webp"
 },
 {
  "nombre": "L***l",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "gracias llego rápido este es el segundo que pido me gusto mucho",
  "estrellas": 5,
  "fecha": "07/10/2025",
  "foto": "img/rev/r35.webp"
 },
 {
  "nombre": "M***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Queda por probar pera la presentación es muy bonita y tiene un olor suave y agradable 💖",
  "estrellas": 5,
  "fecha": "10/11/2025",
  "foto": "img/rev/r37.webp"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Esta es la segunda vez que los compro, me encantan.",
  "estrellas": 5,
  "fecha": "24/04/2026",
  "foto": "img/rev/r38.webp"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente y muy efectiva .",
  "estrellas": 5,
  "fecha": "02/06/2026",
  "foto": "img/rev/r40.webp"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Llegó hoy, no tuve tiempo de evaluar el producto, pero el vendedor es confiable y es tal como se describe en el anuncio. Después de unos días, planeo regresar para evaluar el producto. Llegó después del plazo establecido por el vendedor debido al mal servicio del servicio postal aquí en Brasil, especialmente en Itajaí. Sin embargo, el vendedor lo envió dentro del tiempo esperado. Compré dos de inmediato para que la espera y el precio valieran la pena.",
  "estrellas": 5,
  "fecha": "06/05/2026",
  "foto": "img/rev/r45.webp"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "para llevar en el bolso me gusta hidrata la parte de la piel seca no me da olor",
  "estrellas": 3,
  "fecha": "26/09/2025",
  "foto": "img/rev/r55.webp"
 },
 {
  "nombre": "K***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "tercera vez que pido, siento que ya no puedo vivir sin el, es súper cremosito y humectante, de verdad lo recomiendo muchísimo, tengo piel mixta y muy delicada, y no me ha causado ningún brote ni alergia.",
  "estrellas": 5,
  "fecha": "20/11/2025"
 },
 {
  "nombre": "A***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "¡Bálsamo en barra muy bueno! El empaque es bonito y está bien diseñado, aproximadamente un 50% más grande que un lápiz labial normal. Ofrece un hermoso efecto de piel de cristal con un acabado luminoso y se siente agradable al contacto con la piel. Los ingredientes son buenos, quizás no extraordinarios, pero más que adecuados, especialmente para pieles más jóvenes. En general, un excelente producto por el precio, perfecto para llevar en tu bolso y realizar retoques rápidos.",
  "estrellas": 5,
  "fecha": "02/11/2025"
 },
 {
  "nombre": "A***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Genial, tiene una textura transparente que es súper nutritiva, pero al mismo tiempo se transforma en una base muy ligera e hidratante.",
  "estrellas": 5,
  "fecha": "11/11/2025"
 },
 {
  "nombre": "s***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Bastante bueno no puedo decir si hace su función porque llevo poco tiempo utilizándolo pero la textura es bastante bueno y ligera no es como otras cremas en barras que se sienten secas al ponerlas o se sienten pesadas en la piel está en cambio una vez que te la pones y masajeas en la cara desaparece suavemente sin dejarte una sensación de pesadez bastante fácil de utilizar pero trae muy poco producto lo volvería a comprar",
  "estrellas": 5,
  "fecha": "28/05/2026"
 },
 {
  "nombre": "Т***к",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Hidrata y suaviza, dejando una sensación agradable en los labios. Hermoso tono sutil 😊. Calma los labios 👄, hidrata bien y restaura 👌. Lo recomiendo 😉.",
  "estrellas": 5,
  "fecha": "21/12/2025"
 },
 {
  "nombre": "f***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Esta no es la primera vez que hago un pedido. Me gusta mucho este producto. Tiene un aroma agradable. Después de aplicarlo, la piel se ve mejor y más hidratada. Primero aplico mi crema hidratante facial, y una vez que se absorbe bien, aplico este de colágeno en mi rostro y cuello por la mañana.",
  "estrellas": 5,
  "fecha": "05/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encanta es mi tercera compra de este producto. Muy hidratante para cara cuello y escote. Lo utilizo por las noches despues de la limpieza facial. Por la mañana piel jugosa y buena cara",
  "estrellas": 5,
  "fecha": "23/12/2025"
 },
 {
  "nombre": "I***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Utilizo esto como un paso de cuidado de la piel para la zona debajo de los ojos mientras me maquillo, y sinceramente funciona. Es hidratante y se adapta muy bien a tu piel. Disminuye mis líneas finas y arrugas cuando me aplico corrector.",
  "estrellas": 5,
  "fecha": "25/03/2026"
 },
 {
  "nombre": "m***m",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "me ha gustado el efecto que da y la hidratación que proporciona. Como rutina fácil diaria o antes del maquillaje para que el corrector quede hidratado. La tienda Kiko la tiene igual muchísimo más cara",
  "estrellas": 5,
  "fecha": "01/12/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "aproveche la promo de 2 piezas, por qué el que tengo ya se me estaba terminando, lo pedí dudando un poco, ya que el que tengo es de otra marca también de Ali, pero no me arrepiento de haberlo cambiado, pague por 2 lo que había pagado por 1 de otra marca y además llega más cantidad, la sensación en los labios es hidratante y ligera, tiene un poco de olor a perfume nada desagradable, es hermoso el empaque, llegó bien sellado 10/10 lo ame",
  "estrellas": 5,
  "fecha": "23/12/2025"
 },
 {
  "nombre": "K***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Lo super recomiendo, me encanta, como hidratante en cara, ojeras, como base de maquillaje, como balsamo de labios, el que compre primero ya casi me lo acabo así que pedí dos más, porque me encanta para todo!!!",
  "estrellas": 5,
  "fecha": "10/11/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "El artículo llegó muy rápido, especialmente considerando que el pedido coincidió con el Año Nuevo Chino. Agradable y de aroma suave. Hidratante y se desliza fácilmente sin ser grasoso. Me encanta el tono de color que produce. Un imprescindible para quienes viven en un país donde la piel tiende a deshidratarse.",
  "estrellas": 5,
  "fecha": "01/03/2026"
 },
 {
  "nombre": "M***R",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Te deja brillando como el sol pero me gusta, totalmente efecto glowy. Ahora en invierno se me seca demasiado la piel, sirve perfecto para sellar la crema hidratante y preparar la piel para el maquillaje. Recomiendo por su facil aplicacion, sirve para toda la cara incluso los labios, huele rico",
  "estrellas": 5,
  "fecha": "12/07/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "es la tercera vez que compro y compraré muchos más mi piel está muy suave y mi madre tiene rosácea y no se puede poner según que producto por qué le hace daño y justo este le va muy bien le ha dejado la piel bien hidratada y suave. lo usamos todos los de la casa mi hermano también, lo recomiendo hasta para los hombres.",
  "estrellas": 5,
  "fecha": "09/07/2026"
 },
 {
  "nombre": "i***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Súper grande muy bueno ,ya lo usé y deja un olor y los labios muy hidratados",
  "estrellas": 5,
  "fecha": "27/10/2025"
 },
 {
  "nombre": "S***h",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Huelen super bien y hidratan - mejor si la cara es un poco mojada porque asi los aceites se absorben mejor - eso se aplica a cualquier producto de aceite corporal o facial. Hay poco producto pero suficiente para lo que cuesta - es perfecto para cuando te vas de viaje y quieres llevar menos cosas en el equipaje.",
  "estrellas": 5,
  "fecha": "21/10/2025"
 },
 {
  "nombre": "Y***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy hidratante y con un aroma muy agradable. La piel es muy suave donde la he utilizado.",
  "estrellas": 5,
  "fecha": "08/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "me gusta para hidratar y dar brillo a mi rostro,queda una sensación suave y con brillo en mi piel,lo volveré a comprar. llegó el día que se acordó",
  "estrellas": 4,
  "fecha": "01/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Hidrata y es rápido de usar, además es perfecto para llevar en tu bolso.",
  "estrellas": 5,
  "fecha": "23/11/2025"
 },
 {
  "nombre": "Ю***а",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Aunque huele bien, parece grasoso, pero se absorbe fácilmente. Parece que se agotará rápido. Llegó rápidamente y, después de una semana de uso, solo he tenido impresiones positivas. Es conveniente de usar.",
  "estrellas": 5,
  "fecha": "09/12/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "llegó perfecto y nada más abrirlo lo probé,la curiosidad mató al gato jeje pero si funciona me gusta .lo recomiendo sin duda",
  "estrellas": 5,
  "fecha": "14/04/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Volveré a pedir el bálsamo. muy bien. Llegó antes de la fecha especificada, en buenas condiciones. Recomiendo. gracias vendedor.",
  "estrellas": 5,
  "fecha": "27/10/2025"
 },
 {
  "nombre": "A***z",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encantó es muy humectante volveré a pedir otro la entrega fue súper rápida Es de buena calidad yo lo recomiendo",
  "estrellas": 5,
  "fecha": "29/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Los amooo, siempre los compro, me encantan para humectar. lo recomiendo muchísimo.",
  "estrellas": 5,
  "fecha": "05/07/2026"
 },
 {
  "nombre": "K***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Este producto me encanta!! ya lo he comprado varias veces porque me gusta mucho, recomendadisimo.",
  "estrellas": 5,
  "fecha": "11/12/2025"
 },
 {
  "nombre": "4***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "lo recomiendo totalmente para ti que eres poco cuidada con tu rostro excelente producto para hidratación",
  "estrellas": 5,
  "fecha": "10/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "La presentación es preciosa, y el producto es genial, no es pesado ni te acalora así que es perfecto en primavera y verano humectando y dejando un acabado ligero",
  "estrellas": 5,
  "fecha": "13/03/2026"
 },
 {
  "nombre": "d***e",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Pedido realizado el 25 de diciembre y recibido hoy. Entrega ultrarrápida 🙏 Son perfectos, huelen genial y dejan la piel muy suave. Veremos en los próximos días, pero soy optimista. Gracias al vendedor por la rapidez y la calidad 🤗.",
  "estrellas": 5,
  "fecha": "03/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, recomiendo su compra, tengo varios meses usando esta marca del producto, vino bien empaquetado, buena calidad, buen embalaje, muchas gracias vendedor, seguiré comprando, ya que ahora es una rutina de uso y cumple con la descripción del producto 😀",
  "estrellas": 5,
  "fecha": "23/06/2026"
 },
 {
  "nombre": "t***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy satisfecho con este producto, es una compra recurrente. Gran precio por 2 artículos",
  "estrellas": 5,
  "fecha": "11/10/2025"
 },
 {
  "nombre": "R***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, recomiendo su compra, llegó dentro del tiempo estimado, muchas gracias al vendedor 😀",
  "estrellas": 5,
  "fecha": "30/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, lo recomiendo ampliamente 👌",
  "estrellas": 5,
  "fecha": "08/10/2025"
 },
 {
  "nombre": "j***j",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Utilizo esto como base para aplicar mi maquillaje, y parece funcionar muy bien.",
  "estrellas": 5,
  "fecha": "24/02/2026"
 },
 {
  "nombre": "a***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy agradable y humectante, con un aroma suave que no es abrumador (tengo la nariz muy sensible a los aromas). Un aroma muy suave a rosa/floral. La piel queda muy hidratada y suave después de usarlo, pero no me deja una sensación grasosa, lo cual es genial.",
  "estrellas": 5,
  "fecha": "12/11/2025"
 },
 {
  "nombre": "N***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Genial, tal como se describe, hidratante para la piel y los ojos.",
  "estrellas": 5,
  "fecha": "24/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "He comprado esto varias veces y me lo he puesto en el cuello; es muy hidratante. buen producto",
  "estrellas": 5,
  "fecha": "07/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente para piel madura que desea textura ligera y natural, cpbertura media, se ajusta a cualquier tono de piel.",
  "estrellas": 5,
  "fecha": "09/11/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Es una barrita con aspecto de vaselina , al aplicarla tiene buen olor ( no mucho) y resulta agradable .Queda un aspecto glow y la piel lo absorbe, no queda como una capa impermeable sino que hidrata.De momento me gusta y me resulta agradable",
  "estrellas": 5,
  "fecha": "24/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Super hidratante, excelente para los ojos",
  "estrellas": 5,
  "fecha": "10/03/2026"
 },
 {
  "nombre": "E***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "es la segunda vez que pido uno, es hidratante",
  "estrellas": 5,
  "fecha": "13/12/2025"
 },
 {
  "nombre": "A***z",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "super hidratante es la segunda vez que compro lo recomiendo",
  "estrellas": 5,
  "fecha": "07/01/2026"
 },
 {
  "nombre": "L***R",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy hidratante, no irrita ni pica, ligero aroma (agradable) que no molesta. Lo he probado en el contorno de los ojos",
  "estrellas": 5,
  "fecha": "10/10/2025"
 },
 {
  "nombre": "j***j",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Segunda compra. Lo uso para difuminar mi base de maquillaje, es realmente bueno y funciona muy bien para mí.",
  "estrellas": 5,
  "fecha": "27/02/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "está barra es una maravilla, la uso no solo para la cara, también para las manos,hidrata mucho",
  "estrellas": 5,
  "fecha": "06/02/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy práctico de usar y cabe perfectamente en el neceser.",
  "estrellas": 5,
  "fecha": "27/03/2026"
 },
 {
  "nombre": "a***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "es excelente , solo debes usar un poco pero no es KOREANO! ES CHINO su origen",
  "estrellas": 5,
  "fecha": "15/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Es muy hidratante, pero se siente pesado y grasoso en la piel. Se siente muy bien en los labios. Suelo tener los codos muy secos, así que probé un poco y funcionó de maravilla (solo un toque extra :))",
  "estrellas": 5,
  "fecha": "25/11/2025"
 },
 {
  "nombre": "J***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encantó esta crema en forma de rodillo, ya la probé y se siente maravillosa en la piel 👍👍👍👍 La recomiendo.",
  "estrellas": 4,
  "fecha": "14/02/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Perfecto, hidrató muy bien mi rostro, me encantó, solo que el olor no es muy agradable, pero todo llegó en buen estado.",
  "estrellas": 5,
  "fecha": "27/08/2026"
 },
 {
  "nombre": "s***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "¡Súper! Hermoso en los pómulos.",
  "estrellas": 5,
  "fecha": "31/12/2025"
 },
 {
  "nombre": "E***.",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy hidratante, usado en zona ojera no irritante",
  "estrellas": 5,
  "fecha": "14/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Producto práctico, ideal para llevar en el bolso, hidrata bien, y tiene un empaque hermoso.",
  "estrellas": 5,
  "fecha": "15/09/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Los uso mucho y también los regalo; hidratan muy bien.",
  "estrellas": 4,
  "fecha": "18/03/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Aroma muy ligero y agradable. La saturación del color no está presente, es más como un protector de piel graso en barra.",
  "estrellas": 5,
  "fecha": "30/11/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encanta este producto... es mi segunda compra y funciona de maravilla... compra más, te va a encantar. 💓",
  "estrellas": 5,
  "fecha": "02/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me gusta y lo uso a diario",
  "estrellas": 4,
  "fecha": "08/12/2025"
 },
 {
  "nombre": "K***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Tiene buen tamaño, se siento rico en la piel te la deja brillosita, me gustó la textura, lo volvería a comprar.",
  "estrellas": 5,
  "fecha": "12/10/2025"
 },
 {
  "nombre": "L***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Tenía muchas ganas de tener este producto ya he probado este tipo de productos y me gusta mucho",
  "estrellas": 5,
  "fecha": "10/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Todo estuvo bien con la compra, volvería a comprar. Me gustó el producto.",
  "estrellas": 5,
  "fecha": "08/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "todavía no lo e probado pero este vendedor se merece un10000 rápido bien envuelto todo perfecto y rápido sind duda comprare todo el",
  "estrellas": 5,
  "fecha": "31/05/2026"
 },
 {
  "nombre": "M***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Súper, maravilloso para mi piel seca y mixta. Estoy muy satisfecho, gracias 🤌🏻💕",
  "estrellas": 5,
  "fecha": "21/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "el pedido llegó rapidísimo, la textura, es ligera y cremosa, se extiende fácilmente y el olor muy sutil también.",
  "estrellas": 5,
  "fecha": "10/06/2026"
 },
 {
  "nombre": "E***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, mi piel está radiante y bien hidratada. Estoy muy contenta con él, me siento como si tuviera 30 años cuando me miro en el espejo. Este verano cumpliré 51.",
  "estrellas": 5,
  "fecha": "08/06/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Esta es la tercera vez que hago un pedido. Estoy satisfecho con el producto. Realmente hidrata la piel.",
  "estrellas": 5,
  "fecha": "06/03/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Lápiz labial moderno y elegante para todas las ocasiones, perfecto para los labios. Entrega rápida. Empaque impecable.",
  "estrellas": 5,
  "fecha": "04/03/2026"
 },
 {
  "nombre": "n***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Estimado vendedor, muchas gracias por la rápida entrega, el paquete llegó en perfectas condiciones. Estoy muy satisfecho con esto.",
  "estrellas": 5,
  "fecha": "20/12/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "me gustó, hidrata bastante bien. deja la piel muy suave, tiene un aroma delicioso",
  "estrellas": 5,
  "fecha": "12/03/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy buena calidad y cumple con lo que promete.",
  "estrellas": 5,
  "fecha": "14/03/2026"
 },
 {
  "nombre": "a***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Buena textura eh hidratación",
  "estrellas": 5,
  "fecha": "30/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Tiene un olor muy rico y es humectante",
  "estrellas": 5,
  "fecha": "13/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Tiene buena pinta. Huele bien. Tamaño adecuado al precio.",
  "estrellas": 5,
  "fecha": "29/05/2026"
 },
 {
  "nombre": "C***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, mi piel ha mejorado, se ve más joven y fresca.",
  "estrellas": 5,
  "fecha": "08/03/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Llevo muchísimos años comprando en AliExpress y estoy encantada",
  "estrellas": 5,
  "fecha": "21/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Realmente me gusta, hidrata y da un toque agradable de luminosidad.",
  "estrellas": 5,
  "fecha": "10/10/2025"
 },
 {
  "nombre": "M***o",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "¡Ya lo compré y me gustó mucho! Ahora estoy comprando el par nuevamente.",
  "estrellas": 5,
  "fecha": "11/12/2025"
 },
 {
  "nombre": "l***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Representa perfectamente lo que indicó el vendedor. Lo recomiendo.",
  "estrellas": 5,
  "fecha": "10/02/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encantó el producto. La entrega fue súper rápida. 5 estrellas",
  "estrellas": 5,
  "fecha": "11/05/2026"
 },
 {
  "nombre": "E***m",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Está muy bien,el color no sube mucho se mantiene bien",
  "estrellas": 5,
  "fecha": "26/11/2025"
 },
 {
  "nombre": "W***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy buen aplicador para usar. El aplicador se extiende bien y se siente genial.",
  "estrellas": 5,
  "fecha": "21/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Aún no probado en la piel, pero según las reseñas parece muy bueno.",
  "estrellas": 5,
  "fecha": "19/11/2025"
 },
 {
  "nombre": "A***n",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Funciona bien, altamente recomendado.",
  "estrellas": 5,
  "fecha": "19/05/2026"
 },
 {
  "nombre": "M***o",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excepcional desde el primer uso",
  "estrellas": 5,
  "fecha": "02/12/2025"
 },
 {
  "nombre": "Н***р",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Gran producto, aroma agradable, textura agradable.",
  "estrellas": 5,
  "fecha": "25/10/2025"
 },
 {
  "nombre": "a***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Un aroma ligero y agradable, funciona muy bien.",
  "estrellas": 5,
  "fecha": "12/04/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "estoy muy contenta con el articulo",
  "estrellas": 5,
  "fecha": "04/02/2026"
 },
 {
  "nombre": "m***t",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "muy satisfecha con el producto",
  "estrellas": 5,
  "fecha": "23/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encanta este producto.",
  "estrellas": 5,
  "fecha": "18/02/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente bálsamo para la piel 🌟 🌟 🌟 🌟 🌟",
  "estrellas": 5,
  "fecha": "16/02/2026"
 },
 {
  "nombre": "a***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Es muy agradable, me gusta.",
  "estrellas": 5,
  "fecha": "30/09/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente humectante. Me encanta.",
  "estrellas": 5,
  "fecha": "27/05/2026"
 },
 {
  "nombre": "C***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Me encantooo me deja la piel húmeda e hidratada",
  "estrellas": 5,
  "fecha": "18/12/2025"
 },
 {
  "nombre": "M***l",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Bastante bien. Recomendado",
  "estrellas": 5,
  "fecha": "03/01/2026"
 },
 {
  "nombre": "s***e",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Producto excelente, envío muy rápido, es mi segundo pedido.",
  "estrellas": 5,
  "fecha": "31/10/2025"
 },
 {
  "nombre": "I***o",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Se siente genial en la cara",
  "estrellas": 5,
  "fecha": "17/04/2026"
 },
 {
  "nombre": "n***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Super hidratante y huele muy bien",
  "estrellas": 5,
  "fecha": "16/12/2025"
 },
 {
  "nombre": "m***t",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "satisfecha con el producto",
  "estrellas": 5,
  "fecha": "09/12/2025"
 },
 {
  "nombre": "T***S",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Práctico, fácil de usar y muy bueno",
  "estrellas": 5,
  "fecha": "08/07/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "se siente liviana y muy rica",
  "estrellas": 5,
  "fecha": "07/08/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente producto, altamente recomendado 🙂",
  "estrellas": 5,
  "fecha": "08/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Un producto calidad-precio increíble,la entrega fantastica,un chico muy amable y mono me lo dió en mano.",
  "estrellas": 4,
  "fecha": "07/07/2026"
 },
 {
  "nombre": "Х***а",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Aún no lo he usado, pero está bien empaquetado y tiene buena apariencia; veremos cómo funciona en la práctica.",
  "estrellas": 5,
  "fecha": "23/12/2025"
 },
 {
  "nombre": "c***y",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Muy bueno, excelente relación calidad-precio",
  "estrellas": 5,
  "fecha": "31/05/2026"
 },
 {
  "nombre": "o***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Un producto que vale cada centavo",
  "estrellas": 5,
  "fecha": "08/12/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Recomiendo a este vendedor.",
  "estrellas": 5,
  "fecha": "21/04/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "llegó en perfectas condiciones",
  "estrellas": 5,
  "fecha": "11/03/2026"
 },
 {
  "nombre": "a***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "¡Parece genial! ¡Solo lo he usado un par de veces! ¡Me gusta mucho!",
  "estrellas": 4,
  "fecha": "05/06/2026"
 },
 {
  "nombre": "Z***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Bastante hidratante, aunque no dura mucho tiempo.",
  "estrellas": 5,
  "fecha": "09/11/2025"
 },
 {
  "nombre": "k***o",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "llegaron bien, muy buenos",
  "estrellas": 4,
  "fecha": "15/10/2025"
 },
 {
  "nombre": "b***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "da mucho brillo hidrata mucho",
  "estrellas": 4,
  "fecha": "10/11/2025"
 },
 {
  "nombre": "S***t",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Estos productos ayudan a suavizar la piel y, la verdad, me encanta que realmente funcionen.",
  "estrellas": 5,
  "fecha": "01/04/2026"
 },
 {
  "nombre": "D***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "¡Gracias de nuevo, vendedores! ¡Esto es tan hidratante! ! 🌸 🌸",
  "estrellas": 5,
  "fecha": "07/12/2025"
 },
 {
  "nombre": "A***z",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "barras super hidratantes es la segunda vez que compro",
  "estrellas": 5,
  "fecha": "07/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Paquete recibido. Aún no lo he probado, pero tiene muy buena pinta y huele bien. Espero obtener buenos resultados.",
  "estrellas": 5,
  "fecha": "05/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Acabo de probarlo y es un buen bálsamo hidratante. Veremos cómo funciona en unas semanas. Llegó como un par, tal como se describía.",
  "estrellas": 5,
  "fecha": "11/06/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Estoy muy, muy feliz con el producto, y que Dios bendiga al vendedor por mí, porque ni siquiera esperaba que fuera exactamente lo que vi en la plataforma. Me encanta",
  "estrellas": 5,
  "fecha": "09/09/2026"
 },
 {
  "nombre": "T***g",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Huele bien, compré 2 del mismo tamaño. como se muestra en las imágenes. La entrega fue rápida.",
  "estrellas": 5,
  "fecha": "18/11/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Es un producto realmente muy bueno.",
  "estrellas": 5,
  "fecha": "02/11/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Estoy satisfecho con esto, gracias. vendedor",
  "estrellas": 5,
  "fecha": "26/06/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "llegó a tiempo, aún no lo uso pero lo probaré y subiré mi opinión del producto",
  "estrellas": 5,
  "fecha": "24/02/2026"
 },
 {
  "nombre": "C***y",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Bálsamo facial de alta calidad",
  "estrellas": 5,
  "fecha": "10/06/2026"
 },
 {
  "nombre": "l***l",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "El paquete llegó rápido y en buen estado.",
  "estrellas": 5,
  "fecha": "07/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Llegó bien empaquetado, en buen estado.",
  "estrellas": 5,
  "fecha": "12/01/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "es la primera vez que compro, leí y se oye prometedor, llegaron mis 4 productos, ansiosa por probarlos, muchas gracias Aliexpress y al vendedor",
  "estrellas": 4,
  "fecha": "29/03/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Producto tal como se describe. Buena relación calidad-precio.",
  "estrellas": 5,
  "fecha": "15/01/2026"
 },
 {
  "nombre": "J***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "No me llegó nunca pero me devolvieron el dinero pero tengo que decir que el producto es muy bueno ya que otras beses lo e comprado",
  "estrellas": 5,
  "fecha": "10/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "rápido y en buenas condiciones lo probaré para ver que tal",
  "estrellas": 5,
  "fecha": "27/05/2026"
 },
 {
  "nombre": "E***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Entrega rápida. Aroma muy agradable. Primera vez comprando.",
  "estrellas": 4,
  "fecha": "04/01/2026"
 },
 {
  "nombre": "S***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Excelente servicio y entrega.",
  "estrellas": 5,
  "fecha": "15/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Gracias. Llegó en excelentes condiciones.",
  "estrellas": 5,
  "fecha": "30/09/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "El artículo llego bien y rápido a Chile... hidrata bastante...",
  "estrellas": 4,
  "fecha": "08/10/2025"
 },
 {
  "nombre": "v***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Fantástico, excelente, potente hidrante.",
  "estrellas": 5,
  "fecha": "21/02/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Recibido en buen estado. Aún no lo ha probado.",
  "estrellas": 5,
  "fecha": "02/12/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Llegó con el embalaje dañado, pero está en perfectas condiciones.",
  "estrellas": 5,
  "fecha": "16/07/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "llego en perfecto estado lo probare",
  "estrellas": 5,
  "fecha": "14/11/2025"
 },
 {
  "nombre": "i***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "❤️❤️❤️❤️❤️❤️❤️❤️❤️🥰🥰🥰🥰🥰♥️♥️♥️♥️♥️♥️",
  "estrellas": 5,
  "fecha": "23/03/2026"
 },
 {
  "nombre": "C***z",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "gracias llego bien el producto",
  "estrellas": 5,
  "fecha": "25/01/2026"
 },
 {
  "nombre": "C***s",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Recibido, pero aún no lo he probado. Buen embalaje. Envío rápido.",
  "estrellas": 5,
  "fecha": "30/10/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Aún no lo he probado, pero se ve muy bien.",
  "estrellas": 5,
  "fecha": "03/10/2025"
 },
 {
  "nombre": "M***a",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Llego muy rápido,aún no lo e probado.",
  "estrellas": 5,
  "fecha": "12/05/2026"
 },
 {
  "nombre": "E***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "espero k vaya bien, aún no lo probe",
  "estrellas": 5,
  "fecha": "21/11/2025"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Aún no lo he usado, pero parece ser bueno.",
  "estrellas": 5,
  "fecha": "07/05/2026"
 },
 {
  "nombre": "Anónimo",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "Es como en la foto, no lo he probado.",
  "estrellas": 5,
  "fecha": "08/09/2026"
 },
 {
  "nombre": "o***r",
  "comuna": "",
  "producto": "Bálsamo de Colágeno Rosetimes",
  "texto": "¡Vaya, un producto de misiles!",
  "estrellas": 5,
  "fecha": "21/11/2025"
 }
]);
