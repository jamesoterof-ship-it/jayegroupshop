/* ============================================================
   SHILAJIT PRO MAX · ECUADOR · 28-10-2026
   Página propia (plano de la skill ui-ux-pro-max). Este archivo solo conecta:
   precios aprobados, upsell, formulario de Ecuador, píxel y envío del pedido.
   - Escalera APROBADA por James el 28-10: 1 × $20,50 · 2 × $25,99 · 3 × $32.
   - Upsell APROBADO: Farmaprox (Dropi 167729) a $10, mismo paquete.
   - Candado: si un precio no está en PRECIOS_APROBADOS, no se manda el pedido.
   - Pedido: POST a n8n /webhook/pedido-tienda-ec (flujo propio de Ecuador).
   - Píxel 3801303723356168: cada evento sale del navegador Y del servidor
     (/webhook/capi-ec-evento) con el MISMO event_id; la compra la manda
     el flujo "CAPI Ventas Ecuador" con el event_id que va en el pedido.
   ============================================================ */
(function () {
  'use strict';

  var PAGINA = 'shilajit-ec';
  var PRODUCTO = 'Shilajit Pro Max';
  var DROPI_ID = 159886;
  var PRECIOS = { 1: 20.50, 2: 25.99, 3: 32 };
  var UPSELL = { nombre: 'Farmaprox', dropiId: 167729, precio: 10 };
  var PRECIOS_APROBADOS = [20.50, 25.99, 32, 30.50, 35.99, 42];   /* packs solos y packs + Farmaprox */
  var URL_PEDIDO = 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda-ec';
  var URL_EVENTO = 'https://n8n-production-8a42.up.railway.app/webhook/capi-ec-evento';
  var URL_VISITA = 'https://n8n-production-8a42.up.railway.app/webhook/track-visita';
  var PROVINCIAS = ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas',
    'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
    'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora Chinchipe'];

  var $ = function (id) { return document.getElementById(id); };
  var g = function (id) { return ($(id).value || '').trim(); };
  var dolares = function (n) { return '$' + n.toFixed(2).replace('.', ','); };
  var enTienda = /(^|\.)jayegroupshop\.com$/.test(location.hostname);

  /* ---------- píxel: navegador + servidor con el mismo event_id ---------- */
  function galleta(n) {
    try { var m = document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)'); return m ? m.pop() : ''; } catch (e) { return ''; }
  }
  function nuevoId() { return 'jg.' + Date.now().toString(36) + '.' + Math.random().toString(36).slice(2, 10); }
  function fbc() {
    var c = galleta('_fbc'); if (c) return c;
    try { var q = new URLSearchParams(location.search).get('fbclid'); if (q) return 'fb.1.' + Date.now() + '.' + q; } catch (e) {}
    return '';
  }
  function evento(ev, datos, idFijo) {
    var e = idFijo || nuevoId();
    try { if (window.fbq) window.fbq('track', ev, datos || {}, { eventID: e }); } catch (x) {}
    if (ev !== 'Purchase' && enTienda) {
      var ir = function () {
        try {
          var d = JSON.stringify({ event_name: ev, event_id: e, url: location.href, fbp: galleta('_fbp'), fbc: fbc(), ua: navigator.userAgent, datos: datos || {} });
          if (!(navigator.sendBeacon && navigator.sendBeacon(URL_EVENTO, d))) fetch(URL_EVENTO, { method: 'POST', body: d, keepalive: true, mode: 'no-cors' });
        } catch (x) {}
      };
      if (galleta('_fbp')) ir(); else setTimeout(ir, 1500);
    }
    return e;
  }
  evento('PageView', {});
  evento('ViewContent', { content_name: PRODUCTO, content_type: 'product', content_ids: [String(DROPI_ID)], value: PRECIOS[2], currency: 'USD' });

  /* visita al panel (una por sesión), como las demás tiendas */
  try {
    if (enTienda && !sessionStorage.getItem('v-' + PAGINA)) {
      sessionStorage.setItem('v-' + PAGINA, '1');
      fetch(URL_VISITA, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pagina: PAGINA, producto: PRODUCTO, tipo: 'pagina' }) }).catch(function () {});
    }
  } catch (e) {}

  /* el anuncio manda ?cmp=…: se guarda para atar la venta a su campaña */
  var CMP = '';
  try { CMP = new URLSearchParams(location.search).get('cmp') || new URLSearchParams(location.search).get('utm_campaign') || ''; } catch (e) {}

  /* ---------- packs, upsell y total ---------- */
  var cant = 2, conUpsell = false, _atc = false, _ic = false;
  function precioAhora() { return PRECIOS[cant] + (conUpsell ? UPSELL.precio : 0); }
  function pintarTotal() {
    var t = precioAhora();
    $('total').textContent = dolares(t);
    $('btnTotal').textContent = dolares(t);
  }
  Array.prototype.forEach.call(document.querySelectorAll('#packs .pack'), function (l) {
    l.addEventListener('change', function () {
      Array.prototype.forEach.call(document.querySelectorAll('#packs .pack'), function (x) { x.classList.remove('activo'); });
      l.classList.add('activo');
      cant = Number(l.dataset.cant) || 1;
      pintarTotal();
      if (!_atc) { _atc = true; evento('AddToCart', { content_name: PRODUCTO, content_ids: [String(DROPI_ID)], content_type: 'product', value: precioAhora(), currency: 'USD', num_items: cant }); }
    });
  });
  $('upsellChk').addEventListener('change', function () {
    conUpsell = this.checked;
    $('upsell').classList.toggle('activo', conUpsell);
    pintarTotal();
  });
  pintarTotal();

  /* ---------- formulario ---------- */
  var sel = $('fProv');
  PROVINCIAS.forEach(function (p) { var o = document.createElement('option'); o.textContent = p; o.value = p; sel.appendChild(o); });

  function limpiarTel(t) {
    var d = String(t || '').replace(/\D/g, '');
    if (d.indexOf('593') === 0 && d.length === 12) d = '0' + d.slice(3);
    return d;
  }
  function telOk(t) { return /^09\d{8}$/.test(t); }
  function marcar(id, mal) { var c = $(id).closest('.campo'); if (c) c.classList.toggle('mal', !!mal); return !!mal; }

  var f = $('fPedido');
  Array.prototype.forEach.call(f.querySelectorAll('input, select'), function (el) {
    el.addEventListener('focus', function () {
      if (!_ic) { _ic = true; evento('InitiateCheckout', { content_name: PRODUCTO, content_ids: [String(DROPI_ID)], value: precioAhora(), currency: 'USD' }); }
    });
    el.addEventListener('input', function () { var c = el.closest('.campo'); if (c) c.classList.remove('mal'); });
  });

  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    $('fErr').textContent = '';
    var errs = [];
    if (marcar('fNombre', g('fNombre').length < 3)) errs.push('nombre');
    if (marcar('fTel', !telOk(limpiarTel(g('fTel'))))) errs.push('celular');
    if (marcar('fProv', !g('fProv'))) errs.push('provincia');
    if (marcar('fCiudad', g('fCiudad').length < 3)) errs.push('ciudad');
    if (marcar('fDir', !/\d/.test(g('fDir')) || g('fDir').length < 6)) errs.push('dirección');
    if (errs.length) { $('fErr').textContent = 'Revisa: ' + errs.join(', ') + '.'; var m = f.querySelector('.campo.mal input, .campo.mal select'); if (m) m.focus(); return; }

    var total = Number(precioAhora().toFixed(2));
    if (PRECIOS_APROBADOS.indexOf(total) < 0) { $('fErr').textContent = 'Este precio no está habilitado. Escríbenos por WhatsApp.'; return; }

    var eventId = nuevoId();
    var tel = limpiarTel(g('fTel'));
    var datos = {
      pagina: PAGINA, producto: PRODUCTO, producto_id: DROPI_ID, pais: 'EC', moneda: 'USD',
      cantidad: cant, precio_pack: PRECIOS[cant], total: total,
      upsell: conUpsell ? { nombre: UPSELL.nombre, producto_id: UPSELL.dropiId, precio: UPSELL.precio, cantidad: 1 } : null,
      pago: 'cod',
      nombre: g('fNombre'), telefono: '593' + tel.slice(1),
      provincia: g('fProv'), ciudad: g('fCiudad'), direccion: g('fDir'), referencia: g('fRef'),
      cmp: CMP, fbp: galleta('_fbp'), fbc: fbc(), event_id: eventId, url: location.href.split('#')[0], ua: navigator.userAgent
    };
    var btn = $('btnPedir'); btn.disabled = true; btn.textContent = 'Enviando tu pedido…';
    fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok) { throw new Error((res.j && res.j.error) || 'No pudimos registrar el pedido. Intenta de nuevo.'); }
        evento('Purchase', { content_name: PRODUCTO, content_ids: [String(DROPI_ID)], content_type: 'product', value: total, currency: 'USD', num_items: cant }, eventId);
        f.innerHTML = '<div class="listo"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>'
          + '<h3>¡Pedido recibido!</h3><p>Te escribimos por WhatsApp al +593 ' + tel.slice(1) + ' para confirmar la entrega. Pagas ' + dolares(total) + ' cuando te llegue.</p></div>';
        f.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function (e) {
        btn.disabled = false; btn.innerHTML = 'Confirmar pedido · <span id="btnTotal">' + dolares(total) + '</span>';
        $('fErr').textContent = e.message || 'No pudimos registrar el pedido. Intenta de nuevo.';
      });
  });

  /* ---------- barra inferior: aparece al pasar el héroe, se esconde en el formulario ---------- */
  var barra = $('barra'), heroe = document.querySelector('.heroe'), compra = $('comprar');
  function mirarBarra() {
    var y = window.scrollY || 0;
    var pasoHeroe = heroe && y > heroe.offsetTop + heroe.offsetHeight - 80;
    var enCompra = compra && y + window.innerHeight > compra.offsetTop + 120;
    barra.classList.toggle('ver', !!(pasoHeroe && !enCompra));
  }
  window.addEventListener('scroll', mirarBarra, { passive: true });
  window.addEventListener('resize', mirarBarra);
  mirarBarra();

  /* ---------- entrada suave (nada puede quedar invisible) ---------- */
  var nodos = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vino'); ojo.unobserve(e.target); } });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(nodos, function (n) { ojo.observe(n); });
    setTimeout(function () { Array.prototype.forEach.call(nodos, function (n) { n.classList.add('vino'); }); }, 3000);
  } else {
    Array.prototype.forEach.call(nodos, function (n) { n.classList.add('vino'); });
  }
})();
