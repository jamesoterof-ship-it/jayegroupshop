/* ============================================================
   RODILLERA CON RESORTES · MÉXICO · 08-11-2026 · composición del plano del script ui-ux-pro-max, corrida 125 (rodillera-mx),
   "Azul clínico" (James 07-11, confirmado 08-11 "Sí, autorizo").
   · Patrón Hero + Testimonials + CTA: héroe → problema → solución → carrusel de opiniones (anterior / siguiente / pausa,
     anuncia la posición, se detiene con foco, mouse encima y movimiento reducido) → CTA. CTA fijo abajo.
   · Estilo Accessible & Ethical: texto grande, alto contraste, foco visible, enlace para saltar al pedido.
   · Orden de las secciones de las páginas que venden (héroe, datos, problema, solución, opiniones, oferta, comparación,
     packs, reseñas, preguntas, despacho, formulario).
   De la plantilla solo se usa la LÓGICA: ficha.js pinta el formulario (#pedir) y las opiniones (#resenas); aquí se mudan de lugar.
   ============================================================ */
(function () {
  var P = window.PAGINA || {}, PR = (window.PRODUCTOS || [])[0] || {}, RES = window.RESENAS || [];
  var raiz = document.getElementById('mxp');
  if (!raiz || !P.heroe) return;
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mx = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
  var $ = function (id) { return document.getElementById(id); };
  var packs = PR.packs || [], pre = (PR.anticipado || {}).precios || [], pct = (PR.anticipado || {}).pct || 10;
  var uno = packs[0] || {}, pop = packs[PR.popular || 0] || uno;
  var media = RES.length ? (RES.reduce(function (a, r) { return a + (+r.estrellas || 5); }, 0) / RES.length) : 5;
  var tit = function (t, id) { return '<h2 class="rd-tit"' + (id ? ' id="' + id + '"' : '') + ' data-kin>' + esc(t) + '</h2>'; };
  var H = P.heroe, html = [];

  /* resorte (efecto propio del producto) */
  var resorte = '<svg class="rd-resorte" viewBox="0 0 20 34" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M3 2h14M4 6l12 4M4 10l12 4M4 14l12 4M4 18l12 4M4 22l12 4M4 26l12 4M3 32h14"/></svg>';

  /* 1 · HÉROE: el producto solo y grande, titular arriba en cascada */
  html.push('<section class="rd-heroe" aria-labelledby="rdTit"><img class="rd-heroe__img" src="' + esc(H.img) + '" alt="' + esc(H.alt) + '" width="1080" height="1620" fetchpriority="high">'
    + '<div class="rd-heroe__txt"><p class="rd-rot">' + esc(H.rotulo) + '</p>'
    + '<h1 id="rdTit"><span class="rd-l1">' + esc(H.l1) + '</span><span class="rd-l2"><span>' + esc(H.l2) + '</span><span class="rd-clave" id="rdClave">' + esc(H.clave) + '</span>' + (calma ? '' : resorte) + '</span></h1>'
    + '<p class="rd-frase">' + esc(H.frase) + '</p>'
    + '<p class="rd-escribe" aria-hidden="true"><span id="rdEscribe">' + esc((P.usos || [''])[0]) + '</span><i class="rd-cursor"></i></p></div>'
    + '<div class="rd-heroe__pie"><p class="rd-pastilla">Desde <b>' + mx(uno.precio) + '</b> al recibir'
    + (pre[0] ? '<small>o <b>' + mx(pre[0]) + '</b> pagando con tarjeta (−' + pct + ' %)</small>' : '') + '</p>'
    + '<a class="rd-btn" href="#pedir" data-ir>Lo quiero</a></div></section>');

  /* 2 · franja de 3 datos + estrellas doradas */
  html.push('<div class="rd-datos"><ul>' + H.datos.map(function (d) { return '<li><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></li>'; }).join('') + '</ul>'
    + '<p class="rd-estrellas"><i aria-hidden="true">★★★★★</i> ' + media.toFixed(1).replace('.', ',') + ' de 5 · ' + RES.length + ' opiniones de compradores</p></div>');

  /* 3 · EL PROBLEMA (antes y después) */
  var B = P.problema;
  html.push('<section class="rd-sec" aria-labelledby="rdP1"><p class="rd-rot">' + esc(B.rotulo) + '</p>' + tit(B.titulo, 'rdP1')
    + '<p class="rd-txt" data-rev>' + esc(B.texto) + '</p>'
    + '<figure class="rd-ba" data-rev><img src="' + esc(B.img) + '" alt="' + esc(B.alt) + '" loading="lazy" width="1080" height="1620"></figure></section>');

  /* 4 · LA SOLUCIÓN (cómo funciona, video real si lo hay, 3 tarjetas, partes) */
  var S = P.solucion;
  var ico = [
    '<path d="M6 3h12M7 6.5l10 3M7 10.5l10 3M7 14.5l10 3M6 21h12"/>',
    '<path d="M7 3c-2 3-2 15 0 18M17 3c2 3 2 15 0 18M7 8h10M7 16h10"/>',
    '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M8 8v8M16 8v8"/>',
    '<path d="M8 3v18M16 3v18M5 7h6M13 7h6M5 17h6M13 17h6"/>',
  ];
  html.push('<section class="rd-sec rd-sec--blanca" aria-labelledby="rdP2"><div><p class="rd-rot">' + esc(S.rotulo) + '</p>' + tit(S.titulo, 'rdP2')
    + '<p class="rd-txt" data-rev>' + esc(S.texto) + '</p>'
    + (P.video ? '<div class="rd-video" data-rev><video data-src="' + esc(P.video) + '" poster="' + esc(P.videoPoster || '') + '" muted loop playsinline preload="none" aria-label="' + esc(P.videoAlt || '') + '"></video></div>' : '')
    + '<ul class="rd-tarjetas" data-rev>' + S.tarjetas.map(function (t) { return '<li><img src="' + esc(t[0]) + '" alt="' + esc(t[3]) + '" loading="lazy" width="900" height="1350"><h3>' + esc(t[1]) + '</h3><p>' + esc(t[2]) + '</p></li>'; }).join('') + '</ul>'
    + '<ul class="rd-partes">' + P.partes.map(function (x, i) { return '<li data-rev><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' + ico[i % ico.length] + '</svg><div><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div></li>'; }).join('') + '</ul></div></section>');

  /* 5 · OPINIONES: carrusel accesible (el patrón del plano: prueba social antes del botón) */
  var elegidas = RES.filter(function (r) { return String(r.texto).length >= 30; }).sort(function (a, b) { return b.texto.length - a.texto.length; }).slice(0, 8);
  if (elegidas.length) {
    var ini = function (n) { return String(n || '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); };
    html.push('<section class="rd-sec" aria-labelledby="rdOp"><p class="rd-rot">Lo que dicen</p>' + tit('Compradores que ya la usan', 'rdOp')
      + '<div class="rd-testi" id="rdTesti" aria-roledescription="carrusel"><div class="rd-testi__marco"><div class="rd-testi__pista" id="rdPista">'
      + elegidas.map(function (r, i) {
        return '<figure role="group" aria-roledescription="opinión" aria-label="' + (i + 1) + ' de ' + elegidas.length + '"' + (i ? ' aria-hidden="true"' : '') + '>'
          + '<span class="rd-est" aria-label="' + r.estrellas + ' de 5 estrellas">' + '★★★★★'.slice(0, r.estrellas) + '</span>'
          + (r.foto ? '<img class="rd-testi__foto" src="' + esc(r.foto) + '" alt="Foto que subió quien la compró" loading="lazy" width="260" height="260">' : '')
          + '<blockquote>' + esc(r.texto) + '</blockquote>'
          + '<figcaption><span class="rd-testi__ini" aria-hidden="true">' + esc(ini(r.nombre)) + '</span><div>' + esc(r.nombre) + '<span><em>Compra verificada</em></span></div></figcaption></figure>';
      }).join('')
      + '</div></div><div class="rd-testi__ctrl"><div><button type="button" id="rdAnt" aria-label="Opinión anterior">←</button><button type="button" id="rdSig" aria-label="Opinión siguiente">→</button></div>'
      + '<span class="rd-testi__pos" id="rdPos" aria-live="polite">1 de ' + elegidas.length + '</span>'
      + '<button type="button" id="rdPausa" aria-pressed="false">Pausar</button></div></div>'
      + '<p style="margin-top:22px"><a class="rd-btn rd-btn--ancho" href="#pedir" data-ir>Quiero la mía</a></p></section>');
  }

  /* 6 · OFERTA con contador + pago anticipado */
  var preP = pre[PR.popular || 0];
  html.push('<section class="rd-sec rd-sec--blanca" aria-labelledby="rdOf"><div><p class="rd-rot">Promoción de hoy</p>' + tit('Lleva el paquete más pedido', 'rdOf')
    + '<div class="rd-oferta" data-rev><img src="' + esc(P.promoImg) + '" alt="Promoción: rodillera con resortes, par a ' + mx(uno.precio) + '" loading="lazy" width="900" height="900">'
    + '<div class="rd-oferta__cuerpo"><h3>' + esc(P.promoTitulo) + '</h3>'
    + '<p class="rd-precio"><b>' + mx(pop.precio) + '</b>' + (pop.antes ? '<s>' + mx(pop.antes) + '</s>' : '') + '</p>'
    + (preP ? '<p class="rd-tarjeta">o <b>' + mx(preP) + '</b> pagando ahora con tarjeta · −' + pct + ' % y entrega prioritaria</p>' : '')
    + '<div class="rd-reloj" id="rdReloj" aria-label="La promoción termina hoy a la medianoche"><span><b data-h>00</b>h</span><span><b data-m>00</b>m</span><span><b data-s>00</b>s</span></div>'
    + '<a class="rd-btn rd-btn--ancho" href="#pedir" data-ir>Quiero la promoción</a></div></div>'
    + '<div class="rd-pre" data-rev><p class="rd-pre__tit"><span>−' + pct + ' %</span>Paga con tarjeta y gana</p><ul>'
    + '<li><b>' + pct + ' % de descuento</b> en todos los paquetes: ' + packs.map(function (k, i) { return esc(k.texto) + ' <b>' + mx(pre[i]) + '</b>'; }).join(' · ') + '</li>'
    + '<li><b>Entrega prioritaria:</b> tu pedido sale primero</li><li><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</li></ul>'
    + '<div class="rd-pre__pie"><span class="rd-pre__logos"><img src="/img/pago/paypal-texto.svg" alt="PayPal" width="60" height="18"><img src="/img/pago/visa-claro.svg" alt="Visa" width="38" height="23"><img src="/img/pago/mastercard-claro.svg" alt="Mastercard" width="38" height="23"></span>'
    + '<a class="rd-btn rd-btn--chico" href="#pedir" data-ir>Pagar con tarjeta</a></div></div></div></section>');

  /* 7 · COMPARACIÓN + 8 · PACKS + 9 · RESEÑAS */
  var C = P.compara;
  html.push('<section class="rd-sec" aria-labelledby="rdCo">' + tit(C.titulo, 'rdCo')
    + '<table class="rd-comp" data-rev><thead><tr><th scope="col">Qué te da</th><th scope="col" class="rd-nos">' + esc(C.nos) + '</th><th scope="col">' + esc(C.otro) + '</th></tr></thead><tbody>'
    + C.filas.map(function (f) { return '<tr><td>' + esc(f) + '</td><td class="rd-si" aria-label="Sí">✓</td><td class="rd-no" aria-label="No">✕</td></tr>'; }).join('') + '</tbody></table>'
    + '<h2 class="rd-tit" style="margin-top:44px" data-kin>Elige tu paquete</h2>'
    + '<img class="rd-packs" src="' + esc(P.packsImg) + '" alt="Paquetes: 1 par ' + mx(packs[0].precio) + ', 2 pares ' + mx(packs[1].precio) + ', 3 pares ' + mx(packs[2].precio) + '" loading="lazy" width="900" height="900" data-rev>'
    + '<div id="mxResFicha"></div></section>');

  /* 10 · PREGUNTAS + 11 · DESPACHO + 12 · FORMULARIO */
  html.push('<section class="rd-sec rd-sec--blanca" aria-labelledby="rdFaq"><div>' + tit('Lo que nos preguntan', 'rdFaq')
    + '<div class="rd-faq">' + P.preguntas.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div>'
    + '<ul class="rd-garantias" data-rev><li><b>$0</b>de envío a todo México</li><li><b>2 a 5</b>días hábiles</li><li><b>30</b>días de garantía</li><li><b>Al recibir</b>pagas en efectivo</li></ul>'
    + '<h2 class="rd-tit" style="margin-top:44px" data-kin>Con quién se despacha</h2><div class="rd-despacho__g" data-rev>'
    + '<div><img src="../boquilla/img/logos/veloces.webp" alt="Veloces" loading="lazy"><b>Veloces</b><span>Entrega a domicilio</span></div>'
    + '<div><img src="../boquilla/img/logos/afimex.webp" alt="Afimex" loading="lazy"><b>Afimex</b><span>Envío a todo México</span></div>'
    + '<div><img src="../boquilla/img/logos/quality-post.webp" alt="Quality Post" loading="lazy"><b>Quality Post</b><span>Guía rastreable por WhatsApp</span></div>'
    + '<div class="rd-despacho__pago"><b>Pagas al recibir</b><span>Al repartidor, cuando la tienes en la mano</span></div></div></div></section>'
    + '<section class="rd-sec" aria-labelledby="rdPide">' + tit('Pide la tuya', 'rdPide') + '<div id="mxForm"></div></section>');

  raiz.innerHTML = html.join('');
  var salto = document.createElement('a'); salto.className = 'rd-saltar'; salto.href = '#pedir'; salto.textContent = 'Saltar al pedido'; document.body.insertBefore(salto, document.body.firstChild);
  var fijo = document.createElement('div'); fijo.className = 'rd-fijo'; fijo.innerHTML = '<a href="#pedir" data-ir>Lo quiero · ' + mx(uno.precio) + ' al recibir</a>'; document.body.appendChild(fijo);

  /* titular letra por letra (cascada) */
  var partir = function (nodo) {
    var k = 0;
    (function rec(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { if (c.tagName.toLowerCase() !== 'svg') rec(c); return; }
        if (c.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function (pal) {
          if (!pal) return;
          if (/^\s+$/.test(pal)) { frag.appendChild(document.createTextNode(pal)); return; }
          var w = document.createElement('span'); w.className = 'rd-pal';
          pal.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'rd-le'; s.style.animationDelay = (k++ * 40) + 'ms'; s.textContent = ch; w.appendChild(s); });
          frag.appendChild(w);
        });
        n.replaceChild(frag, c);
      });
    })(nodo);
  };
  if (!calma) { partir($('rdTit')); $('rdClave').classList.add('rd-rebota'); }

  /* usos que se escriben y se borran */
  var usos = P.usos || [], ui = 0, ci = 0, borra = false, out = $('rdEscribe');
  if (out && usos.length && !calma) {
    (function escribir() {
      var t = usos[ui];
      out.textContent = t.slice(0, ci);
      if (!borra && ci < t.length) { ci++; setTimeout(escribir, 70); }
      else if (!borra) { borra = true; setTimeout(escribir, 1500); }
      else if (ci > 0) { ci--; setTimeout(escribir, 35); }
      else { borra = false; ui = (ui + 1) % usos.length; setTimeout(escribir, 300); }
    })();
  }

  /* títulos palabra por palabra y bloques que aparecen al hacer scroll */
  raiz.querySelectorAll('[data-kin]').forEach(function (h) {
    h.innerHTML = h.textContent.split(' ').map(function (p, i) { return '<span class="rd-w" style="transition-delay:' + (i * 80) + 'ms">' + esc(p) + '</span>'; }).join(' ');
  });
  var vistos = raiz.querySelectorAll('[data-kin],[data-rev]');
  if (calma || !('IntersectionObserver' in window)) vistos.forEach(function (el) { el.classList.add('rd-ver'); });
  else {
    var obs = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('rd-ver'); obs.unobserve(x.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    vistos.forEach(function (el) { obs.observe(el); });
    setTimeout(function () { vistos.forEach(function (el) { el.classList.add('rd-ver'); }); }, 6000);
  }

  /* carrusel de opiniones: anterior / siguiente / pausa; se detiene con foco, mouse encima y movimiento reducido */
  var pista = $('rdPista');
  if (pista) {
    var figs = pista.children, n = figs.length, i0 = 0, pausado = calma, enfoque = false;
    var ir = function (k) {
      i0 = (k + n) % n;
      pista.style.transform = 'translateX(' + (-100 * i0) + '%)';
      Array.prototype.forEach.call(figs, function (f, j) { if (j === i0) f.removeAttribute('aria-hidden'); else f.setAttribute('aria-hidden', 'true'); });
      $('rdPos').textContent = (i0 + 1) + ' de ' + n;
    };
    $('rdAnt').addEventListener('click', function () { ir(i0 - 1); });
    $('rdSig').addEventListener('click', function () { ir(i0 + 1); });
    var bP = $('rdPausa');
    var pintarP = function () { bP.textContent = pausado ? 'Reanudar' : 'Pausar'; bP.setAttribute('aria-pressed', String(pausado)); };
    bP.addEventListener('click', function () { pausado = !pausado; pintarP(); });
    var caja = $('rdTesti');
    caja.addEventListener('mouseenter', function () { enfoque = true; }); caja.addEventListener('mouseleave', function () { enfoque = false; });
    caja.addEventListener('focusin', function () { enfoque = true; }); caja.addEventListener('focusout', function () { enfoque = false; });
    caja.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') ir(i0 - 1); if (e.key === 'ArrowRight') ir(i0 + 1); });
    var x0 = null;
    pista.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; enfoque = true; }, { passive: true });
    pista.addEventListener('touchend', function (e) { if (x0 != null) { var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) ir(i0 + (dx < 0 ? 1 : -1)); } x0 = null; setTimeout(function () { enfoque = false; }, 4000); });
    pintarP();
    setInterval(function () { if (!pausado && !enfoque && !document.hidden) ir(i0 + 1); }, 6000);
  }

  /* botón fijo: aparece después del héroe y se esconde en el formulario y el pie */
  var heroe = raiz.querySelector('.rd-heroe');
  var mirar = function () {
    var y = window.scrollY || 0, f = $('pedir'), pie = document.querySelector('footer.pie');
    var enF = f ? (function (r) { return r.top < innerHeight && r.bottom > 0; })(f.getBoundingClientRect()) : false;
    var enPie = pie ? pie.getBoundingClientRect().top < innerHeight : false;
    fijo.classList.toggle('rd-fijo--ver', y > heroe.offsetHeight - 80 && !enF && !enPie);
  };
  addEventListener('scroll', mirar, { passive: true }); addEventListener('resize', mirar); mirar();

  /* formulario y opiniones de ficha.js a su lugar */
  var llevar = function () {
    var f = $('pedir'), d = $('mxForm'), r = $('resenas'), dr = $('mxResFicha'), ok = true;
    if (f && d) { if (f.parentNode !== d) d.appendChild(f); } else ok = false;
    if (r && dr) { if (r.parentNode !== dr) dr.appendChild(r); } else ok = false;
    return ok;
  };
  if (!llevar()) { var vv = 0, tm = setInterval(function () { if (llevar() || ++vv > 60) clearInterval(tm); }, 100); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-ir]'); if (!a) return;
    var f = $('pedir'); if (!f) return; e.preventDefault();
    f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' });
  });

  /* contador hasta la medianoche de Ciudad de México */
  var reloj = $('rdReloj');
  var tic = function () {
    var m = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
    var finD = new Date(m); finD.setHours(24, 0, 0, 0);
    var s = Math.max(0, Math.floor((finD - m) / 1000)), d2 = function (v) { return (v < 10 ? '0' : '') + v; };
    reloj.querySelector('[data-h]').textContent = d2(Math.floor(s / 3600));
    reloj.querySelector('[data-m]').textContent = d2(Math.floor(s % 3600 / 60));
    reloj.querySelector('[data-s]').textContent = d2(s % 60);
  };
  if (reloj) { tic(); setInterval(tic, 1000); }

  /* video real (cuando lo haya): se carga al primer movimiento */
  var v = raiz.querySelector('video[data-src]');
  if (v) {
    var prender = function () { if (v.src) return; v.src = v.getAttribute('data-src'); v.load(); var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); };
    addEventListener('scroll', prender, { once: true, passive: true }); addEventListener('touchstart', prender, { once: true, passive: true });
  }
})();
