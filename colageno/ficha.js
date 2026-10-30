/* ============================================================
   FICHA DE PRODUCTO · Jaye Group Chile

   El orden lo definio el dueno:
     1 galeria (varias fotos)      6 resenas
     2 estrellas de las resenas    7 preguntas frecuentes
     3 precio y nombre             8 sellos de las transportadoras
     4 promocion (packs)           9 te puede interesar
     5 descripcion                10 formulario

   Cada producto es independiente: producto.html?p=antena es el enlace que se
   pone en la campana y lleva directo a su ficha.

   29-10 MÉXICO · jayegroupshop.com/colageno/ — copia del motor de Chile para el
   colágeno NeoCell (James: "déjala igualita. Lo único que vas a cambiar son los
   precios y el formulario de México"). Cambios: pesos mexicanos ($1,079), pago
   anticipado con los precios aprobados (pack.pre), formulario de México igual al
   del Brain (móvil +52 de 10 dígitos, calle y número, indicaciones, código
   postal, estado, municipio, colonia SEPOMEX y correo al final), pedido al flujo
   pedido-tienda-mx, PayPal en MXN (paypal-orden-mx / paypal-captura-mx), WhatsApp
   +52 55 9721 9871, paqueterías de Dropi México y sin upsell.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  /* Paises para el indicativo del WhatsApp. Chile primero porque es donde
     despachamos, y detras los de la region y los que mas migracion tienen
     aca: hay clientes que viven en Chile con numero de su pais y antes no
     podian pedir, porque el +56 estaba pintado y no se podia cambiar.
       [codigo, indicativo, largo esperado del numero, nombre]
     El largo se usa para avisar en los demas paises; en CHILE si bloquea
     (9 digitos, empieza por 9): un numero incompleto es una venta perdida. */
  /* 29-10 MÉXICO: solo México (+52, 10 dígitos), igual que el Brain (TEXTOS.paises en provincias-es.js) */
  var PAISES = (window.TEXTOS && window.TEXTOS.paises) || [['MX', '+52', 10, 'México']];
  var WA_MX = window.WA_NUM || '525597219871';   /* WhatsApp de México +52 55 9721 9871 */
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  /* 29-10 MÉXICO: pesos mexicanos con coma de miles ($1,079), sin decimales si son enteros */
  var pesos = function (n) { return '$' + Number(n).toLocaleString('es-MX', { minimumFractionDigits: Number(n) % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
  var ESTRELLA = '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7z"/></svg>';
  var estrellas = function (n) { var s = ''; for (var i = 0; i < 5; i++) s += ESTRELLA; return '<span class="est">' + s + '</span>'; };

  /* de que anuncio vino: el ?cmp se guarda para poder atribuir la venta.
     Vivia solo en app.js (landings viejas) y la tienda no lo cargaba. */
  try {
    var _q = new URLSearchParams(location.search);
    var _c = _q.get('cmp') || _q.get('utm_campaign') || '';
    if (_c) { try { localStorage.setItem('_cmp', _c); } catch (e) {} window._CMP = _c; }
    else { try { window._CMP = localStorage.getItem('_cmp') || ''; } catch (e) { window._CMP = ''; } }
  } catch (e) { window._CMP = ''; }

  var id = window.__P || new URLSearchParams(location.search).get('p');
  var TODOS = window.PRODUCTOS || [];
  var p = TODOS.find(function (x) { return x.id === id; });
  var cont = $('prod');

  if (!p) {
    cont.innerHTML = '<div class="datos"><h1>Producto no encontrado</h1>'
      + '<p class="sub">Puede que ya no esté disponible.</p>'
      + '<a class="cta negro" href="/" style="width:auto;display:inline-block;padding:14px 26px">Ver la tienda</a></div>';
    return;
  }

  /* candado: si algun precio no esta en la lista aprobada, no se vende */
  var ok = (p.packs || []).every(function (k) { return (window.PRECIOS_APROBADOS || []).indexOf(k.precio) >= 0; });
  if (!ok) {
    cont.innerHTML = '<div class="datos"><h1>' + esc(p.nombre) + '</h1>'
      + '<p class="sub">Este producto no está disponible por ahora.</p>'
      + '<a class="cta negro" href="/" style="width:auto;display:inline-block;padding:14px 26px">Ver la tienda</a></div>';
    return;
  }

  window.PRODUCTO_ACTUAL = p;

  /* El panel de Jaye (visitas y conversion) lee de Postgres y muestra sola
     cualquier pagina que reporte. La tienda nueva no reportaba nada, por eso
     no aparecia. Se reporta igual que las landings viejas, pero con un slug
     por producto para que cada uno tenga su propia fila. */
  window.avisarPanel = function (tipo) {
    try {
      fetch('https://n8n-production-8a42.up.railway.app/webhook/track-visita', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        /* 29-10 MÉXICO: misma forma que el Brain ('mx-…' y ' · México') para que el panel no lo mezcle con Chile */
        body: JSON.stringify({ pagina: 'mx-colageno', producto: p.nombre + ' · México', tipo: tipo }),
      }).catch(function () {});
    } catch (e) {}
  };
  /* una visita por sesion y por producto: si recarga, no cuenta de nuevo */
  try {
    var clave = 'jaye_vis_' + p.id;
    if (!sessionStorage.getItem(clave)) { sessionStorage.setItem(clave, '1'); window.avisarPanel('visita'); }
  } catch (e) { window.avisarPanel('visita'); }

  /* pixel: que Meta sepa que producto se vio y con que precio */
  /* con jayePixel el evento viaja con su `event_id`, que es lo que deja
     mandar la misma venta desde el servidor sin que Meta la duplique */
  if (window.jayePixel) window.jayePixel.track('ViewContent', { content_name:p.nombre, content_type:'product',
    content_ids:[p.id], value:p.packs[0].precio, currency:'MXN' });
  else if (window.fbq) try { fbq('track','ViewContent',{ content_name:p.nombre, content_type:'product',
    content_ids:[p.id], value:p.packs[0].precio, currency:'MXN' }); } catch (e) {}   // lo usa efectos.js para marcar la categoria
  document.title = p.nombre + ' · Jaye Group México';
  var meta = document.querySelector('meta[name="description"]');
  if (meta && p.sub) meta.setAttribute('content', p.sub + ' · Envío gratis a todo México, pagas al recibir.');
  /* El color del producto manda en botones y secciones. Si no trae, se queda
     el rojo de siempre. Tambien se calcula un tono mas oscuro para sombras y
     degradados. */
  /* Elige letra clara u oscura segun cual se LEA mejor sobre el color.
     Antes se usaba la formula vieja (YIQ, corte en 150) y se equivocaba con
     los colores saturados: al turquesa de los lentes le ponia letra blanca
     y quedaba en 2.6 de contraste. Ahora se mide el contraste real de las
     dos opciones y gana la mayor, que nunca falla. */
  function luminancia(hex) {
    var n = parseInt(String(hex).replace('#', ''), 16);
    var c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function letraSobre(hex) {
    var L = luminancia(hex);
    var contraste = function (otra) {
      var a = Math.max(L, otra), b = Math.min(L, otra);
      return (a + 0.05) / (b + 0.05);
    };
    return contraste(luminancia('#171510')) >= contraste(luminancia('#ffffff')) ? '#171510' : '#fff';
  }
  function oscurece(hex, cuanto) {
    var n = parseInt(String(hex).replace('#', ''), 16);
    var r = Math.max(0, ((n >> 16) & 255) - cuanto);
    var g = Math.max(0, ((n >> 8) & 255) - cuanto);
    var b = Math.max(0, (n & 255) - cuanto);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  /* Los circulos de los iconos van negros con el icono del color del producto.
     Si el color es muy oscuro no se ve encima del negro (le pasa al azul de la
     antena), y entonces ese producto los lleva blancos con borde de su color.
     Se pide con iconoClaro: true en productos.js. */
  if (p.iconoClaro) document.documentElement.classList.add('ico-claro');
  if (p.acento) {
    var raiz = document.documentElement.style;
    raiz.setProperty('--acento', p.acento);
    /* un producto puede llevar DOS colores: el principal y otro para los
       avisos (descuento, mas vendido). Si no trae el segundo, se usa el
       principal mas oscuro. */
    raiz.setProperty('--acento2', p.acento2Manual || oscurece(p.acento, 34));
    raiz.setProperty('--aviso', p.acento2Manual || p.acento);
    /* El segundo boton. Si el producto no trae color propio se usa EL SUYO,
       no el azul fijo del css: en el foco (salmon) salia un boton azul que
       no pintaba nada. La mascara si trae el suyo, negro. */
    var alt = p.botonAlt || p.acento;
    raiz.setProperty('--cta2', alt);
    raiz.setProperty('--sobreCta2', letraSobre(alt));
    raiz.setProperty('--sobreAviso', letraSobre(p.acento2Manual || p.acento));
    /* sobre un color claro (el dorado) la letra blanca no se lee: se pone negra */
    raiz.setProperty('--sobreAcento', letraSobre(p.acento));
  }

  /* el pack destacado: el que el dueno marco como popular, o el de mejor precio por unidad */
  var iPop = (typeof p.popular === 'number' && p.packs[p.popular]) ? p.popular
    : p.packs.reduce(function (mejor, k, i) {
        return (k.precio / k.cant) < (p.packs[mejor].precio / p.packs[mejor].cant) ? i : mejor; }, 0);
  /* Arriba va el PRECIO DE SALIDA (el primero de la escalera): es el numero
     mas bajo y es el que no espanta al que recien entra. El pack que se
     empuja no se pierde: tiene su propia seccion de PROMOCION mas abajo,
     con contador, y ese pack lo elige el dueno en el campo `promo`. */
  /* 🔴 James, 11-sep: «en el formulario siempre seleccione el MAS VENDIDO».
     Antes arrancaba en 0 (el pack de entrada). Ahora arranca en el pack
     destacado, que es el mismo que lleva la etiqueta «Más vendido».
     OJO: esta variable no solo pinta la seleccion, tambien manda el precio y
     la cantidad del pedido, asi que se cambia aca y todo queda en linea. */
  var elegido = iPop;
  /* Upsells post-compra, uno por producto. Todos viajan en la MISMA guia que
     el pedido, asi que no pagan flete aparte: por eso el extra tiene que ser
     del MISMO proveedor. Si un producto no esta en esta lista, no se le
     ofrece nada y todo se comporta igual que antes.                        */
  /* Magnesio Complex x 90 capsulas (Dropi 118987, VITALCOM, costo 4.700).
     James 16-sep: pasa a ser el upsell de la CLOROFILA y de la LYMPHORIA
     (antes: Lymphoria y Colageno). MISMO proveedor que las dos, asi que va en
     la misma caja y no paga flete. Precios de James: 1 u. 9.500 · 2 u. 17.500.
     🔴 SUPLEMENTO (D.S. 977/96): nada de tratar ni prevenir enfermedades ni de
     posologia; solo lo que declara el envase. La placa la hace James.
     El precio vive tambien en el flujo n8n «Upsell Magnesio»: cambiar los dos. */
  var MAGNESIO = { nombre: 'Magnesio Complex 90 cáps',
    webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-magnesio',
    foto: 'img/magnesio.webp',
    beneficios: ['90 cápsulas', 'Contribuye a la función muscular normal',
      'Contribuye a disminuir el cansancio', 'Va en el mismo envío, sin flete'],
    /* colores provisorios: se ajustan a la placa de James cuando llegue */
    tema: { osc: '#14385C', med: '#2F7FB8', btnA: '#1D5A8C', btnB: '#3C9AD6',
            texto: '#14385C', borde: '#d3e4f2', suave: '#f2f7fc', foto: '#0f2c48',
            sombra: '29,90,140' },
    opciones: [{ cant: 1, precio: 9500 }, { cant: 2, precio: 17500 }] };
  var UPSELLS = {
    /* Cabezal de ducha -> Gel Sellador (Dropi 144587) */
    ducha: { nombre: 'Gel Sellador Invisible 300g',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-sellador',
      foto: 'img/sellador.webp',
      beneficios: ['Sella filtraciones y humedad', 'Queda invisible: no cambia el color',
        'Sirve en concreto, ladrillo, ceramica y madera', 'Se aplica con brocha, listo para usar'],
      opciones: [{ cant: 1, precio: 6000 }, { cant: 2, precio: 9990 }] },
    /* Cepillo de parrilla -> Encendedor de arco (Dropi 91919) */
    cepillo: { nombre: 'Encendedor Eléctrico de Arco',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-encendedor',
      foto: 'img/encendedor.webp',
      beneficios: ['Enciende la parrilla sin fósforos ni gas', 'Recargable por USB: no se acaba',
        'Cuello largo y flexible: no te quemas', 'Doble seguro para que no prenda solo'],
      opciones: [{ cant: 1, precio: 4950 }, { cant: 2, precio: 7950 }] },
    /* Clorofila -> Lymphoria Drenaje Linfatico (Dropi 159173).
       Es el caso mas limpio de los tres: MISMO proveedor (VITALCOM), MISMA
       bodega (Recoleta) y mismo formato de 60 ml en gotas, asi que el frasco
       extra entra en la misma caja y no paga un peso de flete.
       🔴 LIMITE LEGAL: es un SUPLEMENTO ALIMENTARIO. El D.S. 977/96 prohibe
       promocionarlo para prevenir o tratar enfermedades y prohibe indicar
       posologia. Los beneficios de aca usan «favorece» y «apoya», que es lo
       que declara el propio fabricante en el envase, y NO se dice que
       desinflama, que baja la hinchazon ni cuantas gotas tomar. La competencia
       lo anuncia con «no mas hinchazon»: ese es su riesgo, no el nuestro. */
    /* 16-sep: la clorofila y la lymphoria pasan al MAGNESIO (arriba). Los dos
       upsells viejos quedan guardados con otra llave, que no coincide con
       ningun producto, por si James quiere volver a ellos. */
    clorofila: MAGNESIO,
    lymphoria: MAGNESIO,
    /* 29-10 MÉXICO: sin upsell (en Chile el colágeno llevaba el magnesio; México no tiene upsell) */
    viejo_clorofila_lymphoria: { nombre: 'Drenaje Linfático Lymphoria',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-lymphoria',
      foto: 'img/lymphoria.webp',
      beneficios: ['Favorece el sistema linfático', 'Apoya las defensas naturales',
        'Ingredientes naturales', 'Bienestar general'],
      /* los verdes salen de la propia placa: el verde bosque de la caja y el
         verde claro de los circulos. Con el azul de los otros upsells la
         ventana no parecia del mismo producto que la foto. */
      tema: { osc: '#123A28', med: '#2E7D4F', btnA: '#1B5E3A', btnB: '#3AA05F',
              texto: '#123A28', borde: '#cfe6d9', suave: '#f2f8f4', foto: '#0d2b1a',
              sombra: '27,94,58' },
      /* los dos a 22.000 los fijo James el 10-sep (venian en 19.990) */
      opciones: [{ cant: 1, precio: 12990 }, { cant: 2, precio: 22000 }] },
    /* Lymphoria -> Colageno Neocell (Dropi 142607). Otra vez el caso limpio:
       MISMO proveedor (VITALCOM) y MISMA bodega (Recoleta), asi que el tarro
       entra en la misma caja y no paga flete aparte.
       Precios de James, 12-sep: 1 tarro 12.990 · 2 tarros 22.500.
       🔴 Es un SUPLEMENTO: los beneficios de aca son los que declara el propio
       envase («favorece», «contribuye», «apoya»). El mismo bote avisa que no
       se use para bajar de peso, asi que eso NO se insinua ni de lejos. */
    viejo_lymphoria_colageno: { nombre: 'Colágeno Neocell Bio-Peptides',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-colageno',
      foto: 'img/colageno.webp',
      beneficios: ['20 g de colágeno por porción', 'Favorece la firmeza y elasticidad de la piel',
        'Contribuye a huesos, articulaciones, cabello y uñas', 'Sin sabor: se mezcla en agua, café o jugo'],
      /* los azules salen del propio tarro: el azul del envase y el de sus
         circulos. Con el verde de la Lymphoria la ventana no parecia del
         producto de la foto (James, 12-sep: «utiliza los colores del producto») */
      tema: { osc: '#0B4C82', med: '#1E9BE0', btnA: '#0E77C0', btnB: '#35B5F2',
              texto: '#0B4C82', borde: '#cfe6f8', suave: '#f1f8fe', foto: '#0a3a63',
              sombra: '14,119,192' },
      opciones: [{ cant: 1, precio: 12990 }, { cant: 2, precio: 22500 }] },
    /* Organizador -> Aislante de Puerta Grueso (Dropi 109642). MISMO proveedor
       (MEIBO.CL) y MISMA bodega (Santiago), asi que va en la misma caja del
       organizador y no paga flete aparte. Le cuesta $1.000 al proveedor y
       tiene 4.893 de stock (16-sep). Precios propuestos 16-sep: 1 u. 7.990 ·
       2 u. 11.990. Los grises y el madera salen de la propia foto del
       producto (James: «utiliza los colores del producto»). */
    /* 18-10 James: QUITADO. Chamos (proveedor actual del organizador) no tiene el aislante; con la clave cambiada la ficha ya no lo ofrece. */
    organizador_QUITADO_1810: { nombre: 'Aislante de Puerta Grueso',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-aislante',
      foto: 'img/aislante.webp',
      beneficios: ['Tapa la rendija de abajo de la puerta', 'Frena el polvo, el ruido y la corriente de aire',
        'No entran bichos por debajo', 'Se desliza por debajo: sin pegar ni atornillar'],
      /* James 16-sep: «ponle publicidad… evita la mugre, que entren bichos,
         animales». En esta ventana el texto de «Antes de despachar tu
         paquete» se cambia por este titular y estas cuatro ventajas. Los
         demas upsells no traen «anuncio» y siguen con su texto de siempre. */
      anuncio: { titulo: 'Sella la rendija de tu puerta',
        puntos: ['Evita el polvo y la mugre', 'No entran insectos ni ratones',
                 'Frena el frío y las corrientes', 'Baja el ruido de afuera'] },
      tema: { osc: '#2F343C', med: '#7A5C43', btnA: '#3E4450', btnB: '#8A6A4E',
              texto: '#2F343C', borde: '#dcdfe4', suave: '#f4f5f7', foto: '#2a2d33',
              sombra: '62,68,80' },
      opciones: [{ cant: 1, precio: 7990 }, { cant: 2, precio: 11990 }] },
    /* Bálsamo de colágeno Rosetimes -> Shampoo Batana (Dropi 126537). MISMO
       proveedor (Importadora Oferfly), así que va en la misma caja y no paga
       flete aparte. Costo 3.000. James, 29-09: «que complemente, no que sea
       idéntico» (cara con el bálsamo, cabello con el shampoo) y «a nueve mil»:
       una sola opción. El precio vive también en el flujo n8n «Upsell Shampoo
       Batana»: cambiar los dos. 🔴 COSMÉTICO: se habla de apariencia y cuidado
       del cabello, no de curar la caída ni de crecimiento garantizado. */
    balsamo: { nombre: 'Shampoo Batana',
      webhook: 'https://n8n-production-8a42.up.railway.app/webhook/upsell-batana',
      foto: 'img/batana.webp',
      beneficios: ['Con aceite de batana, el clásico para el cabello', 'Limpia y deja el pelo más suave y con brillo',
        'Para todo tipo de cabello', 'Va en el mismo envío, sin flete'],
      /* los tonos salen del propio envase (café y ámbar del aceite de batana) */
      tema: { osc: '#3E2A1A', med: '#8A5A2B', btnA: '#5C3D22', btnB: '#A8753F',
              texto: '#3E2A1A', borde: '#e6d9cc', suave: '#f8f4ef', foto: '#2c1d12',
              sombra: '92,61,34' },
      opciones: [{ cant: 1, precio: 9000 }] }
  };
  /* la ventana post-compra vive fuera de este bloque, por eso se exponen */
  window.UPSELLS = UPSELLS;
  window.UPSELL_SELLADOR = UPSELLS.ducha;   /* se deja por si algo viejo lo llama */

  /* ---------- resenas de ESTE producto ---------- */
  var TODAS = window.RESENAS || [];
  var mias = TODAS.filter(function (r) {
    var t = (r.producto || '').toLowerCase(), n = p.nombre.toLowerCase();
    return t && (n.indexOf(t.split(' ')[0]) >= 0 || t.indexOf(n.split(' ')[0].toLowerCase()) >= 0);
  });
  /* Si un producto NUEVO no tiene textos propios en resenas.js cae aca, y esta
     tajada empieza por la Almohada: al Organizador le salian reseñas de
     "duermo de lado". El aviso deja el problema a la vista en la consola en
     vez de que se descubra mirando la pagina. */
  var prestadas = false;
  if (mias.length < 8) {
    try { console.warn('[resenas] "' + p.nombre + '" no tiene textos propios en resenas.js: '
      + 'esta mostrando las de otro producto. Agregalos ahi.'); } catch (e) {}
    /* 98 y no 40: James, 10-sep. Y el promedio se fuerza a 4,9 mas abajo
       porque con la tajada cruda quedaba en 4,8 igual que todos los demas. */
    mias = TODAS.slice(0, 98);
    prestadas = true;
  }
  /* sin repetir el mismo texto: salian dos resenas identicas seguidas */
  var textos = {};
  mias = mias.filter(function (r) {
    var k = String(r.texto || '').trim().toLowerCase();
    if (textos[k]) return false;
    textos[k] = 1; return true;
  });          // si no calzan, se usan las generales
  /* el carrusel de mas abajo tambien las necesita: sin esto tomaba
     window.RESENAS crudo y pintaba las de la Almohada */
  /* Producto NUEVO sin reseñas reales todavia (p.sinResenas): no se muestran las de otro
     producto ni estrellas inventadas. Las reales llegan con la postventa (James, 01-10). */
  if (p.sinResenas) { mias = []; prestadas = false; }
  /* Reseñas REALES de compradores de este mismo producto en otras tiendas (p.resenasReales),
     copiadas tal cual con su pais y fecha. Se rotulan como del PRODUCTO, nunca como
     "nuestros clientes" (misma regla que España, 25-09). James, 01-10: toda ficha lleva reseñas. */
  var reales = !!(p.resenasReales && p.resenasReales.length);
  if (reales) { mias = p.resenasReales.slice(); prestadas = false; }
  window.RESENAS_MIAS = mias;
  var prom = mias.length ? (mias.reduce(function (a, r) { return a + r.estrellas; }, 0) / mias.length) : 4.9;
  prom = Math.round(prom * 10) / 10;
  if (prestadas) prom = 4.9;   /* que no queden todos los nuevos en 4,8 */
  /* Resumen propio del producto (zapatero, 01-10): nota y total de un conjunto DICHO en la pagina
     ("70 opiniones de 4 y 5 estrellas"), no el conteo de las tarjetas que se muestran. */
  var RES = p.resenasResumen || null;
  if (RES) prom = RES.nota;
  var cuentaTxt = RES ? (RES.total + ' ' + RES.rotulo) : (mias.length + ' reseñas');

  /* ---------- 1 · galeria ---------- */
  var fotos = (p.fotos && p.fotos.length ? p.fotos : [p.foto]).filter(Boolean);
  var iFoto = 0;
  function pintarGaleria() {
    var marco = document.querySelector('.gal .marco');
    if (!marco) return;
    var f = fotos[iFoto];
    marco.innerHTML = f
      ? '<img src="' + esc(f) + '" alt="' + esc(p.nombre) + '" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'vacio\',textContent:\'' + esc(p.nombre.charAt(0)) + '\'}))">'
      : '<span class="vacio">' + esc(p.nombre.charAt(0)) + '</span>';
    document.querySelectorAll('.gal .puntos button').forEach(function (b, i) { b.setAttribute('aria-current', String(i === iFoto)); });
    document.querySelectorAll('.miniz button').forEach(function (b, i) { b.setAttribute('aria-current', String(i === iFoto)); });
  }
  function mover(d) { iFoto = (iFoto + d + fotos.length) % fotos.length; pintarGaleria(); }

  var galeria = '<div class="gal">'
    + '<div class="marco"></div>'
    + (fotos.length > 1
      ? '<button class="flecha izq" type="button" aria-label="Foto anterior"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>'
      + '<button class="flecha der" type="button" aria-label="Foto siguiente"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>'
      + '<div class="puntos">' + fotos.map(function (_, i) { return '<button type="button" aria-label="Foto ' + (i + 1) + '"></button>'; }).join('') + '</div>'
      : '')
    + '</div>'
    + (fotos.length > 1
      ? '<div class="miniz">' + fotos.map(function (f, i) {
          return '<button type="button" aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(f) + '" alt="" onerror="this.parentNode.style.display=\'none\'"></button>'; }).join('') + '</div>'
      : '');

  /* ---------- 2 y 3 · estrellas, precio y nombre ---------- */
  /* El precio grande de arriba nace con el PACK DE ENTRADA, no con el
     seleccionado: es el numero mas bajo y es el que no espanta al que recien
     entra (regla de James). El formulario si arranca en el mas vendido. */
  var kPop = p.packs[0];
  var off = kPop.antes ? Math.round((1 - kPop.precio / kPop.antes) * 100) : 0;
  var cabecera = '<div class="datos">'
    + (mias.length ? '<div class="estrellas">' + estrellas(prom)
    + '<span class="cuantas">' + prom.toFixed(1) + ' · <a href="#resenas">' + (RES ? RES.total + ' opiniones' : mias.length + ' reseñas') + '</a></span></div>' : '')
    + '<h1>' + esc(p.nombre) + '</h1>'
    + '<p class="sub">' + esc(p.sub) + '</p>'
    + '<div class="precioTop"><span class="ahora" id="pcAhora">' + pesos(kPop.precio) + '</span>'
    + (kPop.antes ? '<span class="antes" id="pcAntes">' + pesos(kPop.antes) + '</span>' : '')
    + (off ? '<span class="off" id="pcOff">-' + off + '%</span>' : '') + '</div>'
    /* El precio grande es el del PACK DE 2. Hay que decirlo debajo o el cliente
       cree que ese valor es por una sola unidad. Se muestra tambien cuanto le
       sale cada una, que es el argumento que cierra el pack. */
    + (kPop.cant > 1 ? '<p class="packDe" id="pcPack">' + esc(kPop.texto) + ' · ' + pesos(Math.round(kPop.precio / kPop.cant)) + ' cada ' + (p.unidad || 'una') + '</p>' : '<div style="height:10px"></div>')
    /* 04-10 James: el pago anticipado se ve arriba, junto al precio */
    + '<p class="preTop"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="2.2"/><path d="M2.5 10h19"/></svg>'
    + '<span>o <b id="pcPre">' + pesos(kPop.pre) + '</b> pagando ahora con tarjeta · <b class="preTop__tag">−10&nbsp;% y entrega prioritaria</b></span></p>'
    + '</div>';

  /* ---------- 4 · promocion ---------- */
  /* Los packs viven SOLO en el formulario: arriba repetian el precio grande
     y estorbaban. Aca queda el boton que baja al pedido. */
  var promo = '<section class="bloque">'
    + '<button class="cta rojo rebota" id="btnArriba">Lo quiero, pago al recibir</button>'
    + '<p class="ctaSub">Envío gratis · Paga al recibir o con tarjeta y ahorra 10 %</p></section>';

  /* 04-10 James: "todo lo que ganas con el pago anticipado", arriba, cerca de la promocion. El boton baja al
     formulario con "Paga ahora con tarjeta" ya elegido. */
  function seccionPagoAnt() {
    var ic = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };
    return '<section class="bloque pagoAnt" data-rv><div class="pagoAnt__caja">'
      + '<p class="pagoAnt__tit">Paga con tarjeta y gana</p>'
      + '<ul class="pagoAnt__lista">'
      + '<li>' + ic('<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>') + '<span><b>10 % de descuento</b> en todos los packs</span></li>'
      + '<li>' + ic('<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>') + '<span><b>Entrega prioritaria</b>: tu pedido sale primero</span></li>'
      + '<li>' + ic('<rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>') + '<span><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</span></li>'
      + '</ul>'
      + '<div class="pagoAnt__pie"><span class="logosPago logosAuto">' + ['paypal', 'visa', 'mastercard'].map(function (n) { return '<img src="img/pago-' + n + '.svg" data-logo="' + n + '" alt="' + ({ visa: 'Visa', mastercard: 'Mastercard', paypal: 'PayPal' })[n] + '" loading="lazy">'; }).join('') + '</span><button type="button" class="pagoAnt__btn" id="btnPagoAnt">Pagar con tarjeta</button></div>'
      + '</div></section>';
  }

  /* ---------- PROMOCION · el pack que se empuja, con contador ----------
     Arriba el cliente ve el precio de salida. Aca ve la oferta de verdad:
     que pack conviene, cuanto sale cada unidad y cuanto se ahorra.
     El pack lo elige el dueno producto por producto, en el campo `promo`:
       mascara 4 · lentes 2 · antena 4 · cargador 2 · foco 3
     Si el producto no trae `promo`, la seccion no aparece. */
  function seccionPromo() {
    if (typeof p.promo !== 'number') return '';
    var iP = p.packs.findIndex(function (k) { return k.cant === p.promo; });
    /* se compara contra el pack de ENTRADA, que es el que manda arriba. Con
       `elegido` la seccion se escondia sola al arrancar en el mas vendido. */
    if (iP < 0 || iP === 0) return '';
    var k = p.packs[iP];
    /* Precio de antes: el dueno lo quiere alrededor de un 80% por encima del
       de hoy, para que la diferencia se note. Se redondea a la centena. */
    var antes = Math.round(k.precio * 1.8 / 100) * 100;
    /* el producto puede pedir que la promo use el MISMO tachado del pack (zapatero, James 01-10):
       asi el pack no muestra dos "antes" distintos en la misma pagina */
    if (p.promoAntesDelPack && k.antes) antes = k.antes;
    var off = Math.round((1 - k.precio / antes) * 100);
    var ahorra = antes - k.precio;
    /* Todo va DENTRO de la caja: afuera no se notaba. */
    return '<section class="bloque promo-sec" data-rv>'
      + '<div class="promo-card">'
      + '<div class="promo-banner"><span class="chispa">★</span>Promoción<span class="promo-banner-sub">termina hoy</span></div>'
      + '<div class="promo-cuerpo">'
      + '<b class="promo-qt">' + esc(k.texto) + '</b>'
      + '<div class="promo-precios">'
      + '<span class="promo-antes">' + pesos(antes) + '</span>'
      + '<span class="promo-precio">' + pesos(k.precio) + '</span>'
      + '<span class="promo-off">-' + off + '%</span></div>'
      + '<p class="promo-uni">' + pesos(Math.round(k.precio / k.cant)) + ' cada ' + (p.unidad || 'una')
      + ' · <b>ahorras ' + pesos(ahorra) + '</b></p>'
      /* 04-10: el precio con tarjeta tambien en la promocion */
      + '<p class="promo-uni promo-tarjeta">o <b>' + pesos(k.pre) + '</b> pagando ahora con tarjeta · −10&nbsp;% y entrega prioritaria</p>'
      + '<div class="cuenta"><div><b id="cH">--</b><span>horas</span></div>'
      + '<div><b id="cM">--</b><span>min</span></div>'
      + '<div class="seg" id="cajaS"><b id="cS">--</b><span>seg</span></div></div>'
      + '<button class="cta rojo" id="btnPromo" data-i="' + iP + '">Quiero la promoción</button>'
      + '</div></div></section>';
  }


  /* ---------- 5 · descripcion ---------- */
  var desc = '<section class="bloque desc" data-rv><span class="eyebrow">El producto</span><h2 class="tit2">Qué es y para qué sirve</h2>'
    + (p.desc ? '<p>' + esc(p.desc) + '</p>' : '')
    + (p.puntos && p.puntos.length ? '<ul>' + p.puntos.map(function (x, i) { return '<li style="--i:' + i + '">' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
    + '</section>';

  /* ---------- 6 · resenas ---------- */
  var VER = 4;
  /* Las resenas CON FOTO del producto van primero: son las que dan confianza.
     Se quita la foto generica que traia resenas.js (esas son de la tienda) y
     se usan solo las del producto. */
  var fotosCli = p.fotosResenas || [];
  /* las reales traen SU propia foto (la del comprador que la escribio): no se tocan */
  if (!reales) mias = mias.map(function (r) { return Object.assign({}, r, { foto: '' }); });
  if (fotosCli.length && !reales) {
    var conFoto = mias.slice(0, fotosCli.length).map(function (r, i) {
      return Object.assign({}, r, { foto: fotosCli[i] });   /* nunca se repite una foto: una por resena, en orden */
    });
    mias = conFoto.concat(mias.slice(fotosCli.length));
  }
  function tarjetaResena(r) {
    return '<article class="rsc"><div class="arriba">'
      + '<span class="ini">' + esc((r.nombre || '?').charAt(0)) + '</span>'
      + '<span class="quien">' + esc(r.nombre)
      + '<i class="verif">✓ Verificado</i>'
      + '<small>' + esc(r.comuna ? r.comuna + ' · ' + (r.fecha || '') : (r.fecha || '')) + '</small></span>'
      + estrellas(r.estrellas) + '</div>'
      + '<p>' + esc(r.texto) + '</p>'
      + (r.foto ? '<img class="rfoto" src="' + esc(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '')
      + '</article>';
  }
  /* Resenas con el molde de NAD+: puntuacion grande, barras por estrella,
     boton de escribir, sello Verificado y carrusel automatico abajo. */
  var barras = (RES ? Object.keys(RES.barras).map(Number).sort(function (a, b) { return b - a; }) : [5, 4, 3, 2, 1]).map(function (e) {
    var n = RES ? RES.barras[e] : mias.filter(function (r) { return r.estrellas === e; }).length;
    var base = RES ? RES.total : mias.length;
    var pc = base ? Math.round(n / base * 100) : 0;
    /* la barra se llena con scaleX, asi que va la fraccion (0 a 1), no el % */
    return '<div class="bar"><span class="lvl">' + e + ' ★</span>'
      + '<div class="track"><i style="--p:' + (pc / 100) + '"></i></div><b>' + n + '</b></div>';
  }).join('');
  var resenas = '<section class="bloque rev-sec" id="resenas" data-rv>'
    /* p.resenasRotulo (desengrasante, 03-10): cuando las reseñas reales son del mismo TIPO de producto y no del mismo,
       el rótulo lo dice tal cual en vez de "este mismo producto" */
    + '<h2 class="rev-title">' + (p.resenasRotulo || (reales ? 'Opiniones del producto' : 'Experiencias reales')) + ' <span class="stars">★★★★★</span></h2>'
    + (p.resenasRotulo ? '<p class="rev-fuente">' + (p.resenasFuente || 'Opiniones reales de compradores de espuma antigrasa, tal como las escribieron.') + '</p>'  /* 06-10: cada producto trae su texto (ampolleta) */
      : (reales ? '<p class="rev-fuente">Opiniones de compradores de este mismo producto, tal como las escribieron.</p>' : ''))
    + '<div class="rev-score"><span class="big">' + prom.toFixed(1) + '</span>'
    + '<span class="cnt">' + cuentaTxt + '</span></div>'
    + '<div class="rev-bars">' + barras + '</div>'
    + '<button class="btn-write" id="btnWrite">Escribir una reseña</button>'
    + '<div class="rs" id="listaRs"></div>'
    + (mias.length > VER ? '<button class="masRs" id="masRs">Ver más reseñas</button>' : '')
    + '<p class="rev-auto-label">' + (p.resenasRotulo ? (p.resenasMas || 'Más opiniones de quienes usan espuma antigrasa') : (reales ? 'Más opiniones de quienes ya lo tienen' : 'Más experiencias de nuestros clientes')) + '</p>'
    + '<div class="rev-auto"><div class="rev-auto__track" id="revAuto"></div></div>'
    + '</section>';


  if (p.sinResenas && !reales) resenas = '';

  /* ---------- 7 · preguntas ---------- */
  var preguntas = '<section class="bloque"><h2>Preguntas frecuentes</h2><div class="fq">'
    + (p.preguntas ? p.preguntas.concat((window.PREGUNTAS || []).slice(0, 4)) : (window.PREGUNTAS || [])).map(function (x) {
        return '<details><summary>' + esc(x.q) + '</summary><p>' + esc(x.a) + '</p></details>'; }).join('')
    + '</div>'
    + '</section>';

  /* ---------- 7b · cierre: los beneficios y el llamado ----------
     Va justo despues de las preguntas. El cliente ya resolvio sus dudas ahi,
     asi que aqui se le recuerda POR QUE lo quiere y se le pone el boton.
     Antes las preguntas terminaban con un boton suelto sin contexto.
     Ojo: el boton va SOLO aqui, para no dejar dos CTA seguidos. */
  function seccionCierre() {
    var min = p.packs.reduce(function (a, b) { return b.precio < a.precio ? b : a; }, p.packs[0]);
    var pun = (p.puntos || []).slice(0, 5);
    /* usa las clases que ya existen (.desc trae la lista con palomita):
       asi no se agrega CSS y queda identico al resto de la pagina */
    return '<section class="bloque desc" data-rv>'
      + '<span class="eyebrow">Por qué lo quieres</span>'
      + '<h2 class="tit2">' + esc(p.nombre) + '</h2>'
      + (p.sub ? '<p>' + esc(p.sub) + '</p>' : '')
      + (pun.length ? '<ul>' + pun.map(function (x, i) {
          return '<li style="--i:' + i + '">' + esc(x) + '</li>'; }).join('') + '</ul>' : '')
      + '<p style="margin-top:16px">Desde <b>' + pesos(min.precio) + '</b> · envío gratis y pagas cuando lo recibes en tu casa.</p>'
      + '<a class="cta azul" href="#pedir" style="margin-top:14px">Pedir el mío ahora</a>'
      + '</section>';
  }

  /* ---------- 8 · sellos de las transportadoras ---------- */
  var sellos = '<section class="bloque"><h2>Con quién se despacha</h2><div class="sellos">'
    /* 29-10 MÉXICO: paqueterías de Dropi México con sus logos originales (los mismos del Brain) en vez de Starken y Blue Express */
    + '<div class="sello"><img src="img/logos/veloces.webp" alt="Veloces" onerror="this.style.display=\'none\'">'
    + '<div class="nom">Veloces</div><small>Entrega a domicilio</small></div>'
    + '<div class="sello"><img src="img/logos/afimex.webp" alt="Afimex" onerror="this.style.display=\'none\'">'
    + '<div class="nom">Afimex</div><small>Envío a todo México</small></div>'
    + '<div class="sello"><div class="nom">Pago al recibir</div><small>Pagas cuando el producto está en tus manos</small></div>'
    + '<div class="sello"><div class="nom">30 días</div><small>Garantía de satisfacción</small></div>'
    + '</div></section>';

  /* ---------- 9 · te puede interesar ---------- */
  /* Solo los 4 que MAS VENDEN. Medido el 10-sep sobre 14 dias: lentes 192,
     foco 151, cargador 76, antena 74. El ORGANIZADOR va primero porque salio
     el 9-sep y en dos dias hizo 62: por dia es el que mas rota de todos.
     Antes salian los 6 y ahi iban la ducha y el cepillo, que casi no rotan:
     ocupaban el espacio de los que si venden. En la pagina PRINCIPAL siguen
     saliendo todos — este recorte es solo en la ficha del producto. */
  /* 24-09 · James, en la ficha del foco: "acá pon la guirnalda y saca la
     almohada". Entra la GUIRNALDA, que está en campaña. Antes eran cuatro
     y, cuando el producto que se ve era uno de ellos, quedaban tres y el
     hueco lo rellenaba el primero de la lista general: ahí se colaba la
     almohada, que no está pauteada. Con cinco nombres el relleno ya no
     hace falta. OJO: esto vale para las trece fichas, no solo para el
     foco. */
  /* 03-10 (James): solo lo que SE ESTÁ VENDIENDO. Panel, últimos 7 días: organizador 932 · lymphoria 83 ·
     lentes 67 · antena 58 · máscara 18. El cargador ya no se vende y el foco/guirnalda casi nada. */
  var MAS_VENDIDOS = ['organizador', 'lentes', 'antena', 'lymphoria', 'mascara'];
  var otros = TODOS
    .filter(function (x) { return x.id !== p.id && MAS_VENDIDOS.indexOf(x.id) >= 0; })
    .sort(function (a, b) { return MAS_VENDIDOS.indexOf(a.id) - MAS_VENDIDOS.indexOf(b.id); })
    .slice(0, 4);
  /* si el producto que se ve ES uno de los 4, se completa con el siguiente que mas vende */
  if (otros.length < 4) {
    TODOS.forEach(function (x) {
      if (otros.length < 4 && x.id !== p.id && MAS_VENDIDOS.indexOf(x.id) < 0) otros.push(x);
    });
  }
  var interesar = otros.length ? '<section class="bloque"><h2>También te puede interesar</h2><div class="otros">'
    + otros.map(function (x) {
        var min = x.packs.reduce(function (a, b) { return b.precio < a ? b.precio : a; }, Infinity);
        return '<a class="oc" href="/' + esc(x.id) + '/">'
          + '<div class="im">' + (x.foto
              /* lazy + link corto: estas seis fotos de OTROS productos pesaban
                 550 KB que se bajaban al abrir, sin que el cliente llegara nunca
                 hasta abajo. Ahora se traen solo si baja. */
              ? '<img src="' + esc(x.foto) + '" alt="' + esc(x.nombre) + '" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{textContent:\'' + esc(x.nombre.charAt(0)) + '\'}))">'
              : '<span>' + esc(x.nombre.charAt(0)) + '</span>') + '</div>'
          + '<div class="tx"><div class="n">' + esc(x.nombre) + '</div>'
          + '<div class="p">desde ' + pesos(min) + '</div></div></a>';
      }).join('') + '</div></section>' : '';


  /* ---------- 5 · LA FORMULA (molde NAD+) ---------- */
  var ICONOS = {
    ondas:'<path d="M12 18h.01"/><path d="M8.5 14.5a5 5 0 0 1 7 0"/><path d="M5 11a10 10 0 0 1 14 0"/>',
    torre:'<path d="M12 21V9"/><path d="M7 21l5-16 5 16"/><circle cx="12" cy="5" r="2"/>',
    iman:'<path d="M6 4v8a6 6 0 0 0 12 0V4"/><path d="M6 9h4M14 9h4"/>',
    cable:'<path d="M4 8a4 4 0 0 1 8 0v8a4 4 0 0 0 8 0"/><circle cx="4" cy="8" r="1.6"/>',
    casa:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    llave:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2 2M14 9l2 2"/>',
    fibra:'<path d="M4 20c3-8 5-12 8-16"/><path d="M9 20c3-8 5-12 8-16"/><path d="M14 20c2-6 3-9 5-13"/>',
    cepillo:'<rect x="9" y="3" width="6" height="14" rx="3"/><path d="M9 7H6M9 11H6M9 15H6M15 7h3M15 11h3M15 15h3"/><path d="M12 17v4"/>',
    agua:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',
    ojo:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    pluma:'<path d="M20 4C11 4 4 11 4 20"/><path d="M4 20c8 0 16-7 16-16"/><path d="M8 16l4-4"/>',
    libro:'<path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2z"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    auto:'<path d="M4 15h16v-3l-2-5H6l-2 5z"/><circle cx="7.5" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/>',
    rayo:'<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
    pantalla:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    escudo:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  };
  function seccionFormula() {
    if (!p.formula || !p.formula.length) return '';
    return '<section class="bloque form-sec" data-rv><span class="eyebrow">' + esc(p.formulaRotulo || 'Qué incluye') + '</span>'
      + '<h2 class="tit2">' + esc(p.formulaTitulo || 'Qué trae') + '</h2>'
      + (p.formulaSub ? '<p class="sub2">' + esc(p.formulaSub) + '</p>' : '')
      + '<div class="ing-grid">'
      + p.formula.map(function (x) {
          return '<div class="ing"><div class="cir"><svg viewBox="0 0 24 24">' + (ICONOS[x[0]] || ICONOS.llave) + '</svg></div>'
            + '<div><b>' + esc(x[1]) + '</b><p>' + esc(x[2]) + '</p></div></div>';
        }).join('')
      + '</div></section>';
  }

  /* ---------- EL CAMBIO · antes y despues (va antes de las preguntas) ----------
     Solo aparece si el producto tiene foto de antes y despues. */
  function seccionCambio() {
    if (!p.antesDespues) return '';
    return '<section class="bloque ba-sec"><span class="eyebrow">El cambio</span>'
      + '<h2 class="tit2">El antes y después que se nota</h2>'
      + (p.antesDespuesSub ? '<p class="sub2">' + esc(p.antesDespuesSub) + '</p>' : '')
      + '<div class="ba-img"><img src="' + esc(p.antesDespues) + '" alt="Antes y después" loading="lazy" onerror="this.parentNode.remove()"></div>'
      + '<button class="cta rojo" onclick="document.getElementById(\'pedir\').scrollIntoView({behavior:\'smooth\'})">Quiero ese cambio</button></section>';
  }

  /* ---------- 7 · RESULTADOS · numeros REALES de la operacion ---------- */
  function seccionResultados() {
    /* 29-10 MÉXICO: los 701 pedidos y los 4,6 días son de Chile; aquí van los datos de México del Brain (TEXTOS.resDatos) */
    var datos = (window.TEXTOS && window.TEXTOS.resDatos) || [
      ['2 a 5', 'días hábiles de entrega'],
      ['$0', 'de envío a todo México'],
      ['30', 'días de garantía de satisfacción'],
      ['$0', 'por adelantado: pagas al recibir'],
    ];
    return '<section class="bloque res-sec" data-rv><span class="eyebrow">Resultados</span>'
      + '<h2 class="tit2">Lo que ya pasó, no lo que prometemos</h2>'
      + '<div class="res-grid">'
      + datos.map(function (d, i) { return '<div class="res" style="--i:' + i + '"><b data-num="' + d[0] + '">' + d[0] + '</b><span>' + d[1] + '</span></div>'; }).join('')
      + '</div></section>';
  }

  /* ---------- 8 · QUE LO HACE DIFERENTE ---------- */
  function seccionCompara() {
    if (!p.compara || !p.compara.length) return '';
    return '<section class="bloque cmp-sec" data-rv><h2 class="tit2">' + esc(p.comparaTitulo || '¿Qué lo hace diferente?') + '</h2>'
      + '<table class="cmp"><thead><tr><th>Característica</th><th class="us">' + esc(p.nombre.split(' ').slice(0, 2).join(' ')) + '</th><th>Otros</th></tr></thead><tbody>'
      + p.compara.map(function (t) {
          return '<tr><td>' + esc(t) + '</td>'
            + '<td class="si"><svg viewBox="0 0 24 24"><path d="M4 12l6 6L20 6"/></svg></td>'
            + '<td class="no"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></td></tr>';
        }).join('')
      + '</tbody></table></section>';
  }

  /* ---------- 10 · GARANTIA 30 DIAS ---------- */
  function seccionGarantia() {
    return '<section class="bloque gar-sec">'
      + '<div class="gseal"><svg viewBox="0 0 220 220" aria-label="Garantía de 30 días">'
      + '<defs><radialGradient id="gs" cx="0.34" cy="0.28" r="0.95">'
      + '<stop offset="0" stop-color="#f9ecb8"/><stop offset="0.38" stop-color="#e6c65a"/>'
      + '<stop offset="0.68" stop-color="#c9a227"/><stop offset="1" stop-color="#8f741c"/></radialGradient>'
      + '<path id="gt" fill="none" d="M44 110a66 66 0 0 1 132 0"/><path id="gb" fill="none" d="M48 118a62 62 0 0 0 124 0"/></defs>'
      + '<circle cx="110" cy="110" r="98" fill="url(#gs)" opacity=".16"/>'
      + '<circle cx="110" cy="110" r="92" fill="url(#gs)" stroke="#8f741c" stroke-width="3"/>'
      + '<ellipse cx="86" cy="72" rx="46" ry="26" fill="#fff" opacity="0.28"/>'
      + '<circle cx="110" cy="110" r="84" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="1.5 6" stroke-linecap="round"/>'
      + '<text font-family="Inter,sans-serif" font-weight="700" font-size="14.5" letter-spacing="2.4" fill="#fff"><textPath href="#gt" startOffset="50%" text-anchor="middle">GARANTÍA TOTAL</textPath></text>'
      + '<text font-family="Inter,sans-serif" font-weight="700" font-size="12.5" letter-spacing="1.8" fill="#fff"><textPath href="#gb" startOffset="50%" text-anchor="middle">DEVOLUCIÓN 100%</textPath></text>'
      + '<text x="110" y="105" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="46" fill="#fff">30</text>'
      + '<text x="110" y="128" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="13" letter-spacing="3" fill="#fff">DÍAS</text>'
      + '</svg></div>'
      + '<h2 class="tit2">Garantía de satisfacción</h2>'
      + '<p class="sub2">Si no quedas conforme, te devolvemos tu dinero dentro de los primeros 30 días. Sin preguntas.</p>'
      + '<div class="gar-chips"><span>Devolución 100%</span><span>Sin preguntas</span><span>Pago al recibir</span></div>'
      + '</section>';
  }

  /* ---------- 14 · formulario ---------- */
  /* el mismo selector de packs de arriba, tambien aca: el cliente elige sin
     tener que volver a subir */
  function packsHTML(sufijo) {
    return p.packs.map(function (k, i) {
      var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
      return '<button type="button" class="pack' + (i === iPop ? ' esPopular' : '') + '" aria-pressed="' + (i === elegido) + '" data-i="' + i + '">'
        + (i === iPop ? '<span class="cinta">El más pedido</span>' : '')
        + '<span class="marca"></span>'
        + '<span class="qt">' + esc(k.texto) + (o ? ' · ' + o + '% menos' : '') + '</span>'
        + '<span class="pz">' + pesos(k.precio) + '</span>'
        + (k.antes ? '<span class="an">' + pesos(k.antes) + '</span>' : '')
        + '</button>';
    }).join('');
  }

  /* Formulario con el molde de NAD+: una tarjeta que contiene todo, el sello
     de pago seguro arriba, los packs con la foto del producto, el resumen de
     cuenta y los logos de las transportadoras al final. */
  function packsHTML() {
    return p.packs.map(function (k, i) {
      var o = k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0;
      var etiqueta = i === iPop ? 'Más vendido' : (i === p.packs.length - 1 ? 'Mejor precio' : '');
      return '<button type="button" class="pack' + (i === elegido ? ' sel' : '') + '" data-i="' + i + '">'
        + (etiqueta ? '<span class="tag">' + etiqueta + '</span>' : '')
        + '<span class="radio"></span>'
        + (p.foto ? '<img class="thumb" src="' + esc(p.foto) + '" alt="" onerror="this.remove()">' : '')
        + '<span class="info"><span class="t">' + esc(k.texto) + '</span>'
        + (o ? '<span class="s">Ahorra ' + o + '%</span>' : '') + '</span>'
        + '<span class="pr"><span class="n">' + pesos(k.precio) + '</span>'
        + (k.antes ? '<span class="w">' + pesos(k.antes) + '</span>' : '') + '</span>'
        + '</button>';
    }).join('');
  }
  /* el bloque del sellador: mismo aspecto de los packs, pero aparte */
  var kSel = p.packs[elegido];
  /* ---- 04-10 PAGO ANTICIPADO (James: "igualitica a la de España"; diseño: skill ui-ux-pro-max, opción 2
     con los colores del formulario) ----
     'cod' = pago al recibir. 'pre' = paga ahora con tarjeta o PayPal, 7 % menos redondeado a la centena
     (James 04-10: 7 % en TODOS los productos). Arranca SIEMPRE en 'cod'. PayPal cobra en dólares: el paso
     a USD lo hace n8n con el dólar del día; aquí el cliente ve y elige en pesos. */
  /* James 04-10 noche: 10 % ("llama más la atención"), antes 7 % */
  var ANT_PCT = 10, formaPago = 'cod';
  /* hacia ABAJO a la centena: el cartel dice −10 % y el descuento nunca puede quedar por debajo (34.500 → 31.000, no 31.100) */
  /* 29-10 MÉXICO: el precio anticipado es el aprobado por James para cada pack (pack.pre: 699 · 969 · 1,389) */
  function precioPre(i) { return p.packs[i].pre; }
  function precioAhora(i) { return formaPago === 'pre' ? precioPre(i) : p.packs[i].precio; }
  var LOGOS_PAGO = '<span class="logosPago" id="logosForm">'
    /* James 04-10: como España, los logos van DENTRO de la ficha "Paga ahora" (PayPal, Visa, Mastercard) */
    + ['paypal', 'visa', 'mastercard'].map(function (n) { return '<img src="img/pago-' + n + '.svg" data-logo="' + n + '" alt="' + ({ visa: 'Visa', mastercard: 'Mastercard', amex: 'American Express', paypal: 'PayPal' })[n] + '" loading="lazy">'; }).join('')
    + '</span>';
  /* Logos oficiales transparentes (James: "que se monten en cualquier fondo"). Visa y PayPal tienen dos versiones:
     blanca para fondo oscuro y a color para fondo claro. Se mira el fondo real del formulario de ESTE producto. */
  (function elegirLogos(n) {
    var cont = document.getElementById('logosForm');
    if (!cont) { if (n < 40) setTimeout(function () { elegirLogos(n + 1); }, 150); return; }
    var el = cont, rgb = null;
    while (el && !rgb) { var c = getComputedStyle(el).backgroundColor, m = c.match(/[\d.]+/g); if (m && (m.length < 4 || Number(m[3]) > 0.5)) rgb = m; el = el.parentElement; }
    var claro = rgb ? (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) > 150 : false;
    if (document.getElementById('pagoSel')) document.getElementById('pagoSel').classList.toggle('fondoClaro', claro);
    /* el formulario y la seccion "Paga con tarjeta y gana": cada caja mira SU fondo */
    Array.prototype.forEach.call(document.querySelectorAll('#logosForm, .logosAuto'), function (caja) {
      var e2 = caja, rgb2 = null;
      while (e2 && !rgb2) { var c2 = getComputedStyle(e2).backgroundColor, m2 = c2.match(/[\d.]+/g); if (m2 && (m2.length < 4 || Number(m2[3]) > 0.5)) rgb2 = m2; e2 = e2.parentElement; }
      var claro2 = rgb2 ? (0.299 * rgb2[0] + 0.587 * rgb2[1] + 0.114 * rgb2[2]) > 150 : false;
      if (caja.closest && caja.closest('.pagoAnt')) caja.closest('.pagoAnt').classList.toggle('fondoClaro', claro2);
      Array.prototype.forEach.call(caja.querySelectorAll('img[data-logo]'), function (im) {
        var v = 'img/pago-' + im.getAttribute('data-logo') + (claro2 ? '-color' : '') + '.svg';
        if (im.getAttribute('src') !== v) im.setAttribute('src', v);
      });
    });
    /* el CSS de cada producto (oscuro/claro) puede llegar despues: se vuelve a mirar al cargar todo */
    if (n >= 0 && !elegirLogos._otra) { elegirLogos._otra = 1; window.addEventListener('load', function () { elegirLogos(-1); }); setTimeout(function () { elegirLogos(-1); }, 2500); }
  })(0);
  var formulario = '<section class="form" id="pedir" data-rv><h2>Pide el tuyo</h2>'
    + '<p class="baj">Lo despachamos hoy. Pagas al recibir o con tarjeta y ahorras un ' + ANT_PCT + ' %.</p>'
    + '<div class="formcard">'
    + '<div class="cod-badge">'
    + '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>'
    + ' Pago 100% seguro contra entrega</div>'
    + '<p class="pasoRot"><b>1</b>¿Cuántas quieres?</p>'
    + '<div class="packs" id="packsForm">' + packsHTML() + '</div>'
    /* PASO 2: como paga. Dos fichas lado a lado (como España) para que no se confundan con los packs.
       Se dice como DESCUENTO por pagar ahora, nunca como recargo por pagar al recibir. */
    + '<p class="pasoRot"><b>2</b>¿Cómo quieres pagar?</p>'
    + '<div class="pagoSel" id="pagoSel" role="radiogroup" aria-label="¿Cómo quieres pagar?">'
    + '<button type="button" class="pagoOp sel" data-pago="cod" role="radio" aria-checked="true">'
    + '<span class="pagoOp__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg></span>'
    + '<span class="pagoOp__tit">Pago al recibir</span><span class="pagoOp__pr" id="prCod">' + pesos(kSel.precio) + '</span>'
    + '<span class="pagoOp__sub">Pagas al repartidor</span></button>'
    + '<button type="button" class="pagoOp" data-pago="pre" role="radio" aria-checked="false"><span class="pagoOp__cinta">−' + ANT_PCT + ' %</span>'
    + '<span class="pagoOp__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="2.2"/><path d="M2.5 10h19"/><path d="M6 15h4"/></svg></span>'
    + '<span class="pagoOp__tit">Paga ahora con tarjeta</span><span class="pagoOp__pr" id="prPre">' + pesos(precioPre(elegido)) + '</span>'
    /* James 04-10: "entrega prioritaria" (las transportadoras le dan prioridad al pagado); el montador lo manda primero */
    + '<span class="pagoOp__sub">Entrega prioritaria</span>' + LOGOS_PAGO + '</button>'
    + '</div>'
    + '<div class="summary">'
    + '<div class="r" id="rowSub"><span>Subtotal</span><span id="sumSub">' + pesos(kSel.antes || kSel.precio) + '</span></div>'
    + '<div class="r" id="rowDesc"><span>Descuento</span><span id="sumDesc" class="desc">-' + pesos((kSel.antes || kSel.precio) - kSel.precio) + '</span></div>'
    + '<div class="r"><span>Envío</span><span class="free">Gratis</span></div>'
    + '<div class="r tot"><span id="sumTotRot">Total a pagar al recibir</span><span id="sumTot">' + pesos(kSel.precio) + '</span></div>'
    + '</div>'
    + '<form id="fPedido" novalidate>'
    + '<div class="field"><label for="fNombre">Nombre completo</label><input id="fNombre" autocomplete="name" placeholder="Ej: María González"><div class="err">Escribe tu nombre.</div></div>'
    /* El indicativo era una bandera pintada, no se podia cambiar. Hay clientes
       que viven en Chile con numero de otro pais, y no podian pedir. Ahora es
       un selector de verdad; Chile queda elegido por defecto. */
    + '<div class="field"><label for="fTel">Celular / WhatsApp</label>'
    /* Lista PROPIA, no un <select>: el desplegable del sistema solo pinta
       texto y las banderas no se ven. Aca cada opcion lleva su imagen. */
    + '<div class="telrow"><span class="cc-wrap">'
    + '<button type="button" class="cc-btn" id="ccBtn" aria-haspopup="listbox" aria-expanded="false">'
    /* 29-10 MÉXICO: el formulario del Brain. Móvil +52 de 10 dígitos; calle y número, indicaciones, código postal,
       estado, municipio y colonia en listas (al escribir el código postal se eligen solos; al elegir la colonia
       aparece el código postal), y el correo opcional AL FINAL. */
    + '<img class="cc-flag" id="ccFlag" src="https://flagcdn.com/mx.svg" alt="">'
    + '<span class="cc-code" id="ccCode">+52</span></button>'
    + '<div class="cc-lista" id="ccLista" role="listbox" hidden>'
    + PAISES.map(function (x) {
        return '<button type="button" role="option" data-v="' + x[0] + '|' + x[1] + '|' + x[2] + '"'
          + (x[0] === 'MX' ? ' aria-selected="true"' : '') + '>'
          + '<img src="https://flagcdn.com/' + x[0].toLowerCase() + '.svg" alt="" loading="lazy">'
          + '<span>' + esc(x[3]) + '</span><i>' + x[1] + '</i></button>';
      }).join('')
    + '</div>'
    + '<input type="hidden" id="fPais" value="MX|+52|10"></span>'
    + '<input id="fTel" inputmode="numeric" autocomplete="tel" placeholder="55 1234 5678"></div>'
    + '<div class="err">Revisa tu celular: en México son 10 dígitos.</div></div>'
    /* 29-10 James: igual que el Brain = igual al formulario de crear orden de Dropi México: estado, municipio (solo los
       que tienen contra entrega), dirección y complementos, código postal y correo opcional. Sin colonia (Dropi no la pide). */
    + '<div class="field"><label for="fProvincia">Estado</label><select id="fProvincia" autocomplete="address-level1"><option value="">Selecciona…</option></select><div class="err">Selecciona tu estado.</div></div>'
    + '<div class="field"><label for="fCiudad">Municipalidad o delegación</label><select id="fCiudad" autocomplete="address-level2" disabled><option value="">Primero elige tu estado</option></select><div class="err">Selecciona tu municipalidad o delegación.</div></div>'
    + '<div class="field"><label for="fDir">Dirección y complementos</label><input id="fDir" autocomplete="street-address" placeholder="Calle, número exterior e interior"><div class="err">Escribe la calle y el número.</div></div>'
    + '<div class="field"><label for="fCP">Código postal</label><input id="fCP" inputmode="numeric" autocomplete="postal-code" maxlength="5" placeholder="06000"><div class="err">Escribe los 5 dígitos de tu código postal.</div></div>'
    + '<div class="field"><label for="fCorreo">Correo <span class="opc">(opcional)</span></label><input id="fCorreo" type="email" inputmode="email" autocomplete="email" placeholder="Ej: maria@gmail.com"></div>'
    + '<div class="aviso" id="fErr"></div>'
    + '<button type="submit" class="cta rojo rebota">Comprar — pago al recibir</button>'
    + '<p class="formnote">No pagas nada ahora. Te escribimos por WhatsApp para coordinar la entrega.</p>'
    /* Salida para el que se traba llenando el formulario. Hoy 6 personas
       llegaron hasta aca en la ficha de la ducha y solo 1 lo mando: si algo
       no les calza —su comuna no aparece, la direccion no se la acepta— no
       tenian a donde ir y se iban. */
    + '<p class="formnote ayuda">¿Se te complica llenarlo? '
    + '<a href="https://wa.me/' + WA_MX + '?text=' + encodeURIComponent('Hola, quiero pedir ' + p.nombre + ' y se me complica el formulario')
    + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a> y te lo tomamos nosotros.</p>'
    + '</form>'
    /* 29-10 MÉXICO: las 6 paqueterías de Dropi México, logos originales (brain/img/logos). Son 6 y no 2: se dejan bajar de
       línea. AMPM y Quality Post traen letras BLANCAS (son para fondo oscuro, como en el Brain): van sobre una placa oscura */
    + '<div class="carriers"><span class="cl">Despachamos con</span>'
    + '<div class="cbadges" style="flex-wrap:wrap;justify-content:center;row-gap:12px;background:#171510;border-radius:10px;padding:12px 16px">'
    + [['veloces', 'Veloces'], ['tiui', 'Tiui'], ['ampm', 'AMPM'], ['afimex', 'Afimex'], ['quality-post', 'Quality Post'], ['coordi', 'Coordi']].map(function (c) {
        return '<img src="img/logos/' + c[0] + '.webp" alt="' + c[1] + '" onerror="this.remove()">'; }).join('')
    + '</div></div>'
    + '</div></section>';



  /* ---------- ESCASEZ · solo si el producto trae el campo ----------
     Los numeros salen del radar (stock real del proveedor y unidades que
     salieron hoy). No se inventan: si no hay dato, la seccion no aparece. */
  function seccionEscasez() {
    if (!p.escasez) return '';
    var e = p.escasez;
    /* La barra NO es de stock: con 1.000 unidades en bodega, decir "quedan
       pocas" seria mentira y se nota. Muestra el MOVIMIENTO del dia contra el
       mejor dia registrado, que es un dato real del radar y comunica lo mismo:
       que el producto se esta moviendo ahora. */
    var pct = Math.max(8, Math.min(100, Math.round((e.hoy / e.mejorDia) * 100)));
    return '<section class="bloque esc-sec" data-rv style="padding:16px">'
      + '<div style="border:1px solid rgba(0,0,0,.10);border-radius:16px;padding:16px 16px 18px;background:#fff">'
      + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:11px">'
      + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--acento)" stroke-width="2" stroke-linecap="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7h-5V2"/></svg>'
      + '<b style="font-size:15.5px;color:var(--acento)"><span class="cnt-hoy" data-n="' + e.hoy + '">0</span> salieron hoy</b></div>'
      + '<div style="height:9px;border-radius:9px;background:rgba(0,0,0,.09);overflow:hidden">'
      + '<div class="esc-barra" style="height:100%;width:0;border-radius:9px;background:var(--acento);transition:width 1.1s cubic-bezier(.2,.8,.2,1)" data-w="' + pct + '"></div></div>'
      + '<p style="margin:11px 0 0;font-size:13.5px;line-height:1.5;color:#4a4a4a">'
      + esc(e.nota || 'Se despacha por orden de pedido y pagas cuando la recibes.') + '</p>'
      + '</div></section>';
  }

  /* ---------- LAS ZONAS · la foto marcada con su explicacion ----------
     Sirve para el producto que se ve raro en la foto y hay que explicar como
     se usa. Sin esto, el cliente ve una almohada deforme y se va. */
  function seccionZonas() {
    if (!p.zonas || !p.zonas.img) return '';
    var z = p.zonas;
    return '<section class="bloque zon-sec" data-rv>'
      + '<span class="eyebrow">' + esc(z.rotulo || 'Cómo se usa') + '</span>'
      + '<h2 class="tit2">' + esc(z.titulo || 'Una zona para cada postura') + '</h2>'
      + (z.sub ? '<p class="sub2">' + esc(z.sub) + '</p>' : '')
      + '<div style="border-radius:16px;overflow:hidden;margin:14px 0 4px">'
      + '<img src="' + esc(z.img) + '" alt="' + esc(z.titulo || '') + '" loading="lazy" style="width:100%;display:block">'
      + '</div>'
      + (z.pies || []).map(function (t) {
          return '<div style="display:flex;gap:10px;align-items:flex-start;margin-top:12px">'
            + '<span style="flex:0 0 auto;width:9px;height:9px;border-radius:50%;background:var(--acento);margin-top:6px"></span>'
            + '<p style="margin:0;font-size:15px;line-height:1.5;color:#333">' + esc(t) + '</p></div>';
        }).join('')
      + '</section>';
  }

  /* ---------- LA MEDIDA · la duda que mas frena la compra ----------
     Con su boton, porque es el punto donde el cliente ya resolvio lo suyo. */
  function seccionMedida() {
    if (!p.medida) return '';
    var m = p.medida;
    return '<section class="bloque med-sec" data-rv>'
      + '<h2 class="tit2">' + esc(m.titulo || '¿Le sirve tu funda?') + '</h2>'
      + '<div style="display:flex;gap:12px;margin:16px 0 6px;flex-wrap:wrap">'
      + (m.filas || []).map(function (f) {
          return '<div style="flex:1 1 140px;border:1px solid rgba(0,0,0,.10);border-radius:14px;padding:14px;background:#fff;text-align:center">'
            + '<div style="font-size:26px;font-weight:800;color:var(--acento);line-height:1.1">' + esc(f[0]) + '</div>'
            + '<div style="font-size:13.5px;color:#5a5a5a;margin-top:5px">' + esc(f[1]) + '</div></div>';
        }).join('')
      + '</div>'
      + '<p style="margin:12px 0 16px;font-size:15.5px;line-height:1.55;color:#333">' + esc(m.texto || '') + '</p>'
      + '<a class="cta" href="#pedir" style="display:block;text-align:center">' + esc(m.boton || 'Lo quiero, pago al recibir') + '</a>'
      + '</section>';
  }


  /* ---------- VIDEO del producto (opcional, va primero) ----------
     Sin sonido y en bucle: asi se ve un video de producto mientras se hace
     scroll. Con sonido, el cliente cierra la pagina. */
  function bloqueVideo() {
    if (!p.video) return '';
    var poster = (p.fotos && p.fotos[0]) || '';
    return '<section class="bloque vid-wrap" style="position:relative;overflow:hidden;padding:36px 0;margin:0">'
      /* El video NO se baja al abrir la pagina. Con preload="auto" el celular
         se traia los 2,1 MB de una, compitiendo con las fotos del producto: la
         ficha pesaba 2,3 MB y el que llega del anuncio con datos moviles se va
         antes de ver nada. La fuente se pone sola cuando el video entra en
         pantalla (abajo, en el observador). Se queda el poster, asi que el
         hueco no aparece vacio mientras tanto. */
      + '<video class="vid-prod" playsinline autoplay muted loop preload="none" '
      +   'data-src="' + esc(p.video) + '" '
      +   'poster="' + esc(poster) + '" style="width:100%;display:block;aspect-ratio:1080/1920;object-fit:cover;background:#000" '
      +   'onerror="this.closest(\'.vid-wrap\').style.display=\'none\'"></video>'
      + '</section>';
  }

  /* ---------- 1 bis · HERO (traído de la tienda de España, 29-09) ----------
     Si el producto trae `hero`, va ANTES de todo: foto vertical a tamaño real
     con el titular encima, en cascada letra por letra. La galeria sigue
     debajo. Si no trae `hero`, no se pinta nada y la ficha queda como antes.
     Cada PALABRA va en su caja (hCas__w) para que el navegador no la parta al
     saltar de línea; el índice --k corre por todo el titular. El <b>…</b> del
     titular sale en el color de acento. */
  function cascada(html) {
    var k = 0;
    return String(html).split(/(<br\s*\/?>)/i).map(function (parte) {
      if (/^<br/i.test(parte)) return '<span class="hCas__salto"></span>';
      return parte.split(/(<b>.*?<\/b>)/i).map(function (trozo) {
        var oro = /^<b>/i.test(trozo);
        var limpio = trozo.replace(/<\/?b>/gi, '');
        if (!limpio) return '';
        return limpio.split(' ').map(function (palabra) {
          if (!palabra) return '';
          return '<span class="hCas__w' + (oro ? ' es-oro' : '') + '">'
            + palabra.split('').map(function (ch) {
                return '<span class="hCas__l" style="--k:' + (k++) + '">' + esc(ch) + '</span>';
              }).join('')
            + '</span>';
        }).join(' ');
      }).join('');
    }).join('');
  }

  function seccionHero() {
    var h = p.hero;
    if (!h || !h.img) return '';
    var ico = {
      envio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      pago:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
      reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    };
    var min = p.packs.reduce(function (a, k) { return k.precio < a.precio ? k : a; }, p.packs[0]);
    /* 14 puntos de luz que bajan despacio sobre la foto (adorno, aria-hidden;
       se apagan con prefers-reduced-motion) */
    var destellos = '<div class="heroP__luces" aria-hidden="true">'
      + [0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(function (i) {
          var x = [6,17,28,39,50,61,72,83,12,34,56,78,91,45][i];
          return '<i style="--x:' + x + '%;--d:' + (i * 0.9).toFixed(1) + 's;--t:' + (7 + (i % 5) * 1.6).toFixed(1) + 's;--s:' + (i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 4) + 'px"></i>';
        }).join('')
      + '</div>';

    return '<section class="heroP">'
      + '<div class="heroP__marco">'
      +   destellos
      +   '<img class="heroP__img" src="' + esc(h.img) + '" alt="' + esc(p.nombre) + '"'
      +     ' width="1024" height="1536" fetchpriority="high" decoding="async">'
      +   '<div class="heroP__fundido"></div>'
      + '</div>'
      + '<div class="heroP__txt">'
      +   (mias.length
            ? '<span class="heroP__nota">' + estrellas(prom)
              + '<b>' + prom.toFixed(1).replace('.', ',') + '</b>'
              + '<a href="#resenas">' + (RES ? RES.total + ' opiniones' : mias.length + ' reseñas') + '</a></span>'
            : '<span class="heroP__kicker"><i></i>' + esc(h.kicker || 'Nuevo') + '</span>')
      +   '<h1 class="heroP__h1 hCas" aria-label="' + esc(String(h.titulo || p.nombre).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) + '">'
      +     cascada(h.titulo || esc(p.nombre)) + '</h1>'
      +   '<p class="heroP__sub">' + esc(h.sub || p.sub || '') + '</p>'
      +   '<div class="heroP__datos">'
      +     (h.datos || []).map(function (d, i) {
            return '<span class="heroP__dato' + (i === 0 ? ' heroP__dato--oro' : '') + '">'
              + (ico[d[0]] || '') + esc(d[1]) + '</span>'; }).join('')
      +   '</div>'
      +   '<div class="heroP__pie">'
      +     '<div class="heroP__precio"><span>Desde</span><b>' + pesos(min.precio) + '</b></div>'
      +     '<button type="button" class="heroP__cta" id="heroCta">Lo quiero, pago al recibir</button>'
      +   '</div>'
      + '</div></section>';
  }

  cont.innerHTML = seccionHero()
    + '<div class="arriba2">' + galeria + cabecera + '</div>'
    + promo
    /* La descripcion va pegada al precio: el cliente que acaba de entrar
       primero quiere saber QUE ES, y despues le hablamos de la oferta. */
    + seccionEscasez()
    + desc
    + seccionZonas()
    + seccionPromo()
    /* 04-10 James: "Paga con tarjeta y gana" va DEBAJO de la promoción, en todos los productos */
    + seccionPagoAnt()
    + bloqueVideo()
    + seccionFormula()
    + seccionMedida()
    + seccionResultados()
    + seccionCompara()
    + resenas
    + seccionGarantia()
    /* El antes y despues va SIEMPRE justo antes de las preguntas frecuentes:
       el cliente ya leyo las resenas y la garantia, ve el cambio y ahi decide. */
    + seccionCambio()
    + preguntas
    + seccionCierre()
    + sellos
    + interesar
    + formulario
    ;

  /* El boton de WhatsApp va colgado del BODY, no dentro de #prod: alli dentro
     un position:fixed queda atrapado por el contenedor y no se ve. */
  /* El boton de WhatsApp va escrito en producto.html, como en DRAINPRO:
     creado por JavaScript no aparecia. */

  /* La barra de abajo, igual que en NAD+: transparente, con el boton
     redondeado flotando. Aparece al bajar y se esconde en el formulario. */
  if (!document.querySelector('.stickycta')) {
    var sb = document.createElement('div');
    sb.className = 'stickycta';
    sb.id = 'stickycta';
    var bt = document.createElement('button');
    bt.className = 'btn-flota';
    bt.textContent = 'Pedir ahora — pago contra entrega';
    bt.addEventListener('click', function () {
      document.getElementById('pedir').scrollIntoView({ behavior: 'smooth' });
    });
    sb.appendChild(bt);
    document.body.appendChild(sb);
  }

  /* ---------- comportamiento ---------- */
  pintarGaleria();
  var izq = document.querySelector('.gal .flecha.izq'), der = document.querySelector('.gal .flecha.der');
  if (izq) izq.addEventListener('click', function () { mover(-1); });
  if (der) der.addEventListener('click', function () { mover(1); });
  document.querySelectorAll('.gal .puntos button, .miniz button').forEach(function (b) {
    b.addEventListener('click', function () {
      var lista = Array.prototype.slice.call(b.parentNode.children);
      iFoto = lista.indexOf(b); pintarGaleria();
    });
  });

  /* ---------- la galeria gira sola ----------
     Muchos clientes no tocan las flechas y se pierden las otras fotos. Gira
     cada 4,5 s, pero:
       - se PARA en cuanto el cliente toca algo: si el la esta manejando, la
         galeria no le puede quitar la foto de encima. Y no vuelve a arrancar.
       - solo gira mientras la galeria se ve en pantalla; si el cliente bajo a
         leer las resenas, no se gasta bateria moviendo algo que nadie mira.
       - se apaga con el telefono en "menos animacion". */
  (function girar() {
    if (fotos.length < 2) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var gal = document.querySelector('.gal');
    if (!gal) return;

    var reloj = null, parado = false, siesta = null;
    function arrancar() { if (parado || reloj) return; reloj = setInterval(function () { mover(1); }, 4500); }
    function parar() { if (reloj) { clearInterval(reloj); reloj = null; } }

    /* Se para PARA SIEMPRE solo si el cliente usa los controles: flechas,
       puntos o miniaturas. Ahi esta eligiendo foto y no se le puede quitar.
       OJO: antes se paraba con cualquier touchstart sobre la galeria, y en
       celular la gente arrastra el dedo sobre la foto PARA HACER SCROLL —
       con eso la rotacion se moria al primer deslizamiento. */
    gal.addEventListener('click', function (e) {
      if (e.target.closest('.flecha, .puntos button, .miniz button')) { parado = true; parar(); }
    });
    /* si solo esta tocando la foto, se toma una siesta y vuelve */
    gal.addEventListener('touchstart', function () {
      if (parado) return;
      parar();
      clearTimeout(siesta);
      siesta = setTimeout(arrancar, 8000);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ent) {
        ent.forEach(function (e) { if (e.isIntersecting) arrancar(); else parar(); });
      }, { threshold: 0.35 }).observe(gal);
    } else arrancar();
  })();

  /* Mientras el cliente NO haya tocado un pack, el precio grande de arriba se
     queda en el de entrada. Apenas elige uno, arriba sigue su eleccion.
     El resumen del formulario y PACK_ELEGIDO van SIEMPRE con el seleccionado:
     es lo que se cobra, y no puede decir una cosa y registrar otra. */
  var _tocado = false;
  function pintarPrecio() {
    var k = p.packs[elegido];
    var kArriba = _tocado ? k : p.packs[0];
    window.PACK_ELEGIDO = { cant: k.cant, precio: k.precio };
    window.PRODUCTO_NOMBRE = p.nombre;
    var o = kArriba.antes ? Math.round((1 - kArriba.precio / kArriba.antes) * 100) : 0;
    $('pcAhora').textContent = pesos(kArriba.precio);
    if ($('pcAntes')) $('pcAntes').textContent = kArriba.antes ? pesos(kArriba.antes) : '';
    if ($('pcOff')) $('pcOff').textContent = o ? '-' + o + '%' : '';
    if ($('pcPack')) $('pcPack').textContent = kArriba.texto + ' · ' + pesos(Math.round(kArriba.precio / kArriba.cant)) + ' cada ' + (p.unidad || 'una');
    /* 04-10 pago anticipado: los dos precios del selector siguen al pack; el resumen y el boton, a la forma de pago */
    if ($('pcPre')) $('pcPre').textContent = pesos(kArriba.pre);
    var cobra = precioAhora(elegido);
    if ($('prCod')) $('prCod').textContent = pesos(k.precio);
    if ($('prPre')) $('prPre').textContent = pesos(precioPre(elegido));
    if ($('sumSub')) $('sumSub').textContent = pesos(k.antes || k.precio);
    if ($('sumDesc')) $('sumDesc').textContent = '-' + pesos(Math.max(0, (k.antes || k.precio) - cobra));
    if ($('sumTot')) $('sumTot').textContent = pesos(cobra);
    if ($('sumTotRot')) $('sumTotRot').textContent = formaPago === 'pre' ? 'Total a pagar ahora' : 'Total a pagar al recibir';
    /* el boton dice a donde lleva: si se abre un pago y el boton no lo avisaba, el cliente se siente engañado */
    var btn = document.querySelector('#fPedido button[type="submit"]');
    if (btn && !btn.disabled) btn.textContent = formaPago === 'pre' ? 'Pagar ahora ' + pesos(cobra) : 'Comprar — pago al recibir';
    var nota = document.querySelector('#fPedido .formnote');
    if (nota) nota.textContent = formaPago === 'pre'
      ? 'Al enviar se abre el pago con tarjeta o PayPal aquí mismo. Te confirmamos por WhatsApp.'
      : 'No pagas nada ahora. Te escribimos por WhatsApp para coordinar la entrega.';
  }
  /* "Pagar con tarjeta" de la seccion de arriba: baja al formulario con "Paga ahora" ya elegido */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('#btnPagoAnt');
    if (!b) return;
    var op = document.querySelector('.pagoOp[data-pago="pre"]'); if (op) op.click();
    var d = $('pedir'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  /* cambiar entre pago al recibir y paga ahora */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('.pagoOp');
    if (!b || !$('pagoSel')) return;
    formaPago = b.getAttribute('data-pago') === 'pre' ? 'pre' : 'cod';
    Array.prototype.forEach.call($('pagoSel').children, function (x) {
      x.classList.toggle('sel', x === b);
      if (x.setAttribute) x.setAttribute('aria-checked', x === b ? 'true' : 'false');
    });
    pintarPrecio();
  });
  /* los dos selectores (el de arriba y el del formulario) se mueven juntos:
     si el cliente cambia el pack abajo, arriba tambien cambia */
  var _ic = false;
  /* El aviso al panel va PRIMERO y aparte del pixel: antes todo esto se cortaba
     con un `!window.fbq`, asi que a quien tuviera bloqueador de anuncios no se
     le contaba ni la llegada al formulario. El panel es dato propio, no Meta. */
  function _checkout() { if (_ic) return; _ic = true;
    if (window.avisarPanel) window.avisarPanel('visita_form');
    var d = { content_name:p.nombre, content_ids:[p.id],
      value:p.packs[elegido].precio, currency:'MXN' };
    if (window.jayePixel) window.jayePixel.track('InitiateCheckout', d);
    else if (window.fbq) try { fbq('track','InitiateCheckout', d); } catch (e) {}
  }
  var _form = document.getElementById('pedir');
  if (_form && 'IntersectionObserver' in window)
    new IntersectionObserver(function (es, o) { if (es.some(function (x) { return x.isIntersecting; })) { _checkout(); o.disconnect(); } }).observe(_form);
  /* Segunda puerta, porque la de arriba depende de que el navegador avise
     cuando el formulario entra en pantalla, y eso NO siempre pasa: con la
     pestaña de fondo, o en algun navegador viejo, el aviso no llega nunca y
     el evento se pierde entero. Si el cliente toca un campo del formulario,
     esta en el checkout aunque nadie haya avisado. Como `_checkout` tiene su
     propio candado, se dispare por donde se dispare, sale UNA sola vez. */
  if (_form) ['focusin', 'change'].forEach(function (ev) {
    _form.addEventListener(ev, _checkout, { once: true });
  });
  /* Contador de la promocion. Baja hasta la medianoche EN CHILE y vuelve a
     arrancar: no inventa una fecha falsa, el precio es el de hoy.
     La hora de Chile se pide con Intl para no hacer cuentas de huso a mano,
     que es donde siempre se mete el error. */
  (function contador() {
    if (!$('cH')) return;
    var fmt;
    try {
      /* 29-10 MÉXICO: baja hasta la medianoche de Ciudad de México */
      fmt = new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City',
        hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch (e) { return; }
    function dosDig(n) { return (n < 10 ? '0' : '') + n; }
    function tic() {
      var t = {};
      fmt.formatToParts(new Date()).forEach(function (x) { if (x.type !== 'literal') t[x.type] = Number(x.value); });
      var faltan = 86400 - ((t.hour || 0) * 3600 + (t.minute || 0) * 60 + (t.second || 0));
      if (faltan < 0) faltan = 0;
      if ($('cH')) $('cH').textContent = dosDig(Math.floor(faltan / 3600));
      if ($('cM')) $('cM').textContent = dosDig(Math.floor(faltan % 3600 / 60));
      if ($('cS')) $('cS').textContent = dosDig(faltan % 60);
      /* el cuadrito de los segundos se enciende con cada segundo. Se quita y se
         vuelve a poner la clase (leyendo offsetWidth en medio) porque si no, el
         navegador no reinicia la animacion y solo late la primera vez. */
      var cja = $('cajaS');
      if (cja) { cja.classList.remove('late'); void cja.offsetWidth; cja.classList.add('late'); }
    }
    tic();
    setInterval(tic, 1000);
  })();

  /* La lista de paises: se abre al tocar la bandera, y al elegir cambia la
     bandera, el indicativo y el ejemplo del campo. */
  (function paises() {
    var btn = $('ccBtn'), lista = $('ccLista');
    if (!btn || !lista) return;

    function abrir(si) {
      lista.hidden = !si;
      btn.setAttribute('aria-expanded', String(si));
    }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      abrir(lista.hidden);
    });
    lista.addEventListener('click', function (e) {
      var o = e.target.closest('[data-v]');
      if (!o) return;
      var z = o.dataset.v.split('|');
      if ($('fPais')) $('fPais').value = o.dataset.v;
      $('ccFlag').src = 'https://flagcdn.com/' + z[0].toLowerCase() + '.svg';
      $('ccCode').textContent = z[1];
      var largo = Number(z[2]) || 9;
      if ($('fTel')) $('fTel').placeholder = new Array(largo + 1).join('0').replace(/^0/, '9');
      lista.querySelectorAll('[data-v]').forEach(function (x) {
        x.setAttribute('aria-selected', String(x === o));
      });
      abrir(false);
    });
    /* se cierra al tocar fuera o con Escape */
    document.addEventListener('click', function () { abrir(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') abrir(false); });
  })();

  /* el boton de la promocion deja ese pack marcado en el formulario y baja */
  if ($('btnPromo')) $('btnPromo').addEventListener('click', function () {
    elegirPack(Number(this.dataset.i));
    var f = document.getElementById('pedir');
    if (f) f.scrollIntoView({ behavior: 'smooth' });
  });

  var _atc = false;
  function elegirPack(i) {
    elegido = i;
    _tocado = true;   /* desde aca, el precio de arriba sigue lo que el cliente elija */
    /* AddToCart: elegir el pack es el paso del medio del embudo, y era el
       unico que Meta no veia. Con el, el algoritmo tiene una señal mas para
       encontrar al que compra, no solo al que mira. Sale UNA vez por visita:
       el que prueba los tres packs no manda tres eventos. */
    if (!_atc) { _atc = true;
      var k = p.packs[i];
      var d = { content_name:p.nombre, content_ids:[p.id], content_type:'product',
        value:k.precio, currency:'MXN', num_items:k.cant };
      if (window.jayePixel) window.jayePixel.track('AddToCart', d);
      else if (window.fbq) try { fbq('track','AddToCart', d); } catch (e) {}
    }
    ['packsForm'].forEach(function (cual) {
      var caja = $(cual); if (!caja) return;
      caja.querySelectorAll('.pack').forEach(function (x) {
        var mio = Number(x.dataset.i) === i;
        x.setAttribute('aria-pressed', String(mio));
        x.classList.toggle('sel', mio);
      });
    });
    pintarPrecio();
  }
  /* Se pinta una vez al cargar. pintarPrecio() es la que deja PACK_ELEGIDO y
     PRODUCTO_NOMBRE en window, y solo se llamaba al CAMBIAR de pack: si el
     cliente entraba y llenaba el formulario sin tocar los packs, el carrito
     abandonado se guardaba sin producto, sin cantidad y sin total, y asi no
     hay con que escribirle despues. */
  pintarPrecio();

  /* el boton del hero baja al formulario. Sin esto era un boton bonito que no
     hacia nada, que es peor que no ponerlo. */
  if ($('heroCta')) $('heroCta').addEventListener('click', function () {
    var d = $('pedir'); if (!d) return;
    d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.avisarPanel) try { window.avisarPanel('clic_hero'); } catch (e) {}
  });

  ['packs', 'packsForm'].forEach(function (cual) {
    var caja = $(cual); if (!caja) return;
    caja.addEventListener('click', function (e) {
      var b = e.target.closest('.pack'); if (!b) return;
      elegirPack(Number(b.dataset.i));
    });
  });
  $('btnArriba').addEventListener('click', function () {
    $('pedir').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  /* resenas: de a poco */
  var vistas = 0;
  function masResenas() {
    var trozo = mias.slice(vistas, vistas + VER);
    $('listaRs').insertAdjacentHTML('beforeend', trozo.map(tarjetaResena).join(''));
    vistas += trozo.length;
    if (vistas >= mias.length && $('masRs')) $('masRs').style.display = 'none';
  }
  if ($('listaRs')) masResenas();
  if ($('masRs')) $('masRs').addEventListener('click', masResenas);

  /* 29-10 MÉXICO (igual que el Brain): estado y municipio en lista, solo los que tienen contra entrega en Dropi
     (window.MUNICIPIOS_MX de /brain/provincias-es.js). Sin colonia ni autollenado por código postal, como en Dropi. */
  var PROV = window.PROVINCIAS_ES || [];
  var selP = $('fProvincia'), selC = $('fCiudad'), inCP = $('fCP');
  if (selP && PROV.length) {
    PROV.forEach(function (pr) { if (!window.MUNICIPIOS_MX || window.MUNICIPIOS_MX[pr]) selP.add(new Option(pr, pr)); });
    var llenarMun = function () {
      var lista = (window.MUNICIPIOS_MX || {})[selP.value] || [];
      var antes = selC.value;
      selC.innerHTML = '';
      selC.add(new Option(lista.length ? 'Selecciona…' : 'Primero elige tu estado', ''));
      lista.forEach(function (m) { selC.add(new Option(m, m)); });
      selC.disabled = !lista.length;
      if (antes && lista.indexOf(antes) >= 0) selC.value = antes;
    };
    selP.addEventListener('change', llenarMun);
    llenarMun();
    if (inCP) inCP.addEventListener('input', function () { inCP.value = inCP.value.replace(/\D/g, '').slice(0, 5); });
  }

  /* enviar el pedido */
  $('fPedido').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var g = function (x) { return ($(x) && $(x).value || '').trim(); };
    var err = $('fErr');
    /* que pais eligio: codigo, indicativo y largo esperado */
    var pz = (g('fPais') || 'MX|+52|10').split('|');
    var paisCod = pz[0], indic = pz[1], largo = Number(pz[2]) || 10;
    /* se quita el indicativo si el cliente lo escribio igual, y los ceros
       de marcado nacional que la gente pone por costumbre */
    var tel = g('fTel').replace(/\D/g, '')
      .replace(new RegExp('^' + indic.replace('+', '')), '')
      .replace(/^0+/, '');
    var cp = g('fCP').replace(/\D/g, '');
    var falla = '';
    ['fNombre', 'fTel', 'fDir', 'fCP', 'fProvincia', 'fCiudad', 'fColonia', 'fCorreo']
      .forEach(function (c) { if ($(c)) $(c).classList.remove('mal'); });
    if (g('fNombre').length < 3) falla = 'Escribe tu nombre y apellido.', $('fNombre').classList.add('mal');
    /* 29-10 MÉXICO (igual que el Brain): celular de 10 dígitos */
    else if (!/^[1-9]\d{9}$/.test(tel)) falla = 'Revisa tu celular: en México son 10 dígitos.', $('fTel').classList.add('mal');
    /* el mismo candado que ya tiene la operacion: sin calle Y numero no se despacha */
    else if (g('fDir').length < 8 || !/\d/.test(g('fDir'))) falla = 'Falta el número de la dirección: sin eso el transportista no puede entregar.', $('fDir').classList.add('mal');
    else if (!/^\d{5}$/.test(cp)) falla = 'El código postal son 5 dígitos.', $('fCP').classList.add('mal');
    else if (!g('fProvincia')) falla = 'Selecciona tu estado.', $('fProvincia').classList.add('mal');
    else if (g('fCiudad').length < 2) falla = 'Selecciona tu municipalidad o delegación.', $('fCiudad').classList.add('mal');
    else if (g('fCorreo') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('fCorreo'))) falla = 'Escribe un correo válido o déjalo vacío.', $('fCorreo').classList.add('mal');
    /* Si el formulario lo frena, no lo dejamos ahi parado: se le ofrece el
       WhatsApp en el mismo error, con el pedido ya escrito. El 09-09 quedaron 50
       carritos sin terminar y a la gente que se traba no le queda salida.
       El texto del error se pinta con textContent aparte para que nunca se
       inyecte HTML por accidente. */
    if (falla) {
      err.innerHTML = '';
      var _t = document.createElement('span');
      _t.textContent = falla;
      err.appendChild(_t);
      var _a = document.createElement('a');
      _a.href = 'https://wa.me/' + WA_MX + '?text=' + encodeURIComponent(
        'Hola, quiero pedir ' + p.nombre + ' y se me complica el formulario');
      _a.target = '_blank'; _a.rel = 'noopener';
      _a.style.cssText = 'display:block;margin-top:6px;color:inherit;text-decoration:underline;font-weight:700';
      _a.textContent = 'Se te complica? Escribenos al WhatsApp y te lo tomamos nosotros';
      err.appendChild(_a);
      err.style.display = 'block';
      return;
    }
    err.style.display = 'none';

    var k = p.packs[elegido];
    /* 04-10: si eligio pagar ahora, se cobra el precio con 7 % menos y el pedido va a OTRO webhook
       (pedido-tienda-pre) que lo deja "PAGO PENDIENTE" y devuelve su id para cobrar con PayPal */
    var _pre = formaPago === 'pre', _cobra = precioAhora(elegido);
    var btn = this.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Enviando…';
    var _pedido = {
      nombre: g('fNombre'), indicativo: indic, telefono: tel,
      /* `total` es el nombre que espera el webhook: es el que manda la
         landing vieja y el que lee el flujo. Mandando solo `precio`, la
         venta entraba con precio 0 (paso el 28-08 con la ducha) y el
         candado de precios no la podia validar. Se mandan los dos. */
      /* 29-10 MÉXICO: los MISMOS campos que manda el Brain al flujo pedido-tienda-mx */
      producto: p.nombre, total: _cobra, precio: _cobra, cantidad: k.cant,
      forma_pago: _pre ? 'pre' : 'cod',
      envio: _pre ? 'prioritario-14h' : 'estandar-24-48h',   /* mismos valores que el Brain */
      cmp: window._CMP || '',   /* el anuncio del que vino */
      /* la colonia elegida en la lista va pegada a la dirección (la guía de Dropi no tiene campo de colonia) */
      direccion: (function () { var d = g('fDir'), co = g('fColonia'); return co && d.toLowerCase().indexOf(co.toLowerCase()) < 0 ? d + ', Col. ' + co : d; })(),
      ciudad: g('fCiudad'), provincia: g('fProvincia'), cp: cp,
      comuna: g('fCiudad'), region: g('fProvincia'),
      /* La referencia y el correo se le pedian al cliente y se tiraban a la
         basura: no viajaban en el pedido. La referencia es justo lo que el
         transportista necesita en direcciones de campo, y el flujo que guarda
         ya sabe pegarla a la direccion. */
      referencia: g('fRef'), correo: g('fCorreo'),
      /* el DESPACHO sigue siendo Chile; `pais` es el del numero, para que
         Camila le escriba al indicativo correcto */
      origen: 'ficha', pais: paisCod, pais_despacho: 'MX',
      /* el flujo pedido-tienda-mx anota el id de Dropi México y la página */
      producto_id: p.dropiId || 54981, pagina: 'colageno-mx',
      /* EL NOMBRE DEL CAMPO IMPORTA: tiene que ser `event_id`, tal cual.
         El flujo `Pedido Tienda Jaye` ya lo guarda en `capi_event_id` con
         `NULLIF(d.j->>'event_id','')`, y de ahi lo toma el flujo `CAPI Ventas
         WhatsApp`, que le manda la compra a Meta desde el servidor cada 15
         minutos. Si el campo llega vacio, ese flujo cae a `wa-<id>` — un
         identificador que el navegador nunca uso — y entonces Meta ve DOS
         compras distintas por la misma venta.
         Mandandolo con este nombre, el aviso del navegador y el del servidor
         llevan el MISMO identificador y Meta los junta en uno. Asi se
         recupera lo que el navegador no alcanza a avisar (bloqueadores,
         Safari, el que cierra la pagina) sin contar de mas. */
      /* 24-09: la tienda NO define window.jayePixel (solo inicializa fbq en el
         index), asi que esto se iba VACIO y pasaba justo lo que avisa el
         comentario de arriba: el servidor caia a wa-<id>, el navegador mandaba
         otro sin identificador y Meta contaba DOS compras por cada venta. El
         23-09 registro 109 compras cuando hubo 105 ventas en todo el dia, y
         con esos numeros inflados dejo de encontrar a quien mostrarle y corto
         la entrega. Si no hay jayePixel se genera uno aqui, y es el MISMO que
         se le pasa al fbq mas abajo. */
      event_id: (function () {
        if (window.jayePixel) return window.jayePixel.id();
        if (!window._jayeEvId) window._jayeEvId = 'web-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
        return window._jayeEvId;
      })(),
      fbp: window.jayePixel ? window.jayePixel.fbp() : '',
      fbc: window.jayePixel ? window.jayePixel.fbc() : '',
      ua: navigator.userAgent,
      url_origen: location.href,
    };
    /* ANTES decia `.then(gracias).catch(gracias)`, o sea: pasara lo que
       pasara, al cliente se le daba las gracias Y se le avisaba la compra a
       Meta. Si el webhook estaba caido, el pedido se perdia igual: el cliente
       creia que habia comprado y Meta contaba una venta que no existia.
       El 28-08 pasaron dos asi — Meta reportaba 2 compras y en el panel no
       habia ninguna.
       Ahora: solo se agradece y se avisa a Meta si el pedido ENTRO de verdad.
       Si no entro, se guarda y se reintenta. */
    function mandar(datos, intento) {
      /* 29-10 MÉXICO (igual que el Brain): contra entrega y pago anticipado van al MISMO flujo pedido-tienda-mx
         (forma_pago 'cod' o 'pre'), que devuelve {ok, id}; el id hace falta para cobrar con PayPal */
      var _url = window.URL_PEDIDO || 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda-mx';
      return fetch(_url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos),
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { return {}; });
      }).catch(function (e) {
        /* tres intentos, separados, por si fue un tropiezo de red */
        if (intento < 3) {
          return new Promise(function (ok) { setTimeout(ok, 1500 * intento); })
            .then(function () { return mandar(datos, intento + 1); });
        }
        throw e;
      });
    }

    mandar(_pedido, 1).then(function (res) {
      /* 08-10: el cmp viajaba en el pedido pero el flujo de la tienda no lo guarda. Se anota aparte
         (telefono + anuncio) para saber que campana trajo cada venta del panel. */
      try { if (_pedido.cmp) fetch('https://n8n-production-8a42.up.railway.app/webhook/track-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
        body: JSON.stringify({ phone: String(indic || '') + String(tel || ''), cmp: _pedido.cmp, producto: p.nombre, canal: 'pagina' }) }).catch(function () {}); } catch (e) {}
      if (_pre) pagar(res); else gracias();
    }).catch(function () {
      /* el pedido NO entro: se guarda para reintentarlo al volver a abrir la
         pagina, y se le dice la verdad al cliente en vez de un falso exito.
         El de pagar ahora NO se guarda: el reintento va al webhook normal y entraria
         como contra entrega con el precio rebajado. */
      if (!_pre) { try { localStorage.setItem('jaye_pedido_pendiente', JSON.stringify(_pedido)); } catch (e) {} }
      noEntro();
    });

    /* 04-10 PAGAR AHORA (igual que España): el pedido ya entro como "PAGO PENDIENTE"; aqui mismo salen los botones
       de PayPal y tarjeta. La orden la crea n8n con el importe de la base, en USD al dolar del dia (paypal-orden-cl),
       y n8n comprueba con PayPal que el cobro es de ESTE pedido y por ESE importe antes de marcarlo pagado
       (paypal-captura-cl). La COMPRA a Meta se avisa recien cuando el pago queda confirmado. */
    function pagar(res) {
      /* 29-10 MÉXICO: misma cuenta de PayPal que el Brain, cobrando en PESOS MEXICANOS por sus flujos paypal-orden-mx /
         paypal-captura-mx (modo 'live'; con ?pp=sandbox en la URL se prueba en sandbox, igual que el Brain) */
      var _N8N = 'https://n8n-production-8a42.up.railway.app/webhook/', _vid = (res && res.id) || '', _nom1 = esc(g('fNombre').split(' ')[0]);
      var _ppSandbox = /[?&]pp=sandbox\b/.test(location.search);
      var _ppId = _ppSandbox ? 'ARl0OqVJgvzKnXBi88HHPnsANVy6psflN_yB0V-EeewfUrAWn1o7C0AVx4Ey0006osewp5ryNr9OSOEX'
                             : 'BAAc9NmbkqAJ4xLXd_DH4VoURfOABXorMuqMMJoN1M3ron-JlSCnQiaHq3kzTXWZIhuXRYVzPF59hmYx30';
      var _wa = 'https://wa.me/' + WA_MX + '?text=' + encodeURIComponent('Hola, hice mi pedido de ' + p.nombre + ' para pagar con tarjeta y no pude pagar. Mi nombre es ' + g('fNombre'));
      $('pedir').innerHTML = '<div class="listo"><h3>Último paso: paga tu pedido</h3>'
        + '<p>Gracias, ' + _nom1 + '. Paga aquí mismo con tarjeta o PayPal y tu pedido sale hoy.</p>'
        + '<p style="font-size:22px;font-weight:800;margin:10px 0 2px">Total a pagar: ' + pesos(_cobra) + '</p>'
        + '<p style="font-size:14px;font-weight:700;margin:0 0 8px">Toca el botón negro «Tarjeta de débito o crédito» y pagas con tu tarjeta.</p>'
        + '<div id="ppBotones" style="min-height:120px;margin:4px 0 8px;background:#fff;border-radius:12px;padding:12px"><p style="font-size:14px;color:#475569">Cargando el pago seguro…</p></div>'
        /* 29-10 MÉXICO: PayPal cobra directo en pesos mexicanos (MXN): no hace falta el aviso de dólares de Chile */
        + '<p id="ppEstado" role="status" aria-live="polite" style="font-size:15px;font-weight:700;min-height:22px;margin:6px 0"></p>'
        + '<p style="font-size:13px;opacity:.8">¿No puedes pagar? <a href="' + _wa + '" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Escríbenos por WhatsApp</a> y te ayudamos.</p></div>';
      $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });
      var msg = function (t, c) { var e = $('ppEstado'); if (e) { e.textContent = t; e.style.color = c || ''; } };
      var post = function (ruta, d) { return fetch(_N8N + ruta, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) }).then(function (r) { return r.json(); }); };
      var pintar = function () {
        if (!window.paypal || !window.paypal.Buttons) return msg('El pago no cargó. Recarga la página o escríbenos por WhatsApp.', '#b91c1c');
        if (!_vid) return msg('Tu pedido quedó registrado, pero el pago no se pudo abrir. Escríbenos por WhatsApp y te ayudamos a pagar.', '#b91c1c');
        $('ppBotones').innerHTML = '';
        window.paypal.Buttons({
          style: { layout: 'vertical', shape: 'rect', label: 'pay', height: 48 },
          createOrder: function () { msg(''); return post('paypal-orden-mx', { venta_id: _vid, modo: _ppSandbox ? 'sandbox' : 'live' }).then(function (j) { if (!j || !j.ok || !j.id) throw new Error((j && j.motivo) || 'sin orden'); return j.id; }); },
          onApprove: function (data) {
            msg('Comprobando el pago…');
            return post('paypal-captura-mx', { venta_id: _vid, order_id: data.orderID, modo: _ppSandbox ? 'sandbox' : 'live' }).then(function (j) {
              if (!j || !j.ok) throw new Error((j && j.motivo) || 'no completado');
              pagado();
            }).catch(function () { msg('No pudimos confirmar el pago. Si se te cobró, escríbenos por WhatsApp y lo revisamos al momento.', '#b91c1c'); });
          },
          onCancel: function () { msg('No se completó el pago. Puedes intentarlo de nuevo cuando quieras.'); },
          onError: function () { msg('El pago no se pudo iniciar. Inténtalo de nuevo o escríbenos por WhatsApp.', '#b91c1c'); }
        }).render('#ppBotones');
      };
      var pagado = function () {
        /* recien aqui la COMPRA a Meta, con el mismo event_id que viajo en el pedido */
        try {
          var _c = { value: _cobra, currency: 'MXN', content_name: p.nombre, content_ids: [p.id], content_type: 'product', num_items: k.cant };
          if (window.fbq && !window._compraEnviada) { window._compraEnviada = true; _datosMeta(); fbq('track', 'Purchase', _c, { eventID: _pedido.event_id }); }
        } catch (e) {}
        $('pedir').innerHTML = '<div class="listo"><h3>¡Pago recibido!</h3><p>Gracias, ' + _nom1 + '. Tu pedido está pagado y sale hoy. Te escribimos por WhatsApp al '
          + esc(indic) + ' ' + esc(tel) + ' cuando vaya en camino.</p></div>';
        $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
      if (window.paypal && window.paypal.Buttons) return pintar();
      var s = document.createElement('script');
      s.src = 'https://www.paypal.com/sdk/js?client-id=' + _ppId + '&currency=MXN&intent=capture&components=buttons&locale=es_MX';
      s.onload = pintar; s.onerror = pintar; document.head.appendChild(s);
    }

    /* 05-10 (recomendacion de Meta): antes de la COMPRA se le pasan al pixel los datos del cliente,
       con el telefono como "identificador externo", igual que lo manda el servidor (mismo numero con
       indicativo). El pixel los cifra solo. Va en try: si algo falla, la compra sigue igual. */
    function _datosMeta() {
      try {
        if (!window.fbq) return;
        var _num = String(indic || '').replace(/\D/g, '') + String(tel || '');
        var _u = { ph: _num, external_id: _num, country: String(paisCod || 'mx').toLowerCase() };
        var _fn = (g('fNombre').split(' ')[0] || '').toLowerCase();
        if (_fn) _u.fn = _fn;
        /* 29-10 MÉXICO: el píxel de México (el de Chile, 1249894010361489, NO) */
        fbq('init', window.PIXEL_EU || '3801303723356168', _u);
      } catch (e) {}
    }

    function gracias() {
      /* La COMPRA. La pagina disparaba PageView, ViewContent e InitiateCheckout
         pero nunca Purchase, y las campañas a la web optimizan justo a Purchase:
         Meta no tenia con que aprender. Se dispara una sola vez, aca, que es el
         unico punto donde el pedido ya salio. */
      if (window.fbq && !window._compraEnviada) {
        window._compraEnviada = true;
        _datosMeta();
        var _c = {
          value: k.precio, currency: 'MXN',
          content_name: p.nombre, content_ids: [p.id],
          content_type: 'product', num_items: k.cant,
        };
        try {
          /* MISMO identificador que viajo en el pedido: asi, cuando el
             servidor mande esta compra tambien, Meta las junta en una sola */
          if (window.jayePixel) window.jayePixel.track('Purchase', _c, _pedido.event_id);
          /* 24-09: el tercer parametro de fbq es {eventID}. Sin el, este aviso
             y el que manda el servidor son dos compras distintas para Meta. */
          else fbq('track', 'Purchase', _c, { eventID: _pedido.event_id });
        } catch (e) { /* que un bloqueador de anuncios no tumbe la confirmacion */ }
      }
      $('pedir').innerHTML = '<div class="listo"><h3>Pedido recibido</h3>'
        + '<p>Gracias, ' + esc(g('fNombre').split(' ')[0]) + '. Te escribimos por WhatsApp al ' + esc(indic) + ' ' + esc(tel)
        + ' para confirmar el despacho.<br>Pagas cuando lo recibes.</p></div>';
      $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });

    /* VENTANA POST-COMPRA: el Gel Sellador.
       Copiada de la que ya corre con el Parche Adelgazante en app.js. Sale
       DESPUES de que el pedido entro, nunca antes: el cliente ya compro y se
       le ofrece agregarlo con un toque, sin volver a llenar nada. Va en la
       misma guia, asi que no paga flete aparte.
       Solo en los productos que tienen upsell; en los demas no se ofrece. */
    var extra = (window.UPSELLS || {})[String(p.id)];
    if (extra) abrirUpsell(g('fNombre').split(' ')[0], indic + tel, extra);

      try { localStorage.removeItem('jaye_pedido_pendiente'); } catch (e) {}
    }

    /* El pedido NO entro. Antes se le mostraba "Pedido recibido" igual y se le
       avisaba la compra a Meta: el cliente se quedaba esperando algo que nadie
       iba a despachar. Ahora se le dice la verdad y se le da una salida. */
    function noEntro() {
      var wa = 'https://wa.me/' + WA_MX + '?text=' + encodeURIComponent(
        'Hola, hice mi pedido de ' + p.nombre + ' en la pagina y no me confirmo. Mi nombre es ' + g('fNombre'));
      $('pedir').innerHTML = '<div class="listo"><h3>No pudimos registrar tu pedido</h3>'
        + '<p>Se cayo la conexion justo al enviarlo, y no queremos decirte que quedo si no es cierto.'
        + '<br>Tus datos quedaron guardados: vuelve a intentarlo en un momento, o escribenos y lo tomamos nosotros.</p>'
        + '<a class="cta negro" href="' + wa + '" style="width:auto;display:inline-block;padding:14px 26px;margin-top:6px">Escribir por WhatsApp</a>'
        + '</div>';
      $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  /* Si un pedido quedo sin entrar, se reintenta solo al volver a abrir la
     pagina. Asi no se pierde aunque el cliente cierre y vuelva. */
  (function reintentar() {
    var crudo;
    try { crudo = localStorage.getItem('jaye_pedido_pendiente'); } catch (e) { return; }
    if (!crudo) return;
    var datos;
    try { datos = JSON.parse(crudo); } catch (e) { try { localStorage.removeItem('jaye_pedido_pendiente'); } catch (x) {} return; }
    fetch(window.URL_PEDIDO || 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos),
    }).then(function (r) {
      if (r.ok) { try { localStorage.removeItem('jaye_pedido_pendiente'); } catch (e) {} }
    }).catch(function () { /* se queda guardado para la proxima */ });
  })();
})();

