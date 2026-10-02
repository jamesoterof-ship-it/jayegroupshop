/* ============================================================
   KIT CHAO CANAS · Jaye Group Colombia (jayegroupshop.com/chao-canas/)

   Diseño propio de esta página (screen jaye-colombia-tienda: verde romero,
   botones naranja, Rubik + Nunito Sans). De la tienda solo se respetan el
   encabezado y el pie.

   El FORMULARIO es el mismo de las gafas (ficha-co.js): 4 pasos, las dos
   formas de pago lado a lado, resumen, validaciones, carrito abandonado con
   +57, píxel con advanced matching, pedido a n8n (pedido-tienda-co), Wompi si
   paga anticipado, pantalla de anticipo de $20.000 para riesgosos y regreso
   con ?pago= y ?anticipo=. Lo que cambia: el paso 3 es el TONO de cada kit
   (si no lo elige, el pedido no se frena: queda 'POR DEFINIR').
   ============================================================ */
(function () {
  'use strict';

  var URL_PEDIDO = 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda-co';
  var URL_ESTADO = 'https://n8n-production-8a42.up.railway.app/webhook/pago-estado-co';
  var URL_VISITA = 'https://n8n-production-8a42.up.railway.app/webhook/track-visita';
  var URL_ABANDONO = 'https://n8n-production-8a42.up.railway.app/webhook/abandonado';
  var URL_ANTICIPO = 'https://n8n-production-8a42.up.railway.app/webhook/anticipo-estado-co';
  var PAGINA = 'co-chao';
  var PRODUCTO = 'Kit Chao Canas';
  var WA = '573145021958';
  var NO_SABE = 'POR DEFINIR';
  /* fuera de jayegroupshop.com (copias locales, vistas previas) no se avisa al panel ni se guarda carrito abandonado */
  var EN_TIENDA = location.hostname === 'jayegroupshop.com' || location.hostname === 'www.jayegroupshop.com';

  /* los 9 tonos: nombre como se manda al pedido (MAYÚSCULAS) + color del círculo */
  var TONOS = [
    ['NEGRO', 'Negro', '#1B1A19'],
    ['CASTAÑO OSCURO', 'Castaño oscuro', '#3B2416'],
    ['CHOCOLATE', 'Chocolate', '#55301B'],
    ['CASTAÑO CLARO', 'Castaño claro', '#8A5A35'],
    ['RUBIO', 'Rubio', '#D6B47C'],
    ['DORADO', 'Dorado', '#BF8D2E'],
    ['ROJO', 'Rojo', '#A8231F'],
    ['BORGOÑA', 'Borgoña', '#6B1424'],
    ['VIOLETA', 'Violeta', '#4B2A63'],
  ];

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  var pesos = function (n) { return '$' + Number(n).toLocaleString('es-CO'); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ICO_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>';
  var ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.6.7-4.9 4.5 1.4 6.5L12 16.7 6 20l1.4-6.5L2.5 9l6.6-.7z"/></svg>';
  function waLink(txt) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(txt); }
  var WA_PEDIR = waLink('Hola James, me interesa el Kit Chao Canas. Tengo una pregunta');

  var qs = new URLSearchParams(location.search);
  window._CMP = qs.get('cmp') || qs.get('utm_campaign') || '';
  try { if (window._CMP) localStorage.setItem('_cmp', window._CMP); else window._CMP = localStorage.getItem('_cmp') || ''; } catch (e) {}

  var p = (window.PRODUCTOS || []).filter(function (x) { return x.id === 'chao-canas'; })[0];
  var cont = $('prod');
  if (!p || !cont) return;
  window.PRODUCTO_ACTUAL = p;

  /* candado: si algún precio no está en la lista aprobada, la página no vende */
  var precios = p.packs.map(function (k) { return k.precio; }).concat(p.anticipado.precios);
  var vende = precios.every(function (x) { return (window.PRECIOS_APROBADOS || []).indexOf(x) >= 0; });

  /* enlaces de WhatsApp */
  $('waArriba').href = WA_PEDIR;
  $('waArriba').addEventListener('click', function () { px('Contact', { content_name: PRODUCTO }); });

  /* chips de tonos (sección 5) */
  $('ccChips').innerHTML = TONOS.map(function (t) {
    return '<li><i style="background:' + t[2] + '"></i>' + esc(t[1]) + '</li>';
  }).join('');

  /* ir al formulario */
  function irPedir() { var f = $('pedir'); if (f) f.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
  document.querySelectorAll('[data-ir="pedir"]').forEach(function (b) { b.addEventListener('click', irPedir); });

  if (!vende) {
    $('btnArriba').textContent = 'No disponible por ahora';
    $('btnArriba').disabled = true;
    $('ccForm').innerHTML = '<section class="cc-sec"><p class="cc-sub">Este producto no está disponible por ahora. Escríbenos por WhatsApp.</p></section>';
    revelar();
    return;
  }

  /* ---------- visitas al panel y píxel ---------- */
  function avisarPanel(tipo) {
    if (!EN_TIENDA) return;
    try { fetch(URL_VISITA, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: PAGINA, producto: p.nombre, tipo: tipo }) }).catch(function () {}); } catch (e) {}
  }
  try { if (!sessionStorage.getItem('jaye_vis_co_chao')) { sessionStorage.setItem('jaye_vis_co_chao', '1'); avisarPanel('visita'); } } catch (e) {}
  function px(ev, d, id) {
    try { if (window.jayePixel) return window.jayePixel.track(ev, d, id); if (window.fbq) window.fbq('track', ev, d); } catch (e) {}
  }
  px('ViewContent', { content_name: p.nombre, content_type: 'product', content_ids: [p.id], value: p.packs[0].precio, currency: 'COP' });

  var iPop = p.popular;          /* el formulario arranca en el MÁS VENDIDO (2 kits) */
  var elegido = iPop;
  var formaPago = 'cod';
  var unitario = p.packs[0].precio;   /* precio de 1 kit contra entrega: base para el ahorro REAL */
  function precioPre(i) { return p.anticipado.precios[i]; }
  function precioAhora(i) { return formaPago === 'pre' ? precioPre(i) : p.packs[i].precio; }
  function separado(i) { return p.packs[i].cant * unitario; }   /* lo que cuesta comprar los kits de a uno */

  /* ---------- 2 · precios del bloque de compra ---------- */
  document.querySelectorAll('[data-precio="cod-0"]').forEach(function (e) { e.textContent = pesos(p.packs[0].precio); });
  var kP = p.packs[iPop];
  $('ccPrecioMas').innerHTML = 'o <b>' + pesos(precioPre(0)) + '</b> con pago anticipado · <b>' + esc(kP.texto) + ' por ' + pesos(kP.precio) + '</b>, el más pedido';
  $('btnArriba').addEventListener('click', irPedir);

  /* ---------- reseñas: SOLO si hay reales ---------- */
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function fecha(f) { var d = String(f || '').split('-'); return d.length === 3 ? Number(d[2]) + ' ' + MESES[Number(d[1]) - 1] + ' ' + d[0] : (f || ''); }
  var resenas = (window.RESENAS_CHAO || []).filter(function (r) { return r && r.texto; });
  if (resenas.length) {
    var prom = Math.round(resenas.reduce(function (a, r) { return a + (Number(r.estrellas) || 5); }, 0) / resenas.length * 10) / 10;
    var est = function (n) { var s = ''; for (var i = 0; i < 5; i++) s += '<span class="' + (i < Math.round(n) ? 'on' : '') + '">' + ESTRELLA + '</span>'; return s; };
    $('ccEstrellas').innerHTML = '<span class="cc-est">' + est(prom) + '</span><a href="#resenas">' + prom.toFixed(1) + ' · ' + resenas.length + (resenas.length === 1 ? ' reseña' : ' reseñas') + '</a>';
    $('ccEstrellas').hidden = false;
    /* 01-10: regla de la tienda: "opiniones del producto", nunca "nuestros clientes"; se muestran de a 4 */
    var tarjeta = function (r) {
          return '<article class="cc-rsc"><div class="cc-rsc__top"><span class="cc-rsc__ini">' + esc((r.nombre || '?').charAt(0).toUpperCase()) + '</span>'
            + '<span class="cc-rsc__quien">' + esc(r.nombre) + '<small>' + esc([r.ciudad, fecha(r.fecha)].filter(Boolean).join(' · ')) + '</small></span>'
            + '<span class="cc-est">' + est(Number(r.estrellas) || 5) + '</span></div>'
            + '<p>' + esc(r.texto) + '</p>'
            + (r.foto ? '<img src="' + esc(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '')
            + '</article>';
    };
    $('ccResenas').innerHTML = '<section class="cc-sec cc-rev" id="resenas" data-rv><span class="cc-rot">Opiniones</span>'
      + '<h2 class="cc-h2">Opiniones del producto</h2>'
      + '<p class="cc-rev__nota"><b>' + prom.toFixed(1) + '</b> de 5 · ' + resenas.length + ' opiniones</p>'
      + '<div class="cc-rev__lista" id="ccRevLista"></div>'
      + (resenas.length > 4 ? '<button type="button" class="cc-btn cc-btn--sec" id="ccRevMas" style="margin:18px auto 0;display:block">Ver más opiniones</button>' : '')
      + '</section>';
    var vistas = 0;
    var masRev = function () {
      $('ccRevLista').insertAdjacentHTML('beforeend', resenas.slice(vistas, vistas + 4).map(tarjeta).join(''));
      vistas += 4;
      if (vistas >= resenas.length && $('ccRevMas')) $('ccRevMas').hidden = true;
    };
    masRev();
    if ($('ccRevMas')) $('ccRevMas').addEventListener('click', masRev);
  }

  /* ---------- 8 · PROMOCIÓN del pack de 2 con contador hasta medianoche Colombia ----------
     Sin precio "antes" inventado: el ahorro es el real contra comprar los kits por separado. */
  (function seccionPromo() {
    var iP = p.packs.findIndex(function (k) { return k.cant === p.promo; });
    if (iP <= 0) return;
    var k = p.packs[iP], ahorro = separado(iP) - k.precio;
    $('ccPromo').innerHTML = '<section class="cc-sec cc-promo" data-rv>'
      + '<div class="cc-promo__card">'
      + '<div class="cc-promo__banner"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/></svg>Promoción<span>termina hoy</span></div>'
      + '<div class="cc-promo__cuerpo">'
      + '<figure class="cc-promo__foto"><img src="/chao-canas/img/familia.webp" width="1080" height="1080" loading="lazy" alt="Madre e hija abrazadas y riendo en la sala, con el Kit Chao Canas en la mesa"></figure>'
      + '<div class="cc-promo__info">'
      + '<b class="cc-promo__qt">' + esc(k.texto) + ' · ' + (k.cant * 2) + ' frascos</b>'
      + '<p class="cc-promo__dice">Uno para ti y otro para alguien de la casa, o para tener el siguiente listo.</p>'
      + '<div class="cc-promo__precio">' + pesos(k.precio) + '</div>'
      + '<p class="cc-promo__ahorro">Ahorras <b>' + pesos(ahorro) + '</b> frente a comprar ' + k.cant + ' kits por separado (' + k.cant + ' × ' + pesos(unitario) + ' = ' + pesos(separado(iP)) + ')</p>'
      + '<p class="cc-promo__uni">' + pesos(Math.round(k.precio / k.cant)) + ' cada kit · o ' + pesos(precioPre(iP)) + ' con pago anticipado</p>'
      + '<div class="cc-cuenta" aria-label="Tiempo que queda de la promoción"><div><b id="cH">--</b><span>horas</span></div>'
      + '<div><b id="cM">--</b><span>min</span></div>'
      + '<div class="seg" id="cajaS"><b id="cS">--</b><span>seg</span></div></div>'
      + '<button type="button" class="cc-btn cc-btn--compra" id="btnPromo" data-i="' + iP + '">Quiero la promoción</button>'
      + '</div></div></div></section>';
  })();

  /* ---------- 11 · FORMULARIO (lógica de ficha-co.js) ---------- */
  function packsHTML() {
    return p.packs.map(function (k, i) {
      var precio = precioAhora(i);
      var tachado = formaPago === 'pre' ? k.precio : 0;       /* solo se tacha el precio real contra entrega del mismo pack */
      var ahorro = separado(i) - precio;
      return '<button type="button" class="pack' + (i === elegido ? ' sel' : '') + '" data-i="' + i + '" role="radio" aria-checked="' + (i === elegido) + '">'
        + (i === iPop ? '<span class="tag">Más vendido</span>' : '')
        + '<span class="radio" aria-hidden="true"></span>'
        + '<img class="thumb" src="' + esc(p.foto) + '" alt="" width="52" height="52" loading="lazy" onerror="this.remove()">'
        + '<span class="info"><span class="t">' + esc(k.texto) + '</span><span class="f">' + (k.cant * 2) + ' frascos</span>'
        + (ahorro > 0 ? '<span class="s">Ahorras ' + pesos(ahorro) + '</span>' : '') + '</span>'
        + '<span class="pr"><span class="n">' + pesos(precio) + '</span>'
        + (tachado ? '<span class="w">' + pesos(tachado) + '</span>' : '') + '</span>'
        + '</button>';
    }).join('');
  }
  var tonos = ['', '', ''];
  function tonosHTML() {
    var n = p.packs[elegido].cant, h = '';
    for (var i = 0; i < n; i++) {
      h += '<div class="cc-tono" role="radiogroup" aria-label="' + (n > 1 ? 'Tono del kit ' + (i + 1) : 'Tono de tu kit') + '">'
        + '<p class="cc-tono__rot">' + (n > 1 ? 'Tono del kit ' + (i + 1) : 'Tono de tu kit')
        + '<span>' + (tonos[i] ? esc(nombreTono(tonos[i])) : 'Sin elegir') + '</span></p>'
        + '<div class="cc-tono__ops" data-i="' + i + '">' + TONOS.map(function (t) {
          var on = tonos[i] === t[0];
          return '<button type="button" class="cc-top' + (on ? ' on' : '') + '" data-t="' + esc(t[0]) + '" role="radio" aria-checked="' + on + '">'
            + '<i style="background:' + t[2] + '"></i><span>' + esc(t[1]) + '</span></button>';
        }).join('') + '</div></div>';
    }
    return h + '<p class="cc-tono__nota">¿No sabes cuál elegir? Puedes dejarlo sin elegir y te escribimos por WhatsApp para definirlo <b>antes de enviar</b> tu pedido.</p>';
  }
  function nombreTono(v) { for (var i = 0; i < TONOS.length; i++) if (TONOS[i][0] === v) return TONOS[i][1]; return v; }

  var DEPTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
    'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño',
    'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'];
  var kSel = p.packs[elegido];
  var ICO_COD = '<svg viewBox="0 0 24 24"><rect x="2.5" y="7" width="19" height="12" rx="2.2"/><path d="M2.5 11h19"/><circle cx="17.5" cy="15.5" r="1.3"/></svg>';
  var ICO_PRE = '<svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/></svg>';
  $('ccForm').innerHTML = '<section class="form cc-form" id="pedir" data-rv>'
    + '<span class="cc-rot">Haz tu pedido</span><h2 class="cc-h2">Pide tu Kit Chao Canas</h2>'
    + '<p class="baj">Envío incluido a toda Colombia. Pagas cuando te llegue o pagas ahora y ahorras.</p>'
    + '<div class="formcard" id="formcard">'
    + '<div class="cod-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>'
    + ' Compra 100% segura: contra entrega o pago anticipado</div>'
    /* PASO 1 */
    + '<p class="pasoRot"><b>1</b>¿Cuántos kits quieres?</p>'
    + '<div class="packs" id="packsForm" role="radiogroup" aria-label="¿Cuántos kits quieres?">' + packsHTML() + '</div>'
    /* PASO 2 */
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
    /* PASO 3: tono de cada kit */
    + '<p class="pasoRot"><b>3</b>Elige el tono de cada kit</p>'
    + '<div id="tonoSel">' + tonosHTML() + '</div>'
    /* resumen */
    + '<div class="summary">'
    + '<div class="r"><span id="sumSubRot">Precio por separado</span><span id="sumSub"></span></div>'
    + '<div class="r" id="rowDesc"><span>Descuento</span><span id="sumDesc" class="desc"></span></div>'
    + '<div class="r"><span>Envío</span><span class="free">Incluido</span></div>'
    + '<div class="r tot"><span id="sumTotRot">Total a pagar cuando te llegue</span><span id="sumTot"></span></div>'
    + '</div>'
    /* PASO 4: datos */
    + '<p class="pasoRot"><b>4</b>¿A dónde te lo enviamos?</p>'
    + '<form id="fPedido" novalidate>'
    + '<div class="field"><label for="fNombre">Nombre y apellido</label><input id="fNombre" autocomplete="name" placeholder="Ej: María González"><div class="err">Escribe tu nombre y apellido.</div></div>'
    + '<div class="field"><label for="fTel">Celular (WhatsApp)</label>'
    + '<div class="telrow"><span class="cc-pref"><img src="https://flagcdn.com/co.svg" alt="" width="22" height="15"><span>+57</span></span>'
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
    + '<div class="aviso" id="fErr" role="alert"></div>'
    + '<button type="submit" class="cc-btn cc-btn--compra" id="btnComprar">Comprar · pago contra entrega</button>'
    + '<p class="formnote" id="notaPago">Pagas en efectivo cuando te llegue el pedido. Te confirmamos por WhatsApp.</p>'
    + '<p class="formnote ayuda">¿Se te complica llenarlo? '
    + '<a href="' + waLink('Hola, quiero pedir el Kit Chao Canas y se me complica el formulario') + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a> y te lo tomamos nosotros.</p>'
    + '</form>'
    + '<div class="carriers"><span class="cl">Pagos procesados por Wompi, la pasarela de Bancolombia</span>'
    + '<div class="cbadges">'
    + '<img src="https://wompi.com/assets/downloadble/logos_wompi/Wompi_LogoPrincipal.svg" alt="Wompi" class="lg-wompi" loading="lazy" onerror="this.remove()">'
    + '<img src="/img/pagos/bancolombia.svg" alt="Bancolombia" loading="lazy">'
    + '<img src="/img/pagos/pse.svg" alt="PSE" loading="lazy">'
    + '<img src="/img/pagos/nequi.svg" alt="Nequi" loading="lazy">'
    + '<img src="/img/pagos/visa.svg" alt="Visa" loading="lazy">'
    + '<img src="/img/pagos/mastercard.svg" alt="Mastercard" loading="lazy">'
    + '</div></div>'
    + '</div></section>';

  /* barra de abajo: Lo quiero + WhatsApp */
  var sb = document.createElement('div');
  sb.className = 'stickycta cc-barra'; sb.id = 'stickycta';
  var bt = document.createElement('button');
  bt.type = 'button'; bt.className = 'btn-flota'; bt.textContent = 'Lo quiero';
  bt.addEventListener('click', irPedir);
  sb.appendChild(bt);
  var wb = document.createElement('a');
  wb.className = 'cc-wa cc-wa--barra'; wb.href = WA_PEDIR; wb.target = '_blank'; wb.rel = 'noopener';
  wb.setAttribute('aria-label', 'Pedir por WhatsApp');
  wb.innerHTML = ICO_WA + '<span>WhatsApp</span>';
  wb.addEventListener('click', function () { px('Contact', { content_name: p.nombre }); });
  sb.appendChild(wb);
  document.body.appendChild(sb);

  /* ---------- contador: hasta la medianoche EN COLOMBIA ---------- */
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
      var c = $('cajaS'); if (c && !reduce) { c.classList.remove('late'); void c.offsetWidth; c.classList.add('late'); }
    }
    tic(); setInterval(tic, 1000);
  })();

  /* ---------- formulario: pack, forma de pago, tono, resumen ---------- */
  function pintarPrecio() {
    var k = p.packs[elegido];
    var pr = precioAhora(elegido);
    var base = separado(elegido);
    $('sumSub').textContent = pesos(base);
    $('sumSubRot').textContent = k.cant > 1 ? 'Precio por separado (' + k.cant + ' × ' + pesos(unitario) + ')' : 'Precio';
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
    $('tonoSel').innerHTML = tonosHTML();
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
  $('tonoSel').addEventListener('click', function (e) {
    var t = e.target.closest('.cc-top'); if (!t) return;
    var i = Number(t.parentNode.dataset.i);
    tonos[i] = tonos[i] === t.dataset.t ? '' : t.dataset.t;   /* tocar de nuevo lo deja sin elegir */
    $('tonoSel').innerHTML = tonosHTML();
  });
  if ($('btnPromo')) $('btnPromo').addEventListener('click', function () { elegirPack(Number(this.dataset.i)); irPedir(); });
  pintarPrecio();

  /* el campo de tonos que va al pedido: "NEGRO / CASTAÑO OSCURO" o 'POR DEFINIR' */
  function tonosPedido(cant) {
    var ts = [];
    for (var i = 0; i < cant; i++) ts.push(tonos[i] || NO_SABE);
    return ts.every(function (x) { return x === NO_SABE; }) ? NO_SABE : ts.join(' / ');
  }

  /* InitiateCheckout al llegar al formulario (una vez) */
  var _ic = false;
  var _form = $('pedir');
  function _checkout() { if (_ic) return; _ic = true; avisarPanel('visita_form');
    px('InitiateCheckout', { content_name: p.nombre, content_ids: [p.id], value: precioAhora(elegido), currency: 'COP' }); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { if (es.some(function (x) { return x.isIntersecting; })) { _checkout(); o.disconnect(); } }).observe(_form);
  ['focusin', 'change'].forEach(function (ev) { _form.addEventListener(ev, _checkout, { once: true }); });

  revelar();

  /* ---------- barra de abajo: aparece al bajar, se esconde en el formulario ---------- */
  (function () {
    var esperando = false;
    function mirar() {
      var enForm = _form.getBoundingClientRect().top < innerHeight * 0.92 && _form.getBoundingClientRect().bottom > 0;
      var ver = (window.scrollY || 0) > 420 && !enForm;
      sb.classList.toggle('show', ver); document.body.classList.toggle('con-barra', ver);
      esperando = false;
    }
    window.addEventListener('scroll', function () { if (esperando) return; esperando = true; requestAnimationFrame(mirar); }, { passive: true });
    mirar();
  })();

  /* ---------- boletín del pie ---------- */
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

  /* ---------- carrito abandonado: apenas hay un celular válido, con indicativo +57 ---------- */
  var SID = 'CO' + Date.now() + Math.floor(Math.random() * 1e6), abGuardado = false, abReloj;
  function guardarAbandono(estado) {
    var g = function (id) { return ($(id).value || '').trim(); };
    var tel = limpiarTel(g('fTel'));
    if (!/^3\d{9}$/.test(tel) || !EN_TIENDA) return;
    if (estado === 'COMPLETADO' && !abGuardado) return;
    abGuardado = true;
    var k = p.packs[elegido] || {};
    try {
      fetch(URL_ABANDONO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
        body: JSON.stringify({ sid: SID, telefono: tel, indicativo: '+57', nombre: g('fNombre'), producto: PRODUCTO, cantidad: k.cant || 1,
          total: precioAhora(elegido), direccion: g('fDir'), comuna: g('fCiudad'), region: g('fDepto'), referencia: g('fRef'),
          correo: g('fCorreo').toLowerCase(), fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }), estado: estado }) }).catch(function () {});
    } catch (e) {}
  }
  ['fTel', 'fNombre', 'fDir', 'fRef', 'fCiudad', 'fCorreo'].forEach(function (id) {
    $(id).addEventListener('blur', function () { clearTimeout(abReloj); abReloj = setTimeout(function () { guardarAbandono('INCOMPLETO'); }, 300); });
  });
  $('fDepto').addEventListener('change', function () { clearTimeout(abReloj); abReloj = setTimeout(function () { guardarAbandono('INCOMPLETO'); }, 300); });
  $('fTel').addEventListener('input', function () { if (/^3\d{9}$/.test(limpiarTel($('fTel').value))) { clearTimeout(abReloj); abReloj = setTimeout(function () { guardarAbandono('INCOMPLETO'); }, 1200); } });

  /* arma el pedido (separado del envío para poder revisarlo) */
  function armarPedido(eventId) {
    var g = function (id) { return ($(id).value || '').trim(); };
    var k = p.packs[elegido];
    return {
      pagina: PAGINA, producto: PRODUCTO, pais: 'CO',
      cantidad: k.cant, total: precioAhora(elegido), pago: formaPago,
      tonos: tonosPedido(k.cant),
      graduaciones: '',
      nombre: g('fNombre'), telefono: '57' + limpiarTel(g('fTel')),
      departamento: g('fDepto'), ciudad: g('fCiudad'),
      direccion: g('fDir'), referencia: g('fRef'), correo: g('fCorreo').toLowerCase(),
      cmp: window._CMP || '', fbp: galleta('_fbp'), fbc: fbc(),
      event_id: eventId, url: location.href.split('#')[0], ua: navigator.userAgent
    };
  }
  /* solo para revisar en local: devuelve el pedido sin enviarlo (no existe en jayegroupshop.com) */
  if (!EN_TIENDA) {
    window._ccPedidoPrueba = function () { return armarPedido('prueba'); };
  }

  $('fPedido').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var g = function (id) { return ($(id).value || '').trim(); };
    var k = p.packs[elegido];
    var errs = [];
    /* el tono NUNCA frena la compra: lo que no eligió queda 'POR DEFINIR' */
    if (marcar('fNombre', g('fNombre').split(/\s+/).length < 2)) errs.push('nombre');
    if (marcar('fTel', !/^3\d{9}$/.test(limpiarTel(g('fTel'))))) errs.push('celular');
    /* candado: sin calle y número no se registra (regla de James) */
    if (marcar('fDir', !/\d/.test(g('fDir')) || g('fDir').length < 6)) errs.push('dirección');
    if (marcar('fCiudad', g('fCiudad').length < 3)) errs.push('ciudad');
    if (marcar('fDepto', !g('fDepto'))) errs.push('departamento');
    var aviso = $('fErr');
    if (errs.length) {
      aviso.style.display = 'block';
      aviso.textContent = 'Revisa los campos marcados en rojo.';
      var primero = document.querySelector('#fPedido .field.mal');
      if (primero) primero.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    aviso.style.display = 'none';

    var total = precioAhora(elegido);
    var eventId = window.jayePixel ? window.jayePixel.id() : 'co-' + Date.now();
    /* datos del comprador al píxel (advanced matching; Meta los cifra en el navegador) */
    try {
      if (window.fbq) {
        var _n = g('fNombre').toLowerCase().split(/\s+/), _am = { ph: '57' + limpiarTel(g('fTel')), fn: _n[0] || '', ln: _n.slice(1).join(' '),
          ct: g('fCiudad').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''),
          st: g('fDepto').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''), country: 'co' };
        if (g('fCorreo')) _am.em = g('fCorreo').toLowerCase();
        fbq('init', '4451697161762536', _am);
      }
    } catch (e) {}
    var datos = armarPedido(eventId);
    /* en una copia local NO se manda nada al webhook real: solo se muestra lo que se enviaría */
    if (!EN_TIENDA) {
      window._ccUltimoPedido = datos;
      aviso.style.display = 'block';
      aviso.textContent = 'PRUEBA LOCAL (no se envió): ' + JSON.stringify(datos);
      return;
    }
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
        if (res.j.anticipo && res.j.anticipo_url) { anticipo(k, total, res.j); return; }
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
    $('pedir').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    confeti();
  }
  function confeti() {
    if (reduce || !window.confetti) return;
    var col = ['#059669', '#10B981', '#EA580C', '#ffffff'], end = Date.now() + 1100;
    (function frame() {
      window.confetti({ particleCount: 6, angle: 60, spread: 62, origin: { x: 0 }, colors: col });
      window.confetti({ particleCount: 6, angle: 120, spread: 62, origin: { x: 1 }, colors: col });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  /* ---------- ANTICIPO de $20.000 para clientes riesgosos (igual que las gafas) ---------- */
  function anticipo(k, total, j) {
    var ant = j.anticipo_valor || 20000, resto = j.resto != null ? j.resto : Math.max(0, total - ant);
    $('pedir').innerHTML = '<div class="listo"><h3>Tu pedido quedó apartado</h3><p>'
      + 'Tu pedido de <b>' + esc(k.texto) + '</b> ya está registrado. Para despacharlo <b>contra entrega</b>, la transportadora pide un '
      + '<b>anticipo de ' + pesos(ant) + '</b>. No es un cobro extra: <b>se descuenta del total</b>.</p>'
      + '<div class="listo__cuentas">'
      + '• Total del pedido: <b>' + pesos(total) + '</b><br>• Anticipo ahora: <b>' + pesos(ant) + '</b><br>• Pagas al recibir: <b>' + pesos(resto) + '</b></div>'
      + '<a class="cc-btn cc-btn--compra" href="' + esc(j.anticipo_url) + '">Pagar anticipo de ' + pesos(ant) + '</a>'
      + '<p class="listo__chico">Pago seguro con Wompi de Bancolombia: tarjeta, PSE o Nequi. Apenas se apruebe, tu pedido sale.</p></div>';
    $('pedir').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }
  var antVuelta = qs.get('anticipo');
  if (antVuelta) {
    var intA = 0;
    $('pedir').scrollIntoView();
    $('fErr').style.display = 'block';
    $('fErr').textContent = 'Estamos confirmando tu anticipo con Wompi…';
    (function mirarA() {
      fetch(URL_ANTICIPO + '?venta=' + encodeURIComponent(antVuelta) + '&id=' + encodeURIComponent(qs.get('id') || ''))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.estado === 'APPROVED') {
            $('fErr').style.display = 'none';
            $('pedir').innerHTML = '<div class="listo"><h3>Anticipo recibido</h3><p>Listo, recibimos tu anticipo. Tu pedido sale y el resto lo pagas cuando te llegue. Te escribimos por WhatsApp con la guía de envío.</p></div>';
            confeti();
          } else if ((j.estado === 'PENDING' || !j.estado) && intA++ < 20) {
            setTimeout(mirarA, 3000);
          } else if (j.estado === 'DECLINED' || j.estado === 'ERROR' || j.estado === 'VOIDED') {
            $('fErr').textContent = 'El anticipo no se aprobó. Escríbenos por WhatsApp y te mandamos el link otra vez.';
          } else {
            $('fErr').textContent = 'Aún no vemos tu anticipo confirmado. Si ya pagaste, te escribimos por WhatsApp.';
          }
        }).catch(function () { if (intA++ < 20) setTimeout(mirarA, 3000); });
    })();
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

  /* ---------- las secciones aparecen suave al llegar (250 ms; nada si reduce movimiento) ---------- */
  function revelar() {
    var partes = document.querySelectorAll('[data-rv]:not(.vino)');
    if (reduce || !('IntersectionObserver' in window)) { partes.forEach(function (e) { e.classList.add('vino'); }); return; }
    document.documentElement.classList.add('cc-anima');
    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vino'); ojo.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    partes.forEach(function (e) { ojo.observe(e); });
    /* seguro: nada se queda invisible (saltos con #, volver atrás) */
    function barrer() { document.querySelectorAll('[data-rv]:not(.vino)').forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('vino'); }); }
    setTimeout(barrer, 400);
    var t; window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(barrer, 500); }, { passive: true });
  }
})();
