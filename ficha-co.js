/* ============================================================
   FICHA · Gafas de Aumento TR90 · Jaye Group Colombia (jayegroupshop.com)

   El DISEÑO es el de la ficha de Chile (nadplus/ficha.js): mismas secciones,
   mismas clases y el mismo CSS (ficha.css y tienda.css, copiados tal cual).
   Lo ÚNICO distinto, por pedido de James (29-09):
     - el FORMULARIO es el de España: pasos numerados, las dos formas de pago
       como dos fichas lado a lado y el resumen de cuenta (form-espana.css);
     - arriba de todo va la franja de la lupa (efectos.js), que James aprobó.
   No se copian de Chile las secciones que allá son datos de Chile y aquí no
   serían verdad: "Resultados" (701 pedidos en Chile), la garantía de 30 días,
   las transportadoras chilenas y los otros productos.

   El pedido va a n8n (pedido-tienda-co). Si es pago anticipado, n8n crea el
   link de Wompi y la página manda al cliente a pagar.
   ============================================================ */
(function () {
  'use strict';

  var URL_PEDIDO = 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda-co';
  var URL_ESTADO = 'https://n8n-production-8a42.up.railway.app/webhook/pago-estado-co';
  var URL_VISITA = 'https://n8n-production-8a42.up.railway.app/webhook/track-visita';
  var PAGINA = 'co-gafas';
  var WA = '573145021958';

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  var pesos = function (n) { return '$' + Number(n).toLocaleString('es-CO'); };
  var ESTRELLA = '<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7z"/></svg>';
  var ESTRELLA_OFF = '<svg viewBox="0 0 24 24" style="fill:#E5E4E1"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7z"/></svg>';
  /* en Chile todas son de 5; aquí hay de 4 y 3, así que se pinta la nota real */
  var estrellas = function (n) { var s = ''; for (var i = 0; i < 5; i++) s += (i < Math.round(n) ? ESTRELLA : ESTRELLA_OFF); return '<span class="est">' + s + '</span>'; };

  var qs = new URLSearchParams(location.search);
  window._CMP = qs.get('cmp') || qs.get('utm_campaign') || '';
  try { if (window._CMP) localStorage.setItem('_cmp', window._CMP); else window._CMP = localStorage.getItem('_cmp') || ''; } catch (e) {}

  var p = (window.PRODUCTOS || [])[0];
  var cont = $('prod');
  if (!p || !cont) return;
  /* candado de Chile: si algún precio no está en la lista aprobada, no se vende */
  var precios = p.packs.map(function (k) { return k.precio; }).concat(p.anticipado.precios);
  if (!precios.every(function (x) { return (window.PRECIOS_APROBADOS || []).indexOf(x) >= 0; })) {
    cont.innerHTML = '<div class="datos"><h1>' + esc(p.nombre) + '</h1><p class="sub">Este producto no está disponible por ahora.</p></div>';
    return;
  }
  window.PRODUCTO_ACTUAL = p;

  /* visitas al panel (una por sesión), como en Chile, con la página de Colombia */
  function avisarPanel(tipo) {
    try { fetch(URL_VISITA, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: PAGINA, producto: p.nombre, tipo: tipo }) }).catch(function () {}); } catch (e) {}
  }
  try { if (!sessionStorage.getItem('jaye_vis_co')) { sessionStorage.setItem('jaye_vis_co', '1'); avisarPanel('visita'); } } catch (e) {}

  function px(ev, d, id) {
    try { if (window.jayePixel) return window.jayePixel.track(ev, d, id); if (window.fbq) window.fbq('track', ev, d); } catch (e) {}
  }
  px('ViewContent', { content_name: p.nombre, content_type: 'product', content_ids: [p.id], value: p.packs[0].precio, currency: 'COP' });

  /* color del producto (igual que Chile) */
  var raiz = document.documentElement.style;
  raiz.setProperty('--acento', p.acento);
  raiz.setProperty('--acento2', '#7A4A05');
  raiz.setProperty('--aviso', p.acento);
  raiz.setProperty('--cta2', p.botonAlt);
  raiz.setProperty('--sobreCta2', '#fff');
  raiz.setProperty('--sobreAviso', '#fff');
  raiz.setProperty('--sobreAcento', '#fff');

  var iPop = p.popular;
  var elegido = iPop;              /* James 11-sep: el formulario arranca en el MÁS VENDIDO */
  var formaPago = 'cod';           /* como España: arranca en contra entrega */
  function precioPre(i) { return p.anticipado.precios[i]; }
  function precioAhora(i) { return formaPago === 'pre' ? precioPre(i) : p.packs[i].precio; }

  /* ---------- reseñas (resenas.js: todas reales) ---------- */
  var PAISES = { CO: 'Colombia', MX: 'México', CL: 'Chile', ES: 'España', BR: 'Brasil', US: 'Estados Unidos', RU: 'Rusia', UA: 'Ucrania', PE: 'Perú',
    PA: 'Panamá', AU: 'Australia', CA: 'Canadá', PT: 'Portugal', GB: 'Reino Unido', FR: 'Francia', PY: 'Paraguay', DE: 'Alemania', NL: 'Países Bajos',
    UY: 'Uruguay', IL: 'Israel', LV: 'Letonia', SG: 'Singapur', GP: 'Guadalupe', SC: 'Seychelles' };
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function fecha(f) { var d = String(f || '').split('-'); return d.length === 3 ? Number(d[2]) + ' ' + MESES[Number(d[1]) - 1] + ' ' + d[0] : (f || ''); }
  var mias = (window.RESENAS || []).map(function (r) { return Object.assign({}, r, { comuna: PAISES[r.pais] || r.pais || '', fecha: fecha(r.fecha) }); });
  window.RESENAS_MIAS = mias;
  var prom = mias.length ? Math.round(mias.reduce(function (a, r) { return a + r.estrellas; }, 0) / mias.length * 10) / 10 : 0;

  /* ---------- 1 · galería (Chile) ---------- */
  var fotos = (p.fotos && p.fotos.length ? p.fotos : [p.foto]).filter(Boolean);
  var iFoto = 0;
  function pintarGaleria() {
    var marco = document.querySelector('.gal .marco');
    if (!marco) return;
    marco.innerHTML = '<img src="' + esc(fotos[iFoto]) + '" alt="' + esc(p.nombre) + '">';
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
          return '<button type="button" aria-label="Ver foto ' + (i + 1) + '"><img src="' + esc(f) + '" alt=""></button>'; }).join('') + '</div>'
      : '');

  /* ---------- 2 y 3 · estrellas, precio y nombre (Chile) ---------- */
  var kPop = p.packs[0];
  var cabecera = '<div class="datos">'
    + '<div class="estrellas">' + estrellas(prom)
    + '<span class="cuantas">' + prom.toFixed(1) + ' · <a href="#resenas">' + mias.length + ' reseñas</a></span></div>'
    + '<h1>' + esc(p.nombre) + '</h1>'
    + '<p class="sub">' + esc(p.sub) + '</p>'
    + '<div class="precioTop"><span class="ahora" id="pcAhora">' + pesos(kPop.precio) + '</span></div>'
    + '<p class="packDe">Contra entrega · <b>o ' + pesos(precioPre(0)) + ' con pago anticipado</b></p>'
    + '</div>';

  /* ---------- 4 · el botón que baja al pedido (Chile) ---------- */
  var promo = '<section class="bloque">'
    + '<button class="cta rojo rebota" id="btnArriba">Lo quiero</button>'
    + '<p class="ctaSub">Envío incluido · Pago contra entrega o pago anticipado</p></section>';

  /* ---------- 5 · descripción (Chile) ---------- */
  /* «Qué es y para qué sirve» = tres tarjetas con foto que entran de lado (clorofila.js) */
  var FOTOS = [
    ['img/card1.webp', 'Hombre leyendo el celular cómodo con las gafas de aumento', 'Para leer de cerca', 'El celular sin alejarlo', 'Se acabó estirar el brazo y entrecerrar los ojos: lees los mensajes, el periódico o la cuenta del restaurante con claridad.'],
    ['img/card2.webp', 'Pareja usando las gafas de aumento en la sala', 'Para los dos', 'Uno para ti y otro para tu pareja', 'Por eso el combo de 2 pares es el más pedido: cada uno con las suyas, o un par para la casa y otro para el bolso.'],
    ['img/card3.webp', 'Gafas con su estuche rígido abierto y paño de microfibra', 'Qué llega', 'Gafas + estuche rígido + paño', 'Cada par viene con su estuche rígido con cremallera y gancho para colgarlo, y un paño de microfibra para los lentes.'],
  ];
  var desc = '<section class="bloque desc" data-rv><span class="eyebrow">El producto</span><h2 class="tit2">Qué es y para qué sirve</h2>'
    + '<div class="gf-fichas">' + FOTOS.map(function (f) {
        return '<figure class="gf-fi"><img src="' + f[0] + '" alt="' + esc(f[1]) + '" loading="lazy" width="1000" height="1000">'
          + '<figcaption><span class="gf-rot2">' + f[2] + '</span><b>' + f[3] + '</b><p>' + f[4] + '</p></figcaption></figure>';
      }).join('') + '</div>'
    + '</section>';
  /* el número gigante que cuenta (clorofila: el 60) */
  var gigante = '<section class="gf-blq">'
    + '<span class="gf-rot" style="color:var(--acento)">Tu graduación</span>'
    + '<h2 class="gf-h2">¿Cuál me sirve?</h2>'
    + '<p class="gf-sub">Van de +1.00 a +4.00. Si ya usas gafas de lectura, pides el mismo número; si no, te guías por tu edad en el formulario.</p>'
    + '<div class="gf-gigante"><span class="gf-num">7</span><small>graduaciones para elegir</small></div>'
    + '</section>';

  /* ---------- PROMOCIÓN con contador (Chile). El "antes" es el aprobado, no inventado ---------- */
  function seccionPromo() {
    var iP = p.packs.findIndex(function (k) { return k.cant === p.promo; });
    if (iP <= 0) return '';
    var k = p.packs[iP];
    var off = Math.round((1 - k.precio / k.antes) * 100);
    return '<section class="bloque promo-sec" data-rv>'
      + '<div class="promo-card">'
      + '<div class="promo-banner"><span class="chispa">★</span>Promoción<span class="promo-banner-sub">termina hoy</span></div>'
      + '<div class="promo-cuerpo">'
      + '<b class="promo-qt">' + esc(k.texto) + '</b>'
      + '<div class="promo-precios">'
      + '<span class="promo-antes">' + pesos(k.antes) + '</span>'
      + '<span class="promo-precio">' + pesos(k.precio) + '</span>'
      + '<span class="promo-off">-' + off + '%</span></div>'
      + '<p class="promo-uni">' + pesos(Math.round(k.precio / k.cant)) + ' cada ' + p.unidad
      + ' · <b>o ' + pesos(precioPre(iP)) + ' con pago anticipado</b></p>'
      + '<div class="cuenta"><div><b id="cH">--</b><span>horas</span></div>'
      + '<div><b id="cM">--</b><span>min</span></div>'
      + '<div class="seg" id="cajaS"><b id="cS">--</b><span>seg</span></div></div>'
      + '<button class="cta rojo" id="btnPromo" data-i="' + iP + '">Quiero la promoción</button>'
      + '</div></div></section>';
  }

  /* ---------- LA FÓRMULA · círculos con íconos (Chile) ---------- */
  var ICONOS = {
    ojo: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    pluma: '<path d="M20 4C11 4 4 11 4 20"/><path d="M4 20c8 0 16-7 16-16"/><path d="M8 16l4-4"/>',
    libro: '<path d="M4 5a2 2 0 0 1 2-2h6v18H6a2 2 0 0 1-2-2z"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    pantalla: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  };
  function seccionFormula() {
    return '<section class="bloque form-sec" data-rv><span class="eyebrow">' + esc(p.formulaRotulo) + '</span>'
      + '<h2 class="tit2">' + esc(p.formulaTitulo) + '</h2>'
      + '<p class="sub2">' + esc(p.formulaSub) + '</p>'
      + '<div class="ing-grid">'
      + p.formula.map(function (x) {
          return '<div class="ing"><div class="cir"><svg viewBox="0 0 24 24">' + (ICONOS[x[0]] || ICONOS.ojo) + '</svg></div>'
            + '<div><b>' + esc(x[1]) + '</b><p>' + esc(x[2]) + '</p></div></div>';
        }).join('')
      + '</div></section>';
  }

  /* ---------- QUÉ LO HACE DIFERENTE (Chile) ---------- */
  function seccionCompara() {
    return '<section class="bloque cmp-sec" data-rv><h2 class="tit2">' + esc(p.comparaTitulo) + '</h2>'
      + '<table class="cmp"><thead><tr><th>Característica</th><th class="us">TR90 Jaye</th><th>Otras</th></tr></thead><tbody>'
      + p.compara.map(function (t) {
          return '<tr><td>' + esc(t) + '</td>'
            + '<td class="si"><svg viewBox="0 0 24 24"><path d="M4 12l6 6L20 6"/></svg></td>'
            + '<td class="no"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></td></tr>';
        }).join('')
      + '</tbody></table></section>';
  }

  /* ---------- 6 · RESEÑAS (molde Chile) ---------- */
  var VER = 4;
  function tarjetaResena(r) {
    return '<article class="rsc"><div class="arriba">'
      + '<span class="ini">' + esc((r.nombre || '?').charAt(0).toUpperCase()) + '</span>'
      + '<span class="quien">' + esc(r.nombre)
      + '<i class="verif">✓ Verificado</i>'
      + '<small>' + esc(r.comuna) + ' · ' + esc(r.fecha) + '</small></span>'
      + estrellas(r.estrellas) + '</div>'
      + '<p>' + esc(r.texto) + '</p>'
      + (r.foto ? '<img class="rfoto" src="' + esc(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '')
      + '</article>';
  }
  var barras = [5, 4, 3, 2, 1].map(function (e) {
    var n = mias.filter(function (r) { return r.estrellas === e; }).length;
    var pc = mias.length ? Math.round(n / mias.length * 100) : 0;
    return '<div class="bar"><span class="lvl">' + e + ' ★</span>'
      + '<div class="track"><i style="--p:' + (pc / 100) + '"></i></div><b>' + n + '</b></div>';
  }).join('');
  var resenas = '<section class="bloque rev-sec" id="resenas" data-rv>'
    + '<h2 class="rev-title">Experiencias reales <span class="stars">★★★★★</span></h2>'
    + '<div class="rev-score"><span class="big">' + prom.toFixed(1) + '</span>'
    + '<span class="cnt">' + mias.length + ' reseñas</span></div>'
    + '<div class="rev-bars">' + barras + '</div>'
    + '<button class="btn-write" id="btnWrite">Escribir una reseña</button>'
    + '<div class="rs" id="listaRs"></div>'
    + (mias.length > VER ? '<button class="masRs" id="masRs">Ver más reseñas</button>' : '')
    + '<p class="rev-auto-label">Más experiencias de nuestros clientes</p>'
    + '<div class="rev-auto"><div class="rev-auto__track" id="revAuto"></div></div>'
    + '</section>';

  /* ---------- EL CAMBIO · antes y después (Chile) ---------- */
  var cambio = '<section class="bloque ba-sec"><span class="eyebrow">El cambio</span>'
    + '<h2 class="tit2">El antes y después que se nota</h2>'
    + '<p class="sub2">' + esc(p.antesDespuesSub) + '</p>'
    + '<div class="ba-img"><img src="' + esc(p.antesDespues) + '" alt="Antes y después" loading="lazy"></div>'
    + '<button class="cta rojo" onclick="document.getElementById(\'pedir\').scrollIntoView({behavior:\'smooth\'})">Quiero ese cambio</button></section>';

  /* ---------- 7 · PREGUNTAS (Chile) ---------- */
  var preguntas = '<section class="bloque" id="faq"><h2>Preguntas frecuentes</h2><div class="fq">'
    + p.preguntas.concat(window.PREGUNTAS || []).map(function (x) {
        return '<details><summary>' + esc(x.q) + '</summary><p>' + esc(x.a) + '</p></details>'; }).join('')
    + '</div></section>';

  /* ---------- 7b · cierre (Chile) ---------- */
  var cierre = '<section class="bloque desc" data-rv>'
    + '<span class="eyebrow">Por qué las quieres</span>'
    + '<h2 class="tit2">' + esc(p.nombre) + '</h2>'
    + '<p>' + esc(p.sub) + '</p>'
    + '<ul>' + p.puntos.slice(0, 5).map(function (x, i) { return '<li style="--i:' + i + '">' + esc(x) + '</li>'; }).join('') + '</ul>'
    + '<p style="margin-top:16px">Desde <b>' + pesos(precioPre(0)) + '</b> con pago anticipado o <b>' + pesos(p.packs[0].precio) + '</b> contra entrega · envío incluido a toda Colombia.</p>'
    + '<a class="cta azul" href="#pedir" style="margin-top:14px">Pedir las mías ahora</a>'
    + '</section>';

  /* =================================================================
     FORMULARIO · IGUAL AL DE ESPAÑA (espana-plantillas/ficha.js)
     Paso 1 cuántos · Paso 2 cómo paga (dos fichas lado a lado) · resumen ·
     datos. Aquí se agrega el paso de la graduación, que es de este producto.
     ================================================================= */
  function packsHTML() {
    return p.packs.map(function (k, i) {
      var precio = precioAhora(i);
      var antes = formaPago === 'pre' ? k.precio : k.antes;
      var o = antes ? Math.round((1 - precio / antes) * 100) : 0;
      var etiqueta = i === iPop ? 'Más vendido' : '';
      return '<button type="button" class="pack' + (i === elegido ? ' sel' : '') + '" data-i="' + i + '" role="radio" aria-checked="' + (i === elegido) + '">'
        + (etiqueta ? '<span class="tag">' + etiqueta + '</span>' : '')
        + '<span class="radio"></span>'
        + '<img class="thumb" src="' + esc(p.foto) + '" alt="" width="46" height="46" loading="lazy" onerror="this.remove()">'
        + '<span class="info"><span class="t">' + esc(k.texto) + '</span>'
        + (o ? '<span class="s">Ahorra ' + o + '%</span>' : '') + '</span>'
        + '<span class="pr"><span class="n">' + pesos(precio) + '</span>'
        + (antes ? '<span class="w">' + pesos(antes) + '</span>' : '') + '</span>'
        + '</button>';
    }).join('');
  }
  var GRADS = ['+1.00', '+1.50', '+2.00', '+2.50', '+3.00', '+3.50', '+4.00'];
  var grads = ['', ''];
  function gradsHTML() {
    var n = p.packs[elegido].cant, h = '';
    for (var i = 0; i < n; i++) {
      h += '<div class="field"><label>' + (n > 1 ? 'Graduación del par ' + (i + 1) : 'Tu graduación') + '</label>'
        + '<div class="gops" data-i="' + i + '">' + GRADS.map(function (g) {
          return '<button type="button" class="gop' + (grads[i] === g ? ' on' : '') + '" data-g="' + g + '" aria-pressed="' + (grads[i] === g) + '">' + g + '</button>';
        }).join('') + '</div></div>';
    }
    return h;
  }
  var DEPTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
    'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño',
    'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'];
  var kSel = p.packs[elegido];
  var ICO_COD = '<svg viewBox="0 0 24 24"><rect x="2.5" y="7" width="19" height="12" rx="2.2"/><path d="M2.5 11h19"/><circle cx="17.5" cy="15.5" r="1.3"/></svg>';
  var ICO_PRE = '<svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></svg>';
  var formulario = '<section class="form" id="pedir" data-rv><h2>Pide las tuyas</h2>'
    + '<p class="baj">Envío a toda Colombia. Pagas cuando te llegue o pagas ahora y ahorras.</p>'
    + '<div class="formcard" id="formcard">'
    + '<div class="cod-badge"><svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>'
    + ' Compra 100% segura: contra entrega o pago anticipado</div>'
    /* PASO 1 */
    + '<p class="pasoRot"><b>1</b>¿Cuántos pares quieres?</p>'
    + '<div class="packs" id="packsForm">' + packsHTML() + '</div>'
    /* PASO 2: dos fichas lado a lado (España). Es un DESCUENTO por pagar ahora. */
    + '<p class="pasoRot"><b>2</b>¿Cómo quieres pagar?</p>'
    + '<div class="pagoSel" id="pagoSel" role="radiogroup" aria-label="¿Cómo quieres pagar?">'
    + '<button type="button" class="pagoOp sel" data-pago="cod" role="radio" aria-checked="true">'
    + '<span class="pagoOp__ico" aria-hidden="true">' + ICO_COD + '</span>'
    + '<span class="pagoOp__tit">Pago contra entrega</span>'
    + '<span class="pagoOp__pr" id="prCod">' + pesos(kSel.precio) + '</span>'
    + '<span class="pagoOp__sub">En efectivo, cuando te llegue</span>'
    + '</button>'
    + '<button type="button" class="pagoOp" data-pago="pre" role="radio" aria-checked="false">'
    + '<span class="pagoOp__cinta" id="cintaPre">−' + pesos(kSel.precio - precioPre(elegido)) + '</span>'
    + '<span class="pagoOp__ico" aria-hidden="true">' + ICO_PRE + '</span>'
    + '<span class="pagoOp__tit">' + esc(p.anticipado.titulo) + '</span>'
    + '<span class="pagoOp__pr" id="prPre">' + pesos(precioPre(elegido)) + '</span>'
    + '<span class="pagoOp__sub">' + esc(p.anticipado.envio) + '</span>'
    + '</button>'
    + '</div>'
    /* PASO 3: graduación (propio de las gafas) */
    + '<p class="pasoRot"><b>3</b>¿Qué graduación necesitas?</p>'
    + '<p class="gguia">¿No la sabes? Guíate por tu edad: 40-44 <b>+1.00</b> · 45-49 <b>+1.50</b> · 50-54 <b>+2.00</b> · 55-59 <b>+2.50</b> · 60-64 <b>+3.00</b> · 65-69 <b>+3.50</b> · 70+ <b>+4.00</b>. Si ya usas gafas de lectura, elige el mismo número.</p>'
    + '<div id="gradSel">' + gradsHTML() + '</div>'
    /* resumen (España) */
    + '<div class="summary">'
    + '<div class="r"><span>Subtotal</span><span id="sumSub"></span></div>'
    + '<div class="r" id="rowDesc"><span>Descuento</span><span id="sumDesc" class="desc"></span></div>'
    + '<div class="r"><span>Envío</span><span class="free">Incluido</span></div>'
    + '<div class="r tot"><span id="sumTotRot">Total a pagar cuando te llegue</span><span id="sumTot"></span></div>'
    + '</div>'
    /* PASO 4: datos */
    + '<p class="pasoRot"><b>4</b>¿A dónde te lo enviamos?</p>'
    + '<form id="fPedido" novalidate>'
    + '<div class="field"><label for="fNombre">Nombre y apellido</label><input id="fNombre" autocomplete="name" placeholder="Ej: María González"><div class="err">Escribe tu nombre y apellido.</div></div>'
    + '<div class="field"><label for="fTel">Celular (WhatsApp)</label>'
    + '<div class="telrow"><span class="cc-btn" style="cursor:default"><img class="cc-flag" src="https://flagcdn.com/co.svg" alt=""><span class="cc-code">+57</span></span>'
    + '<input id="fTel" inputmode="numeric" autocomplete="tel-national" maxlength="14" placeholder="300 123 4567"></div>'
    + '<div class="err">El celular debe tener 10 números y empezar por 3.</div></div>'
    + '<div class="field"><label for="fDir">Dirección</label><input id="fDir" autocomplete="street-address" placeholder="Ej: Calle 45 # 12-30"><div class="err">Escribe la dirección completa, con número.</div></div>'
    + '<div class="field"><label for="fRef">Barrio, apto o referencia <span class="opc">(opcional)</span></label><input id="fRef" placeholder="Ej: Barrio Chapinero, apto 302"></div>'
    + '<div class="row2">'
    + '<div class="field"><label for="fCiudad">Ciudad o municipio</label><input id="fCiudad" autocomplete="address-level2" placeholder="Ej: Medellín"><div class="err">Escribe tu ciudad.</div></div>'
    + '<div class="field"><label for="fDepto">Departamento</label><select id="fDepto"><option value="">Selecciona…</option>'
    + DEPTOS.map(function (d) { return '<option>' + d + '</option>'; }).join('') + '</select><div class="err">Selecciona tu departamento.</div></div>'
    + '</div>'
    + '<div class="field"><label for="fCorreo">Correo <span class="opc">(opcional)</span></label><input id="fCorreo" type="email" inputmode="email" autocomplete="email" placeholder="Ej: maria@gmail.com"></div>'
    + '<div class="aviso" id="fErr"></div>'
    + '<button type="submit" class="cta rojo rebota" id="btnComprar">Comprar · pago contra entrega</button>'
    + '<p class="formnote" id="notaPago">Pagas en efectivo cuando te llegue el pedido. Te confirmamos por WhatsApp.</p>'
    + '<p class="formnote ayuda">¿Se te complica llenarlo? '
    + '<a href="https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, quiero pedir las ' + p.nombre + ' y se me complica el formulario')
    + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a> y te lo tomamos nosotros.</p>'
    + '</form>'
    /* los sellos de pago van ABAJO del formulario (James 29-09) */
    + '<div class="carriers"><span class="cl">Pagos procesados por Wompi, la pasarela de Bancolombia</span>'
    + '<div class="cbadges pagos-logos">'
    + '<img src="https://wompi.com/assets/downloadble/logos_wompi/Wompi_LogoPrincipal.svg" alt="Wompi" class="lg-wompi" loading="lazy" onerror="this.remove()">'
    + '<img src="img/pagos/bancolombia.svg" alt="Bancolombia" class="lg-banco" loading="lazy">'
    + '<img src="img/pagos/pse.svg" alt="PSE" class="lg-pse" loading="lazy">'
    + '<img src="img/pagos/nequi.svg" alt="Nequi" class="lg-nequi" loading="lazy">'
    + '<img src="img/pagos/visa.svg" alt="Visa" class="lg-card" loading="lazy">'
    + '<img src="img/pagos/mastercard.svg" alt="Mastercard" class="lg-card" loading="lazy">'
    + '</div></div>'
    + '</div></section>';

  /* ---------- se arma la ficha, en el orden de Chile ---------- */
  /* HÉROE como los de la tienda de Chile (jayegroup.com.co: clorofila.js y organizador.js):
     franja del título ARRIBA de la foto, el título entra letra por letra con destello,
     la foto de borde a borde con su efecto (aquí la LUPA, que James aprobó), la bajada
     debajo y la tira de tres datos. La galería se va; la cabecera (estrellas, nombre
     y precio) se queda debajo, como allá. */
  var hero = '<div class="gf-hero">'
    + '<div class="gf-sobre">'
    + '<span class="gf-rot gf-cae" style="--i:0">Gafas de aumento TR90 · sin marco</span>'
    + '<h1 class="gf-h1 gf-listo"><span>Vuelve a leer de cerca,</span><em>sin esfuerzo.</em></h1>'
    + '</div>'
    + '<div class="lupa-fondo" id="lupaFondo" aria-hidden="true"><div class="lec borroso" id="lecB"></div><div class="lec nitido" id="lecN"></div><div class="lente"><i></i></div></div>'
    + '<p class="banda-dice">Pasa el dedo por la letra: <b>así lees con las TR90</b></p>'
    + '<div class="gf-foto"><img src="img/hero.webp" width="1024" height="1536" alt="Gafas de aumento TR90 sin marco sobre su estuche rígido con paño" fetchpriority="high">'
    + '<div class="gf-brillo"></div></div>'
    + '</div>'
    + '<p class="gf-bajada">El celular, el periódico, la letra pequeña de los medicamentos: te las pones y lees tranquilo. Ultralivianas, sin marco y con su estuche rígido.</p>'
    + '<div class="gf-med">'
    + '<div><b>7</b><span>graduaciones de +1.00 a +4.00</span></div>'
    + '<div><b>0</b><span>marco: casi no se sienten</span></div>'
    + '<div><b>1</b><span>estuche rígido y paño por par</span></div>'
    + '</div>';
  cont.innerHTML = hero + '<div class="arriba2">' + cabecera + '</div>'
    + promo
    + gigante
    + desc
    + seccionPromo()
    + seccionFormula()
    + seccionCompara()
    + resenas
    + cambio
    + preguntas
    + cierre
    + formulario;

  /* barra de abajo (Chile) */
  var sb = document.createElement('div');
  sb.className = 'stickycta'; sb.id = 'stickycta';
  var bt = document.createElement('button');
  bt.className = 'btn-flota'; bt.textContent = 'Pedir ahora';
  bt.addEventListener('click', function () { $('pedir').scrollIntoView({ behavior: 'smooth' }); });
  sb.appendChild(bt); document.body.appendChild(sb);

  /* ---------- comportamiento de la galería (Chile) ---------- */
  /* sin galería: el héroe lleva la foto */
  var izq = document.querySelector('.gal .flecha.izq'), der = document.querySelector('.gal .flecha.der');
  if (izq) izq.addEventListener('click', function () { mover(-1); });
  if (der) der.addEventListener('click', function () { mover(1); });
  document.querySelectorAll('.gal .puntos button, .miniz button').forEach(function (b) {
    b.addEventListener('click', function () { iFoto = Array.prototype.indexOf.call(b.parentNode.children, b); pintarGaleria(); });
  });
  (function girar() { return;
    if (fotos.length < 2 || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var gal = document.querySelector('.gal'); if (!gal) return;
    var reloj = null, parado = false, siesta = null;
    function arrancar() { if (parado || reloj) return; reloj = setInterval(function () { mover(1); }, 4500); }
    function parar() { if (reloj) { clearInterval(reloj); reloj = null; } }
    gal.addEventListener('click', function (e) { if (e.target.closest('.flecha, .puntos button, .miniz button')) { parado = true; parar(); } });
    gal.addEventListener('touchstart', function () { if (parado) return; parar(); clearTimeout(siesta); siesta = setTimeout(arrancar, 8000); }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (ent) { ent.forEach(function (e) { if (e.isIntersecting) arrancar(); else parar(); }); }, { threshold: 0.35 }).observe(gal);
    else arrancar();
  })();

  /* ---------- contador de la promoción: hasta la medianoche EN COLOMBIA ---------- */
  (function contador() {
    if (!$('cH')) return;
    var fmt;
    try { fmt = new Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', hourCycle: 'h23', hour: '2-digit', minute: '2-digit', second: '2-digit' }); } catch (e) { return; }
    function dd(n) { return (n < 10 ? '0' : '') + n; }
    function tic() {
      var t = {};
      fmt.formatToParts(new Date()).forEach(function (x) { if (x.type !== 'literal') t[x.type] = Number(x.value); });
      var f = Math.max(0, 86400 - ((t.hour || 0) * 3600 + (t.minute || 0) * 60 + (t.second || 0)));
      $('cH').textContent = dd(Math.floor(f / 3600)); $('cM').textContent = dd(Math.floor(f % 3600 / 60)); $('cS').textContent = dd(f % 60);
      var c = $('cajaS'); if (c) { c.classList.remove('late'); void c.offsetWidth; c.classList.add('late'); }
    }
    tic(); setInterval(tic, 1000);
  })();

  /* ---------- formulario: pack, forma de pago, graduación, resumen ---------- */
  function pintarPrecio() {
    var k = p.packs[elegido];
    var pr = precioAhora(elegido);
    var base = k.antes || k.precio;
    $('sumSub').textContent = pesos(base);
    $('sumDesc').textContent = '-' + pesos(base - pr);
    $('rowDesc').style.display = base - pr > 0 ? '' : 'none';
    $('sumTot').textContent = pesos(pr);
    $('sumTotRot').textContent = formaPago === 'pre' ? 'Total a pagar ahora' : 'Total a pagar cuando te llegue';
    $('prCod').textContent = pesos(k.precio);
    $('prPre').textContent = pesos(precioPre(elegido));
    $('cintaPre').textContent = '−' + pesos(k.precio - precioPre(elegido));
    var b = $('btnComprar');
    if (b && !b.disabled) b.textContent = formaPago === 'pre' ? 'Comprar · pagar ahora' : 'Comprar · pago contra entrega';
    $('notaPago').textContent = formaPago === 'pre'
      ? 'Te llevamos a Wompi (Bancolombia) para pagar con tarjeta, PSE o Nequi. Tu pedido sale con despacho prioritario.'
      : 'Pagas en efectivo cuando te llegue el pedido. Te confirmamos por WhatsApp.';
  }
  var _atc = false;
  function elegirPack(i) {
    elegido = i;
    if (!_atc) { _atc = true; var k = p.packs[i]; px('AddToCart', { content_name: p.nombre, content_ids: [p.id], content_type: 'product', value: precioAhora(i), currency: 'COP', num_items: k.cant }); }
    $('packsForm').innerHTML = packsHTML();
    $('gradSel').innerHTML = gradsHTML();
    pintarPrecio();
  }
  $('packsForm').addEventListener('click', function (e) { var b = e.target.closest('.pack'); if (b) elegirPack(Number(b.dataset.i)); });
  $('pagoSel').addEventListener('click', function (e) {
    var b = e.target.closest('.pagoOp'); if (!b) return;
    formaPago = b.dataset.pago;
    Array.prototype.forEach.call($('pagoSel').children, function (x) { var on = x === b; x.classList.toggle('sel', on); x.setAttribute('aria-checked', String(on)); });
    $('packsForm').innerHTML = packsHTML();
    pintarPrecio();
  });
  $('gradSel').addEventListener('click', function (e) {
    var g = e.target.closest('.gop'); if (!g) return;
    grads[Number(g.parentNode.dataset.i)] = g.dataset.g;
    $('gradSel').innerHTML = gradsHTML();
  });
  $('btnArriba').addEventListener('click', function () { $('pedir').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  if ($('btnPromo')) $('btnPromo').addEventListener('click', function () { elegirPack(Number(this.dataset.i)); $('pedir').scrollIntoView({ behavior: 'smooth' }); });
  pintarPrecio();

  /* InitiateCheckout al llegar al formulario (Chile: dos puertas, sale una vez) */
  var _ic = false;
  function _checkout() { if (_ic) return; _ic = true; avisarPanel('visita_form');
    px('InitiateCheckout', { content_name: p.nombre, content_ids: [p.id], value: precioAhora(elegido), currency: 'COP' }); }
  var _form = $('pedir');
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { if (es.some(function (x) { return x.isIntersecting; })) { _checkout(); o.disconnect(); } }).observe(_form);
  ['focusin', 'change'].forEach(function (ev) { _form.addEventListener(ev, _checkout, { once: true }); });

  /* ---------- reseñas: de a 4 + carrusel (Chile) ---------- */
  var vistas = 0;
  function masResenas() {
    var trozo = mias.slice(vistas, vistas + VER);
    $('listaRs').insertAdjacentHTML('beforeend', trozo.map(tarjetaResena).join(''));
    vistas += trozo.length;
    if (vistas >= mias.length && $('masRs')) $('masRs').style.display = 'none';
  }
  masResenas();
  if ($('masRs')) $('masRs').addEventListener('click', masResenas);
  (function () {
    var lote = mias.slice(VER, VER + 14);
    var uno = lote.map(function (r) {
      return '<article class="rsc"><div class="arriba"><span class="ini">' + esc((r.nombre || '?').charAt(0).toUpperCase()) + '</span>'
        + '<span class="quien">' + esc(r.nombre) + '<i class="verif">✓ Verificado</i><small>' + esc(r.comuna) + '</small></span></div>'
        + '<p>' + esc(r.texto) + '</p></article>';
    }).join('');
    $('revAuto').innerHTML = uno + uno;
  })();
  $('btnWrite').addEventListener('click', function () {
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, compré las ' + p.nombre + ' y quiero dejar mi reseña:'), '_blank', 'noopener');
  });

  /* ---------- las secciones aparecen al llegar (Chile: revelarFicha) ---------- */
  (function revelar() {
    var partes = document.querySelectorAll('[data-rv]:not(.vino)');
    if (!('IntersectionObserver' in window)) { partes.forEach(function (e) { e.classList.add('vino'); }); return; }
    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vino'); ojo.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    partes.forEach(function (e) { ojo.observe(e); });
    /* seguro: nada se queda invisible */
    function barrer() { document.querySelectorAll('[data-rv]:not(.vino)').forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('vino'); }); }
    setTimeout(barrer, 400);
    var t; window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(barrer, 700); }, { passive: true });
  })();

  /* ---------- barra de abajo: aparece al bajar, se esconde en el formulario (Chile) ---------- */
  (function () {
    var esperando = false;
    function mirar() {
      var enForm = _form.getBoundingClientRect().top < innerHeight * 0.92;
      var ver = (window.scrollY || 0) > 420 && !enForm;
      sb.classList.toggle('show', ver); document.body.classList.toggle('con-barra', ver);
      esperando = false;
    }
    window.addEventListener('scroll', function () { if (esperando) return; esperando = true; requestAnimationFrame(mirar); }, { passive: true });
    mirar();
  })();

  /* ---------- boletín del pie (Chile) ---------- */
  (function () {
    var f = $('fBoletin'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var c = $('correoBoletin'), ok = $('aceptoBoletin');
      if (!c.value || c.value.indexOf('@') < 0) { c.focus(); return; }
      if (ok && !ok.checked) { ok.focus(); return; }
      f.outerHTML = '<p class=gracias>Listo. Te avisamos cuando haya novedades.</p>';
    });
  })();

  /* ---------- envío del pedido ---------- */
  function galleta(n) { var m = document.cookie.match('(^|;)\\s*' + n + '=([^;]+)'); return m ? decodeURIComponent(m[2]) : ''; }
  function fbc() { var c = galleta('_fbc'); if (c) return c; var id = qs.get('fbclid'); return id ? 'fb.1.' + Date.now() + '.' + id : ''; }
  function limpiarTel(t) { var d = String(t || '').replace(/\D/g, ''); if (d.length === 12 && d.indexOf('57') === 0) d = d.slice(2); return d; }
  function marcar(id, mal) { var f = $(id).closest('.field'); if (f) f.classList.toggle('mal', mal); return mal; }

  /* ---------- carrito abandonado (30-09) ----------
     Apenas escribe un celular válido se guarda en fin_abandonados con indicativo +57.
     Los flujos de Chile solo toman +56: a este cliente le escribe solo Colombia. */
  var URL_ABANDONO = 'https://n8n-production-8a42.up.railway.app/webhook/abandonado';
  var SID = 'CO' + Date.now() + Math.floor(Math.random() * 1e6), abGuardado = false, abReloj;
  function guardarAbandono(estado) {
    var g = function (id) { return ($(id).value || '').trim(); };
    var tel = limpiarTel(g('fTel'));
    if (!/^3\d{9}$/.test(tel)) return;
    if (estado === 'COMPLETADO' && !abGuardado) return;
    abGuardado = true;
    var k = p.packs[elegido] || {};
    try {
      fetch(URL_ABANDONO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
        body: JSON.stringify({ sid: SID, telefono: tel, indicativo: '+57', nombre: g('fNombre'), producto: p.nombre, cantidad: k.cant || 1,
          total: precioAhora(elegido), direccion: g('fDir'), comuna: g('fCiudad'), region: g('fDepto'), referencia: g('fRef'),
          correo: g('fCorreo').toLowerCase(), fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }), estado: estado }) }).catch(function () {});
    } catch (e) {}
  }
  ['fTel', 'fNombre', 'fDir', 'fRef', 'fCiudad', 'fCorreo'].forEach(function (id) {
    $(id).addEventListener('blur', function () { clearTimeout(abReloj); abReloj = setTimeout(function () { guardarAbandono('INCOMPLETO'); }, 300); });
  });
  $('fDepto').addEventListener('change', function () { clearTimeout(abReloj); abReloj = setTimeout(function () { guardarAbandono('INCOMPLETO'); }, 300); });
  $('fTel').addEventListener('input', function () { if (/^3\d{9}$/.test(limpiarTel($('fTel').value))) { clearTimeout(abReloj); abReloj = setTimeout(function () { guardarAbandono('INCOMPLETO'); }, 1200); } });

  $('fPedido').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var g = function (id) { return ($(id).value || '').trim(); };
    var k = p.packs[elegido];
    var errs = [];
    for (var i = 0; i < k.cant; i++) if (!grads[i]) { errs.push('Elige la graduación' + (k.cant > 1 ? ' de los 2 pares' : '')); break; }
    if (marcar('fNombre', g('fNombre').split(/\s+/).length < 2)) errs.push('nombre');
    if (marcar('fTel', !/^3\d{9}$/.test(limpiarTel(g('fTel'))))) errs.push('celular');
    /* candado: sin calle y número no se registra (regla de James) */
    if (marcar('fDir', !/\d/.test(g('fDir')) || g('fDir').length < 6)) errs.push('dirección');
    if (marcar('fCiudad', g('fCiudad').length < 3)) errs.push('ciudad');
    if (marcar('fDepto', !g('fDepto'))) errs.push('departamento');
    var aviso = $('fErr');
    if (errs.length) {
      aviso.style.display = 'block';
      aviso.textContent = errs[0].indexOf('graduación') >= 0 ? errs[0] + '.' : 'Revisa los campos marcados en rojo.';
      var primero = errs[0].indexOf('graduación') >= 0 ? $('gradSel') : document.querySelector('#fPedido .field.mal');
      if (primero) primero.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    aviso.style.display = 'none';

    var total = precioAhora(elegido);
    var eventId = window.jayePixel ? window.jayePixel.id() : 'co-' + Date.now();
    /* 30-09: datos del comprador al píxel (Meta los cifra en el navegador). Con esto la
       compra del navegador se cruza con la persona que vio el anuncio, igual que la del servidor. */
    try {
      if (window.fbq) {
        var _n = g('fNombre').toLowerCase().split(/\s+/), _am = { ph: '57' + limpiarTel(g('fTel')), fn: _n[0] || '', ln: _n.slice(1).join(' '),
          ct: g('fCiudad').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''),
          st: g('fDepto').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''), country: 'co' };
        if (g('fCorreo')) _am.em = g('fCorreo').toLowerCase();
        fbq('init', '4451697161762536', _am);
      }
    } catch (e) {}
    var datos = {
      pagina: PAGINA, producto: p.nombre, pais: 'CO',
      cantidad: k.cant, total: total, pago: formaPago,
      graduaciones: grads.slice(0, k.cant).join(' / '),
      nombre: g('fNombre'), telefono: '57' + limpiarTel(g('fTel')),
      departamento: g('fDepto'), ciudad: g('fCiudad'),
      direccion: g('fDir'), referencia: g('fRef'), correo: g('fCorreo').toLowerCase(),
      cmp: window._CMP || '', fbp: galleta('_fbp'), fbc: fbc(),
      event_id: eventId, url: location.href.split('#')[0], ua: navigator.userAgent
    };
    var btn = $('btnComprar'); btn.disabled = true; btn.textContent = formaPago === 'pre' ? 'Preparando tu pago…' : 'Enviando tu pedido…';
    fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) { return r.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j || res.j.ok === false) throw new Error((res.j && res.j.error) || 'revisa tus datos');
        guardarAbandono('COMPLETADO');
        try { localStorage.setItem('co_ultimo_pedido', JSON.stringify({ id: res.j.id, ref: res.j.referencia, total: total, qty: k.cant, ev: eventId })); } catch (e) {}
        if (formaPago === 'pre') {
          if (!res.j.pago_url) throw new Error('no se generó el link de pago');
          px('AddPaymentInfo', { content_name: p.nombre, currency: 'COP', value: total });
          location.href = res.j.pago_url;
          return;
        }
        px('Purchase', { content_name: p.nombre, content_ids: [p.id], currency: 'COP', value: total, num_items: k.cant }, eventId);
        listo('cod', k, total);
      })
      .catch(function (e) {
        btn.disabled = false; pintarPrecio();
        aviso.style.display = 'block';
        aviso.textContent = 'No pudimos registrar tu pedido (' + e.message + '). Inténtalo otra vez o escríbenos por WhatsApp.';
      });
  });

  function listo(tipo, k, total) {
    $('pedir').innerHTML = '<div class="listo"><h3>' + (tipo === 'cod' ? 'Pedido recibido' : 'Pago aprobado') + '</h3><p>'
      + (tipo === 'cod'
        ? 'Tu pedido de <b>' + esc(k.texto) + '</b> por <b>' + pesos(total) + '</b> quedó registrado. Te escribimos por WhatsApp para confirmarlo y lo pagas cuando te llegue.'
        : 'Recibimos tu pago. Tu pedido sale con <b>despacho prioritario</b> y te escribimos por WhatsApp con la guía de envío.')
      + '</p></div>';
    $('pedir').scrollIntoView({ behavior: 'smooth', block: 'center' });
    try { if (window.jayeConfeti) window.jayeConfeti(); } catch (e) {}
  }

  /* ---------- regreso desde Wompi (?pago=ref&id=transaccion) ---------- */
  var refVuelta = qs.get('pago');
  if (refVuelta) {
    var ult = {}; try { ult = JSON.parse(localStorage.getItem('co_ultimo_pedido') || '{}'); } catch (e) {}
    var intentos = 0;
    $('pedir').scrollIntoView();
    $('fErr').style.display = 'block';
    $('fErr').textContent = 'Estamos confirmando tu pago con Wompi…';
    (function mirar() {
      fetch(URL_ESTADO + '?ref=' + encodeURIComponent(refVuelta) + '&id=' + encodeURIComponent(qs.get('id') || ''))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.estado === 'APPROVED') {
            if (!sessionStorage.getItem('co_px_' + refVuelta)) {
              px('Purchase', { content_name: p.nombre, currency: 'COP', value: ult.total || 0, num_items: ult.qty || 1 }, ult.ev);
              try { sessionStorage.setItem('co_px_' + refVuelta, '1'); } catch (e) {}
            }
            listo('pre');
          } else if ((j.estado === 'PENDING' || !j.estado) && intentos++ < 20) {
            setTimeout(mirar, 3000);
          } else if (j.estado === 'DECLINED' || j.estado === 'ERROR' || j.estado === 'VOIDED') {
            $('fErr').textContent = 'El pago no se aprobó. Puedes intentarlo de nuevo o elegir "Pago contra entrega".';
          } else {
            $('fErr').textContent = 'Aún no vemos tu pago confirmado. Si ya pagaste, te escribimos por WhatsApp.';
          }
        }).catch(function () { if (intentos++ < 20) setTimeout(mirar, 3000); });
    })();
  }
})();
