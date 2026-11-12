/* ============================================================
   MOTOR DEL FORMULARIO · TIENDA COLOMBIA (jayegroupshop.com/co/<producto>/) · 10-11-2026
   Copia del de Perú (/pe/ficha.js), igual a los demás formularios (James 10-11: "el formulario mira cómo están los otros
   para que lo hagas igual"). Lo propio de Colombia:
     · packs (cantidad) + forma de pago (al recibir / pago anticipado −10 %) + resumen
     · si el producto tiene medidas o colores, se eligen antes del pago (viajan en "tonos": MEDIDA X · COLOR)
     · celular colombiano: 10 dígitos que empiezan en 3 (viaja como 57 + 10 dígitos)
     · departamento (lista) + ciudad o municipio · dirección con número (mismo candado de la operación)
     · pedido a n8n pedido-tienda-co con event_id/fbp/fbc (Meta), cmp (anuncio) y la página
     · Purchase en el píxel solo si el pedido ENTRÓ (respuesta ok)
     · pago anticipado: WOMPI (Bancolombia), NO PayPal. El flujo crea el link de Wompi y aquí se manda al cliente;
       al volver (?pago=<id>&id=<transacción>) se confirma con pago-estado-co.
     · cliente riesgoso: anticipo de $20.000 por Wompi que se descuenta del total (?anticipo= al volver)
   Candado: si algún precio del producto no está en window.PRECIOS_APROBADOS, el formulario NO se pinta.
   ============================================================ */
