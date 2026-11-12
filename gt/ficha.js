/* ============================================================
   MOTOR DEL FORMULARIO · TIENDA GUATEMALA (jayegroupshop.com/gt/<producto>/) · 11-11-2026
   Copia del de Perú (/pe/ficha.js), cambiado a Guatemala:
     · packs (cantidad) + forma de pago (al recibir / con tarjeta −10 %) + resumen
     · celular guatemalteco: 8 dígitos que empiezan en 3, 4 o 5 (viaja como 502 + 8 dígitos)
     · departamento y municipio de la lista de Dropi Guatemala (/gt/departamentos-gt.js, nombres exactos)
     · dirección con número (mismo candado de la operación)
     · pedido a n8n pedido-tienda-gt con event_id/fbp/fbc (Meta), cmp (anuncio) y la página
     · Purchase en el píxel solo si el pedido ENTRÓ (respuesta ok)
     · pago con tarjeta: botón de PayPal; la orden la crea el servidor (paypal-orden-gt, cobra en USD)
       y la captura la comprueba el servidor (paypal-captura-gt)
     · enlace personal de pago ?pagar=<id>-<código> (pago-info-gt)
   OJO 11-11: los flujos n8n *-gt TODAVÍA NO EXISTEN; hasta crearlos el formulario no registra pedidos.
   Candado: si algún precio del producto no está en window.PRECIOS_APROBADOS, el formulario NO se pinta.
   ============================================================ */
