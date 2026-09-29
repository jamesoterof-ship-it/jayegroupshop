/* ============================================================
   GAFAS DE AUMENTO TR90 · Jaye Group Colombia (jayegroupshop.com)
   Página de UN producto. Dos formas de pago, las dos promocionadas:
     - Pago anticipado (Wompi: tarjeta, PSE, Nequi) → más barato + despacho prioritario
     - Pago contra entrega
   Escalera APROBADA por James el 29-09-2026:
     anticipado: 1 par $50.000 · 2 pares $77.000
     contra entrega: 1 par $59.900 · 2 pares $89.900
   El pedido va a n8n (pedido-tienda-co). Si es pago anticipado, n8n crea el
   link de pago de Wompi y la página manda al cliente a pagar.
   ============================================================ */
(function () {
  var URL_PEDIDO = 'https://n8n-production-8a42.up.railway.app/webhook/pedido-tienda-co';
  var URL_ESTADO = 'https://n8n-production-8a42.up.railway.app/webhook/pago-estado-co';
  var PAGINA = 'co-gafas';
  var PRODUCTO = 'Gafas de Aumento TR90';

  var PRECIOS = {
    pre: [
      { qty: 1, price: 50000, was: 59900, label: '1 par', sub: 'Con estuche rígido y paño' },
      { qty: 2, price: 77000, was: 89900, label: '2 pares', sub: 'Uno para la casa y otro para llevar', tag: 'Más vendido' }
    ],
    cod: [
      { qty: 1, price: 59900, was: 0, label: '1 par', sub: 'Con estuche rígido y paño' },
      { qty: 2, price: 89900, was: 119800, label: '2 pares', sub: 'Uno para la casa y otro para llevar', tag: 'Más vendido' }
    ]
  };
  /* Graduaciones que tiene el proveedor (Dropi 2229646). La +2.50 tenía poco stock el 29-09. */
  var GRADS = ['+1.00', '+1.50', '+2.00', '+2.50', '+3.00', '+3.50', '+4.00'];

  var DEPTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
    'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño',
    'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'];

  var modo = 'pre';
  var qty = 2;
  var grads = ['', ''];

  var $ = function (id) { return document.getElementById(id); };
  var cop = function (n) { return '$' + Math.round(n).toLocaleString('es-CO'); };
  var pack = function () { return PRECIOS[modo].filter(function (p) { return p.qty === qty; })[0]; };
  var ico = function (id) { return '<svg aria-hidden="true" style="width:16px;height:16px;display:inline-block;vertical-align:-3px;margin-right:4px"><use href="#' + id + '"/></svg>'; };
  var esc = function (s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- píxel (si no cargó, no rompe nada) ---------- */
  function px(ev, data, id) {
    try { if (window.fbq) window.fbq('track', ev, data || {}, id ? { eventID: id } : undefined); } catch (e) {}
  }
  var yaIC = false;
  function initiateCheckout() {
    if (yaIC) return; yaIC = true;
    px('InitiateCheckout', { content_name: PRODUCTO, currency: 'COP', value: pack().price });
  }

  /* ---------- dibujo ---------- */
  function pintarModos() {
    Array.prototype.forEach.call(document.querySelectorAll('.modo'), function (b) {
      var on = b.dataset.modo === modo;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }
  function pintarPacks() {
    $('packs').innerHTML = PRECIOS[modo].map(function (p) {
      var ahorro = p.was ? p.was - p.price : 0;
      return '<div class="pack' + (p.qty === qty ? ' on' : '') + '" data-qty="' + p.qty + '" role="radio" tabindex="0" aria-checked="' + (p.qty === qty) + '">' +
        (p.tag ? '<span class="ptag">' + p.tag + '</span>' : '') +
        '<span class="rad"></span>' +
        '<div class="pn"><b>' + p.label + '</b><small>' + p.sub + '</small></div>' +
        '<div class="pp"><b>' + cop(p.price) + '</b>' +
        (ahorro ? '<s>' + cop(p.was) + '</s><span class="ahorro">Ahorras ' + cop(ahorro) + '</span>' : '') +
        '</div></div>';
    }).join('');
    $('irPedido').textContent = 'Continuar · ' + pack().label + ' ' + cop(pack().price);
  }
  function pintarGrads() {
    var html = '';
    for (var i = 0; i < qty; i++) {
      html += '<div class="gsel"><label>' + (qty > 1 ? 'Graduación del par ' + (i + 1) : 'Tu graduación') + '</label><div class="gops" data-i="' + i + '">' +
        GRADS.map(function (g) {
          return '<button type="button" class="gop' + (grads[i] === g ? ' on' : '') + '" data-g="' + g + '" aria-pressed="' + (grads[i] === g) + '">' + g + '</button>';
        }).join('') + '</div></div>';
    }
    $('gradSel').innerHTML = html;
  }
  function pintarResumen() {
    var p = pack();
    var ahorroModo = PRECIOS.cod.filter(function (x) { return x.qty === qty; })[0].price - p.price;
    $('resumen').innerHTML =
      '<div class="fila2"><span>' + PRODUCTO + ' · ' + p.label + '</span><b>' + cop(p.price) + '</b></div>' +
      '<div class="fila2"><span>Graduación</span><span>' + (grads.slice(0, qty).filter(Boolean).join(' y ') || 'Elígela abajo') + '</span></div>' +
      '<div class="fila2"><span>Envío</span><span>' + (modo === 'pre' ? '<span class="pri">' + ico('i-bolt') + 'Prioritario, incluido</span>' : 'Incluido') + '</span></div>' +
      '<div class="fila2"><span>Forma de pago</span><span>' + (modo === 'pre' ? ico('i-card') + 'Pago anticipado' : ico('i-cash') + 'Pago contra entrega') + '</span></div>' +
      '<div class="fila2 tot"><span>Total</span><span>' + cop(p.price) + '</span></div>' +
      (modo === 'pre' && ahorroModo > 0 ? '<div class="fila2 pri"><span>Ahorras con el pago anticipado</span><span>' + cop(ahorroModo) + '</span></div>' : '');
    var btn = $('enviar');
    btn.textContent = modo === 'pre' ? 'Pagar ' + cop(p.price) + ' de forma segura' : 'Confirmar pedido · pago contra entrega';
    $('notaPago').textContent = modo === 'pre'
      ? 'Te llevamos a Wompi (Bancolombia) para pagar con tarjeta, PSE o Nequi. Tu pedido sale con prioridad.'
      : 'Pagas en efectivo cuando te llegue el pedido.';
  }
  function pintar() { pintarModos(); pintarPacks(); pintarGrads(); pintarResumen(); }

  /* ---------- eventos ---------- */
  document.addEventListener('click', function (e) {
    var m = e.target.closest('.modo');
    if (m) { modo = m.dataset.modo; pintar(); initiateCheckout(); return; }
    var pk = e.target.closest('.pack');
    if (pk) { qty = Number(pk.dataset.qty); pintar(); initiateCheckout(); return; }
    var g = e.target.closest('.gop');
    if (g) { grads[Number(g.parentNode.dataset.i)] = g.dataset.g; pintarGrads(); pintarResumen(); initiateCheckout(); }
  });
  document.addEventListener('keydown', function (e) {
    var pk = e.target.closest && e.target.closest('.pack');
    if (pk && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pk.click(); }
  });
  $('cambiar').addEventListener('click', function () { $('comprar').scrollIntoView({ behavior: 'smooth', block: 'start' }); });

  var depto = $('depto');
  DEPTOS.forEach(function (d) { var o = document.createElement('option'); o.value = d; o.textContent = d; depto.appendChild(o); });
  $('form').addEventListener('focusin', initiateCheckout);

  /* ---------- opiniones (resenas.js: todas reales) ---------- */
  var R = window.RESENAS || [];
  var MOSTRAR = 6, visibles = 0;
  var estrellas = function (n) {
    var s = ''; for (var i = 1; i <= 5; i++) s += '<svg' + (i > n ? ' class="off"' : '') + '><use href="#i-star"/></svg>';
    return '<span class="stars" aria-label="' + n + ' de 5 estrellas">' + s + '</span>';
  };
  function tarjeta(r) {
    return '<article class="rc">' +
      '<div class="rc-top">' + estrellas(r.estrellas) + '<span class="rc-fecha">' + esc(r.fecha) + '</span></div>' +
      '<p>' + esc(r.texto) + '</p>' +
      (r.foto ? '<img src="' + r.foto + '" width="120" height="120" loading="lazy" alt="Foto de ' + esc(r.nombre) + ' con su pedido">' : '') +
      '<div class="rc-quien"><svg><use href="#i-verif"/></svg>' + esc(r.nombre) + ' · Compra verificada</div>' +
      '</article>';
  }
  function masOpiniones() {
    var hasta = Math.min(R.length, visibles + MOSTRAR);
    var html = '';
    for (var i = visibles; i < hasta; i++) html += tarjeta(R[i]);
    $('revList').insertAdjacentHTML('beforeend', html);
    visibles = hasta;
    $('revMas').style.display = visibles >= R.length ? 'none' : '';
  }
  if (R.length) {
    $('revMedia').textContent = window.RESENAS_MEDIA || '4,8';
    $('revTotal').textContent = window.RESENAS_TOTAL || R.length;
    var cuenta = [0, 0, 0, 0, 0, 0];
    R.forEach(function (r) { cuenta[r.estrellas] = (cuenta[r.estrellas] || 0) + 1; });
    var bars = '';
    for (var s = 5; s >= 1; s--) {
      var pct = Math.round(cuenta[s] * 100 / R.length);
      bars += '<div class="bar"><span>' + s + ' ★</span><i style="--w:' + pct + '%"></i><span>' + pct + '%</span></div>';
    }
    $('revBars').innerHTML = bars;
    $('revFotos').innerHTML = R.filter(function (r) { return r.foto; }).slice(0, 10).map(function (r) {
      return '<button type="button" data-foto="' + r.foto + '" aria-label="Ver foto de ' + esc(r.nombre) + '"><img src="' + r.foto + '" width="240" height="240" loading="lazy" alt=""></button>';
    }).join('');
    masOpiniones();
    $('revMas').addEventListener('click', masOpiniones);
  } else {
    $('revMas').style.display = 'none';
  }
  /* visor de fotos */
  var visor = document.createElement('div');
  visor.className = 'visor'; visor.setAttribute('role', 'dialog'); visor.setAttribute('aria-label', 'Foto de la opinión');
  visor.innerHTML = '<img alt="Foto de un comprador"><button type="button" aria-label="Cerrar">×</button>';
  document.body.appendChild(visor);
  $('revFotos').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    visor.querySelector('img').src = b.dataset.foto; visor.classList.add('on'); visor.querySelector('button').focus();
  });
  visor.addEventListener('click', function (e) { if (e.target === visor || e.target.tagName === 'BUTTON') visor.classList.remove('on'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') visor.classList.remove('on'); });

  /* ---------- botón fijo: se esconde cuando ya está en compra o formulario ---------- */
  if ('IntersectionObserver' in window) {
    var enZona = {};
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { enZona[en.target.id || 'hero'] = en.isIntersecting; });
      var ocultar = enZona.comprar || enZona.pedido || enZona.hero;
      $('flot').classList.toggle('oculto', !!ocultar);
    });
    io.observe(document.querySelector('.hero')); io.observe($('comprar')); io.observe($('pedido'));
  }

  $('year').textContent = new Date().getFullYear();

  /* ---------- datos de la campaña (para atar la venta a su anuncio) ---------- */
  var qs = new URLSearchParams(location.search);
  function cookie(n) { var m = document.cookie.match('(^|;)\\s*' + n + '=([^;]+)'); return m ? decodeURIComponent(m[2]) : ''; }
  function fbc() { var c = cookie('_fbc'); if (c) return c; var id = qs.get('fbclid'); return id ? 'fb.1.' + Date.now() + '.' + id : ''; }

  /* ---------- validación ---------- */
  function limpiarTel(t) {
    var d = String(t || '').replace(/\D/g, '');
    if (d.length === 12 && d.indexOf('57') === 0) d = d.slice(2);
    return d;
  }
  function validar(f) {
    var errs = [];
    Array.prototype.forEach.call(f.querySelectorAll('.campo-err'), function (x) { x.classList.remove('campo-err'); });
    function mal(n, msg) { var el = f.elements[n]; if (el) el.classList.add('campo-err'); errs.push(msg); }
    for (var i = 0; i < qty; i++) if (!grads[i]) errs.push('Elige la graduación' + (qty > 1 ? ' de los 2 pares' : ''));
    if (f.nombre.value.trim().split(/\s+/).length < 2) mal('nombre', 'Escribe tu nombre y apellido');
    var tel = limpiarTel(f.telefono.value);
    if (!/^3\d{9}$/.test(tel)) mal('telefono', 'El celular debe tener 10 números y empezar por 3');
    if (!f.departamento.value) mal('departamento', 'Elige tu departamento');
    if (f.ciudad.value.trim().length < 3) mal('ciudad', 'Escribe tu ciudad o municipio');
    /* Candado: sin calle y número no se registra (regla de James) */
    if (!/\d/.test(f.direccion.value) || f.direccion.value.trim().length < 6) mal('direccion', 'Escribe la dirección completa, con número');
    return errs.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }

  /* ---------- envío ---------- */
  $('form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = ev.target;
    var errs = validar(f);
    $('err').textContent = errs.join(' · ');
    if (errs.length) { var p1 = f.querySelector('.campo-err') || $('gradSel'); p1.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

    var p = pack();
    var eventId = 'co-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    var datos = {
      pagina: PAGINA, producto: PRODUCTO, pais: 'CO',
      cantidad: p.qty, total: p.price, pago: modo,
      graduaciones: grads.slice(0, p.qty).join(' / '),
      nombre: f.nombre.value.trim(), telefono: '57' + limpiarTel(f.telefono.value),
      departamento: f.departamento.value, ciudad: f.ciudad.value.trim(),
      direccion: f.direccion.value.trim(), referencia: f.referencia.value.trim(), correo: f.correo.value.trim().toLowerCase(),
      cmp: qs.get('cmp') || qs.get('utm_campaign') || '', fbp: cookie('_fbp'), fbc: fbc(),
      event_id: eventId, url: location.href.split('#')[0], ua: navigator.userAgent
    };

    var btn = $('enviar'); btn.disabled = true; btn.textContent = modo === 'pre' ? 'Preparando tu pago…' : 'Enviando tu pedido…';
    fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) { return r.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j || res.j.ok === false) throw new Error((res.j && res.j.error) || 'revisa tus datos');
        try { localStorage.setItem('co_ultimo_pedido', JSON.stringify({ id: res.j.id, ref: res.j.referencia, total: p.price, qty: p.qty, ev: eventId })); } catch (e) {}
        if (modo === 'pre') {
          if (!res.j.pago_url) throw new Error('no se generó el link de pago');
          px('AddPaymentInfo', { content_name: PRODUCTO, currency: 'COP', value: p.price });
          location.href = res.j.pago_url;
          return;
        }
        px('Purchase', { content_name: PRODUCTO, currency: 'COP', value: p.price, num_items: p.qty }, eventId);
        gracias('cod', p);
      })
      .catch(function (e) {
        btn.disabled = false; pintarResumen();
        $('err').textContent = 'No pudimos registrar tu pedido (' + e.message + '). Inténtalo otra vez en un momento.';
      });
  });

  function gracias(tipo, p) {
    var caja = document.querySelector('.form-card');
    caja.innerHTML = '<div class="gracias"><svg><use href="#i-shield"/></svg><h2>' +
      (tipo === 'cod' ? '¡Pedido recibido!' : '¡Pago aprobado!') + '</h2><p>' +
      (tipo === 'cod'
        ? 'Tu pedido de <b>' + p.label + '</b> por <b>' + cop(p.price) + '</b> quedó registrado. Te escribiremos por WhatsApp para confirmarlo y lo pagas contra entrega.'
        : 'Recibimos tu pago. Tu pedido sale con <b>despacho prioritario</b> y te escribiremos por WhatsApp con la guía de envío.') +
      '</p></div>';
    $('pedido').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- regreso desde Wompi (?pago=ref&id=transaccion) ---------- */
  var refVuelta = qs.get('pago');
  if (refVuelta) {
    var ult = {}; try { ult = JSON.parse(localStorage.getItem('co_ultimo_pedido') || '{}'); } catch (e) {}
    var intentos = 0;
    $('pedido').scrollIntoView();
    $('err').textContent = 'Estamos confirmando tu pago con Wompi…';
    (function mirar() {
      fetch(URL_ESTADO + '?ref=' + encodeURIComponent(refVuelta) + '&id=' + encodeURIComponent(qs.get('id') || ''))
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.estado === 'APPROVED') {
            if (!sessionStorage.getItem('co_px_' + refVuelta)) {
              px('Purchase', { content_name: PRODUCTO, currency: 'COP', value: ult.total || 0, num_items: ult.qty || 1 }, ult.ev);
              try { sessionStorage.setItem('co_px_' + refVuelta, '1'); } catch (e) {}
            }
            gracias('pre', {});
          } else if ((j.estado === 'PENDING' || !j.estado) && intentos++ < 20) {
            setTimeout(mirar, 3000);
          } else if (j.estado === 'DECLINED' || j.estado === 'ERROR' || j.estado === 'VOIDED') {
            $('err').textContent = 'El pago no se aprobó. Puedes intentarlo de nuevo o elegir "Pago contra entrega".';
            $('comprar').scrollIntoView();
          } else {
            $('err').textContent = 'Aún no vemos tu pago confirmado. Si ya pagaste, te escribiremos por WhatsApp.';
          }
        }).catch(function () { if (intentos++ < 20) setTimeout(mirar, 3000); });
    })();
  }

  pintar();
})();