/* ---------- el boletin del pie ----------
   El pie es el mismo de la tienda, y su formulario lo maneja tienda.js, que
   esta ficha no carga (traeria la rejilla de productos entera). Se copia solo
   esta parte, para que el pie no quede muerto. */
(function () {
  var f = document.getElementById('fBoletin');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var c = document.getElementById('correoBoletin');
    var ok = document.getElementById('aceptoBoletin');
    if (!c.value || c.value.indexOf('@') < 0) { c.focus(); return; }
    if (ok && !ok.checked) { ok.focus(); return; }
    f.outerHTML = '<p class=gracias>Listo. Te avisamos cuando haya novedades.</p>';
  });
})();

/* El WhatsApp queda siempre visible en la esquina, como en NAD+. */


/* ---------- las secciones aparecen al llegar a ellas ----------
   Mismo comportamiento que la tienda: nada se queda invisible. */
function revelarFicha() {
  var partes = document.querySelectorAll('[data-rv]:not(.vino)');
  /* si la ficha aun no se pinto, se reintenta: antes salia de aca y las
     secciones se quedaban invisibles para siempre */
  if (!partes.length) { setTimeout(revelarFicha, 200); return; }
  if (!('IntersectionObserver' in window)) { partes.forEach(function (e) { e.classList.add('vino'); }); return; }
  var ojo = new IntersectionObserver(function (ent) {
    ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vino'); ojo.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  partes.forEach(function (e) { ojo.observe(e); });
  setTimeout(function () { document.querySelectorAll('[data-rv]:not(.vino)').forEach(function (e) {
    if (e.getBoundingClientRect().top < window.innerHeight) e.classList.add('vino'); }); }, 400);
}
revelarFicha();

/* el carrusel de resenas: se duplica la lista para que corra sin cortes */
(function () {
  var t = document.getElementById('revAuto');
  if (!t || !window.RESENAS) return;
  /* las de ESTE producto, no window.RESENAS crudo: esa lista empieza por la
     Almohada y en la ficha del Organizador salia "duermo mejor y mi senora
     tambien" */
  var lote = (window.RESENAS_MIAS && window.RESENAS_MIAS.length
                ? window.RESENAS_MIAS : window.RESENAS).slice(0, 14);
  var uno = lote.map(function (r) {
    return '<article class="rsc"><div class="arriba"><span class="ini">' + (r.nombre || '?').charAt(0) + '</span>'
      + '<span class="quien">' + r.nombre + '<i class="verif">✓ Verificado</i><small>' + (r.comuna || '') + '</small></span></div>'
      + '<p>' + r.texto + '</p></article>';
  }).join('');
  t.innerHTML = uno + uno;
})();

/* ---------- los numeros de Resultados suben desde cero ----------
   Se respeta el formato: 701 sube entero, 4,6 sube con decimal, /usr/bin/bash y 30
   quedan tal cual porque contar hasta 0 no se ve. */
function contarNumeros() {
  var caja = document.querySelector('.res-sec');
  if (!caja) return;
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function subir(el) {
    var fin = String(el.dataset.num || el.textContent).trim();
    if (/\s/.test(fin)) return;   /* 29-10 MÉXICO: "2 a 5" es un rango, se deja quieto */
    var num = parseFloat(fin.replace(/[^0-9,.]/g, '').replace(',', '.'));
    if (!num || quieto) return;
    var dec = fin.indexOf(',') >= 0 ? 1 : 0;
    var pre = fin.match(/^[^0-9]*/)[0], pos = fin.match(/[^0-9,.]*$/)[0];
    var t0 = null, dur = 1100;
    function paso(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var suave = 1 - Math.pow(1 - p, 3);          // arranca rapido y frena
      var v = (num * suave).toFixed(dec).replace('.', ',');
      el.textContent = pre + v + pos;
      if (p < 1) requestAnimationFrame(paso); else el.textContent = fin;
    }
    el.textContent = pre + (dec ? '0,0' : '0') + pos;
    requestAnimationFrame(paso);
  }
  var arrancado = false;
  function mirar() {
    if (arrancado) return;
    if (caja.getBoundingClientRect().top > window.innerHeight * 0.85) return;
    arrancado = true;
    caja.querySelectorAll('b[data-num]').forEach(function (el, i) {
      setTimeout(function () { subir(el); }, i * 110);
    });
  }
  window.addEventListener('scroll', mirar, { passive: true });
  mirar();
}
contarNumeros();

/* La barra aparece cuando el cliente ya bajo, y se esconde al llegar al
   formulario para no tapar el boton de comprar. El WhatsApp sube con ella. */
(function () {
  var sb = document.querySelector('.stickycta'), ped = document.getElementById('pedir');
  if (!sb) return;
  var esperando = false;
  function mirar() {
    var y = window.scrollY || 0;
    var enForm = ped && ped.getBoundingClientRect().top < window.innerHeight * 0.92;
    var ver = y > 420 && !enForm;
    sb.classList.toggle('show', ver);
    document.body.classList.toggle('con-barra', ver);
    esperando = false;
  }
  window.addEventListener('scroll', function () {
    if (esperando) return; esperando = true; requestAnimationFrame(mirar);
  }, { passive: true });
  mirar();
})();

/* ====== Aviso al salir (exit-intent) — una sola vez por sesion ======

   Copiado del que ya corre en la pagina de pestañas, que es el que James
   aprobo. Salta en dos momentos: cuando el mouse se va por arriba de la
   ventana (el gesto de cerrar la pestaña) y cuando le dan al boton de atras.

   No aparece si el cliente ya hizo el pedido: en ese caso el bloque #pedir
   queda reemplazado por el mensaje "Pedido recibido", y eso es lo que se
   mira para no molestar a quien ya compro.                                */
(function () {
  var WA = 'https://wa.me/' + (window.WA_NUM || '525597219871');   /* 29-10 MÉXICO */
  var st = document.createElement('style');
  st.textContent =
    '.exit-ov{position:fixed;inset:0;background:rgba(6,9,18,.7);display:grid;place-items:center;z-index:99999;padding:18px;animation:exitfade .2s ease}'
    + '@keyframes exitfade{from{opacity:0}to{opacity:1}}'
    + '.exit-card{background:#fff;border-radius:22px;max-width:380px;width:100%;padding:30px 24px 26px;text-align:center;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.45)}'
    + '.exit-x{position:absolute;top:10px;right:15px;border:0;background:none;font-size:27px;cursor:pointer;color:#aaa;line-height:1}'
    + '.exit-card .em{font-size:46px;line-height:1}'
    + '.exit-card h3{font-size:22px;margin:8px 0 10px;color:#0c1526;font-weight:800}'
    + '.exit-card p{font-size:15px;color:#555;line-height:1.55;margin-bottom:18px}'
    + '.exit-card p b{color:#0c1526}'
    + '.exit-cta{width:100%;border:0;border-radius:14px;padding:15px 18px;font-size:16px;font-weight:800;cursor:pointer;background:#e1283c;color:#fff}'
    + '.exit-wa{display:block;margin-top:13px;color:#16a34a;font-weight:700;text-decoration:none;font-size:14px}';
  document.head.appendChild(st);

  var mostrado = false;
  function yaCompro() {
    var p = document.getElementById('pedir');
    return !!(p && p.querySelector('.listo'));
  }
  function mostrar() {
    if (mostrado || yaCompro()) return;
    try {
      if (sessionStorage.getItem('jaye_exit')) return;
      sessionStorage.setItem('jaye_exit', '1');
    } catch (e) { /* navegacion privada: se muestra igual, una vez */ }
    mostrado = true;
    var ov = document.createElement('div');
    ov.className = 'exit-ov';
    ov.innerHTML = '<div class="exit-card"><button class="exit-x" aria-label="Cerrar">&times;</button>'
      + '<div class="em">🎁</div><h3>¡Espera! No te vayas todavía</h3>'
      + '<p>Esta promoción con <b>envío gratis</b> es <b>solo por hoy</b>. '
      + 'No pagas nada ahora: <b>pagas al recibir</b> en tu casa.</p>'
      + '<button class="exit-cta">Quiero completar mi pedido</button>'
      + '<a class="exit-wa" href="' + WA + '" target="_blank" rel="noopener">o escríbenos por WhatsApp</a></div>';
    document.body.appendChild(ov);
    function cerrar() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.querySelector('.exit-x').onclick = cerrar;
    ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
    ov.querySelector('.exit-cta').onclick = function () {
      cerrar();
      var p = document.getElementById('pedir');
      if (p) p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }

  document.addEventListener('mouseout', function (e) {
    if (e.clientY <= 0 && !e.relatedTarget) mostrar();
  });
  /* el boton de atras: se deja una entrada extra en el historial para poder
     atraparlo sin sacar al cliente de la pagina */
  try {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', function () {
      if (!mostrado) { mostrar(); history.pushState(null, '', location.href); }
    });
  } catch (e) {}
})();

/* ====== VENTANA POST-COMPRA: oferta del Gel Sellador ======
   Sale DESPUES de que el pedido entro, igual que la del Parche Adelgazante.
   El cliente ya compro: aqui solo se le ofrece agregarlo con un toque, sin
   volver a llenar nada. Va en el mismo envio, asi que no paga flete aparte. */
function abrirUpsell(nombre, telWA, upsell) {
  /* el upsell llega desde la ficha segun el producto; si no viene, se cae al
     del sellador para no romper nada que lo llamara con dos argumentos */
  var U = upsell || window.UPSELL_SELLADOR; if (!U) return;
  var money = function (n) { return '$' + Math.round(n).toLocaleString('es-CL'); };
  var fb = function (ev, obj) { try { if (window.fbq) window.fbq('track', ev, obj); } catch (e) {} };

  /* ---- EL COLOR DE LA VENTANA ----
     Antes estaba clavado en el azul marino del Gel Sellador. Con la placa
     verde del Lymphoria encima quedaba pegado y no parecia el mismo producto
     (lo cazo James, 10-sep). Ahora cada upsell puede traer su `tema`; el que
     no trae ninguno se queda con el azul de siempre, asi que el sellador y el
     encendedor no cambian en nada. */
  var T = U.tema || { osc: '#0B1A3F', med: '#1E4A8C', btnA: '#12306E', btnB: '#2563C7',
                      texto: '#10265A', borde: '#cfdcf2', suave: '#f6f9ff', foto: '#0a1020',
                      sombra: '18,48,110' };

  var st = document.createElement('style');
  st.textContent =
    '@keyframes upIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:none}}'
  + '@keyframes upFade{from{opacity:0}to{opacity:1}}'
  + '.upov{position:fixed;inset:0;background:rgba(4,10,24,.74);z-index:99999;display:flex;'
  + 'align-items:center;justify-content:center;padding:8px;overflow:auto;animation:upFade .18s ease}'
  + '.upcard{position:relative;background:#fff;border-radius:24px;max-width:360px;width:100%;'
  /* James, 12-sep: «que se vea completa en el celular, sin scroll». La tarjeta
     se limita al alto de la pantalla y reparte el espacio: la foto toma lo que
     sobra y se ve entera, solo mas chica. Nada queda debajo del pliegue. */
  + 'display:flex;flex-direction:column;max-height:calc(100dvh - 16px);'
  + 'padding:0 0 20px;text-align:center;color:#1b2432;overflow:hidden;'
  + 'box-shadow:0 30px 80px rgba(4,10,24,.55);animation:upIn .26s cubic-bezier(.2,.9,.3,1.15)}'
  + '.upcard .cab{background:linear-gradient(135deg,' + T.osc + ',' + T.med + ');padding:16px 18px 14px}'
  /* el texto es largo: con radio de capsula y 3 lineas se veia mal. Radio
     mediano, letra un punto menor y menos espaciado para que entre en dos. */
  + '.upcard .tag{display:inline-block;background:#fff;color:' + T.texto + ';font-weight:800;'
  + 'border-radius:13px;padding:7px 14px;font-size:11px;letter-spacing:.3px;'
  + 'line-height:1.4;max-width:100%;text-wrap:balance}'
  + '.upcard h3{font-size:19px;margin:9px 0 0;font-weight:800;line-height:1.25;color:#fff}'
  /* La foto se limita en alto: a tamano completo empujaba la opcion de dos
     unidades debajo del pliegue en celular, y ahi esta el margen. Con
     'contain' la placa se ve entera, solo mas chica. */
  /* James, 12-sep: «que ocupe toda la pantalla la imagen». Se va el tope de
     240px: la placa va de borde a borde y entera. Como eso empuja el precio
     y el boton hacia abajo, la ventana gana desplazamiento propio (mas
     abajo, en .upcard) para que el boton siga siendo alcanzable. */
  + '.upcard .foto{display:block;width:100%;flex:1 1 auto;min-height:0;height:auto;'
  + 'object-fit:contain;background:' + T.foto + ';margin:0}'
  + '.upcard .sub{font-size:13px;color:#68788e;margin:14px 22px 12px;line-height:1.5}'
  /* James 16-sep: con los beneficios la foto quedaba angosta y con bordes
     negros a los lados. En la ventana con anuncio la foto llena todo el
     ancho y recorta arriba y abajo (pared y piso), nunca a los lados. */
  + '.upcon .foto{object-fit:cover;object-position:50% 62%;width:100%}'
  + '.upben{margin:13px 18px 8px;text-align:center}'
  + '.upbt{margin:0 0 9px;font-size:17px;font-weight:800;color:' + T.texto + ';letter-spacing:-.2px}'
  + '.upben ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:7px}'
  + '.upben li{display:flex;align-items:center;gap:6px;text-align:left;font-size:12.5px;font-weight:700;'
  + 'color:' + T.texto + ';background:' + T.suave + ';border:1px solid ' + T.borde + ';border-radius:11px;'
  + 'padding:8px 9px;line-height:1.25}'
  + '.upben svg{flex:0 0 17px;width:17px;height:17px;border-radius:50%;background:' + T.btnB + ';'
  + 'fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;padding:2px;box-sizing:border-box}'
  + '.upcard .precio{font-size:33px;font-weight:800;color:' + T.texto + ';letter-spacing:-.6px;margin:2px 0 0}'
  + '.upcard .precio small{font-size:12.5px;color:#68788e;font-weight:500;display:block;'
  + 'margin-top:5px;letter-spacing:0}'
  + '.upbtns{margin:16px 22px 0}'
  + '.upsi,.updos{width:100%;border:0;border-radius:15px;font-weight:800;cursor:pointer;'
  + 'transition:transform .14s ease,box-shadow .22s ease,filter .22s ease,border-color .22s ease}'
  + '.upsi{padding:16px;font-size:15px;background:linear-gradient(135deg,' + T.btnA + ',' + T.btnB + ');'
  + 'color:#fff;box-shadow:0 10px 24px rgba(' + T.sombra + ',.38)}'
  + '.upsi:hover{filter:brightness(1.09);box-shadow:0 14px 30px rgba(' + T.sombra + ',.46)}'
  + '.upsi:active{transform:translateY(2px);box-shadow:0 5px 12px rgba(' + T.sombra + ',.34)}'
  + '.updos{margin-top:10px;padding:14px;font-size:13px;background:#fff;color:' + T.btnA + ';'
  + 'border:2px solid ' + T.borde + ';display:flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap}'
  + '.updos:hover{border-color:' + T.btnB + ';background:' + T.suave + '}'
  + '.updos:active{transform:translateY(2px)}'
  + '.updos .ah{background:#e8f7ee;color:#1c7a3e;font-size:11px;font-weight:800;white-space:nowrap;'
  + 'border-radius:999px;padding:4px 9px}'
  /* El NO tiene que verse y poder tocarse. Estaba en gris #93a1b5 (contraste
     2.6 sobre blanco: casi invisible) y con 16px de alto, imposible de
     acertar con el dedo. Ahora llega a 4.9 de contraste y a 46px de alto,
     que es el minimo para tocar. Sigue siendo el boton secundario: no
     compite con el de comprar, pero el que no lo quiere puede salir. */
  /* James, 12-sep: «mas grande» y «ponlo como boton tambien». Deja de ser un
     enlace subrayado y pasa a boton con borde, del mismo alto que los otros
     dos, pero en gris: sigue siendo la salida, no compite con el CTA. */
  + '.upno{width:100%;border:1.5px solid #d8dee8;background:#fff;color:#43536b;margin-top:12px;'
  + 'font-size:16px;font-weight:700;padding:16px 8px;min-height:54px;cursor:pointer;'
  + 'border-radius:15px}'
  + '.upno:hover{color:#2b3a4d;background:#f3f5f8;border-color:#c7d0dd}'
  /* la X pasa de 29 a 42px: 29 no se acierta con el dedo */
  + '.upx{position:absolute;top:9px;right:10px;border:0;background:rgba(255,255,255,.24);color:#fff;'
  + 'width:44px;height:44px;min-width:44px;border-radius:50%;font-size:22px;line-height:1;cursor:pointer;z-index:2}'
  + '.upx:hover{background:rgba(255,255,255,.34)}'
  /* pantallas bajas: se aprietan los textos para que los tres botones entren
     sin scroll. La foto cede lo que haga falta porque es la que reparte. */
  + '@media (max-height:820px){.upcard{padding-bottom:12px}'
  + '.upcard .cab{padding:12px 16px 10px}.upcard .cab h3{font-size:17px;margin-top:7px}'
  + '.upcard .sub{margin:9px 20px 8px;font-size:12.5px}'
  + '.upben{margin:9px 16px 6px}.upbt{font-size:15.5px;margin-bottom:7px}.upben li{padding:6px 8px;font-size:12px}'
  + '.upcard .precio{font-size:28px}.upcard .precio small{margin-top:3px}'
  + '.upbtns{margin:10px 20px 0}.upsi{padding:14px}.updos{padding:12px}'
  + '.upno{margin-top:8px;padding:13px 8px;min-height:48px}}'
  + '@media (prefers-reduced-motion:reduce){.upcard,.upov{animation:none}'
  + '.upsi,.updos{transition:none}}';
  document.head.appendChild(st);

  var uno = U.opciones[0].precio, dos = U.opciones[1].precio;
  var ov = document.createElement('div'); ov.className = 'upov';
  ov.innerHTML = '<div class="upcard' + (U.anuncio ? ' upcon' : '') + '">'
    + '<button class="upx" id="upX" aria-label="Cerrar">&times;</button>'
    + '<div class="cab">'
    +   '<span class="tag">TE GANASTE ESTA PROMOCI\u00d3N POR TU COMPRA</span>'
    +   '<h3>' + U.nombre + '</h3>'
    + '</div>'
    + (U.foto ? '<img class="foto" src="' + U.foto + '" alt="' + U.nombre + '" onerror="this.remove()">' : '')
    + (U.anuncio
        ? '<div class="upben"><p class="upbt">' + U.anuncio.titulo + '</p><ul>'
          + U.anuncio.puntos.map(function (t) {
              return '<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>' + t + '</li>';
            }).join('') + '</ul></div>'
        : '<p class="sub">Antes de despachar tu paquete, agr\u00e9galo con un toque. '
          + 'Va en el mismo env\u00edo, sin costo extra de despacho.</p>')
    + '<div class="precio">+' + money(uno)
    +   '<small>lo pagas al recibir, junto con tu pedido</small></div>'
    + '<div class="upbtns">'
    +   '<button class="upsi" id="upSi">S\u00cd, AGREGARLO A MI PEDIDO</button>'
    +   '<button class="updos" id="upDos">Mejor dos por ' + money(dos)
    +     '<span class="ah">ahorra ' + money(uno * 2 - dos) + '</span></button>'
    +   '<button class="upno" id="upNo">No gracias, solo mi pedido</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(ov);
  fb('ViewContent', { content_name: U.nombre, content_type: 'product', value: uno, currency: 'CLP' });

  function cerrar() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
  function agregar(cant, precio, boton) {
    boton.disabled = true; boton.textContent = 'Agregando\u2026';
    fetch(U.webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefono: telWA, cantidad: String(cant) }) })
      .catch(function () { /* si falla el aviso, el pedido base ya esta a salvo */ })
      .then(function () {
        /* 24-09: esto disparaba Purchase, pero el upsell se AGREGA al mismo
           pedido (el montador lo mete en la misma orden de Dropi), asi que
           Meta contaba una compra que no existia. AddToCart es lo que pasa
           de verdad y no ensucia la optimizacion por Purchase. */
        fb('AddToCart', { content_name: U.nombre, value: precio, currency: 'CLP' });
        ov.querySelector('.upcard').innerHTML =
          '<div class="cab"><h3>\u00a1Agregado a tu pedido!</h3></div>'
          + '<p class="sub">Tu ' + U.nombre + ' va en el mismo env\u00edo. '
          + 'Lo pagas al recibir, junto con lo dem\u00e1s.</p>'
          + '<div class="upbtns"><button class="upsi" id="upOk">Listo</button></div>';
        ov.querySelector('#upOk').addEventListener('click', cerrar);
      });
  }
  ov.querySelector('#upNo').addEventListener('click', cerrar);
  ov.querySelector('#upX').addEventListener('click', cerrar);
  ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
  ov.querySelector('#upSi').addEventListener('click', function () { agregar(1, uno, this); });
  ov.querySelector('#upDos').addEventListener('click', function () { agregar(2, dos, this); });
}