(function () {
  'use strict';
  var N8N = 'https://n8n-production-8a42.up.railway.app/webhook/';
  var URL_PEDIDO = window.URL_PEDIDO || N8N + 'pedido-tienda-gt';
  var WA = window.WA_NUM || '50238149621';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var soles = function (n) {
    n = Number(n);
    return 'Q ' + n.toLocaleString('es-GT', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  };

  /* el anuncio del que vino (cmp o utm_campaign); se recuerda si vuelve sin él */
  try {
    var _q = new URLSearchParams(location.search), _c = _q.get('cmp') || _q.get('utm_campaign') || '';
    if (_c) { try { localStorage.setItem('_cmp_gt', _c); } catch (e) {} window._CMP = _c; }
    else { try { window._CMP = localStorage.getItem('_cmp_gt') || ''; } catch (e) { window._CMP = ''; } }
  } catch (e) { window._CMP = ''; }

  var TODOS = window.PRODUCTOS || [];
  var id = window.__P || '';
  var p = TODOS.filter(function (x) { return x.id === id; })[0] || TODOS[0];
  var caja = $('pedir');
  if (!p || !caja) return;

  /* candado de precios */
  var lista = window.PRECIOS_APROBADOS || [];
  var precios = (p.packs || []).map(function (k) { return k.precio; }).concat((p.anticipado || {}).precios || []);
  if (!precios.length || !precios.every(function (x) { return lista.indexOf(x) >= 0; })) {
    caja.innerHTML = '<div class="pf"><p class="pf-nota">Este producto todavía no está disponible.</p></div>';
    if (window.console) console.warn('Precio fuera de la lista aprobada: el formulario no se pinta.');
    return;
  }

  var pre = p.anticipado || null;
  var elegido = typeof p.popular === 'number' ? p.popular : 0;
  var formaPago = 'cod';
  var track = function (ev, datos, eid) {
    try { if (window.jayePixel) return window.jayePixel.track(ev, datos, eid); if (window.fbq) window.fbq('track', ev, datos); } catch (e) {}
    return eid || '';
  };
  var precioAhora = function (i) { return formaPago === 'pre' && pre ? pre.precios[i] : p.packs[i].precio; };

  track('ViewContent', { content_name: p.nombre, content_type: 'product', content_ids: [p.id], value: p.packs[0].precio, currency: 'GTQ' });

  /* 10-11: visitas al panel (Postgres, track-visita) con prefijo "pe-", como las demás tiendas; una por sesión */
  var avisarPanel = function (tipo) {
    try { fetch(N8N + 'track-visita', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pagina: 'gt-' + p.id, producto: p.nombre + ' · Guatemala', tipo: tipo }) }).catch(function () {}); } catch (e) {}
  };
  try { if (!sessionStorage.getItem('jaye_vis_gt_' + p.id)) { sessionStorage.setItem('jaye_vis_gt_' + p.id, '1'); avisarPanel('visita'); } } catch (e) { avisarPanel('visita'); }

  /* ---------- pintar ---------- */
  var n = p.packs.length;
  var packsHTML = p.packs.map(function (k, i) {
    return '<button type="button" class="pf-pack' + (i === elegido ? ' sel' : '') + '" data-i="' + i + '" role="radio" aria-checked="' + (i === elegido) + '" style="--xp:' + Math.round((i + 1) / n * 100) + '%">'
      + (i === p.popular ? '<span class="pf-pack__cinta">El más pedido</span>' : '')
      + (k.nivel ? '<span class="pf-pack__nivel">' + esc(k.nivel) + '</span>' : '')
      + '<span class="pf-pack__txt">' + esc(k.texto) + '</span>'
      + '<span class="pf-pack__pr" data-pr="' + i + '">' + soles(k.precio) + '</span>'
      + '<span class="pf-pack__antes">' + (k.antes ? '<s>' + soles(k.antes) + '</s> ' : '') + '<span data-cu="' + i + '"></span></span>'
      + '<span class="pf-pack__ahorro" data-off="' + i + '"></span>'
      + '<span class="pf-pack__xp" aria-hidden="true"><i></i></span>'
      + '</button>';
  }).join('');

  /* 09-11 James ("MALO… mira cómo están los demás formularios"): igual que México (rodillera): ícono redondo arriba, título,
     precio grande, texto, y en "Paga ahora" los logos chicos en línea (Visa, Mastercard, Amex, PayPal), sin caja blanca. */
  /* 09-11 James: los logos como en el pie (versión para fondo oscuro: PayPal, Visa y Mastercard en blanco) */
  var logos = '<span class="pf-pago__logos"><img src="/img/pago/paypal-texto-oscuro.svg" alt="PayPal" width="52" height="16"><img src="/img/pago/visa-oscuro.svg" alt="Visa" width="34" height="20"><img src="/img/pago/mastercard-oscuro.svg" alt="Mastercard" width="34" height="20"></span>';
  var icoCod = '<span class="pf-pago__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.5" y="7" width="19" height="12" rx="2.2"></rect><path d="M2.5 11h19"></path><circle cx="17.5" cy="15.5" r="1.3"></circle></svg></span>';
  var icoPre = '<span class="pf-pago__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v18"></path><path d="M16.5 7.5c-.6-1.4-2.3-2.2-4.5-2.2-2.5 0-4.2 1.1-4.2 2.9 0 1.9 1.8 2.6 4.4 3.2 2.9.6 4.8 1.4 4.8 3.5 0 2-1.9 3.2-4.6 3.2-2.4 0-4.2-.9-4.8-2.4"></path></svg></span>';
  var pagosHTML = !pre ? '' : '<p class="pf-paso"><b>2</b>¿Cómo quieres pagar?</p>'
    + '<div class="pf-pagos" role="radiogroup" aria-label="¿Cómo quieres pagar?">'
    + '<button type="button" class="pf-pago sel" data-pago="cod" role="radio" aria-checked="true">' + icoCod
    + '<span class="pf-pago__tit">Pago al recibir</span><span class="pf-pago__pr" id="prCod"></span>'
    + '<span class="pf-pago__sub">Envío gratis · 2 a 5 días hábiles</span></button>'
    + '<button type="button" class="pf-pago" data-pago="pre" role="radio" aria-checked="false">'
    + '<span class="pf-pago__cinta">−' + pre.pct + ' %</span>' + icoPre
    + '<span class="pf-pago__tit">Paga ahora</span><span class="pf-pago__pr" id="prPre"></span>'
    + '<span class="pf-pago__sub">Entrega prioritaria: sale primero</span>' + logos + '</button></div>';

  var deptos = window.DEPARTAMENTOS_GT || {};
  var campo = function (idc, rot, input, err, opc) {
    return '<div class="pf-campo" id="c' + idc + '"><label for="' + idc + '">' + rot + (opc ? ' <i>(opcional)</i>' : '') + '</label>' + input
      + (err ? '<div class="pf-err">' + err + '</div>' : '') + '</div>';
  };

  caja.innerHTML = '<div class="pf">'
    + '<p class="pf-paso"><b>1</b>' + (p.unidad ? '¿Cuántos ' + esc(p.unidad) + 's quieres?' : '¿Cuántos quieres?') + '</p>'
    + '<div class="pf-packs" role="radiogroup" aria-label="Cantidad">' + packsHTML + '</div>'
    + pagosHTML
    + '<div class="pf-resumen" aria-live="polite">'
    + '<div><span>Precio normal</span><span id="sumSub"></span></div>'
    + '<div class="pf-desc"><span>Descuento</span><span id="sumDesc"></span></div>'
    + '<div><span>Envío</span><span class="pf-gratis">Gratis</span></div>'
    + '<div class="pf-tot"><span id="sumRot">Total a pagar al recibir</span><span id="sumTot"></span></div></div>'
    + '<p class="pf-paso"><b>' + (pre ? 3 : 2) + '</b>¿A dónde te lo enviamos?</p>'
    + '<form id="fPedido" novalidate>'
    + campo('fNombre', 'Nombre y apellido', '<input id="fNombre" autocomplete="name" placeholder="Ej: Luis García López" required>', 'Escribe tu nombre y apellido.')
    + campo('fTel', 'Celular (WhatsApp)', '<div class="pf-tel"><span>+502</span><input id="fTel" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="11" placeholder="5123 4567" required></div>', 'Revisa tu celular: son 8 dígitos.')
    + campo('fDepto', 'Departamento', '<select id="fDepto" autocomplete="address-level1" required><option value="">Elige tu departamento</option>'
        + Object.keys(deptos).map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('') + '</select>', 'Elige tu departamento.')
    + campo('fDist', 'Municipio', '<select id="fDist" autocomplete="address-level2" required disabled><option value="">Primero elige tu departamento</option></select>', 'Elige tu municipio.')
    + campo('fDir', 'Dirección', '<input id="fDir" autocomplete="street-address" placeholder="Calle o avenida, número y zona" required>', 'Escribe la calle y el número (sin número no te lo podemos entregar).')
    + campo('fRef', 'Referencia', '<input id="fRef" autocomplete="address-line2" placeholder="Ej: frente al parque, portón verde, casa 12">', '', true)
    + campo('fCorreo', 'Correo', '<input id="fCorreo" type="email" autocomplete="email" placeholder="tucorreo@gmail.com">', 'Escribe un correo válido o déjalo vacío.', true)
    + '<div class="pf-aviso" id="fErr" role="alert"></div>'
    + '<button type="submit" class="cr-btn" id="btnPedir">Comprar · pago al recibir</button>'
    + '<p class="pf-nota" id="notaPedir">Pagas en efectivo cuando recibes el paquete. Te confirmamos el pedido por WhatsApp.</p>'
    /* 11-11: los logos de las transportadoras de Dropi Guatemala van aquí cuando se sepa cuáles están activas
       (en Perú eran Urbano y Fenix; esos NO sirven para Guatemala). */
    + '</form></div>';

  /* ---------- precios en pantalla ---------- */
  function refrescar() {
    var k = p.packs[elegido], ahora = precioAhora(elegido), lista2 = k.antes || k.precio;
    $('sumSub').textContent = soles(lista2);
    $('sumDesc').textContent = lista2 > ahora ? '-' + soles(lista2 - ahora) : soles(0);
    $('sumTot').textContent = soles(ahora);
    $('sumRot').textContent = formaPago === 'pre' ? 'Total a pagar con tarjeta' : 'Total a pagar al recibir';
    if ($('prCod')) $('prCod').textContent = soles(k.precio);
    if ($('prPre')) $('prPre').textContent = soles(pre.precios[elegido]);
    /* cada pack muestra el precio de la forma de pago elegida, con su precio por unidad y su descuento real */
    p.packs.forEach(function (kk, i) {
      var v = precioAhora(i), off = kk.antes > v ? Math.round((1 - v / kk.antes) * 100) : 0;
      var pr = caja.querySelector('[data-pr="' + i + '"]'), cu = caja.querySelector('[data-cu="' + i + '"]'), of = caja.querySelector('[data-off="' + i + '"]');
      if (pr) pr.textContent = soles(v);
      if (cu) cu.textContent = kk.cant > 1 ? soles(Math.round(v / kk.cant * 100) / 100) + ' c/u' : '';
      if (of) of.textContent = off ? '-' + off + ' %' : '';
    });
    $('btnPedir').textContent = formaPago === 'pre' ? 'Comprar y pagar con tarjeta' : 'Comprar · pago al recibir';
    $('notaPedir').textContent = formaPago === 'pre'
      ? 'En el siguiente paso pagas con tarjeta de forma segura (PayPal). Tu pedido sale con entrega prioritaria.'
      : 'Pagas en efectivo cuando recibes el paquete. Te confirmamos el pedido por WhatsApp.';
  }
  refrescar();

  var yaCarrito = false;
  caja.querySelectorAll('.pf-pack').forEach(function (b) {
    b.addEventListener('click', function () {
      elegido = +b.getAttribute('data-i');
      caja.querySelectorAll('.pf-pack').forEach(function (x) { var s = x === b; x.classList.toggle('sel', s); x.setAttribute('aria-checked', String(s)); });
      if (!yaCarrito) { yaCarrito = true; var k = p.packs[elegido]; track('AddToCart', { content_name: p.nombre, content_ids: [p.id], content_type: 'product', value: k.precio, currency: 'GTQ', num_items: k.cant }); }
      refrescar();
    });
  });
  caja.querySelectorAll('.pf-pago').forEach(function (b) {
    b.addEventListener('click', function () {
      formaPago = b.getAttribute('data-pago');
      caja.querySelectorAll('.pf-pago').forEach(function (x) { var s = x === b; x.classList.toggle('sel', s); x.setAttribute('aria-checked', String(s)); });
      refrescar();
    });
  });
  /* otros botones de la página pueden elegir pack/pago: <a data-pack="1" data-pago="pre"> */
  window.peElegir = function (i, pago) {
    var b = caja.querySelector('.pf-pack[data-i="' + i + '"]'); if (b) b.click();
    var q = pago && caja.querySelector('.pf-pago[data-pago="' + pago + '"]'); if (q) q.click();
  };

  /* InitiateCheckout: una vez, cuando el formulario aparece en pantalla */
  if ('IntersectionObserver' in window) {
    var oi = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { oi.disconnect(); avisarPanel('visita_form'); var k = p.packs[elegido]; track('InitiateCheckout', { content_name: p.nombre, content_ids: [p.id], value: precioAhora(elegido), currency: 'GTQ', num_items: k.cant }); }
    }, { threshold: 0.3 });
    oi.observe($('fPedido'));
  }

  /* departamento → municipios */
  var selD = $('fDepto'), selT = $('fDist');
  selD.addEventListener('change', function () {
    var l = deptos[selD.value] || [];
    selT.innerHTML = '<option value="">' + (l.length ? 'Elige tu municipio' : 'Primero elige tu departamento') + '</option>'
      + l.map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('');
    selT.disabled = !l.length;
    revisarCod();
  });
  /* Contra entrega SOLO donde Dropi Guatemala entrega con recaudo (window.codGT en departamentos-gt.js, si existe).
     Fuera de ella el pago al recibir se apaga y queda el pago con tarjeta (misma regla que Perú, #9173 Tacna). */
  var codOk = function () { return !window.codGT || window.codGT(g('fDepto'), g('fDist')); };
  function revisarCod() {
    var bCod = caja.querySelector('.pf-pago[data-pago="cod"]'), bPre = caja.querySelector('.pf-pago[data-pago="pre"]');
    var ok = codOk();
    if (bCod) { bCod.disabled = !ok; bCod.style.opacity = ok ? '' : '.45'; }
    if (!ok) {
      if (formaPago === 'cod' && bPre) bPre.click();
      aviso('Para tu municipio todavía no tenemos pago contraentrega. Tu pedido sale con pago con tarjeta (' + (pre ? pre.pct + ' % menos y ' : '') + 'entrega prioritaria).', true);
    } else if ($('fErr').textContent.indexOf('pago contraentrega') >= 0) $('fErr').style.display = 'none';
  }
  selT.addEventListener('change', revisarCod);

  /* celular: solo números mientras escribe */
  $('fTel').addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 11); });
  ['fNombre', 'fTel', 'fDepto', 'fDist', 'fDir', 'fCorreo'].forEach(function (k) {
    var el = $(k); var quitar = function () { $('c' + k).classList.remove('mal'); };
    el.addEventListener('input', quitar); el.addEventListener('change', quitar);
  });

  var g = function (k) { return ($(k) && $(k).value || '').trim(); };
  var celular = function () {
    var t = g('fTel').replace(/\D/g, '');
    if (t.length === 11 && t.indexOf('502') === 0) t = t.slice(3);
    return t;
  };

  /* ---------- carrito abandonado (10-11 James) ----------
     Apenas hay un celular guatemalteco completo (8 dígitos), los datos van a n8n abandonado-gt (fin_abandonados, +502).
     El mismo sid actualiza la misma fila. Si compra, ya no se manda (y el flujo de recuperación no le escribe a quien compró). */
  var SID_AB = 'GT' + Date.now() + Math.floor(Math.random() * 1e6), ultimoAb = '', compro = false;
  function abandonado() {
    if (compro || !/^[345]\d{7}$/.test(celular())) return;
    var k = p.packs[elegido];
    var d = { sid: SID_AB, telefono: celular(), indicativo: '+502', nombre: g('fNombre'), producto: p.nombre, cantidad: String(k.cant), total: String(precioAhora(elegido)),
      forma_pago: formaPago, direccion: g('fDir'), referencia: g('fRef'), distrito: g('fDist'), departamento: g('fDepto'), correo: g('fCorreo'),
      pagina: p.id + '-gt', cmp: window._CMP || '', fecha: new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' }), estado: 'INCOMPLETO' };
    var firma = JSON.stringify(d).replace(/"fecha":"[^"]*"/, '');
    if (firma === ultimoAb) return; ultimoAb = firma;
    var cuerpo = JSON.stringify(d);
    try {
      fetch(N8N + 'abandonado-gt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true })
        .catch(function () { try { if (navigator.sendBeacon) navigator.sendBeacon(N8N + 'abandonado-gt', new Blob([cuerpo], { type: 'text/plain' })); } catch (e) {} });
    } catch (e) {}
  }
  var tAb;
  $('fTel').addEventListener('input', function () { clearTimeout(tAb); tAb = setTimeout(abandonado, 1200); });
  ['fNombre', 'fTel', 'fDepto', 'fDist', 'fDir', 'fRef', 'fCorreo'].forEach(function (k) { $(k).addEventListener('change', abandonado); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') abandonado(); });
  function validar() {
    var mal = [];
    var nom = g('fNombre');
    if (nom.length < 5 || nom.split(/\s+/).filter(Boolean).length < 2) mal.push('fNombre');
    if (!/^[345]\d{7}$/.test(celular())) mal.push('fTel');
    if (!deptos[g('fDepto')]) mal.push('fDepto');
    if (!g('fDist') || (deptos[g('fDepto')] || []).indexOf(g('fDist')) < 0) mal.push('fDist');
    if (g('fDir').length < 6 || !/\d/.test(g('fDir'))) mal.push('fDir');
    if (g('fCorreo') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('fCorreo'))) mal.push('fCorreo');
    ['fNombre', 'fTel', 'fDepto', 'fDist', 'fDir', 'fCorreo'].forEach(function (k) { $('c' + k).classList.toggle('mal', mal.indexOf(k) >= 0); });
    return mal;
  }
  function aviso(txt, conWa) {
    var e = $('fErr'); e.innerHTML = '';
    var s = document.createElement('span'); s.textContent = txt; e.appendChild(s);
    if (conWa) {
      var a = document.createElement('a'); a.target = '_blank'; a.rel = 'noopener';
      a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, quiero pedir ' + p.nombre + ' y se me complica el formulario');
      a.textContent = '¿Se te complica? Te ayudamos por WhatsApp';
      e.appendChild(a);
    }
    e.style.display = 'block';
  }

  /* ---------- enviar ---------- */
  var enviando = false;
  $('fPedido').addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (enviando) return;
    var mal = validar();
    if (mal.length) {
      aviso('Revisa los datos marcados en rojo.', true);
      var primero = $(mal[0]); if (primero) { primero.focus(); primero.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }
    if (formaPago === 'cod' && !codOk()) { revisarCod(); return; }
    $('fErr').style.display = 'none';
    var k = p.packs[elegido], total = precioAhora(elegido);
    var btn = $('btnPedir'); btn.disabled = true; btn.textContent = 'Enviando…'; enviando = true;
    var pedido = {
      nombre: g('fNombre'), telefono: '502' + celular(),
      producto: p.nombre, producto_id: p.dropiId || '', total: total, precio: total, cantidad: k.cant,
      forma_pago: formaPago, envio: formaPago === 'pre' ? 'prioritario' : 'estandar',
      direccion: g('fDir'), referencia: g('fRef'), departamento: g('fDepto'), distrito: g('fDist'), correo: g('fCorreo'),
      pais: 'GT', origen: 'ficha', pagina: p.id + '-gt', cmp: window._CMP || '',
      event_id: window.jayePixel ? window.jayePixel.id() : '', fbp: window.jayePixel ? window.jayePixel.fbp() : '', fbc: window.jayePixel ? window.jayePixel.fbc() : '',
      ua: navigator.userAgent, url: location.href,
    };
    if (/[?&]prueba=1\b/.test(location.search)) pedido.prueba = '1';   /* el flujo no registra las pruebas */

    mandar(pedido, 1).then(function (r) {
      if (!r || !r.ok) { rechazado(r); return; }
      window._ventaId = String(r.venta_id || r.id || '');
      compro = true;
      try { localStorage.removeItem('jaye_gt_pendiente'); } catch (e) {}
      track('Purchase', { value: total, currency: 'GTQ', content_name: p.nombre, content_ids: [p.id], content_type: 'product', num_items: k.cant }, pedido.event_id);
      if (formaPago === 'pre') pantallaPago(g('fNombre').split(' ')[0], total, false);
      else gracias(g('fNombre').split(' ')[0], celular());
    }).catch(function () {
      try { localStorage.setItem('jaye_gt_pendiente', JSON.stringify(pedido)); } catch (e) {}
      noEntro();
    });
  });

  /* tres intentos ante fallas de red o del servidor; si el flujo responde "no" (candado), no se reintenta */
  function mandar(datos, intento) {
    return fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) {
        if (r.status >= 500) throw new Error('HTTP ' + r.status);
        return r.json().catch(function () { return { ok: r.ok }; });
      })
      .catch(function (e) {
        if (intento < 3) return new Promise(function (ok) { setTimeout(ok, 1500 * intento); }).then(function () { return mandar(datos, intento + 1); });
        throw e;
      });
  }
  function soltarBoton() { enviando = false; $('btnPedir').disabled = false; refrescar(); }
  function rechazado() {
    soltarBoton();
    aviso('No pudimos registrar tu pedido. Revisa tu celular, la dirección con número y el municipio, y vuelve a intentarlo.', true);
  }
  function noEntro() {
    soltarBoton();
    aviso('Se cayó la conexión y tu pedido no quedó registrado. Tus datos quedaron guardados: vuelve a intentarlo en un momento.', true);
  }

  function gracias(nom, tel) {
    caja.innerHTML = '<div class="pf pf-listo"><h3>¡Pedido recibido!</h3>'
      + '<p>Gracias, ' + esc(nom) + '. Te escribimos por WhatsApp al +502 ' + esc(tel) + ' para confirmar el despacho.</p>'
      + '<p>Llega en 2 a 5 días según tu ciudad y pagas en efectivo cuando lo recibes. Si esos días no vas a estar, avísanos y coordinamos.</p></div>';
    caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- pago con tarjeta (PayPal) ---------- */
  function pantallaPago(nom, monto, desdeEnlace, info) {
    var sandbox = /[?&]pp=sandbox\b/.test(location.search);
    var anticipo = !!(info && info.modo === 'anticipo');
    var cliente = sandbox ? 'ARl0OqVJgvzKnXBi88HHPnsANVy6psflN_yB0V-EeewfUrAWn1o7C0AVx4Ey0006osewp5ryNr9OSOEX'
                          : 'BAAc9NmbkqAJ4xLXd_DH4VoURfOABXorMuqMMJoN1M3ron-JlSCnQiaHq3kzTXWZIhuXRYVzPF59hmYx30';
    var waPago = 'https://wa.me/' + WA + '?text=' + encodeURIComponent('Hola, quiero pagar con tarjeta mi pedido #' + (window._ventaId || '') + ' de ' + p.nombre);
    caja.innerHTML = (anticipo
      ? '<div class="pf pf-listo"><h3>Paga tu anticipo y tu pedido sale hoy</h3>'
        + '<p>Hola' + (nom ? ' ' + esc(nom) : '') + '. Para despachar tu pedido #' + esc(info.id) + ' la transportadora pide un anticipo de USD 5, que se descuenta del total.</p>'
        + '<p class="pf-total">Anticipo: USD 5.00</p>'
        + '<p class="pf-usd">Al recibir pagas solo ' + soles(info.resto) + ' en efectivo. Puedes pagar con tarjeta de crédito o débito sin crear cuenta.</p>'
      : '<div class="pf pf-listo"><h3>Último paso: paga tu pedido</h3>'
        + '<p>Gracias' + (nom ? ', ' + esc(nom) : '') + '. Paga con tarjeta de forma segura y tu pedido sale con entrega prioritaria.</p>'
        + '<p class="pf-total">Total: ' + soles(monto) + '</p>'
        + '<p class="pf-usd">PayPal cobra en dólares al tipo de cambio del día: antes de confirmar ves el monto exacto en USD. Puedes pagar con tarjeta de crédito o débito sin crear cuenta.</p>')
      + '<div id="ppBotones"><p class="pf-nota">Cargando el pago seguro…</p></div>'
      + '<p id="ppEstado" role="status" aria-live="polite" class="pf-nota"></p>'
      + '<div id="ppRespaldo" hidden><a class="cr-btn" href="' + waPago + '" target="_blank" rel="noopener">Pedir el enlace de pago por WhatsApp</a></div></div>';
    caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
    var msg = function (t) { var e = $('ppEstado'); if (e) e.textContent = t; };
    var respaldo = function () { var r = $('ppRespaldo'); if (r) r.hidden = false; var b = $('ppBotones'); if (b && !b.querySelector('iframe')) b.style.display = 'none'; };
    var post = function (ruta, datos) {
      return fetch(N8N + ruta, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) }).then(function (r) { return r.json(); });
    };
    var pintar = function () {
      if (!window.paypal || !window.paypal.Buttons || !window._ventaId) return respaldo();
      $('ppBotones').innerHTML = '';
      window.paypal.Buttons({
        style: { layout: 'vertical', shape: 'rect', label: 'pay', height: 48 },
        createOrder: function () {
          msg('');
          return post('paypal-orden-gt', { venta_id: window._ventaId, modo: sandbox ? 'sandbox' : 'live' })
            .then(function (j) { if (!j || !j.ok || !j.id) throw new Error((j && j.motivo) || 'sin orden'); return j.id; });
        },
        onApprove: function (data) {
          msg('Comprobando el pago…');
          return post('paypal-captura-gt', { venta_id: window._ventaId, order_id: data.orderID, modo: sandbox ? 'sandbox' : 'live' }).then(function (j) {
            if (!j || !j.ok) throw new Error((j && j.motivo) || 'no completado');
            caja.innerHTML = '<div class="pf pf-listo"><h3>¡Pago recibido!</h3><p>Gracias' + (nom ? ', ' + esc(nom) : '')
              + (anticipo ? '. Recibimos tu anticipo y tu pedido sale de inmediato. Al recibir pagas ' + soles(info.resto) + '. Te escribimos por WhatsApp cuando vaya en camino.</p></div>'
                          : '. Tu pedido está pagado y sale con entrega prioritaria. Te escribimos por WhatsApp cuando vaya en camino.</p></div>');
            caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }).catch(function () { msg('No pudimos confirmar el pago. Si se te cobró, escríbenos por WhatsApp y lo revisamos al momento.'); respaldo(); });
        },
        onCancel: function () { msg('No se completó el pago. Puedes intentarlo de nuevo cuando quieras.'); },
        onError: function () { msg('El pago no se pudo iniciar. Inténtalo de nuevo o pide el enlace por WhatsApp.'); respaldo(); },
      }).render('#ppBotones').catch(respaldo);
    };
    if (window.paypal && window.paypal.Buttons) pintar();
    else {
      var s = document.createElement('script');
      s.src = 'https://www.paypal.com/sdk/js?client-id=' + cliente + '&currency=USD&intent=capture&components=buttons&locale=es_ES';   /* es_XC lo rechaza el SDK (400); es_ES sí */
      s.onload = pintar; s.onerror = respaldo;
      document.head.appendChild(s);
      setTimeout(function () { if (!window.paypal) respaldo(); }, 12000);
    }
    void desdeEnlace;
  }

  /* enlace personal de pago: ?pagar=<id>-<código> (lo manda el equipo por WhatsApp) */
  (function enlacePago() {
    var q = ''; try { q = new URLSearchParams(location.search).get('pagar') || ''; } catch (e) {}
    if (!q) return;
    var cod = q.toLowerCase().split('').filter(function (ch) { return (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || ch === '-'; }).join('');
    var fin = function (tit, txt) { caja.innerHTML = '<div class="pf pf-listo"><h3>' + tit + '</h3><p>' + txt + '</p></div>'; caja.scrollIntoView({ block: 'center' }); };
    fetch(N8N + 'pago-info-gt?p=' + encodeURIComponent(cod)).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.ok && j.pagado) return fin('¡Pago recibido!', 'Este pedido ya está pagado. Te escribimos por WhatsApp cuando vaya en camino.');
      if (!j || !j.ok || !j.id) return fin('Este enlace de pago no está disponible', 'Escríbenos por WhatsApp y te ayudamos con tu pedido.');
      window._ventaId = String(j.id);
      pantallaPago(j.nombre1 || '', Number(j.monto || j.total), true, j);
    }).catch(function () { fin('Este enlace de pago no está disponible', 'Revisa tu conexión o escríbenos por WhatsApp.'); });
  })();

  /* pedido que quedó sin entrar: se reintenta solo al volver a abrir la página */
  (function reintentar() {
    var crudo; try { crudo = localStorage.getItem('jaye_gt_pendiente'); } catch (e) { return; }
    if (!crudo) return;
    var datos; try { datos = JSON.parse(crudo); } catch (e) { try { localStorage.removeItem('jaye_gt_pendiente'); } catch (x) {} return; }
    fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) { if (r.status < 500) { try { localStorage.removeItem('jaye_gt_pendiente'); } catch (e) {} } })
      .catch(function () {});
  })();
})();

/* boletín del pie (el mismo de la portada) */
(function () {
  var f = document.getElementById('fBoletin');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var c = document.getElementById('correoBoletin'), ok = document.getElementById('aceptoBoletin');
    if (!c.value || c.value.indexOf('@') < 0) { c.focus(); return; }
    if (ok && !ok.checked) { ok.focus(); return; }
    f.outerHTML = '<p class=gracias>Listo. Te avisamos cuando haya novedades.</p>';
  });
})();
