/* ============================================================
   FICHA DE PRODUCTO · Jaye Group Chile
   → COPIA PARA GUATEMALA (jayegroupshop.com/gt/drenaje/, 11-11-2026, James: "hazlo idéntico, solo dirigido a Guatemala").
     Pinta las MISMAS secciones que la Lymphoria de Chile. Cambios: quetzales, hora de Guatemala, sin upsells ni envío de
     Chile; el formulario lo pinta formulario.js (motor de /gt/ficha.js → n8n pedido-tienda-gt) dentro de #pedirGT.
     Los eventos de Meta y las visitas del panel los manda formulario.js (con GTQ y "gt-"), no este archivo.

   El orden lo definio el dueno:
     1 galeria (varias fotos)      6 resenas
     2 estrellas de las resenas    7 preguntas frecuentes
     3 precio y nombre             8 sellos de las transportadoras
     4 promocion (packs)           9 te puede interesar
     5 descripcion                10 formulario

   Cada producto es independiente: producto.html?p=antena es el enlace que se
   pone en la campana y lleva directo a su ficha.
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
  var PAISES = [
    ['CL', '+56',  9, 'Chile'],
    ['VE', '+58', 10, 'Venezuela'],
    ['CO', '+57', 10, 'Colombia'],
    ['PE', '+51',  9, 'Perú'],
    ['BO', '+591', 8, 'Bolivia'],
    ['AR', '+54', 10, 'Argentina'],
    ['EC', '+593', 9, 'Ecuador'],
    ['BR', '+55', 11, 'Brasil'],
    ['HT', '+509', 8, 'Haití'],
    ['MX', '+52', 10, 'México'],
    ['ES', '+34',  9, 'España'],
    ['US', '+1',  10, 'Estados Unidos'],
  ];
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  /* GT: quetzales, igual que el formulario de Guatemala ("Q 172") */
  var pesos = function (n) { n = Number(n); return 'Q ' + n.toLocaleString('es-GT', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
  var ESTRELLA = '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7z"/></svg>';
  var estrellas = function (n) { var s = ''; for (var i = 0; i < 5; i++) s += ESTRELLA; return '<span class="est">' + s + '</span>'; };

  /* de que anuncio vino: el ?cmp se guarda para poder atribuir la venta.
     Vivia solo en app.js (landings viejas) y la tienda no lo cargaba. */
  /* GT: el cmp lo guarda formulario.js (llave _cmp_gt, la de la tienda de Guatemala) */

  var id = window.__P || new URLSearchParams(location.search).get('p');
  var TODOS = window.PRODUCTOS || [];
  var p = TODOS.find(function (x) { return x.id === id; });
  var cont = $('prod');

  if (!p) {
    cont.innerHTML = '<div class="datos"><h1>Producto no encontrado</h1>'
      + '<p class="sub">Puede que ya no esté disponible.</p>'
      + '<a class="cta negro" href="/gt/" style="width:auto;display:inline-block;padding:14px 26px">Ver la tienda</a></div>';
    return;
  }

  /* candado: si algun precio no esta en la lista aprobada, no se vende */
  var ok = (p.packs || []).every(function (k) { return (window.PRECIOS_APROBADOS || []).indexOf(k.precio) >= 0; });
  if (!ok) {
    cont.innerHTML = '<div class="datos"><h1>' + esc(p.nombre) + '</h1>'
      + '<p class="sub">Este producto no está disponible por ahora.</p>'
      + '<a class="cta negro" href="/gt/" style="width:auto;display:inline-block;padding:14px 26px">Ver la tienda</a></div>';
    return;
  }

  window.PRODUCTO_ACTUAL = p;

  /* El panel de Jaye (visitas y conversion) lee de Postgres y muestra sola
     cualquier pagina que reporte. La tienda nueva no reportaba nada, por eso
     no aparecia. Se reporta igual que las landings viejas, pero con un slug
     por producto para que cada uno tenga su propia fila. */
  /* GT: la visita al panel ("gt-drenaje") y el ViewContent en GTQ los manda formulario.js. Aquí no se manda nada, para no
     contar dos veces. */
  document.title = p.nombre + ' · Jaye Group Guatemala';
  var meta = document.querySelector('meta[name="description"]');
  if (meta && p.sub) meta.setAttribute('content', p.sub + ' · Envío gratis a toda Guatemala, pagas al recibir.');
  /* GT: precio con tarjeta de cada pack = el APROBADO por James (p.anticipado.precios), no un cálculo */
  var precioTarjeta = function (i) {
    var a = p.anticipado && p.anticipado.precios;
    return a && a[i] != null ? a[i] : Math.floor(p.packs[i].precio * 0.9);
  };
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
  /* GT: sin upsells post-compra (los de Chile son productos de VITALCOM Chile) */

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
    + '<span>o <b id="pcPre">' + pesos(precioTarjeta(0)) + '</b> pagando ahora con tarjeta · <b class="preTop__tag">−10&nbsp;% y entrega prioritaria</b></span></p>'
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
    /* GT: en quetzales se redondea al quetzal (a la centena quedaba Q 300 para Q 172, casi sin descuento a la vista) */
    var antes = Math.round(k.precio * 1.8);
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
      + '<p class="promo-uni promo-tarjeta">o <b>' + pesos(precioTarjeta(iP)) + '</b> pagando ahora con tarjeta · −10&nbsp;% y entrega prioritaria</p>'
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
  /* GT: las transportadoras de Dropi Guatemala todavía no están confirmadas: no se nombra ninguna ni se ponen logos.
     Sin "30 días": la política de Guatemala es retracto de 5 días hábiles. */
  var sellos = '<section class="bloque"><h2>Con quién se despacha</h2><div class="sellos">'
    + '<div class="sello"><div class="nom">Toda Guatemala</div><small>Cobertura nacional</small></div>'
    + '<div class="sello"><div class="nom">A domicilio</div><small>Entrega en tu dirección</small></div>'
    + '<div class="sello"><div class="nom">Pago al recibir</div><small>Pagas cuando el producto está en tus manos</small></div>'
    + '<div class="sello"><div class="nom">5 días hábiles</div><small>Para retractarte de tu compra</small></div>'
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
    /* GT: los números de Chile (701 pedidos, 4,6 días) son de la operación de Chile y en Guatemala todavía no hay
       historia: aquí van solo datos ciertos de la compra. "2 a 5" no lleva contador (no es un número). */
    var datos = [
      ['Q0', 'de envío, a toda Guatemala'],
      ['2 a 5', 'días hábiles hasta tu casa', true],
      ['5', 'días hábiles para retractarte'],
      ['10 %', 'menos si pagas con tarjeta'],
    ];
    return '<section class="bloque res-sec" data-rv><span class="eyebrow">Tu compra</span>'
      + '<h2 class="tit2">Lo que te aseguramos</h2>'
      + '<div class="res-grid">'
      + datos.map(function (d, i) { return '<div class="res" style="--i:' + i + '"><b' + (d[2] ? '' : ' data-num="' + d[0] + '"') + '>' + d[0] + '</b><span>' + d[1] + '</span></div>'; }).join('')
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
      /* GT: política de Guatemala (/gt/reembolso.html): cambio si llega con falla y retracto de 5 días hábiles. Sin "30 días". */
      + '<div class="gseal"><svg viewBox="0 0 220 220" aria-label="Retracto de 5 días hábiles">'
      + '<defs><radialGradient id="gs" cx="0.34" cy="0.28" r="0.95">'
      + '<stop offset="0" stop-color="#f9ecb8"/><stop offset="0.38" stop-color="#e6c65a"/>'
      + '<stop offset="0.68" stop-color="#c9a227"/><stop offset="1" stop-color="#8f741c"/></radialGradient>'
      + '<path id="gt" fill="none" d="M44 110a66 66 0 0 1 132 0"/><path id="gb" fill="none" d="M48 118a62 62 0 0 0 124 0"/></defs>'
      + '<circle cx="110" cy="110" r="98" fill="url(#gs)" opacity=".16"/>'
      + '<circle cx="110" cy="110" r="92" fill="url(#gs)" stroke="#8f741c" stroke-width="3"/>'
      + '<ellipse cx="86" cy="72" rx="46" ry="26" fill="#fff" opacity="0.28"/>'
      + '<circle cx="110" cy="110" r="84" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-dasharray="1.5 6" stroke-linecap="round"/>'
      + '<text font-family="Inter,sans-serif" font-weight="700" font-size="14.5" letter-spacing="2.4" fill="#fff"><textPath href="#gt" startOffset="50%" text-anchor="middle">COMPRA SEGURA</textPath></text>'
      + '<text font-family="Inter,sans-serif" font-weight="700" font-size="12.5" letter-spacing="1.8" fill="#fff"><textPath href="#gb" startOffset="50%" text-anchor="middle">DÍAS HÁBILES</textPath></text>'
      + '<text x="110" y="105" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="800" font-size="46" fill="#fff">5</text>'
      + '<text x="110" y="128" text-anchor="middle" font-family="Inter,sans-serif" font-weight="700" font-size="13" letter-spacing="3" fill="#fff">DÍAS</text>'
      + '</svg></div>'
      + '<h2 class="tit2">Garantía de satisfacción</h2>'
      + '<p class="sub2">Si te llega dañado o distinto, te lo cambiamos. Y puedes retractarte dentro de los 5 días hábiles siguientes a la entrega, con el producto sin uso y en su empaque original.</p>'
      + '<div class="gar-chips"><span>Cambio si llega mal</span><span>5 días para retractarte</span><span>Pago al recibir</span></div>'
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
  function precioPre(i) { return Math.floor(p.packs[i].precio * (100 - ANT_PCT) / 10000) * 100; }
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
  /* GT: misma sección y misma tarjeta que Chile; adentro (#pedirGT) formulario.js pinta el formulario de Guatemala
     (+502, departamento y municipio de Dropi GT, Q, pedido-tienda-gt, PayPal -gt) con las clases de este formulario. */
  var formulario = '<section class="form" id="pedir" data-rv><h2>Pide el tuyo</h2>'
    + '<p class="baj">Lo despachamos hoy. Pagas al recibir o con tarjeta y ahorras un ' + ANT_PCT + ' %.</p>'
    + '<div class="formcard">'
    + '<div class="cod-badge">'
    + '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>'
    + ' Pago 100% seguro contra entrega</div>'
    + '<div id="pedirGT" style="display:contents"></div>'
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
    if ($('pcPre')) $('pcPre').textContent = pesos(precioTarjeta(_tocado ? elegido : 0));
    /* GT: el resumen, los precios del formulario y el botón los maneja formulario.js */
  }
  /* "Pagar con tarjeta" de la seccion de arriba: baja al formulario con "Paga ahora" ya elegido */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest && ev.target.closest('#btnPagoAnt');
    if (!b) return;
    if (window.peElegir) window.peElegir(null, 'pre');   /* GT: formulario.js */
    var d = $('pedir'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  /* GT: la forma de pago, el InitiateCheckout (GTQ) y la visita al formulario los manda formulario.js */
  /* Contador de la promocion. Baja hasta la medianoche EN GUATEMALA (GT) y vuelve a
     arrancar: no inventa una fecha falsa, el precio es el de hoy.
     La hora de Chile se pide con Intl para no hacer cuentas de huso a mano,
     que es donde siempre se mete el error. */
  (function contador() {
    if (!$('cH')) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('es-GT', { timeZone: 'America/Guatemala',
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
    if (window.peElegir) window.peElegir(Number(this.dataset.i));   /* GT: formulario.js */
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
    /* GT: el AddToCart (GTQ) lo manda formulario.js */
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

  /* GT: el formulario (departamento, municipio, envío del pedido, reintento) lo maneja formulario.js (motor de /gt/ficha.js) */
})();

/* GT: el boletín del pie lo maneja formulario.js */

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
  var WA = 'https://wa.me/' + ((window.CONFIG && CONFIG.whatsapp) || '50238149621');   /* GT: +502 3814 9621 */
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
    return !!(p && p.querySelector('.listo, .pf-listo'));
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

/* GT: sin ventana post-compra ni carrito abandonado de Chile (el abandonado de Guatemala va en formulario.js → abandonado-gt) */