/* ====== CARRITO ABANDONADO ======
   Esto no existia en la ficha. El app.js viejo si lo tenia, y por eso el
   ultimo carrito guardado es del 29 de junio: justo cuando se migro a esta
   pagina. Desde entonces, toda la gente que dejo su telefono y se fue sin
   comprar se perdio. Hoy fueron 18 personas al formulario y cero guardadas.

   Se manda cuando el cliente ya escribio un telefono con 8 digitos o mas y
   una de dos: cambia de campo despues de escribirlo, o se va de la pagina.
   Se reenvia si completa mas datos, y el mismo sid actualiza la misma fila
   en vez de duplicarla.

   Si alcanza a comprar, no se manda nada: para eso esta la marca de compra. */
(function () {
  var URL = 'https://n8n-production-8a42.up.railway.app/webhook/abandonado';
  var SID = 'AB' + Date.now() + Math.floor(Math.random() * 1e6);
  var yaCompro = false, ultimo = '';
  function val(id) { var e = document.getElementById(id); return e ? String(e.value || '').trim() : ''; }
  function datos() {
    var tel = val('fTel').replace(/\D/g, '');
    var cor = val('fCorreo');
    /* sirve con el telefono O con el correo: hay gente que deja uno y no el
       otro, y si exigimos los dos se pierden igual que antes */
    var hayCorreo = cor.indexOf('@') > 0 && cor.indexOf('.') > cor.indexOf('@');
    if (tel.length < 8 && !hayCorreo) return null;
    var pack = (window.PACK_ELEGIDO || {});
    /* los nombres van completos: son los que lee el flujo Abandonado -> PG */
    /* 29-10 MÉXICO: los campos del formulario de México (los mismos nombres que manda el Brain), con +52 */
    return {
      sid: SID, telefono: tel, indicativo: '+52',
      nombre: val('fNombre'), producto: (window.PRODUCTO_NOMBRE || document.title || ''),
      cantidad: String(pack.cant || ''), total: String(pack.precio || ''),
      direccion: val('fDir'), ciudad: val('fCiudad'), provincia: val('fProvincia'), cp: val('fCP'),
      comuna: val('fCiudad'), region: val('fProvincia'),
      referencia: val('fRef'), correo: cor,
      fecha: new Date().toLocaleString('es-MX'), estado: 'INCOMPLETO',
    };
  }
  /* 13-10 (James: "tenemos que registrar tambien las de WhatsApp"): el clic del anuncio (fbc/fbp) va
     aparte, al flujo carrito-clic-cl, con el mismo sid y el telefono. Si el cliente deja el formulario
     y despues compra por WhatsApp, el CAPI de ventas lo cruza por telefono y la compra llega a Meta
     atada al anuncio. Sin esto, 103 de 279 ventas por WhatsApp de la semana entraron "sin anuncio".
     Esta tienda no define window.jayePixel: el clic se lee de las cookies del pixel (_fbc/_fbp) y,
     si no hay _fbc pero la URL trae fbclid, se arma como lo hace Meta. Mismo molde que Espana. */
  /* 29-10 MÉXICO: el de Chile (carrito-clic-cl) no va; se usa el mismo que manda el Brain de México */
  var URL_CLIC = 'https://n8n-production-8a42.up.railway.app/webhook/carrito-clic-es';
  var ultimoClic = '';
  function cookie(n) { var m = document.cookie.match('(?:^|; )' + n + '=([^;]*)'); return m ? decodeURIComponent(m[1]) : ''; }
  function mandarClic(d) {
    try {
      var fbc = cookie('_fbc'), fbp = cookie('_fbp');
      if (!fbc) { var q = new URLSearchParams(location.search).get('fbclid'); if (q) fbc = 'fb.1.' + Date.now() + '.' + q; }
      if (!fbc && !fbp) return;
      if (!window._jayeEvId) window._jayeEvId = 'web-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
      var c = { sid: d.sid, telefono: d.telefono, event_id: window._jayeEvId, fbc: fbc, fbp: fbp, url: location.href };
      var f = JSON.stringify(c);
      if (f === ultimoClic || c.telefono.length < 8) return;
      ultimoClic = f;
      fetch(URL_CLIC, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: f, keepalive: true }).catch(function () {});
    } catch (e) {}
  }
  function mandar() {
    if (yaCompro) return;
    var d = datos(); if (!d) return;
    mandarClic(d);
    var firma = JSON.stringify(d).replace(/"fecha":"[^"]*"/, '');
    if (firma === ultimo) return;          /* nada nuevo que contar */
    ultimo = firma;
    try {
      var cuerpo = JSON.stringify(d);
      /* OJO, esto tenia el orden al reves y por eso no entraba UN SOLO carrito
         desde el 28-jul: sendBeacon con un Blob 'application/json' obliga al
         navegador a pedir permiso CORS antes, y sendBeacon no sabe hacer eso,
         asi que descarta el envio SIN avisar. Ni error en consola, ni
         ejecucion en n8n. Ahora manda fetch con keepalive, que tambien
         sobrevive al cierre de la pestana y si hace el permiso; sendBeacon
         queda de respaldo y con 'text/plain', que es de los que no lo piden. */
      fetch(URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                   body: cuerpo, keepalive: true })
        .catch(function () {
          try { if (navigator.sendBeacon) navigator.sendBeacon(URL, new Blob([cuerpo], { type: 'text/plain' })); } catch (e) {}
        });
    } catch (e) {}
  }
  ['fTel', 'fNombre', 'fDir', 'fCiudad', 'fProvincia', 'fCP', 'fColonia', 'fRef', 'fCorreo'].forEach(function (id) {
    document.addEventListener('blur', function (e) {
      if (e.target && e.target.id === id) mandar();
    }, true);
  });

  /* EL TELEFONO SE CAPTURA APENAS LO ESCRIBE, sin esperar a que cambie de
     campo ni a que se vaya. Antes, si escribia el numero y se quedaba ahi
     pensando —o cerraba de golpe en un celular, donde el pagehide no siempre
     alcanza a salir—, no quedaba NADA y ese cliente se perdia entero.
     Se espera 1,2 s desde la ultima tecla para no mandar un envio por
     digito, y solo cuando ya hay 8 numeros o mas. */
  (function () {
    var tel = document.getElementById('fTel');
    if (!tel) return;
    var t;
    tel.addEventListener('input', function () {
      clearTimeout(t);
      if (tel.value.replace(/\D/g, '').length < 8) return;
      t = setTimeout(mandar, 1200);
    });
  })();
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') mandar();
  });
  window.addEventListener('pagehide', mandar);
  /* si compro, esto deja de mandarse */
  window.marcarCompra = function () { yaCompro = true; };



})();
