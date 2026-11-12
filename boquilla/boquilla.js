/* ============================================================
   BOQUILLA DE ALTA PRESIÓN · MÉXICO · 06-11-2026 · composición PROPIA, del plano del script ui-ux-pro-max
   -p "boquilla-mexico" (corrida 116, aprobada por James "Sí, arma"; James 06-11: "el diseño del script, no tuyo… el mismo del NAD, sea serio").
   · Patrón Funnel (3-Step Conversion): Hero → Paso 1 (problema) → Paso 2 (solución) → Paso 3 (acción) → CTA progresivo.
     Indicador de avance, un mini-botón en cada paso y el botón principal al final.
   · Estilo Kinetic Typography: titular partido letra por letra, efecto de escritura, texto que corre, palabras que entran al hacer scroll.
   De la plantilla solo se usa la LÓGICA: ficha.js pinta el formulario (#pedir) y las opiniones (#resenas); aquí se mudan de lugar.
   ============================================================ */
(function () {
  var P = window.PAGINA || {}, PR = (window.PRODUCTOS || [])[0] || {};
  var raiz = document.getElementById('mxp');
  if (!raiz || !P.heroe) return;
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mx = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
  var packs = PR.packs || [], pre = (PR.anticipado || {}).precios || [], pct = (PR.anticipado || {}).pct || 10;
  var uno = packs[0] || {}, pop = packs[PR.popular || 0] || uno;
  var $ = function (id) { return document.getElementById(id); };
  var mini = function (t) { return '<a class="bq-mini" href="#pedir" data-ir>' + esc(t) + '<i aria-hidden="true">→</i></a>'; };
  var paso = function (n, rot, tit) { return '<header class="bq-paso__cab"><span class="bq-num" aria-hidden="true">0' + n + '</span><p class="bq-rot">Paso ' + n + ' · ' + esc(rot) + '</p><h2 class="bq-kin" data-kin>' + esc(tit) + '</h2></header>'; };
  var H = P.heroe, html = [];
  /* 11-11 James: las mismas estrellas de las opiniones, arriba del título (promedio real) */
  var RS = window.RESENAS || [];
  var notaTop = RS.length ? '<p class="bq-nota"><span class="stars" aria-hidden="true">★★★★★</span> ' + (RS.reduce(function (a, r) { return a + (+r.estrellas || 5); }, 0) / RS.length).toFixed(1).replace('.', ',') + ' · ' + RS.length + ' opiniones</p>' : '';

  /* HÉROE · tipografía en movimiento sobre el producto solo y grande */
  /* 06-11 James: "el héroe, ponle efecto de agua, caen gotas" */
  var gotas = ''; for (var g = 0; g < 18; g++) gotas += '<i style="left:' + (3 + Math.round(Math.random() * 94)) + '%;animation-delay:' + (Math.random() * 3.2).toFixed(2) + 's;animation-duration:' + (1.6 + Math.random() * 1.6).toFixed(2) + 's;--t:' + (0.6 + Math.random() * 0.8).toFixed(2) + '"></i>';
  html.push('<section class="bq-heroe"><img class="bq-heroe__img" src="' + esc(H.img) + '" alt="' + esc(H.alt) + '" width="780" height="1170" fetchpriority="high">'
    + (calma ? '' : '<div class="bq-gotas" aria-hidden="true">' + gotas + '</div>')
    + '<div class="bq-heroe__txt">' + notaTop + '<p class="bq-rot bq-rot--claro">' + esc(H.rotulo) + '</p>'
    + '<h1 id="bqTit"><span class="bq-l1">Tu manguera</span><span class="bq-l2">con <b>fuerza</b></span></h1>'
    + '<p class="bq-escribe" aria-live="off"><span id="bqEscribe">lava tu auto</span><i class="bq-cursor" aria-hidden="true"></i></p></div>'
    + '<div class="bq-heroe__pie"><p class="bq-pastilla">Desde <b>' + mx(uno.precio) + '</b> · pagas al recibir</p><a class="bq-btn" href="#pedir" data-ir>Lo quiero</a></div></section>');

  /* texto que corre (Kinetic) */
  var corre = ['Cuerpo de metal', 'Chorro potente', 'Lluvia fina', 'Corte de agua', 'Conector de latón', 'Envío gratis', 'Pagas al recibir'];
  var cinta = corre.map(function (t) { return '<span>' + esc(t) + '</span><em aria-hidden="true">✦</em>'; }).join('');
  html.push('<div class="bq-corre" aria-label="' + esc(corre.join(', ')) + '"><div class="bq-corre__pista">' + cinta + cinta + '</div></div>');

  /* INDICADOR DE AVANCE del embudo */
  html.push('<nav class="bq-avance" id="bqAvance" aria-label="Avance"><a href="#bqP1" data-p="1"><b>1</b>El problema</a><a href="#bqP2" data-p="2"><b>2</b>La solución</a><a href="#bqP3" data-p="3"><b>3</b>Tu pedido</a><i class="bq-avance__barra" id="bqBarra"></i></nav>');

  /* PASO 1 · EL PROBLEMA */
  var B = P.cambio;
  html.push('<section class="bq-paso" id="bqP1">' + paso(1, 'El problema', '¿Tu manguera solo gotea?')
    + '<p class="bq-txt" data-rev>Tapar la punta con el dedo no da presión: te mojas, el lodo no se va y gastas más agua.</p>'
    + '<figure class="bq-ba" data-rev><img src="' + esc(B.una) + '" alt="' + esc(B.altA + ' / ' + B.altD) + '" loading="lazy" width="720" height="1080"><figcaption>Imagen ilustrativa.</figcaption></figure>'
    + mini('Quiero más fuerza') + '</section>');

  /* PASO 2 · LA SOLUCIÓN */
  var Q = P.quees, F = P.formula;
  html.push('<section class="bq-paso bq-paso--osc" id="bqP2">' + paso(2, 'La solución', 'Gira la punta. Cambia el chorro.')
    + '<p class="bq-txt" data-rev>' + esc(Q.texto) + '</p>'
    + (P.video ? '<div class="bq-video" data-rev><video data-src="' + esc(P.video) + '" poster="' + esc(P.videoPoster || '') + '" muted loop playsinline preload="none" aria-label="' + esc(P.videoAlt || '') + '"></video></div>' : '')
    + '<ol class="bq-carril" data-rev>' + P.pasos.lista.map(function (p, i) { return '<li><img src="' + esc(p[0]) + '" alt="' + esc(p[2]) + '" loading="lazy" width="720" height="720"><p><span>' + (i + 1) + '</span>' + p[1] + '</p></li>'; }).join('') + '</ol>'
    + '<ul class="bq-grandes">' + F.lista.slice(0, 4).map(function (x) { return '<li data-rev><b>' + esc(x[1]) + '</b><span>' + esc(x[2]) + '</span></li>'; }).join('') + '</ul>'
    + mini('Elegir mi paquete') + '</section>');

  /* PASO 3 · TU PEDIDO */
  var preP = pre[PR.popular || 0];
  html.push('<section class="bq-paso" id="bqP3">' + paso(3, 'Tu pedido', 'Elige y recíbela en casa.')
    + '<div class="bq-oferta" data-rev><img src="' + esc(P.promoImg) + '" alt="' + esc(pop.texto) + '" loading="lazy" width="720" height="720">'
    + '<div class="bq-oferta__cuerpo"><p class="bq-rot">Promoción de hoy</p><h3>' + esc(P.promoTitulo) + '</h3>'
    + '<p class="bq-precio"><b>' + mx(pop.precio) + '</b>' + (pop.antes ? '<s>' + mx(pop.antes) + '</s>' : '') + '</p>'
    + (preP ? '<p class="bq-tarjeta">o <b>' + mx(preP) + '</b> pagando ahora con tarjeta · −' + pct + ' % y entrega prioritaria</p>' : '')
    + '<div class="bq-reloj" id="bqReloj" aria-label="La promoción termina hoy"><span><b data-h>00</b>h</span><span><b data-m>00</b>m</span><span><b data-s>00</b>s</span></div>'
    + '<a class="bq-btn bq-btn--ancho" href="#pedir" data-ir>Quiero la promoción</a></div></div>'
    /* 06-11 James: "¿dónde está el pago anticipado que siempre ponemos abajo en la promoción?" */
    + '<div class="bq-pre" data-rev><p class="bq-pre__tit"><span>−' + pct + ' %</span>Paga con tarjeta y gana</p><ul>'
    + '<li><b>' + pct + ' % de descuento</b> en todos los paquetes: ' + packs.map(function (k, i) { return esc(k.texto) + ' <b>' + mx(pre[i]) + '</b>'; }).join(' · ') + '</li>'
    + '<li><b>Entrega prioritaria:</b> tu pedido sale primero</li><li><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</li></ul>'
    + '<div class="bq-pre__pie"><span class="bq-pre__logos"><img src="/img/pago/paypal-texto.svg" alt="PayPal" width="60" height="18"><img src="/img/pago/visa-claro.svg" alt="Visa" width="38" height="23"><img src="/img/pago/mastercard-claro.svg" alt="Mastercard" width="38" height="23"></span>'
    + '<a class="bq-btn bq-btn--chico" href="#pedir" data-ir>Pagar con tarjeta</a></div></div>'
    + '<img class="bq-packs" src="img/boq-packs.webp?v=1" alt="Paquetes de 1, 2 y 3 boquillas" loading="lazy" width="720" height="720" data-rev>'
    + '<div id="mxResFicha"></div>'
    + '<div class="bq-faq"><h3 class="bq-kin" data-kin>Lo que nos preguntan</h3>' + P.preguntas.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div>'
    + '<ul class="bq-garantias" data-rev><li><b>$0</b>de envío a todo México</li><li><b>2 a 5</b>días hábiles</li><li><b>30</b>días de garantía</li><li><b>Al recibir</b>pagas en efectivo</li></ul>'
    /* 06-11 James: "falta la sección de cómo entregamos, revísala en las demás páginas" (cebo y NAD+: "Con quién se despacha") */
    + '<div class="bq-despacho"><h3 class="bq-kin" data-kin>Con quién se despacha</h3><div class="bq-despacho__g" data-rev>'
    + '<div><img src="img/logos/veloces.webp" alt="Veloces" loading="lazy"><b>Veloces</b><span>Entrega a domicilio</span></div>'
    + '<div><img src="img/logos/afimex.webp" alt="Afimex" loading="lazy"><b>Afimex</b><span>Envío a todo México</span></div>'
    + '<div><img src="img/logos/quality-post.webp" alt="Quality Post" loading="lazy"><b>Quality Post</b><span>Guía rastreable por WhatsApp</span></div>'
    + '<div class="bq-despacho__pago"><b>Pagas al recibir</b><span>Al repartidor, cuando la tienes en la mano</span></div></div></div>'
    + '<div class="bq-compra"><h2 class="bq-kin" data-kin>Pide la tuya</h2><div id="mxForm"></div></div></section>');

  raiz.innerHTML = html.join('');
  var fijo = document.createElement('div'); fijo.className = 'bq-fijo'; fijo.innerHTML = '<a href="#pedir" data-ir>Lo quiero · ' + mx(uno.precio) + ' al recibir</a>'; document.body.appendChild(fijo);

  /* titular letra por letra */
  var partir = function (nodo, paso0) {
    var k = paso0 || 0;
    (function rec(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { rec(c); return; }
        if (c.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function (pal) {
          if (!pal) return;
          if (/^\s+$/.test(pal)) { frag.appendChild(document.createTextNode(pal)); return; }
          var w = document.createElement('span'); w.className = 'bq-pal';
          pal.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'bq-le'; s.style.animationDelay = (k++ * 35) + 'ms'; s.textContent = ch; w.appendChild(s); });
          frag.appendChild(w);
        });
        n.replaceChild(frag, c);
      });
    })(nodo);
  };
  if (!calma) partir($('bqTit'));

  /* efecto de escritura: los usos de la boquilla se escriben y se borran */
  var usos = ['lava tu auto', 'riega tu jardín', 'limpia tu cochera', 'quita el lodo de las llantas'], ui = 0, ci = 0, borra = false, out = $('bqEscribe');
  if (out && !calma) {
    (function escribir() {
      var t = usos[ui];
      out.textContent = t.slice(0, ci);
      if (!borra && ci < t.length) { ci++; setTimeout(escribir, 70); }
      else if (!borra) { borra = true; setTimeout(escribir, 1400); }
      else if (ci > 0) { ci--; setTimeout(escribir, 35); }
      else { borra = false; ui = (ui + 1) % usos.length; setTimeout(escribir, 300); }
    })();
  }

  /* títulos de cada paso: entran palabra por palabra al aparecer en pantalla (scroll-triggered) */
  raiz.querySelectorAll('[data-kin]').forEach(function (h) {
    var pals = h.textContent.split(' ');
    h.innerHTML = pals.map(function (p, i) { return '<span class="bq-w" style="transition-delay:' + (i * 90) + 'ms">' + esc(p) + '</span>'; }).join(' ');
  });
  var vistos = raiz.querySelectorAll('[data-kin],[data-rev]');
  if (calma || !('IntersectionObserver' in window)) vistos.forEach(function (el) { el.classList.add('bq-ver'); });
  else {
    var obs = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('bq-ver'); obs.unobserve(x.target); } }); }, { rootMargin: '0px 0px -10% 0px' });
    vistos.forEach(function (el) { obs.observe(el); });
    setTimeout(function () { vistos.forEach(function (el) { el.classList.add('bq-ver'); }); }, 6000);
  }

  /* indicador de avance del embudo + botón fijo */
  var pasos = [$('bqP1'), $('bqP2'), $('bqP3')], av = $('bqAvance'), barra = $('bqBarra'), heroe = raiz.querySelector('.bq-heroe');
  /* el indicador se pega justo debajo del encabezado fijo de la tienda */
  var peg = $('pegado'), alto = function () { if (peg && /sticky|fixed/.test(getComputedStyle(peg).position)) av.style.setProperty('--bq-top', peg.offsetHeight + 'px'); };
  alto(); addEventListener('resize', alto);
  var mirar = function () {
    var y = window.scrollY || 0, ini = pasos[0].offsetTop - 120, fin = pasos[2].offsetTop + pasos[2].offsetHeight - innerHeight;
    barra.style.transform = 'scaleX(' + Math.max(0, Math.min(1, (y - ini) / Math.max(1, fin - ini))) + ')';
    var act = 0; pasos.forEach(function (s, i) { if (y + innerHeight * 0.4 >= s.offsetTop) act = i + 1; });
    av.querySelectorAll('a').forEach(function (a) { a.classList.toggle('on', +a.getAttribute('data-p') <= act); });
    var f = $('pedir'), pie = document.querySelector('footer.pie');
    var enF = f ? (function (r) { return r.top < innerHeight && r.bottom > 0; })(f.getBoundingClientRect()) : false;
    var enPie = pie ? pie.getBoundingClientRect().top < innerHeight : false;
    fijo.classList.toggle('bq-fijo--ver', y > heroe.offsetHeight - 80 && !enF && !enPie);
  };
  addEventListener('scroll', mirar, { passive: true }); addEventListener('resize', mirar); mirar();

  /* formulario y opiniones de ficha.js a su lugar en el paso 3 */
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
  var reloj = $('bqReloj');
  var tic = function () {
    var m = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
    var finD = new Date(m); finD.setHours(24, 0, 0, 0);
    var s = Math.max(0, Math.floor((finD - m) / 1000)), d2 = function (v) { return (v < 10 ? '0' : '') + v; };
    reloj.querySelector('[data-h]').textContent = d2(Math.floor(s / 3600));
    reloj.querySelector('[data-m]').textContent = d2(Math.floor(s % 3600 / 60));
    reloj.querySelector('[data-s]').textContent = d2(s % 60);
  };
  if (reloj) { tic(); setInterval(tic, 1000); }

  /* 06-11 James: el carrusel de pasos se mueve SOLO, de lado (se pausa mientras el cliente lo toca) */
  var carril = raiz.querySelector('.bq-carril');
  if (carril && !calma) {
    var quieto = false, tq;
    var pausa = function () { quieto = true; clearTimeout(tq); tq = setTimeout(function () { quieto = false; }, 4000); };
    carril.addEventListener('touchstart', pausa, { passive: true }); carril.addEventListener('mousedown', pausa); carril.addEventListener('wheel', pausa, { passive: true });
    setInterval(function () {
      if (quieto || document.hidden) return;
      var li = carril.querySelector('li'); if (!li) return;
      var paso = li.offsetWidth + 14, fin = carril.scrollWidth - carril.clientWidth - 4;
      carril.scrollTo({ left: carril.scrollLeft >= fin ? 0 : carril.scrollLeft + paso, behavior: 'smooth' });
    }, 2600);
  }

  /* video real: se carga al primer movimiento */
  var v = raiz.querySelector('video[data-src]');
  if (v) {
    var prender = function () { if (v.src) return; v.src = v.getAttribute('data-src'); v.load(); var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); };
    addEventListener('scroll', prender, { once: true, passive: true }); addEventListener('touchstart', prender, { once: true, passive: true });
    addEventListener('load', function () { setTimeout(prender, 1500); });
  }
})();
