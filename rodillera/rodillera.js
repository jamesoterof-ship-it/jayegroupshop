/* ============================================================
   RODILLERA CON RESORTES · MÉXICO · 08-11-2026 (v2) · colores y letras del plano del script, corrida 125 "Azul clínico".
   James 08-11: "rediseña… el producto no se ve… nunca puedes tapar un producto… nada de carruseles… mira las demás páginas,
   en las secciones que tengan imágenes, que tengan todo… siempre tienes que poner un video".
   Orden del ORGANIZADOR de Chile (la que más vende): héroe → datos → ficha de compra → lo que hace → video real →
   qué es (foto) → cómo funciona (foto) → cómo se pone (foto) → de qué está hecha → promoción → día a día (4 fotos grandes) →
   comparación → números → reseñas → antes y después → preguntas → por qué la quieres → con quién se despacha → formulario.
   Cada foto va ENTERA y el texto en su propio bloque. Sin carruseles. El título se ve aunque la animación no corra.
   De la plantilla solo se usa la LÓGICA: ficha.js pinta el formulario (#pedir) y las opiniones (#resenas); aquí se mudan.
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
  var off = uno.antes ? Math.round((1 - uno.precio / uno.antes) * 100) : 0;
  var rot = function (t) { return '<p class="rd-rot">' + esc(t) + '</p>'; };
  var tit = function (t, id) { return '<h2 class="rd-tit"' + (id ? ' id="' + id + '"' : '') + '>' + esc(t) + '</h2>'; };
  var cta = function (t, nota) { return '<a class="rd-btn" href="#pedir" data-ir>' + esc(t) + '</a>' + (nota ? '<p class="rd-btn-nota">' + esc(nota) + '</p>' : ''); };
  var foto = function (src, alt, borde) { return '<img class="rd-foto' + (borde ? ' rd-foto--borde' : '') + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" width="900" height="1350" data-rd>'; };
  var ico = {
    resorte: '<path d="M6 3h12M7 6.5l10 3M7 10.5l10 3M7 14.5l10 3M6 21h12"/>',
    capa: '<path d="M7 3c-2 3-2 15 0 18M17 3c2 3 2 15 0 18M7 8h10M7 16h10"/>',
    correa: '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M8 8v8M16 8v8"/>',
    par: '<path d="M8 3v18M16 3v18M5 7h6M13 7h6M5 17h6M13 17h6"/>',
    ok: '<path d="M5 12l4 4 10-10"/>',
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ico[k] + '</svg>'; };
  var H = P.heroe, html = [];

  /* 1 · HÉROE: texto arriba en su bloque, foto del producto entera abajo, franja de datos */
  html.push('<section class="rd-heroe" aria-labelledby="rdTit"><div class="rd-heroe__marco">'
    + '<img class="rd-heroe__foto" src="' + esc(H.img) + '" alt="' + esc(H.alt) + '" width="1024" height="1536" fetchpriority="high">'
    + '<div class="rd-heroe__txt">'
    /* 11-11 James: las mismas estrellas de la ficha, arriba del título (promedio real) */
    + (RES.length ? '<p class="rd-est"><i aria-hidden="true">★★★★★</i> ' + media.toFixed(1).replace('.', ',') + ' · ' + RES.length + ' opiniones</p>' : '')
    + rot(H.rotulo)
    + '<h1 id="rdTit"><span>' + esc(H.l1) + '</span><span>' + esc(H.l2) + ' <b id="rdClave">' + esc(H.clave) + '</b></span></h1></div></div>'
    + '<p class="rd-heroe__frase" style="margin:0;padding:16px 20px;background:#FFFFFF">' + esc(H.frase) + '</p>'
    + '<ul class="rd-datos">' + H.datos.map(function (d) { return '<li><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></li>'; }).join('') + '</ul></section>');

  /* 2 · FICHA DE COMPRA */
  html.push('<section class="rd-ficha"><p class="rd-est"><i aria-hidden="true">★★★★★</i> ' + media.toFixed(1).replace('.', ',') + ' · ' + RES.length + ' opiniones</p>'
    + '<h2>' + esc(PR.nombre) + '</h2><p class="rd-ficha__sub">' + esc(PR.sub) + '</p>'
    + '<p class="rd-precio"><b>' + mx(uno.precio) + '</b>' + (uno.antes ? '<s>' + mx(uno.antes) + '</s><em>−' + off + ' %</em>' : '') + '</p>'
    + '<p class="rd-ficha__pack">' + esc(uno.texto) + ' = 2 rodilleras · envío gratis</p>'
    + (pre[0] ? '<p class="rd-ficha__tarj">o <b>' + mx(pre[0]) + '</b> pagando ahora con tarjeta · −' + pct + ' % y entrega prioritaria</p>' : '')
    + cta('Lo quiero, pago al recibir', 'Envío gratis · pagas al recibir o con tarjeta y ahorras ' + pct + ' %') + '</section>');

  /* 3 · LO QUE HACE POR TI */
  html.push('<section class="rd-sec"><div class="rd-in">' + rot(P.hace.rotulo)
    + '<ul class="rd-hace">' + P.hace.lista.map(function (x) { return '<li><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></li>'; }).join('') + '</ul></div></section>');

  /* 4 · VIDEO REAL */
  var V = P.video;
  if (V && V.src) html.push('<section class="rd-sec rd-sec--blanca" aria-labelledby="rdVid"><div class="rd-in">' + rot(V.rotulo) + tit(V.titulo, 'rdVid')
    + '<p class="rd-txt">' + esc(V.texto) + '</p>'
    + '<div class="rd-video"><video data-src="' + esc(V.src) + '" poster="' + esc(V.poster) + '" muted loop playsinline preload="none" controls aria-label="' + esc(V.alt) + '"></video></div></div></section>');

  /* 5 · QUÉ ES · 6 · CÓMO FUNCIONA · 7 · CÓMO SE PONE (cada una con su foto grande) */
  var Q = P.producto, R = P.resortes, S = P.sePone;
  html.push('<section class="rd-sec"><div class="rd-in">' + rot(Q.rotulo) + tit(Q.titulo) + foto(Q.img, Q.alt) + '<p class="rd-txt">' + Q.texto + '</p></div></section>');
  html.push('<section class="rd-sec rd-sec--blanca"><div class="rd-in">' + rot(R.rotulo) + tit(R.titulo) + foto(R.img, R.alt) + '<p class="rd-txt">' + R.texto + '</p></div></section>');
  html.push('<section class="rd-sec"><div class="rd-in">' + rot(S.rotulo) + tit(S.titulo) + foto(S.img, S.alt)
    + '<ol class="rd-pasos">' + S.pasos.map(function (p) { return '<li><span>' + p + '</span></li>'; }).join('') + '</ol></div></section>');

  /* 8 · DE QUÉ ESTÁ HECHA */
  var K = P.hecha, kicos = ['resorte', 'capa', 'correa', 'par'];
  html.push('<section class="rd-sec rd-sec--azul"><div class="rd-in">' + rot(K.rotulo) + tit(K.titulo)
    + '<ul class="rd-lista">' + K.lista.map(function (x, i) { return '<li>' + svg(kicos[i % 4]) + '<div><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div></li>'; }).join('') + '</ul>'
    + cta('Lo quiero, pago al recibir') + '</div></section>');

  /* 9 · PROMOCIÓN: imagen de la promo, tarjeta con contador, pago con tarjeta y packs */
  var preP = pre[PR.popular || 0];
  html.push('<section class="rd-sec rd-sec--blanca" aria-labelledby="rdOf"><div class="rd-in">' + rot('Promoción por tiempo limitado') + tit('Lleva el paquete más pedido', 'rdOf')
    + foto(P.promoImg, 'Promoción: rodillera con resortes, 1 par a ' + mx(uno.precio))
    + '<div class="rd-oferta" data-rd><div class="rd-oferta__cab"><span>Promoción</span><span>Termina hoy</span></div><div class="rd-oferta__cuerpo">'
    + '<h3>' + esc(P.promoTitulo) + '</h3>'
    + '<p class="rd-precio"><b>' + mx(pop.precio) + '</b>' + (pop.antes ? '<s>' + mx(pop.antes) + '</s>' : '') + '</p>'
    + (preP ? '<p class="rd-ficha__tarj">o <b>' + mx(preP) + '</b> pagando ahora con tarjeta · −' + pct + ' % y entrega prioritaria</p>' : '')
    + '<div class="rd-reloj" id="rdReloj" aria-label="La promoción termina hoy a la medianoche"><span><b data-h>00</b>horas</span><span><b data-m>00</b>min</span><span><b data-s>00</b>seg</span></div>'
    + cta('Quiero la promoción') + '</div></div>'
    + '<div class="rd-pre" data-rd><p class="rd-pre__tit"><span>−' + pct + ' %</span>Paga con tarjeta y gana</p><ul>'
    + '<li><b>' + pct + ' % de descuento</b> en todos los paquetes: ' + packs.map(function (k, i) { return esc(k.texto) + ' <b>' + mx(pre[i]) + '</b>'; }).join(' · ') + '</li>'
    + '<li><b>Entrega prioritaria:</b> tu pedido sale primero</li><li><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</li></ul>'
    + '<div class="rd-pre__pie"><span class="rd-pre__logos"><img src="/img/pago/paypal-texto.svg" alt="PayPal" width="60" height="18"><img src="/img/pago/visa-claro.svg" alt="Visa" width="38" height="23"><img src="/img/pago/mastercard-claro.svg" alt="Mastercard" width="38" height="23"></span>'
    + '<a class="rd-btn rd-btn--chico" href="#pedir" data-ir>Pagar con tarjeta</a></div></div>'
    + '<div style="margin-top:22px">' + foto(P.packsImg, 'Paquetes: 1 par ' + mx(packs[0].precio) + ', 2 pares ' + mx(packs[1].precio) + ', 3 pares ' + mx(packs[2].precio)) + '</div></div></section>');

  /* 10 · DÍA A DÍA: fotos grandes una debajo de otra (sin carrusel) */
  var D = P.dia;
  html.push('<section class="rd-sec"><div class="rd-in">' + rot(D.rotulo) + tit(D.titulo)
    + D.escenas.map(function (e) { return '<figure class="rd-escena" data-rd><img src="' + esc(e[0]) + '" alt="' + esc(e[3]) + '" loading="lazy" width="900" height="1350"><figcaption><b>' + esc(e[1]) + '</b>' + esc(e[2]) + '</figcaption></figure>'; }).join('')
    + cta('Lo quiero, pago al recibir') + '</div></section>');

  /* 11 · COMPARACIÓN + NÚMEROS */
  var C = P.compara;
  html.push('<section class="rd-sec rd-sec--blanca"><div class="rd-in">' + rot('La diferencia') + tit(C.titulo)
    + '<table class="rd-comp" data-rd><thead><tr><th scope="col">Qué te da</th><th scope="col" class="rd-nos">' + esc(C.nos) + '</th><th scope="col">' + esc(C.otro) + '</th></tr></thead><tbody>'
    + C.filas.map(function (f) { return '<tr><td>' + esc(f) + '</td><td class="rd-si" aria-label="Sí">✓</td><td class="rd-no" aria-label="No">✕</td></tr>'; }).join('') + '</tbody></table>'
    + '<div style="margin-top:32px">' + rot('Lo que te garantizamos') + '</div>'
    + '<ul class="rd-numeros" data-rd><li><b>$0</b>de envío a todo México</li><li><b>2 a 5</b>días hábiles</li><li><b>30</b>días de garantía</li><li><b>Al recibir</b>pagas en efectivo</li></ul></div></section>');

  /* 12 · RESEÑAS (de ficha.js) + 13 · ANTES Y DESPUÉS */
  var B = P.cambio;
  html.push('<section class="rd-sec"><div class="rd-in"><div id="mxResFicha"></div></div></section>');
  html.push('<section class="rd-sec rd-sec--blanca"><div class="rd-in">' + rot(B.rotulo) + tit(B.titulo) + '<p class="rd-txt">' + esc(B.texto) + '</p>'
    + foto(B.img, B.alt) + cta('Quiero ese cambio') + '</div></section>');

  /* 14 · PREGUNTAS · 15 · POR QUÉ LA QUIERES · 16 · CON QUIÉN SE DESPACHA · 17 · FORMULARIO */
  var W = P.porque;
  html.push('<section class="rd-sec" aria-labelledby="rdFaq"><div class="rd-in">' + rot('Preguntas frecuentes') + tit('Lo que nos preguntan', 'rdFaq')
    + '<div class="rd-faq">' + P.preguntas.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div></div></section>');
  html.push('<section class="rd-sec rd-sec--azul"><div class="rd-in">' + rot(W.rotulo) + tit(W.titulo)
    + '<ul class="rd-lista">' + W.lista.map(function (x) { return '<li>' + svg('ok') + '<div><span>' + esc(x) + '</span></div></li>'; }).join('') + '</ul>'
    + '<p class="rd-txt">Desde <b style="color:inherit">' + mx(uno.precio) + '</b> · envío gratis y pagas cuando la recibes.</p>' + cta('Pedir la mía ahora') + '</div></section>');
  html.push('<section class="rd-sec rd-sec--blanca"><div class="rd-in">' + rot('Con quién se despacha') + '<div class="rd-despacho" data-rd>'
    + '<div><img src="../boquilla/img/logos/veloces.webp" alt="Veloces" loading="lazy"><b>Veloces</b><span>Entrega a domicilio</span></div>'
    + '<div><img src="../boquilla/img/logos/afimex.webp" alt="Afimex" loading="lazy"><b>Afimex</b><span>Envío a todo México</span></div>'
    + '<div><img src="../boquilla/img/logos/quality-post.webp" alt="Quality Post" loading="lazy"><b>Quality Post</b><span>Guía rastreable por WhatsApp</span></div>'
    + '<div class="rd-despacho__pago"><b>Pagas al recibir</b><span>Al repartidor, cuando la tienes en la mano</span></div></div></div></section>');
  html.push('<section class="rd-sec" aria-labelledby="rdPide"><div class="rd-in">' + tit('Pide la tuya', 'rdPide') + '<div id="mxForm"></div></div></section>');

  raiz.innerHTML = html.join('');
  var salto = document.createElement('a'); salto.className = 'rd-saltar'; salto.href = '#pedir'; salto.textContent = 'Saltar al pedido'; document.body.insertBefore(salto, document.body.firstChild);
  var fijo = document.createElement('div'); fijo.className = 'rd-fijo'; fijo.innerHTML = '<a href="#pedir" data-ir>Lo quiero · ' + mx(uno.precio) + ' al recibir</a>'; document.body.appendChild(fijo);

  /* título letra por letra: solo se mueve, nunca queda escondido */
  if (!calma) {
    var k = 0;
    (function rec(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { rec(c); return; }
        if (c.nodeType !== 3 || !c.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function (pal) {
          if (!pal) return;
          if (/^\s+$/.test(pal)) { frag.appendChild(document.createTextNode(pal)); return; }
          var w = document.createElement('span'); w.style.whiteSpace = 'nowrap'; w.style.display = 'inline';
          pal.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'rd-le'; s.style.animationDelay = (k++ * 35) + 'ms'; s.textContent = ch; w.appendChild(s); });
          frag.appendChild(w);
        });
        n.replaceChild(frag, c);
      });
    })($('rdTit'));
    setTimeout(function () { $('rdClave').classList.add('rd-rebota'); }, 900);
  }

  /* aparecer al bajar (solo desplaza, nunca esconde) */
  var vistos = raiz.querySelectorAll('[data-rd]');
  if (calma || !('IntersectionObserver' in window)) vistos.forEach(function (el) { el.classList.add('rd-ver'); });
  else {
    var obs = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('rd-ver'); obs.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    vistos.forEach(function (el) { obs.observe(el); });
  }

  /* botón fijo: aparece después de la ficha de compra y se esconde en el formulario y el pie */
  var ficha = raiz.querySelector('.rd-ficha');
  var mirar = function () {
    var y = window.scrollY || 0, f = $('pedir'), pie = document.querySelector('footer.pie');
    var enF = f ? (function (r) { return r.top < innerHeight && r.bottom > 0; })(f.getBoundingClientRect()) : false;
    var enPie = pie ? pie.getBoundingClientRect().top < innerHeight : false;
    fijo.classList.toggle('rd-fijo--ver', y > ficha.offsetTop + ficha.offsetHeight - 60 && !enF && !enPie);
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

  /* video real: se carga al acercarse y se reproduce solo, sin sonido */
  var v = raiz.querySelector('video[data-src]');
  if (v) {
    var prender = function () { if (v.src) return; v.src = v.getAttribute('data-src'); v.load(); if (!calma) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } };
    if ('IntersectionObserver' in window) { var ov = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { prender(); ov.disconnect(); } }, { rootMargin: '400px 0px' }); ov.observe(v); }
    else prender();
  }
})();