(function () {
  'use strict';
  var N8N = 'https://n8n-production-8a42.up.railway.app/webhook/';
  var URL_PEDIDO = window.URL_PEDIDO || N8N + 'pedido-tienda-co';
  var WA = window.WA_NUM || '573226087847';
  var EN_TIENDA = location.hostname === 'jayegroupshop.com' || location.hostname === 'www.jayegroupshop.com';
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var pesos = function (n) { return '$' + Math.round(Number(n)).toLocaleString('es-CO'); };

  /* el anuncio del que vino (cmp o utm_campaign); se recuerda si vuelve sin él */
  try {
    var _q = new URLSearchParams(location.search), _c = _q.get('cmp') || _q.get('utm_campaign') || '';
    if (_c) { try { localStorage.setItem('_cmp_co', _c); } catch (e) {} window._CMP = _c; }
    else { try { window._CMP = localStorage.getItem('_cmp_co') || ''; } catch (e) { window._CMP = ''; } }
  } catch (e) { window._CMP = ''; }

  var TODOS = window.PRODUCTOS || [];
  var id = window.__P || '';
  var p = TODOS.filter(function (x) { return x.id === id; })[0] || TODOS[0];
  var caja = $('pedir');
  if (!p || !caja) return;

  /* candado de precios */
  var lista = window.PRECIOS_APROBADOS || [];
  var precios = (p.packs || []).map(function (k) { return k.precio; }).concat((p.anticipado || {}).precios || [])
    .concat((p.adicionales || []).map(function (a) { return a.precio; }));
  if (!precios.length || !precios.every(function (x) { return lista.indexOf(x) >= 0; })) {
    caja.innerHTML = '<div class="pf"><p class="pf-nota">Este producto todavía no está disponible.</p></div>';
    if (window.console) console.warn('Precio fuera de la lista aprobada: el formulario no se pinta.');
    return;
  }

  var pre = p.anticipado || null;
  var elegido = typeof p.popular === 'number' ? p.popular : 0;
  var formaPago = 'cod';
  var medida = '', color = '';
  var track = function (ev, datos, eid) {
    try { if (window.jayePixel) return window.jayePixel.track(ev, datos, eid); if (window.fbq) window.fbq('track', ev, datos); } catch (e) {}
    return eid || '';
  };
  /* 11-11 (funda de puerta / fundas de silla): diseño por unidad y un ADICIONAL opcional que se suma al total.
     Productos sin p.disenos ni p.adicionales (protector, gafas, chao) funcionan igual que antes. */
  var disenos = p.disenos || [], adics = p.adicionales || [], adic = -1, elDis = [], elAd = '';
  var extra = function () { return adic >= 0 ? adics[adic].precio : 0; };
  var precioBase = function (i) { return formaPago === 'pre' && pre ? pre.precios[i] : p.packs[i].precio; };
  var precioAhora = function (i) { return precioBase(i) + extra(); };
  var cupos = function (i) { var k = p.packs[i]; return disenos.length ? (k.disenos || k.cant) : 0; };

  track('ViewContent', { content_name: p.nombre, content_type: 'product', content_ids: [p.id], value: p.packs[0].precio, currency: 'COP' });

  /* visitas al panel (track-visita) con prefijo "co-", como las demás tiendas; una por sesión */
  var avisarPanel = function (tipo) {
    if (!EN_TIENDA) return;
    try { fetch(N8N + 'track-visita', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pagina: 'co-' + p.id, producto: p.nombre + ' · Colombia', tipo: tipo }) }).catch(function () {}); } catch (e) {}
  };
  try { if (!sessionStorage.getItem('jaye_vis_co_' + p.id)) { sessionStorage.setItem('jaye_vis_co_' + p.id, '1'); avisarPanel('visita'); } } catch (e) { avisarPanel('visita'); }

  /* ---------- pintar ---------- */
  var n = p.packs.length;
  var packsHTML = p.packs.map(function (k, i) {
    return '<button type="button" class="pf-pack' + (i === elegido ? ' sel' : '') + '" data-i="' + i + '" role="radio" aria-checked="' + (i === elegido) + '" style="--xp:' + Math.round((i + 1) / n * 100) + '%">'
      + (n > 1 && i === p.popular ? '<span class="pf-pack__cinta">El más pedido</span>' : '')
      + (k.nivel ? '<span class="pf-pack__nivel">' + esc(k.nivel) + '</span>' : '')
      + '<span class="pf-pack__txt">' + esc(k.texto) + '</span>'
      + '<span class="pf-pack__pr" data-pr="' + i + '">' + pesos(k.precio) + '</span>'
      + '<span class="pf-pack__antes">' + (k.antes ? '<s>' + pesos(k.antes) + '</s> ' : '') + (k.detalle ? esc(k.detalle) : '') + '<span data-cu="' + i + '"></span></span>'
      + '<span class="pf-pack__ahorro" data-off="' + i + '"></span>'
      + '<span class="pf-pack__xp" aria-hidden="true"><i></i></span>'
      + '</button>';
  }).join('');

  /* medidas y colores (si el producto los tiene) */
  var medidas = p.medidas || [], colores = p.colores || [];
  var opcionesHTML = (medidas.length ? '<p class="pf-sub">Medida de tu colchón</p><div class="pf-ops" id="fMedida" role="radiogroup" aria-label="Medida">'
      + medidas.map(function (m) { return '<button type="button" class="pf-op" data-v="' + esc(m[0]) + '" role="radio" aria-checked="false"><b>' + esc(m[1]) + '</b><small>' + esc(m[2] || '') + '</small></button>'; }).join('')
      + '</div><div class="pf-err pf-err--op" id="errMedida">Elige la medida.</div>' : '')
    + (colores.length ? '<p class="pf-sub">Color <span id="colorElegido">sin elegir</span></p><div class="pf-cols" id="fColor" role="radiogroup" aria-label="Color">'
      + colores.map(function (c) { return '<button type="button" class="pf-col" data-v="' + esc(c[0]) + '" role="radio" aria-checked="false" title="' + esc(c[1]) + '" aria-label="' + esc(c[1]) + '"><i style="background:' + esc(c[2]) + '"></i></button>'; }).join('')
      + '</div><div class="pf-err pf-err--op" id="errColor">Elige el color.</div>' : '')
    /* diseño de cada unidad (un selector por funda) */
    + (disenos.length ? '<p class="pf-sub">' + esc(p.disenosTitulo || 'Escoge el diseño') + '</p><div class="pf-dis" id="fDis"></div>'
      + '<div class="pf-err pf-err--op" id="errDis">Escoge el diseño de cada ' + esc(p.disenoUnidad || 'funda') + '.</div>' : '')
    /* adicional opcional (se suma al total, mismo envío) */
    + (adics.length ? '<p class="pf-sub pf-sub--ad">' + esc(p.adicTitulo || 'Agrega a tu pedido') + '</p><div class="pf-ads" id="fAd" role="radiogroup" aria-label="Adicional">'
      + '<button type="button" class="pf-ad sel" data-a="-1" role="radio" aria-checked="true"><b>Sin adicional</b><span>$0</span></button>'
      + adics.map(function (a, i) { return '<button type="button" class="pf-ad' + (a.foto ? ' pf-ad--foto' : '') + '" data-a="' + i + '" role="radio" aria-checked="false">' + (a.foto ? '<img src="' + esc(a.foto) + '" alt="">' : '') + '<b>' + esc(a.texto) + '</b>'
        + (a.detalle ? '<small>' + esc(a.detalle) + '</small>' : '') + '<span>+' + pesos(a.precio) + '</span></button>'; }).join('')
      + '</div><div class="pf-dis" id="fAdDis"></div><div class="pf-err pf-err--op" id="errAd">Escoge el diseño del adicional.</div>' : '');

  /* como los demás formularios: ícono redondo arriba, título, precio grande, texto, y en "Paga ahora" los logos chicos en línea.
     Colombia: Wompi en lugar de PayPal (logos para fondo oscuro, como en el pie). */
  var logos = '<span class="pf-pago__logos"><img src="/co/img/pago-wompi.svg" alt="Wompi" width="52" height="13"><img src="/img/pago/visa-oscuro.svg" alt="Visa" width="34" height="20"><img src="/img/pago/mastercard-oscuro.svg" alt="Mastercard" width="34" height="20"></span>';
  var icoCod = '<span class="pf-pago__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.5" y="7" width="19" height="12" rx="2.2"></rect><path d="M2.5 11h19"></path><circle cx="17.5" cy="15.5" r="1.3"></circle></svg></span>';
  var icoPre = '<span class="pf-pago__ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v18"></path><path d="M16.5 7.5c-.6-1.4-2.3-2.2-4.5-2.2-2.5 0-4.2 1.1-4.2 2.9 0 1.9 1.8 2.6 4.4 3.2 2.9.6 4.8 1.4 4.8 3.5 0 2-1.9 3.2-4.6 3.2-2.4 0-4.2-.9-4.8-2.4"></path></svg></span>';
  var pasoPago = 2, pasoDatos = pre ? 3 : 2;
  var pagosHTML = !pre ? '' : '<p class="pf-paso"><b>' + pasoPago + '</b>¿Cómo quieres pagar?</p>'
    + '<div class="pf-pagos" role="radiogroup" aria-label="¿Cómo quieres pagar?">'
    + '<button type="button" class="pf-pago sel" data-pago="cod" role="radio" aria-checked="true">' + icoCod
    + '<span class="pf-pago__tit">Pago contra entrega</span><span class="pf-pago__pr" id="prCod"></span>'
    + '<span class="pf-pago__sub">Envío gratis · 2 a 5 días hábiles</span></button>'
    + '<button type="button" class="pf-pago" data-pago="pre" role="radio" aria-checked="false">'
    + '<span class="pf-pago__cinta">−' + pre.pct + ' %</span>' + icoPre
    + '<span class="pf-pago__tit">Pago anticipado</span><span class="pf-pago__pr" id="prPre"></span>'
    + '<span class="pf-pago__sub">Entrega prioritaria: sale primero</span>' + logos + '</button></div>';

  var DEPTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
    'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño',
    'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima',
    'Valle del Cauca', 'Vaupés', 'Vichada'];
  var campo = function (idc, rot, input, err, opc) {
    return '<div class="pf-campo" id="c' + idc + '"><label for="' + idc + '">' + rot + (opc ? ' <i>(opcional)</i>' : '') + '</label>' + input
      + (err ? '<div class="pf-err">' + err + '</div>' : '') + '</div>';
  };

  caja.innerHTML = '<div class="pf">'
    + '<p class="pf-paso"><b>1</b>' + (p.unidad ? 'Elige tu ' + esc(p.unidad) : '¿Cuántos quieres?') + '</p>'
    + '<div class="pf-packs" role="radiogroup" aria-label="Cantidad">' + packsHTML + '</div>'
    + opcionesHTML
    + pagosHTML
    + '<div class="pf-resumen" aria-live="polite">'
    + '<div><span>Precio normal</span><span id="sumSub"></span></div>'
    + '<div class="pf-desc"><span>Descuento</span><span id="sumDesc"></span></div>'
    + '<div><span>Envío</span><span class="pf-gratis">Gratis</span></div>'
    + '<div class="pf-tot"><span id="sumRot">Total a pagar al recibir</span><span id="sumTot"></span></div></div>'
    + '<p class="pf-paso"><b>' + pasoDatos + '</b>¿A dónde te lo enviamos?</p>'
    + '<form id="fPedido" novalidate>'
    + campo('fNombre', 'Nombre y apellido', '<input id="fNombre" autocomplete="name" placeholder="Ej: María González" required>', 'Escribe tu nombre y apellido.')
    + campo('fTel', 'Celular (WhatsApp)', '<div class="pf-tel"><span>+57</span><input id="fTel" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="12" placeholder="300 123 4567" required></div>', 'Revisa tu celular: son 10 dígitos y empieza en 3.')
    + campo('fDepto', 'Departamento', '<select id="fDepto" autocomplete="address-level1" required><option value="">Elige tu departamento</option>'
        + DEPTOS.map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('') + '</select>', 'Elige tu departamento.')
    + campo('fCiudad', 'Ciudad o municipio', '<input id="fCiudad" autocomplete="address-level2" placeholder="Ej: Medellín" required>', 'Escribe tu ciudad o municipio.')
    + campo('fDir', 'Dirección', '<input id="fDir" autocomplete="street-address" placeholder="Ej: Calle 45 # 12-30" required>', 'Escribe la calle y el número (sin número la transportadora no puede entregar).')
    + campo('fRef', 'Barrio, apto o referencia', '<input id="fRef" autocomplete="address-line2" placeholder="Ej: Barrio Chapinero, apto 302">', '', true)
    + campo('fCorreo', 'Correo', '<input id="fCorreo" type="email" autocomplete="email" placeholder="tucorreo@gmail.com">', 'Escribe un correo válido o déjalo vacío.', true)
    + '<div class="pf-aviso" id="fErr" role="alert"></div>'
    + '<button type="submit" class="cr-btn" id="btnPedir">Comprar · pago contra entrega</button>'
    + '<p class="pf-nota" id="notaPedir">Pagas en efectivo cuando recibes el paquete. Te confirmamos el pedido por WhatsApp.</p>'
    /* debajo del formulario: con quién se paga seguro (Colombia: Wompi de Bancolombia) */
    + '<div class="carriers"><span class="cl">Pagos anticipados seguros con Wompi, de Bancolombia</span><div class="cbadges">'
    + '<img src="/co/img/pago-wompi-oscuro.svg" alt="Wompi" width="72" height="18" loading="lazy">'
    + '<img src="/img/pagos/pse.svg" alt="PSE" width="28" height="28" loading="lazy">'
    + '<img src="/img/pagos/nequi.svg" alt="Nequi" width="70" height="18" loading="lazy">'
    + '</div></div>'
    + '</form></div>';

  /* ---------- precios en pantalla ---------- */
  function refrescar() {
    var k = p.packs[elegido], ahora = precioAhora(elegido), lista2 = (k.antes || k.precio) + extra();
    $('sumSub').textContent = pesos(lista2);
    $('sumDesc').textContent = lista2 > ahora ? '-' + pesos(lista2 - ahora) : pesos(0);
    $('sumTot').textContent = pesos(ahora);
    $('sumRot').textContent = formaPago === 'pre' ? 'Total a pagar ahora' : 'Total a pagar al recibir';
    if ($('prCod')) $('prCod').textContent = pesos(k.precio);
    if ($('prPre')) $('prPre').textContent = pesos(pre.precios[elegido]);
    p.packs.forEach(function (kk, i) {
      var v = precioBase(i), base = kk.antes || kk.precio, off = base > v ? Math.round((1 - v / base) * 100) : 0;
      var pr = caja.querySelector('[data-pr="' + i + '"]'), cu = caja.querySelector('[data-cu="' + i + '"]'), of = caja.querySelector('[data-off="' + i + '"]');
      if (pr) pr.textContent = pesos(v);
      if (cu) cu.textContent = kk.cant > 1 ? pesos(v / kk.cant) + ' c/u' : '';
      if (of) of.textContent = off ? '-' + off + ' %' : '';
    });
    $('btnPedir').textContent = formaPago === 'pre' ? 'Comprar y pagar con Wompi' : 'Comprar · pago contra entrega';
    $('notaPedir').textContent = formaPago === 'pre'
      ? 'En el siguiente paso pagas seguro en Wompi (tarjeta, PSE, Nequi o Bancolombia). Tu pedido sale con entrega prioritaria.'
      : 'Pagas en efectivo cuando recibes el paquete. Te confirmamos el pedido por WhatsApp.';
  }
  refrescar();

  var yaCarrito = false;
  var carrito = function () {
    if (yaCarrito) return; yaCarrito = true;
    var k = p.packs[elegido]; track('AddToCart', { content_name: p.nombre, content_ids: [p.id], content_type: 'product', value: precioAhora(elegido), currency: 'COP', num_items: k.cant });
  };
  caja.querySelectorAll('.pf-pack').forEach(function (b) {
    b.addEventListener('click', function () {
      elegido = +b.getAttribute('data-i');
      caja.querySelectorAll('.pf-pack').forEach(function (x) { var s = x === b; x.classList.toggle('sel', s); x.setAttribute('aria-checked', String(s)); });
      carrito(); refrescar();
    });
  });
  caja.querySelectorAll('.pf-pago').forEach(function (b) {
    b.addEventListener('click', function () {
      formaPago = b.getAttribute('data-pago');
      caja.querySelectorAll('.pf-pago').forEach(function (x) { var s = x === b; x.classList.toggle('sel', s); x.setAttribute('aria-checked', String(s)); });
      refrescar();
    });
  });
  function marcarOp(grupo, b) {
    caja.querySelectorAll('#' + grupo + ' button').forEach(function (x) { var s = x === b; x.classList.toggle('sel', s); x.setAttribute('aria-checked', String(s)); });
  }
  if ($('fMedida')) $('fMedida').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    medida = b.getAttribute('data-v'); marcarOp('fMedida', b); $('errMedida').style.display = 'none'; carrito();
  });
  if ($('fColor')) $('fColor').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    color = b.getAttribute('data-v'); marcarOp('fColor', b); $('errColor').style.display = 'none';
    $('colorElegido').textContent = b.getAttribute('aria-label'); carrito();
  });
  /* ---------- diseños por unidad + adicional ---------- */
  function selectorDis(lista, valor, rotulo, attr) {
    /* 11-11 James: "que aparezcan los diseños para que la persona escoja", con su foto (no una lista) */
    if (lista.length && lista[0][2]) {
      var nomSel = ''; lista.forEach(function (d) { if (d[0] === valor) nomSel = d[1]; });
      return '<div class="pf-dsel pf-dsel--fotos" ' + attr + '><span>' + esc(rotulo) + ' · <b class="pf-dnom">' + (nomSel ? esc(nomSel) : 'toca un diseño') + '</b></span><div class="pf-dfotos">'
        + lista.map(function (d) { return '<button type="button" class="pf-dfoto' + (d[0] === valor ? ' sel' : '') + '" data-v="' + esc(d[0]) + '" data-n="' + esc(d[1]) + '" aria-pressed="' + (d[0] === valor) + '"><img src="' + esc(d[2]) + '" alt="' + esc(d[1]) + '" loading="lazy"><small>' + esc(d[1]) + '</small></button>'; }).join('')
        + '</div></div>';
    }
    return '<label class="pf-dsel"><span>' + esc(rotulo) + '</span><select ' + attr + '><option value="">Escoge el diseño</option>'
      + lista.map(function (d) { return '<option value="' + esc(d[0]) + '"' + (d[0] === valor ? ' selected' : '') + '>' + esc(d[1]) + '</option>'; }).join('')
      + '</select></label>';
  }
  /* 12-11 James: tocar una foto de la galería de la página deja ese diseño en TODAS las fundas del formulario
     (si quiere mezclar, cambia cada una en el formulario). Las fundas que se suman al cambiar de pack salen con ese mismo. */
  var disGal = '';
  window.coDiseno = function (v) {
    if (!disenos.some(function (d) { return d[0] === v; })) return false;
    disGal = v; for (var s = 0; s < cupos(elegido); s++) elDis[s] = v;
    pintarDis(); if ($('errDis')) $('errDis').style.display = 'none';
    return true;
  };
  function pintarDis() {
    var c = $('fDis'); if (!c) return;
    var n2 = cupos(elegido), html = '';
    if (disGal) for (var z = 0; z < n2; z++) if (!elDis[z]) elDis[z] = disGal;
    for (var s = 0; s < n2; s++) html += selectorDis(disenos, elDis[s] || '', (p.disenoUnidad ? p.disenoUnidad.charAt(0).toUpperCase() + p.disenoUnidad.slice(1) : 'Funda') + ' ' + (n2 > 1 ? s + 1 : ''), 'data-s="' + s + '"');
    c.innerHTML = html;
  }
  function pintarAdDis() {
    var c = $('fAdDis'); if (!c) return;
    c.innerHTML = adic >= 0 ? selectorDis(adics[adic].disenos || [], elAd, adics[adic].rotuloDiseno || 'Diseño del adicional', 'data-ad="1"') : '';
  }
  if ($('fDis')) {
    pintarDis();
    $('fDis').addEventListener('change', function (e) { var sel = e.target.closest('select'); if (!sel) return; elDis[+sel.getAttribute('data-s')] = sel.value; $('errDis').style.display = 'none'; carrito(); });
    $('fDis').addEventListener('click', function (e) {
      var b = e.target.closest('.pf-dfoto'); if (!b) return;
      var caj = b.closest('[data-s]'); var s = +caj.getAttribute('data-s');
      elDis[s] = b.getAttribute('data-v');
      caj.querySelectorAll('.pf-dfoto').forEach(function (x) { var on = x === b; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', String(on)); });
      caj.querySelector('.pf-dnom').textContent = b.getAttribute('data-n');
      $('errDis').style.display = 'none'; carrito();
    });
    caja.querySelectorAll('.pf-pack').forEach(function (b) { b.addEventListener('click', pintarDis); });
  }
  /* 12-11 James: el adicional va como SECCIÓN OPCIONAL antes del formulario, no adentro.
     Si la página trae <div id="coAdicional">, el bloque se muda ahí (sigue sumando al mismo pedido). */
  if ($('fAd') && $('coAdicional')) {
    var dest = $('coAdicional'), tit = caja.querySelector('.pf-sub--ad');
    if (tit) tit.parentNode.removeChild(tit);
    ['fAd', 'fAdDis', 'errAd'].forEach(function (id) { dest.appendChild($(id)); });
    if (p.adicNinguno) $('fAd').querySelector('[data-a="-1"] b').textContent = p.adicNinguno;
  }
  if ($('fAd')) {
    $('fAd').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      adic = +b.getAttribute('data-a'); elAd = '';
      document.querySelectorAll('#fAd button').forEach(function (x) { var s = x === b; x.classList.toggle('sel', s); x.setAttribute('aria-checked', String(s)); });
      $('errAd').style.display = 'none'; pintarAdDis(); refrescar(); if (adic >= 0) carrito();
    });
    $('fAdDis').addEventListener('change', function (e) { var sel = e.target.closest('select'); if (!sel) return; elAd = sel.value; $('errAd').style.display = 'none'; });
    $('fAdDis').addEventListener('click', function (e) {
      var b = e.target.closest('.pf-dfoto'); if (!b) return;
      var caj = b.closest('.pf-dsel--fotos'); elAd = b.getAttribute('data-v');
      caj.querySelectorAll('.pf-dfoto').forEach(function (x) { var on = x === b; x.classList.toggle('sel', on); x.setAttribute('aria-pressed', String(on)); });
      caj.querySelector('.pf-dnom').textContent = b.getAttribute('data-n');
      $('errAd').style.display = 'none';
    });
  }
  window.coAdicional = function (i) { var b = document.querySelector('.pf-ad[data-a="' + i + '"]'); if (b) b.click(); };

  /* otros botones de la página pueden elegir pack/pago: coElegir(0, 'pre') */
  window.coElegir = function (i, pago) {
    var b = caja.querySelector('.pf-pack[data-i="' + i + '"]'); if (b) b.click();
    var q = pago && caja.querySelector('.pf-pago[data-pago="' + pago + '"]'); if (q) q.click();
  };

  /* InitiateCheckout: una vez, cuando el formulario aparece en pantalla */
  if ('IntersectionObserver' in window) {
    var oi = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { oi.disconnect(); avisarPanel('visita_form'); var k = p.packs[elegido]; track('InitiateCheckout', { content_name: p.nombre, content_ids: [p.id], value: precioAhora(elegido), currency: 'COP', num_items: k.cant }); }
    }, { threshold: 0.3 });
    oi.observe($('fPedido'));
  }

  /* celular: solo números mientras escribe */
  $('fTel').addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 12); });
  ['fNombre', 'fTel', 'fDepto', 'fCiudad', 'fDir', 'fCorreo'].forEach(function (k) {
    var el = $(k); var quitar = function () { $('c' + k).classList.remove('mal'); };
    el.addEventListener('input', quitar); el.addEventListener('change', quitar);
  });

  var g = function (k) { return ($(k) && $(k).value || '').trim(); };
  var celular = function () {
    var t = g('fTel').replace(/\D/g, '');
    if (t.length === 12 && t.indexOf('57') === 0) t = t.slice(2);
    return t;
  };
  var nombreDe = function (arr, v) { for (var i = 0; i < arr.length; i++) if (arr[i][0] === v) return arr[i][1]; return ''; };
  var variante = function () {
    /* 11-11: "BIENVENIDO / CHIMENEA + 4 SILLAS: ANGEL" (lo lee el montador; sin "·" porque la nota lo usa de separador) */
    if (disenos.length) {
      var t = elDis.slice(0, cupos(elegido)).map(function (v) { return v || 'POR DEFINIR'; }).join(' / ');
      if (adic >= 0) t += ' + ' + (adics[adic].codigo || adics[adic].id) + ': ' + (elAd || 'POR DEFINIR');
      return t;
    }
    if (!medidas.length && !colores.length) return '';
    return 'MEDIDA ' + (nombreDe(medidas, medida) || 'POR DEFINIR').toUpperCase() + ' · ' + (color || 'POR DEFINIR');
  };

  /* ---------- carrito abandonado ----------
     Apenas hay un celular colombiano completo (10 dígitos), los datos van a n8n abandonado (fin_abandonados, +57). */
  var SID_AB = 'CO' + Date.now() + Math.floor(Math.random() * 1e6), ultimoAb = '', compro = false;
  function abandonado() {
    if (!EN_TIENDA || compro || !/^3\d{9}$/.test(celular())) return;
    var k = p.packs[elegido];
    var d = { sid: SID_AB, telefono: celular(), indicativo: '+57', nombre: g('fNombre'), producto: p.nombre + (variante() ? ' (' + variante() + ')' : ''),
      cantidad: k.cant, total: precioAhora(elegido), direccion: g('fDir'), comuna: g('fCiudad'), region: g('fDepto'), referencia: g('fRef'),
      correo: g('fCorreo'), fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }), estado: 'INCOMPLETO' };
    var firma = JSON.stringify(d).replace(/"fecha":"[^"]*"/, '');
    if (firma === ultimoAb) return; ultimoAb = firma;
    var cuerpo = JSON.stringify(d);
    try {
      fetch(N8N + 'abandonado', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, keepalive: true })
        .catch(function () { try { if (navigator.sendBeacon) navigator.sendBeacon(N8N + 'abandonado', new Blob([cuerpo], { type: 'text/plain' })); } catch (e) {} });
    } catch (e) {}
  }
  var tAb;
  $('fTel').addEventListener('input', function () { clearTimeout(tAb); tAb = setTimeout(abandonado, 1200); });
  ['fNombre', 'fTel', 'fDepto', 'fCiudad', 'fDir', 'fRef', 'fCorreo'].forEach(function (k) { $(k).addEventListener('change', abandonado); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') abandonado(); });

  function validar() {
    var mal = [];
    var nom = g('fNombre');
    if (nom.length < 5 || nom.split(/\s+/).filter(Boolean).length < 2) mal.push('fNombre');
    if (!/^3\d{9}$/.test(celular())) mal.push('fTel');
    if (DEPTOS.indexOf(g('fDepto')) < 0) mal.push('fDepto');
    if (g('fCiudad').length < 3) mal.push('fCiudad');
    if (g('fDir').length < 6 || !/\d/.test(g('fDir'))) mal.push('fDir');
    if (g('fCorreo') && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(g('fCorreo'))) mal.push('fCorreo');
    ['fNombre', 'fTel', 'fDepto', 'fCiudad', 'fDir', 'fCorreo'].forEach(function (k) { $('c' + k).classList.toggle('mal', mal.indexOf(k) >= 0); });
    if (medidas.length && !medida) { mal.unshift('fMedida'); $('errMedida').style.display = 'block'; }
    if (colores.length && !color) { mal.unshift('fColor'); $('errColor').style.display = 'block'; }
    if (disenos.length) { for (var s = 0; s < cupos(elegido); s++) if (!elDis[s]) { mal.unshift('fDis'); $('errDis').style.display = 'block'; break; } }
    if (adic >= 0 && (adics[adic].disenos || []).length && !elAd) { mal.unshift('fAdDis'); $('errAd').style.display = 'block'; }
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
      var primero = $(mal[0]); if (primero) { if (primero.focus) primero.focus(); primero.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }
    $('fErr').style.display = 'none';
    var k = p.packs[elegido], total = precioAhora(elegido);
    var pedido = {
      pagina: 'co-' + p.id, producto: p.corto || p.nombre, producto_id: p.dropiId || '', pais: 'CO',
      cantidad: k.cant, total: total, pago: formaPago, tonos: variante(), graduaciones: '', adicional: adic >= 0 ? (adics[adic].id || '') : '',
      nombre: g('fNombre'), telefono: '57' + celular(), departamento: g('fDepto'), ciudad: g('fCiudad'),
      direccion: g('fDir'), referencia: g('fRef'), correo: g('fCorreo').toLowerCase(), cmp: window._CMP || '',
      event_id: window.jayePixel ? window.jayePixel.id() : '', fbp: window.jayePixel ? window.jayePixel.fbp() : '', fbc: window.jayePixel ? window.jayePixel.fbc() : '',
      ua: navigator.userAgent, url: location.href.split('#')[0],
    };
    /* vista previa (fuera de jayegroupshop.com): se muestra lo que se mandaría, sin enviarlo */
    if (!EN_TIENDA) { window._coPedidoPrueba = pedido; aviso('VISTA PREVIA (no se envió nada): ' + JSON.stringify(pedido)); return; }
    var btn = $('btnPedir'); btn.disabled = true; btn.textContent = formaPago === 'pre' ? 'Preparando tu pago…' : 'Enviando…'; enviando = true;

    mandar(pedido, 1).then(function (r) {
      if (!r || !r.ok) { rechazado(r); return; }
      window._ventaId = String(r.venta_id || r.id || '');
      compro = true;
      try { localStorage.removeItem('jaye_co_pendiente'); localStorage.setItem('jaye_co_ultimo', JSON.stringify({ id: window._ventaId, total: total, ev: pedido.event_id })); } catch (e) {}
      if (formaPago === 'pre') {
        if (!r.pago_url) { rechazado(r); return; }
        track('AddPaymentInfo', { content_name: p.nombre, currency: 'COP', value: total });
        location.href = r.pago_url;   /* Wompi */
        return;
      }
      track('Purchase', { value: total, currency: 'COP', content_name: p.nombre, content_ids: [p.id], content_type: 'product', num_items: k.cant }, pedido.event_id);
      if (r.anticipo && r.anticipo_url) pantallaAnticipo(g('fNombre').split(' ')[0], total, r);
      else gracias(g('fNombre').split(' ')[0], celular());
    }).catch(function () {
      try { localStorage.setItem('jaye_co_pendiente', JSON.stringify(pedido)); } catch (e) {}
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
    aviso('No pudimos registrar tu pedido. Revisa tu celular, la dirección con número y la ciudad, y vuelve a intentarlo.', true);
  }
  function noEntro() {
    soltarBoton();
    aviso('Se cayó la conexión y tu pedido no quedó registrado. Tus datos quedaron guardados: vuelve a intentarlo en un momento.', true);
  }

  function gracias(nom, tel) {
    caja.innerHTML = '<div class="pf pf-listo"><h3>¡Pedido recibido!</h3>'
      + '<p>Gracias, ' + esc(nom) + '. Te escribimos por WhatsApp al +57 ' + esc(tel) + ' para confirmar el despacho.</p>'
      + '<p>Llega en 2 a 5 días hábiles según tu ciudad y pagas en efectivo cuando lo recibes. Si esos días no vas a estar, avísanos y coordinamos.</p></div>';
    caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- anticipo de $20.000 para clientes riesgosos (Wompi) ---------- */
  function pantallaAnticipo(nom, total, r) {
    var ant = r.anticipo_valor || 20000, resto = r.resto != null ? r.resto : Math.max(0, total - ant);
    caja.innerHTML = '<div class="pf pf-listo"><h3>Paga tu anticipo y tu pedido sale hoy</h3>'
      + '<p>Hola' + (nom ? ' ' + esc(nom) : '') + '. Para despachar tu pedido contra entrega, la transportadora pide un anticipo de ' + pesos(ant) + ', que se descuenta del total.</p>'
      + '<p class="pf-total">Anticipo: ' + pesos(ant) + '</p>'
      + '<p class="pf-usd">Al recibir pagas solo ' + pesos(resto) + ' en efectivo. Pagas seguro en Wompi con tarjeta, PSE, Nequi o Bancolombia.</p>'
      + '<a class="cr-btn" href="' + esc(r.anticipo_url) + '">Pagar anticipo de ' + pesos(ant) + '</a></div>';
    caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- regreso desde Wompi: ?pago=<pedido>&id=<transacción> o ?anticipo=<pedido>&id=<transacción> ---------- */
  (function vuelta() {
    var q; try { q = new URLSearchParams(location.search); } catch (e) { return; }
    var ref = q.get('pago'), refA = q.get('anticipo'), tx = q.get('id') || '';
    if (!ref && !refA) return;
    var fin = function (tit, txt) { caja.innerHTML = '<div class="pf pf-listo"><h3>' + tit + '</h3><p>' + txt + '</p></div>'; caja.scrollIntoView({ block: 'center' }); };
    fin('Estamos confirmando tu pago…', 'Un momento, lo estamos revisando con Wompi.');
    var url = ref ? N8N + 'pago-estado-co?ref=' + encodeURIComponent(ref) + '&id=' + encodeURIComponent(tx)
                  : N8N + 'anticipo-estado-co?venta=' + encodeURIComponent(refA) + '&id=' + encodeURIComponent(tx);
    var vueltas = 0;
    (function mirar() {
      fetch(url).then(function (r) { return r.json(); }).then(function (j) {
        if (j.estado === 'APPROVED') {
          if (ref) {
            var u = {}; try { u = JSON.parse(localStorage.getItem('jaye_co_ultimo') || '{}'); } catch (e) {}
            if (!sessionStorage.getItem('co_px_' + ref)) {
              track('Purchase', { value: u.total || (pre ? pre.precios[0] : 0), currency: 'COP', content_name: p.nombre, content_ids: [p.id], content_type: 'product', num_items: 1 }, u.ev);
              try { sessionStorage.setItem('co_px_' + ref, '1'); } catch (e) {}
            }
            fin('¡Pago recibido!', 'Tu pedido está pagado y sale con entrega prioritaria. Te escribimos por WhatsApp con la guía de envío.');
          } else fin('¡Anticipo recibido!', 'Tu pedido sale y el resto lo pagas cuando te llegue. Te escribimos por WhatsApp con la guía de envío.');
        } else if ((j.estado === 'PENDING' || !j.estado) && vueltas++ < 20) setTimeout(mirar, 3000);
        else if (/DECLINED|ERROR|VOIDED/.test(j.estado || '')) fin('El pago no se aprobó', 'Puedes intentarlo de nuevo o escribirnos por WhatsApp y te mandamos el link otra vez.');
        else fin('Aún no vemos tu pago confirmado', 'Si ya pagaste, te escribimos por WhatsApp para confirmarlo.');
      }).catch(function () { if (vueltas++ < 20) setTimeout(mirar, 3000); });
    })();
  })();

  /* pedido que quedó sin entrar: se reintenta solo al volver a abrir la página */
  (function reintentar() {
    if (!EN_TIENDA) return;
    var crudo; try { crudo = localStorage.getItem('jaye_co_pendiente'); } catch (e) { return; }
    if (!crudo) return;
    var datos; try { datos = JSON.parse(crudo); } catch (e) { try { localStorage.removeItem('jaye_co_pendiente'); } catch (x) {} return; }
    fetch(URL_PEDIDO, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })
      .then(function (r) { if (r.status < 500) { try { localStorage.removeItem('jaye_co_pendiente'); } catch (e) {} } })
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
