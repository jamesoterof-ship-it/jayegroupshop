/* ============================================================
   COMBO PROTECTOR + COBIJA NAVIDEÑA · Jaye Group Colombia (jayegroupshop.com/co/protector/)
   Plano del script "protector-navidad-colombia" (Funnel 3 pasos · Aurora UI), aprobado por James 10-11.
   Pedido al flujo n8n pedido-tienda-co (Wompi si es pago anticipado, anticipo de $20.000 a riesgosos,
   regreso con ?pago= y ?anticipo=). Formulario: 1 medida · 2 color · 3 forma de pago · 4 datos.
   La medida y el color viajan en el campo "tonos" (así quedan en la nota del panel).
   James 10-11: promocionar el pago anticipado → va primero en el formulario y lo marcan los botones "pagar ahora".
   ============================================================ */
(function () {
  'use strict';

  var N8N = 'https://n8n-production-8a42.up.railway.app/webhook/';
  var URL_PEDIDO = N8N + 'pedido-tienda-co';
  var URL_ESTADO = N8N + 'pago-estado-co';
  var URL_ANTICIPO = N8N + 'anticipo-estado-co';
  var URL_VISITA = N8N + 'track-visita';
  var URL_ABANDONO = N8N + 'abandonado';
  var PAGINA = 'co-protector';
  var WA = '573145021958';
  var host = location.hostname;
  /* fuera de jayegroupshop.com (vista previa en el computador) no se manda NADA a n8n */
  var EN_VIVO = host === 'jayegroupshop.com' || host === 'www.jayegroupshop.com';

  var P = window.PRODUCTO_CO;
  var byId = function (id) { return document.getElementById(id); };
  var html = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&quot;'; }); };
  var cop = function (n) { return '$' + Number(n).toLocaleString('es-CO'); };
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var params = new URLSearchParams(location.search);
  var campana = params.get('cmp') || params.get('utm_campaign') || '';
  try { if (campana) localStorage.setItem('co_cmp', campana); else campana = localStorage.getItem('co_cmp') || ''; } catch (e) {}
  function enlaceWA(t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); }
  function evento(nombre, datos, id) { try { return window.pixelCO ? window.pixelCO.track(nombre, datos, id) : ''; } catch (e) { return ''; } }
  function bajarA(el) { if (el) el.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' }); }

  /* fotos que todavía no existen: recuadro con lo que va ahí (las hace James) */
  document.querySelectorAll('.pr-foto img').forEach(function (im) {
    function falta() { im.closest('.pr-foto').classList.add('sin-foto'); }
    if (im.complete && !im.naturalWidth) falta(); else im.addEventListener('error', falta);
  });

  if (!P) return;
  var vende = [P.precio, P.anticipado].every(function (x) { return (window.PRECIOS_APROBADOS_CO || []).indexOf(x) >= 0; });

  /* precios en toda la página, siempre desde productos.js */
  document.querySelectorAll('[data-precio="cod"]').forEach(function (e) { e.textContent = cop(P.precio); });
  document.querySelectorAll('[data-precio="pre"]').forEach(function (e) { e.textContent = cop(P.anticipado); });

  /* tabla de medidas y muestrario de colores */
  byId('prMedidas').innerHTML = P.medidas.map(function (m) {
    return '<div class="pr-med__fila" role="row"><span role="cell">' + html(m[1]) + '</span><span role="cell">' + html(m[2]) + '</span></div>';
  }).join('');
  byId('prColores').innerHTML = P.colores.map(function (c) {
    return '<li><i style="background:' + c[2] + '"></i>' + html(c[1]) + '</li>';
  }).join('');

  if (!vende) {
    byId('btnArriba').disabled = true;
    byId('btnArriba').textContent = 'No disponible por ahora';
    byId('prForm').innerHTML = '<section class="pr-sec"><p class="pr-sub">Este producto no está disponible por ahora. Escríbenos por WhatsApp.</p></section>';
    aparecer();
    return;
  }

  /* visita al panel (una por sesión) y ViewContent */
  function avisar(tipo) {
    if (!EN_VIVO) return;
    try { fetch(URL_VISITA, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: PAGINA, producto: P.nombre, tipo: tipo }) }).catch(function () {}); } catch (e) {}
  }
  try { if (!sessionStorage.getItem('co_vis_protector')) { sessionStorage.setItem('co_vis_protector', '1'); avisar('visita'); } } catch (e) {}
  evento('ViewContent', { content_name: P.nombre, content_type: 'product', content_ids: [P.id], value: P.precio, currency: 'COP' });

  /* ---------- reseñas: solo si hay reales ---------- */
  var ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6 6.5.7-4.8 4.4 1.3 6.4L12 16.8 6.2 20l1.3-6.4L2.7 9.2l6.5-.7z"/></svg>';
  var lista = (window.RESENAS_CO || []).filter(function (r) { return r && r.texto; });
  if (lista.length) {
    var media = Math.round(lista.reduce(function (s, r) { return s + (Number(r.estrellas) || 5); }, 0) / lista.length * 10) / 10;
    var fila = function (n) { var s = ''; for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= Math.round(n) ? 'si' : '') + '">' + ESTRELLA + '</span>'; return s; };
    byId('prEstrellas').innerHTML = '<span class="pr-est">' + fila(media) + '</span><a href="#resenas">' + media.toFixed(1) + ' · ' + lista.length + ' opiniones</a>';
    byId('prEstrellas').hidden = false;
    var MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    var cuando = function (f) { var p = String(f || '').split('-'); return p.length === 3 ? Number(p[2]) + ' ' + MES[Number(p[1]) - 1] + ' ' + p[0] : ''; };
    var tarjeta = function (r) {
      return '<article class="pr-op pr-card"><header><b>' + html(r.nombre) + '</b><small>' + html([r.ciudad, cuando(r.fecha)].filter(Boolean).join(' · ')) + '</small>'
        + '<span class="pr-est">' + fila(Number(r.estrellas) || 5) + '</span></header><p>' + html(r.texto) + '</p>'
        + (r.foto ? '<img src="' + html(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '') + '</article>';
    };
    byId('prResenas').innerHTML = '<section class="pr-sec pr-ops" id="resenas" data-rv><span class="pr-rot">Opiniones</span>'
      + '<h2 class="pr-h2">Opiniones del producto</h2><p class="pr-sub"><b>' + media.toFixed(1) + '</b> de 5 · ' + lista.length + ' opiniones</p>'
      + '<div class="pr-ops__grid" id="prOps"></div>'
      + (lista.length > 4 ? '<button type="button" class="pr-btn pr-btn--sec" id="prOpsMas">Ver más opiniones</button>' : '') + '</section>';
    var mostradas = 0;
    var mas = function () {
      byId('prOps').insertAdjacentHTML('beforeend', lista.slice(mostradas, mostradas + 4).map(tarjeta).join(''));
      mostradas += 4;
      if (mostradas >= lista.length && byId('prOpsMas')) byId('prOpsMas').hidden = true;
    };
    mas();
    if (byId('prOpsMas')) byId('prOpsMas').addEventListener('click', mas);
  }

  /* ---------- formulario (CTA final del embudo) ---------- */
  var DEPTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
    'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño',
    'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'];
  var medida = '', color = '', pago = 'cod';
  var AHORRO = P.precio - P.anticipado;
  function total() { return pago === 'pre' ? P.anticipado : P.precio; }
  function nombreDe(arr, v) { for (var i = 0; i < arr.length; i++) if (arr[i][0] === v) return arr[i][1]; return ''; }
  function campo(id, rot, control, err) {
    return '<div class="pr-campo" data-c="' + id + '"><label for="' + id + '">' + rot + '</label>' + control + (err ? '<p class="pr-err">' + err + '</p>' : '') + '</div>';
  }
  var LOGOS = '<img src="https://wompi.com/assets/downloadble/logos_wompi/Wompi_LogoPrincipal.svg" alt="Wompi" height="20" loading="lazy" onerror="this.remove()">'
    + ['bancolombia', 'pse', 'nequi', 'visa', 'mastercard'].map(function (n) { return '<img src="/img/pagos/' + n + '.svg" alt="' + n + '" height="20" loading="lazy">'; }).join('');

  byId('prForm').innerHTML = '<section class="pr-sec pr-pedir" id="pedir" data-rv>'
    + '<span class="pr-rot">Haz tu pedido</span><h2 class="pr-h2">Pide tu combo navideño</h2>'
    + '<p class="pr-sub">Envío incluido a toda Colombia. Paga ahora y ahorra ' + cop(AHORRO) + ', o paga cuando te llegue.</p>'
    + '<div class="pr-caja pr-card">'
    + '<div class="pr-seguro"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>Compra 100 % segura: pago con Wompi o contra entrega</div>'
    + '<div class="pr-combo"><img src="img/pr-01-heroe.webp?v=1" alt="" width="64" height="64" onerror="this.remove()">'
    + '<span><b>' + html(P.corto) + '</b><small>3 protectores · 6 fundas · cobija de regalo</small></span></div>'
    + '<p class="pr-paso"><b>1</b>Medida de tu colchón</p>'
    + '<div class="pr-ops-med" id="fMedida" role="radiogroup" aria-label="Medida de tu colchón">'
    + P.medidas.map(function (m) { return '<button type="button" class="pr-op-med" role="radio" aria-checked="false" data-v="' + m[0] + '"><b>' + html(m[1]) + '</b><small>' + html(m[2]) + '</small></button>'; }).join('')
    + '</div><p class="pr-err" id="errMedida">Elige la medida de tu colchón.</p>'
    + '<p class="pr-paso"><b>2</b>Color <span class="pr-paso__elegido" id="colorElegido">Sin elegir</span></p>'
    + '<div class="pr-ops-col" id="fColor" role="radiogroup" aria-label="Color">'
    + P.colores.map(function (c) { return '<button type="button" class="pr-op-col" role="radio" aria-checked="false" data-v="' + c[0] + '" title="' + html(c[1]) + '" aria-label="' + html(c[1]) + '"><i style="background:' + c[2] + '"></i></button>'; }).join('')
    + '</div><p class="pr-err" id="errColor">Elige un color.</p>'
    + '<p class="pr-paso"><b>3</b>¿Cómo quieres pagar?</p>'
    + '<div class="pr-ops-pago" id="fPago" role="radiogroup" aria-label="¿Cómo quieres pagar?">'
    + '<button type="button" class="pr-op-pago pr-op-pago--pre" role="radio" aria-checked="false" data-v="pre"><em>Ahorras ' + cop(AHORRO) + '</em><b>Pago anticipado</b><span class="pr-op-pago__n">' + cop(P.anticipado) + '</span><small>Wompi · despacho prioritario</small></button>'
    + '<button type="button" class="pr-op-pago on" role="radio" aria-checked="true" data-v="cod"><b>Pago contra entrega</b><span class="pr-op-pago__n">' + cop(P.precio) + '</span><small>En efectivo, cuando te llegue</small></button>'
    + '</div>'
    + '<div class="pr-resumen"><div><span>Combo</span><span>' + cop(P.precio) + '</span></div>'
    + '<div id="filaDesc" hidden><span>Descuento pago anticipado</span><span class="menos">−' + cop(AHORRO) + '</span></div>'
    + '<div><span>Envío</span><span class="gratis">Incluido</span></div>'
    + '<div class="tot"><span id="totRot">Total a pagar cuando te llegue</span><span id="totN">' + cop(P.precio) + '</span></div></div>'
    + '<p class="pr-paso"><b>4</b>¿A dónde te lo enviamos?</p>'
    + '<form id="fPedido" novalidate>'
    + campo('fNombre', 'Nombre y apellido', '<input id="fNombre" autocomplete="name" placeholder="Ej: María González">', 'Escribe tu nombre y apellido.')
    + campo('fTel', 'Celular (WhatsApp)', '<div class="pr-tel"><span>+57</span><input id="fTel" inputmode="numeric" autocomplete="tel-national" maxlength="14" placeholder="300 123 4567"></div>', 'El celular debe tener 10 números y empezar por 3.')
    + campo('fDir', 'Dirección', '<input id="fDir" autocomplete="street-address" placeholder="Ej: Calle 45 # 12-30">', 'Escribe la dirección completa, con número.')
    + campo('fRef', 'Barrio, apto o referencia <i>(opcional)</i>', '<input id="fRef" placeholder="Ej: Barrio Chapinero, apto 302">', '')
    + '<div class="pr-dos">'
    + campo('fCiudad', 'Ciudad o municipio', '<input id="fCiudad" autocomplete="address-level2" placeholder="Ej: Medellín">', 'Escribe tu ciudad.')
    + campo('fDepto', 'Departamento', '<select id="fDepto"><option value="">Selecciona…</option>' + DEPTOS.map(function (d) { return '<option>' + d + '</option>'; }).join('') + '</select>', 'Selecciona tu departamento.')
    + '</div>'
    + campo('fCorreo', 'Correo <i>(opcional)</i>', '<input id="fCorreo" type="email" inputmode="email" autocomplete="email" placeholder="Ej: maria@gmail.com">', '')
    + '<div class="pr-aviso" id="fAviso" role="alert" hidden></div>'
    + '<button type="submit" class="pr-btn pr-btn--compra pr-btn--ancho" id="btnComprar">Comprar · pago contra entrega</button>'
    + '<p class="pr-nota" id="notaPago"></p>'
    + '<p class="pr-nota">¿Se te complica? <a href="' + enlaceWA('Hola, quiero pedir el Combo Protector + Cobija y se me complica el formulario') + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a> y te lo tomamos nosotros.</p>'
    + '</form>'
    + '<div class="pr-wompi"><span>Pagos anticipados procesados por Wompi, la pasarela de Bancolombia</span><div>' + LOGOS + '</div></div>'
    + '</div></section>';

  function elegir(grupo, boton) {
    Array.prototype.forEach.call(byId(grupo).children, function (b) { var on = b === boton; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
  }
  var _carrito = false;
  function primerClic() {
    if (_carrito) return; _carrito = true;
    evento('AddToCart', { content_name: P.nombre, content_ids: [P.id], content_type: 'product', value: total(), currency: 'COP', num_items: 1 });
  }
  function ponerPago(v) {
    pago = v; elegir('fPago', byId('fPago').querySelector('[data-v="' + v + '"]')); pintar();
  }
  byId('fMedida').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    medida = b.dataset.v; elegir('fMedida', b); byId('errMedida').classList.remove('ver'); primerClic();
  });
  byId('fColor').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    color = b.dataset.v; elegir('fColor', b); byId('errColor').classList.remove('ver');
    byId('colorElegido').textContent = nombreDe(P.colores, color); primerClic();
  });
  byId('fPago').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (b) ponerPago(b.dataset.v);
  });
  function pintar() {
    byId('filaDesc').hidden = pago !== 'pre';
    byId('totN').textContent = cop(total());
    byId('totRot').textContent = pago === 'pre' ? 'Total a pagar ahora' : 'Total a pagar cuando te llegue';
    var b = byId('btnComprar');
    if (!b.disabled) b.textContent = pago === 'pre' ? 'Pagar ahora ' + cop(P.anticipado) + ' con Wompi' : 'Comprar · pago contra entrega';
    byId('notaPago').textContent = pago === 'pre'
      ? 'Te llevamos a Wompi para pagar con tarjeta, PSE, Nequi o Bancolombia. Tu pedido sale con despacho prioritario.'
      : 'Pagas en efectivo cuando te llegue. Te confirmamos por WhatsApp. Si pagas ahora, ahorras ' + cop(AHORRO) + '.';
  }
  pintar();

  /* botones de la página: "Lo quiero", pasos, y los de "pagar ahora" (dejan marcado el pago anticipado) */
  var caja = byId('pedir');
  document.querySelectorAll('[data-ir]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.hasAttribute('data-pago-pre')) ponerPago('pre');
      bajarA(byId(b.getAttribute('data-ir')));
    });
  });

  /* InitiateCheckout al llegar al formulario (una vez) */
  var _ic = false;
  function llego() { if (_ic) return; _ic = true; avisar('visita_form'); evento('InitiateCheckout', { content_name: P.nombre, content_ids: [P.id], value: total(), currency: 'COP' }); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (x, o) { if (x[0].isIntersecting) { llego(); o.disconnect(); } }).observe(caja);
  caja.addEventListener('focusin', llego, { once: true });

  /* ---------- datos y validación ---------- */
  function val(id) { return (byId(id).value || '').trim(); }
  function soloCel(t) { var d = String(t || '').replace(/\D/g, ''); if (d.length === 12 && d.slice(0, 2) === '57') d = d.slice(2); return d; }
  function malo(id, si) { var c = document.querySelector('[data-c="' + id + '"]'); if (c) c.classList.toggle('mal', si); return si; }
  function galleta(n) { var m = document.cookie.match('(^|;)\\s*' + n + '=([^;]+)'); return m ? decodeURIComponent(m[2]) : ''; }
  function fbc() { var c = galleta('_fbc'); if (c) return c; var f = params.get('fbclid'); return f ? 'fb.1.' + Date.now() + '.' + f : ''; }
  function variante() { return (nombreDe(P.medidas, medida) || 'POR DEFINIR').toUpperCase() + ' · ' + (color || 'POR DEFINIR'); }
  function pedido(eventId) {
    return {
      pagina: PAGINA, producto: P.corto, pais: 'CO', cantidad: 1, total: total(), pago: pago,
      tonos: 'MEDIDA ' + variante(), graduaciones: '',
      nombre: val('fNombre'), telefono: '57' + soloCel(val('fTel')), departamento: val('fDepto'), ciudad: val('fCiudad'),
      direccion: val('fDir'), referencia: val('fRef'), correo: val('fCorreo').toLowerCase(),
      cmp: campana, fbp: galleta('_fbp'), fbc: fbc(), event_id: eventId, url: location.href.split('#')[0], ua: navigator.userAgent
    };
  }

  /* carrito abandonado: apenas hay un celular válido (solo en la tienda real) */
  var SID = 'CO' + Date.now() + Math.floor(Math.random() * 1e6), guardado = false, reloj;
  function abandono(estado) {
    var tel = soloCel(val('fTel'));
    if (!EN_VIVO || !/^3\d{9}$/.test(tel)) return;
    if (estado === 'COMPLETADO' && !guardado) return;
    guardado = true;
    try { fetch(URL_ABANDONO, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sid: SID, telefono: tel, indicativo: '+57', nombre: val('fNombre'), producto: P.corto + ' (' + variante() + ')',
        cantidad: 1, total: total(), direccion: val('fDir'), comuna: val('fCiudad'), region: val('fDepto'), referencia: val('fRef'),
        correo: val('fCorreo').toLowerCase(), fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }), estado: estado }) }).catch(function () {}); } catch (e) {}
  }
  ['fTel', 'fNombre', 'fDir', 'fRef', 'fCiudad', 'fCorreo'].forEach(function (id) {
    byId(id).addEventListener('blur', function () { clearTimeout(reloj); reloj = setTimeout(function () { abandono('INCOMPLETO'); }, 300); });
  });
  byId('fDepto').addEventListener('change', function () { clearTimeout(reloj); reloj = setTimeout(function () { abandono('INCOMPLETO'); }, 300); });

  if (!EN_VIVO) window._prPedidoPrueba = function () { return pedido('prueba'); };

  byId('fPedido').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var aviso = byId('fAviso'), errores = 0;
    if (!medida) { byId('errMedida').classList.add('ver'); errores++; }
    if (!color) { byId('errColor').classList.add('ver'); errores++; }
    if (malo('fNombre', val('fNombre').split(/\s+/).length < 2)) errores++;
    if (malo('fTel', !/^3\d{9}$/.test(soloCel(val('fTel'))))) errores++;
    /* candado de James: sin calle y número no se registra */
    if (malo('fDir', !/\d/.test(val('fDir')) || val('fDir').length < 6)) errores++;
    if (malo('fCiudad', val('fCiudad').length < 3)) errores++;
    if (malo('fDepto', !val('fDepto'))) errores++;
    if (errores) {
      aviso.hidden = false; aviso.textContent = 'Revisa lo que está marcado en rojo.';
      var primero = document.querySelector('#pedir .pr-err.ver, #pedir .pr-campo.mal');
      if (primero) primero.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    aviso.hidden = true;
    var eventId = window.pixelCO ? window.pixelCO.id() : 'co-' + Date.now();
    try {
      if (window._pixelCO) {
        var nom = val('fNombre').toLowerCase().split(/\s+/);
        var limpio = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, ''); };
        var am = { ph: '57' + soloCel(val('fTel')), fn: nom[0] || '', ln: nom.slice(1).join(' '), ct: limpio(val('fCiudad')), st: limpio(val('fDepto')), country: 'co' };
        if (val('fCorreo')) am.em = val('fCorreo').toLowerCase();
        window.fbq('init', '4451697161762536', am);
      }
    } catch (e) {}
    var datos = pedido(eventId), monto = total();
    /* vista previa: se muestra lo que se mandaría, sin enviarlo */
    if (!EN_VIVO) { window._prUltimo = datos; aviso.hidden = false; aviso.textContent = 'VISTA PREVIA (no se envió nada): ' + JSON.stringify(datos); return; }
    var btn = byId('btnComprar'); btn.disabled = true; btn.textContent = pago === 'pre' ? 'Preparando tu pago…' : 'Enviando tu pedido…';
    fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) { return r.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j || res.j.ok === false) throw new Error((res.j && res.j.error) || 'revisa tus datos');
        abandono('COMPLETADO');
        try { localStorage.setItem('co_pr_ultimo', JSON.stringify({ id: res.j.id, total: monto, ev: eventId })); } catch (e) {}
        if (pago === 'pre') {
          if (!res.j.pago_url) throw new Error('no se generó el link de pago');
          evento('AddPaymentInfo', { content_name: P.nombre, currency: 'COP', value: monto });
          location.href = res.j.pago_url;
          return;
        }
        evento('Purchase', { content_name: P.nombre, content_ids: [P.id], currency: 'COP', value: monto, num_items: 1 }, eventId);
        if (res.j.anticipo && res.j.anticipo_url) { pantallaAnticipo(monto, res.j); return; }
        pantallaListo('cod', monto);
      })
      .catch(function (e) {
        btn.disabled = false; pintar();
        aviso.hidden = false; aviso.textContent = 'No pudimos registrar tu pedido (' + e.message + '). Inténtalo otra vez o escríbenos por WhatsApp.';
      });
  });

  function pantallaListo(tipo, monto) {
    caja.innerHTML = '<div class="pr-listo pr-card"><h3>' + (tipo === 'cod' ? 'Pedido recibido' : 'Pago aprobado') + '</h3><p>'
      + (tipo === 'cod'
        ? 'Tu combo (' + html(variante().toLowerCase()) + ') por <b>' + cop(monto) + '</b> quedó registrado. Te escribimos por WhatsApp para confirmarlo y lo pagas cuando te llegue.'
        : 'Recibimos tu pago. Tu pedido sale con <b>despacho prioritario</b> y te escribimos por WhatsApp con la guía de envío.')
      + '</p></div>';
    bajarA(caja);
  }
  function pantallaAnticipo(monto, j) {
    var ant = j.anticipo_valor || 20000, resto = j.resto != null ? j.resto : Math.max(0, monto - ant);
    caja.innerHTML = '<div class="pr-listo pr-card"><h3>Tu pedido quedó apartado</h3><p>Para despacharlo <b>contra entrega</b>, la transportadora pide un '
      + '<b>anticipo de ' + cop(ant) + '</b>. No es un cobro extra: <b>se descuenta del total</b>.</p>'
      + '<ul class="pr-listo__cuentas"><li>Total del pedido: <b>' + cop(monto) + '</b></li><li>Anticipo ahora: <b>' + cop(ant) + '</b></li><li>Pagas al recibir: <b>' + cop(resto) + '</b></li></ul>'
      + '<a class="pr-btn pr-btn--compra pr-btn--ancho" href="' + html(j.anticipo_url) + '">Pagar anticipo de ' + cop(ant) + '</a>'
      + '<p class="pr-nota">Pago seguro con Wompi de Bancolombia. Apenas se apruebe, tu pedido sale.</p></div>';
    bajarA(caja);
  }

  /* regreso desde Wompi: ?pago=<pedido>&id=<transacción> o ?anticipo=<pedido>&id=<transacción> */
  function esperar(url, ok, malMsg) {
    var vueltas = 0, aviso = byId('fAviso');
    bajarA(caja); aviso.hidden = false; aviso.textContent = 'Estamos confirmando tu pago con Wompi…';
    (function mirar() {
      fetch(url).then(function (r) { return r.json(); }).then(function (j) {
        if (j.estado === 'APPROVED') { aviso.hidden = true; ok(); }
        else if ((j.estado === 'PENDING' || !j.estado) && vueltas++ < 20) setTimeout(mirar, 3000);
        else if (/DECLINED|ERROR|VOIDED/.test(j.estado || '')) aviso.textContent = malMsg;
        else aviso.textContent = 'Aún no vemos tu pago confirmado. Si ya pagaste, te escribimos por WhatsApp.';
      }).catch(function () { if (vueltas++ < 20) setTimeout(mirar, 3000); });
    })();
  }
  var idTx = encodeURIComponent(params.get('id') || '');
  if (params.get('pago')) {
    var ref = params.get('pago');
    esperar(URL_ESTADO + '?ref=' + encodeURIComponent(ref) + '&id=' + idTx, function () {
      var u = {}; try { u = JSON.parse(localStorage.getItem('co_pr_ultimo') || '{}'); } catch (e) {}
      if (!sessionStorage.getItem('co_px_' + ref)) {
        evento('Purchase', { content_name: P.nombre, currency: 'COP', value: u.total || P.anticipado, num_items: 1 }, u.ev);
        try { sessionStorage.setItem('co_px_' + ref, '1'); } catch (e) {}
      }
      pantallaListo('pre');
    }, 'El pago no se aprobó. Puedes intentarlo de nuevo o elegir pago contra entrega.');
  } else if (params.get('anticipo')) {
    esperar(URL_ANTICIPO + '?venta=' + encodeURIComponent(params.get('anticipo')) + '&id=' + idTx, function () {
      caja.innerHTML = '<div class="pr-listo pr-card"><h3>Anticipo recibido</h3><p>Listo: tu pedido sale y el resto lo pagas cuando te llegue. Te escribimos por WhatsApp con la guía.</p></div>';
    }, 'El anticipo no se aprobó. Escríbenos por WhatsApp y te mandamos el link otra vez.');
  }

  /* ---------- barra de abajo: aparece al bajar, se va al llegar al formulario ---------- */
  var barra = document.createElement('div');
  barra.className = 'pr-barra';
  barra.innerHTML = '<span><b>' + cop(P.precio) + '</b><small>o ' + cop(P.anticipado) + ' pagando ahora</small></span><button type="button" class="pr-btn pr-btn--compra">Lo quiero</button>';
  barra.querySelector('button').addEventListener('click', function () { bajarA(caja); });
  document.body.appendChild(barra);
  var pendiente = false;
  function revisarBarra() {
    var ver = (window.scrollY || 0) > 480 && caja.getBoundingClientRect().top > innerHeight * 0.9;
    barra.classList.toggle('ver', ver); pendiente = false;
  }
  window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(revisarBarra); } }, { passive: true });
  revisarBarra();

  /* boletín del pie */
  var fb = byId('fBoletin');
  if (fb) fb.addEventListener('submit', function (e) {
    e.preventDefault();
    if (byId('correoBoletin').value.indexOf('@') < 0) { byId('correoBoletin').focus(); return; }
    if (!byId('aceptoBoletin').checked) { byId('aceptoBoletin').focus(); return; }
    fb.outerHTML = '<p class="gracias">Listo. Te avisamos cuando haya novedades.</p>';
  });

  aparecer();

  /* las secciones entran suave al llegar (nada si el celular pide menos movimiento) */
  function aparecer() {
    var partes = document.querySelectorAll('[data-rv]');
    if (quieto || !('IntersectionObserver' in window)) { partes.forEach(function (e) { e.classList.add('dentro'); }); return; }
    document.documentElement.classList.add('pr-anima');
    var ojo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dentro'); ojo.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    partes.forEach(function (e) { ojo.observe(e); });
    setTimeout(function () { document.querySelectorAll('[data-rv]:not(.dentro)').forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('dentro'); }); }, 400);
  }
})();
