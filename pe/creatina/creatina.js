/* ============================================================
   CREATINA EN GOMITAS · PERÚ · 09-11-2026 · arma las secciones con los textos de productos.js (window.PAGINA).
   Orden del plano del script "creatina-peru" (patrón Feature-Rich Showcase):
     héroe (propuesta de valor) → tarjetas de rasgos (6) → usos/beneficios → prueba social → CTA,
     con el botón en el héroe (pegado al bajar) + después de las tarjetas + al final.
   Lo que el plano no define se tomó del orden de las fichas de México (rodillera): ficha de compra después del héroe,
   promoción con pago con tarjeta, preguntas frecuentes y el formulario al final.
   Gamificación (el plano prohíbe "sin gamificación"): los paquetes son NIVELES con barra de poder.
   El formulario lo pinta ../ficha.js dentro de #pedir.
   ============================================================ */
(function () {
  var P = window.PAGINA || {}, PR = (window.PRODUCTOS || [])[0] || {};
  var raiz = document.getElementById('crp');
  if (!raiz || !P.heroe) return;
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var soles = function (n) { n = Number(n); return 'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
  var $ = function (id) { return document.getElementById(id); };
  var packs = PR.packs || [], pre = (PR.anticipado || {}).precios || [], pct = (PR.anticipado || {}).pct || 10;
  var uno = packs[0] || {}, top = PR.popular || 0;
  var off = uno.antes ? Math.round((1 - uno.precio / uno.antes) * 100) : 0;
  var rot = function (t) { return '<p class="cr-rot">' + esc(t) + '</p>'; };
  var tit = function (t, id) { return '<h2 class="cr-tit"' + (id ? ' id="' + id + '"' : '') + '>' + esc(t) + '</h2>'; };
  var cta = function (t, nota, extra) { return '<a class="cr-btn" href="#pedir" data-ir' + (extra || '') + '>' + esc(t) + '</a>' + (nota ? '<p class="cr-btn-nota">' + esc(nota) + '</p>' : ''); };
  /* íconos SVG de trazo (línea Lucide), nunca emojis */
  var ico = {
    gomita: '<path d="M12 4c4.4 0 8 2.7 8 6.5S16.4 20 12 20s-8-5.7-8-9.5S7.6 4 12 4z"/><path d="M8.5 10.5h.01M15.5 10.5h.01"/>',
    fuerza: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',
    sabor: '<path d="M12 21c4.4 0 7-3.1 7-6.5 0-3.8-3.4-6.5-7-6.5s-7 2.7-7 6.5c0 3.4 2.6 6.5 7 6.5z"/><path d="M12 8c0-2.5 1.5-4.5 4-5"/>',
    mochila: '<rect x="5" y="7" width="14" height="14" rx="3"/><path d="M9 7V5a3 3 0 0 1 6 0v2M9 13h6"/>',
    frasco: '<rect x="6" y="8" width="12" height="13" rx="2"/><path d="M7 4h10v4H7zM9 13h6M9 16h4"/>',
    caja: '<path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10"/>',
    ok: '<path d="M5 12l4 4 10-10"/>',
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ico[k] || ico.ok) + '</svg>'; };
  var H = P.heroe, html = [];

  /* 1 · HÉROE: propuesta de valor, foto ENTERA del producto con la píldora de precio, datos y botón */
  html.push('<section class="cr-heroe" aria-labelledby="crTit"><div class="cr-in">'
    + '<div class="cr-heroe__txt">' + rot(H.rotulo)
    + '<h1 id="crTit"><span>' + esc(H.l1) + '</span><span>' + esc(H.l2) + ' <b id="crClave">' + esc(H.clave) + '</b></span></h1>'
    + '<p class="cr-heroe__frase">' + esc(H.frase) + '</p></div>'
    + '<figure class="cr-heroe__foto" style="margin:0"><img id="crFotoP" src="' + esc(H.img) + '" alt="' + esc(H.alt) + '" width="900" height="1350" fetchpriority="high">'
    + '<span class="cr-chip">' + (uno.antes ? '<s>' + soles(uno.antes) + '</s>' : '') + 'Desde ' + soles(uno.precio) + '</span>'
    + (H.galeria ? '<span class="cr-mini">' + H.galeria.map(function (g, i) { return '<button type="button" data-foto="' + esc(g[0]) + '" aria-label="' + esc(g[1]) + '"' + (i ? '' : ' class="sel"') + '><img src="' + esc(g[0]) + '" alt="" loading="lazy" width="80" height="80"></button>'; }).join('') + '</span>' : '')
    + '</figure>'
    + '<ul class="cr-datos">' + H.datos.map(function (d) { return '<li><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></li>'; }).join('') + '</ul>'
    + '<div>' + cta('Lo quiero, pago al recibir', 'Envío gratis a todo el Perú · despacho en 2 a 5 días') + '</div>'
    + '</div></section>');

  /* 2 · FICHA DE COMPRA (molde de México) */
  html.push('<section class="cr-sec"><div class="cr-in" style="padding-top:0"><div class="cr-ficha" data-cr>'
    + '<h2>' + esc(PR.nombre) + '</h2><p class="cr-ficha__sub">' + esc(PR.sub) + '</p>'
    + '<p class="cr-precio"><b>' + soles(uno.precio) + '</b>' + (uno.antes ? '<s>' + soles(uno.antes) + '</s><em>-' + off + ' %</em>' : '') + '</p>'
    + (pre[0] ? '<p class="cr-ficha__tarj">o <b>' + soles(pre[0]) + '</b> pagando ahora con tarjeta: −' + pct + ' % y entrega prioritaria</p>' : '')
    + cta('Pedir con pago al recibir') + '</div></div></section>');

  /* 2b · VIDEO real del frasco */
  var V = P.video;
  if (V && V.src) html.push('<section class="cr-sec cr-sec--blanca" aria-labelledby="crVid"><div class="cr-in">' + rot(V.rotulo) + tit(V.titulo, 'crVid')
    + '<div class="cr-video" data-cr><video src="' + esc(V.src) + '" poster="' + esc(V.poster) + '" muted loop playsinline autoplay preload="metadata" width="576" height="1024"></video></div></div></section>');

  /* 2c · CÓMO SE TOMA (imagen de 3 pasos) */
  var T = P.comoSeToma;
  if (T) html.push('<section class="cr-sec"><div class="cr-in">' + rot(T.rotulo) + tit(T.titulo)
    + '<figure class="cr-img" data-cr><img src="' + esc(T.img) + '" alt="' + esc(T.alt) + '" loading="lazy" width="900" height="900"></figure></div></section>');

  /* 3 · TARJETAS: un mensaje por tarjeta + botón después de las tarjetas */
  var R = P.rasgos;
  html.push('<section class="cr-sec cr-sec--blanca" aria-labelledby="crRas"><div class="cr-in">' + rot(R.rotulo) + tit(R.titulo, 'crRas')
    + '<ul class="cr-rejilla">' + R.lista.map(function (x) { return '<li class="cr-card" data-cr>' + svg(x[0]) + '<b>' + esc(x[1]) + '</b><span>' + esc(x[2]) + '</span></li>'; }).join('') + '</ul>'
    + cta('Quiero mis gomitas') + '</div></section>');

  /* 4 · USOS: 4 fotos con personas usando el frasco */
  var U = P.usos;
  html.push('<section class="cr-sec" aria-labelledby="crUso"><div class="cr-in">' + rot(U.rotulo) + tit(U.titulo, 'crUso')
    + '<ul class="cr-fotos">' + U.fotos.map(function (x) { return '<li class="cr-foto" data-cr><img src="' + esc(x[0]) + '" alt="' + esc(x[3]) + '" loading="lazy" width="900" height="900"><b>' + esc(x[1]) + '</b><span>' + esc(x[2]) + '</span></li>'; }).join('') + '</ul>'
    + cta('Lo quiero, pago al recibir') + '</div></section>');

  /* 4b · ANTES Y AHORA */
  var A = P.antesAhora;
  if (A) html.push('<section class="cr-sec cr-sec--blanca"><div class="cr-in">' + rot(A.rotulo) + tit(A.titulo)
    + '<figure class="cr-img" data-cr><img src="' + esc(A.img) + '" alt="' + esc(A.alt) + '" loading="lazy" width="900" height="1350"></figure></div></section>');

  /* 5 · NIVELES (gamificación) + pago con tarjeta −10 % */
  html.push('<section class="cr-sec" aria-labelledby="crNiv"><div class="cr-in">' + rot('Elige tu nivel') + tit('Mientras más llevas, menos pagas', 'crNiv')
    + (P.packsImg ? '<figure class="cr-img" data-cr><img src="' + esc(P.packsImg) + '" alt="Paquetes de 1, 2 y 3 frascos de Beast Bites; el de 2 frascos es el más pedido" loading="lazy" width="900" height="900"></figure>' : '')
    + '<div class="cr-niveles">' + packs.map(function (k, i) {
        return '<div class="cr-nivel' + (i === top ? ' cr-nivel--top' : '') + '" data-cr style="--xp:' + Math.round((i + 1) / packs.length * 100) + '%">'
          + (i === top ? '<span class="cr-nivel__cinta">El más pedido</span>' : '')
          + '<div class="cr-nivel__cab"><b>' + esc(k.nivel || '') + '</b><span>' + esc(k.texto) + '</span><strong>' + soles(k.precio) + '</strong></div>'
          + '<div class="cr-xp" aria-hidden="true"><i></i></div>'
          + '<p class="cr-nivel__pie">' + (k.antes ? '<s>' + soles(k.antes) + '</s> · ' : '') + (k.cant > 1 ? soles(Math.round(k.precio / k.cant * 100) / 100) + ' cada frasco' : 'para probar') + (pre[i] ? ' · con tarjeta ' + soles(pre[i]) : '') + '</p>'
          + '<p style="margin:12px 0 0"><a class="cr-btn' + (i === top ? '' : ' cr-btn--verde') + '" href="#pedir" data-ir data-pack="' + i + '">Elegir ' + esc(k.texto) + '</a></p></div>';
      }).join('') + '</div>'
    + (pre.length ? '<div class="cr-pre" data-cr><p class="cr-pre__tit"><span>-' + pct + ' %</span>Paga con tarjeta y gana</p><ul>'
      + '<li><b>' + pct + ' % de descuento</b> en todos los paquetes: ' + packs.map(function (k, i) { return esc(k.texto) + ' <b>' + soles(pre[i]) + '</b>'; }).join(' · ') + '</li>'
      + '<li><b>Entrega prioritaria:</b> tu pedido sale primero</li><li><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</li></ul>'
      + '<div class="cr-pre__pie"><span class="cr-pre__logos"><img src="/img/pago/visa-oscuro.svg" alt="Visa" width="38" height="23"><img src="/img/pago/mastercard-oscuro.svg" alt="Mastercard" width="38" height="23"><img src="/img/pago/paypal-texto-oscuro.svg" alt="PayPal" width="60" height="18"></span>'
      + '<a class="cr-btn" href="#pedir" data-ir data-pago="pre">Pagar con tarjeta</a></div></div>' : '')
    + '</div></section>');

  /* 6 · PRUEBA SOCIAL / CONFIANZA: lo que garantizamos (sin opiniones inventadas: el producto es nuevo en Perú) */
  html.push('<section class="cr-sec cr-sec--verde" aria-labelledby="crGar"><div class="cr-in">' + rot('Compra sin riesgo') + tit('Así te lo enviamos', 'crGar')
    + '<ul class="cr-numeros">' + P.garantias.map(function (x) { return '<li data-cr><b>' + esc(x[0]) + '</b>' + esc(x[1]) + '</li>'; }).join('') + '</ul>'
    + (P.promoImg ? '<figure class="cr-img" data-cr><img src="' + esc(P.promoImg) + '" alt="Repartidor entregando el pedido; pagas al recibir y el envío es gratis a todo el Perú" loading="lazy" width="900" height="900"></figure>' : '')
    + '<p class="cr-txt">Si te llega dañado o distinto, escríbenos dentro de las 48 horas con una foto y lo solucionamos sin costo para ti.</p></div></section>');

  /* 6b · OPINIONES REALES (resenas.js): resumen de estrellas de todas + las que traen texto */
  var RS = window.RESENAS || [];
  if (RS.length) {
    var prom = RS.reduce(function (a, r) { return a + r.estrellas; }, 0) / RS.length;
    var paises = { MX: 'México', CO: 'Colombia', CL: 'Chile', PE: 'Perú', AR: 'Argentina', SV: 'El Salvador', PR: 'Puerto Rico', DO: 'Rep. Dominicana', EC: 'Ecuador', BR: 'Brasil', UY: 'Uruguay', BO: 'Bolivia', PY: 'Paraguay', CR: 'Costa Rica', PA: 'Panamá', GT: 'Guatemala', HN: 'Honduras', NI: 'Nicaragua', VE: 'Venezuela' };
    var est = function (n) { return '<span class="cr-est" aria-label="' + n + ' de 5 estrellas">' + '★★★★★'.slice(0, n) + '<i>' + '★★★★★'.slice(n) + '</i></span>'; };
    var conT = RS.filter(function (r) { return r.texto && r.texto.length > 25 && r.estrellas >= 4; });
    html.push('<section class="cr-sec cr-sec--blanca" aria-labelledby="crRes"><div class="cr-in">' + rot('Opiniones reales') + tit('Lo que dicen quienes ya las probaron', 'crRes')
      + '<p class="cr-res__tot">' + est(Math.round(prom)) + ' <b>' + prom.toFixed(1).replace('.', ',') + ' de 5</b> · ' + RS.length + ' opiniones</p>'
      + '<p class="cr-btn-nota">' + esc(window.RESENAS_FUENTE || '') + '</p>'
      + '<ul class="cr-res">' + conT.map(function (r) { return '<li class="cr-card" data-cr>' + est(r.estrellas) + '<span>“' + esc(r.texto) + '”</span><b>' + esc(r.nombre) + ' · ' + esc(paises[r.pais] || r.pais) + ' · ' + esc(r.fecha) + '</b></li>'; }).join('') + '</ul></div></section>');
  }

  /* 7 · PREGUNTAS */
  html.push('<section class="cr-sec" aria-labelledby="crFaq"><div class="cr-in">' + rot('Preguntas frecuentes') + tit('Lo que nos preguntan', 'crFaq')
    + '<div class="cr-faq">' + P.preguntas.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div></div></section>');

  /* 8 · CTA FINAL */
  var C = P.cierre;
  html.push('<section class="cr-sec cr-sec--verde" aria-labelledby="crFin"><div class="cr-in">' + rot(C.rotulo) + tit(C.titulo, 'crFin')
    + '<ul class="cr-lista">' + C.lista.map(function (x) { return '<li>' + svg('ok') + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>'
    + cta('Pedir el mío ahora', 'Desde ' + soles(uno.precio) + ' · envío gratis y pagas al recibir') + '</div></section>');

  raiz.innerHTML = html.join('');
  var salto = document.createElement('a'); salto.className = 'cr-saltar'; salto.href = '#pedir'; salto.textContent = 'Saltar al pedido'; document.body.insertBefore(salto, document.body.firstChild);
  var fijo = document.createElement('div'); fijo.className = 'cr-fijo'; fijo.innerHTML = '<a class="cr-btn" href="#pedir" data-ir>Lo quiero · ' + soles(uno.precio) + ' al recibir</a>'; document.body.appendChild(fijo);

  /* título letra por letra, a saltos de pixel (solo se mueve, nunca queda escondido) */
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
          pal.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'cr-le'; s.style.animationDelay = (k++ * 40) + 'ms'; s.textContent = ch; w.appendChild(s); });
          frag.appendChild(w);
        });
        n.replaceChild(frag, c);
      });
    })($('crTit'));
    setTimeout(function () { var c = $('crClave'); if (c) c.classList.add('cr-salta'); }, 1100);
  }

  /* aparecer al bajar: con IntersectionObserver; si no hay, todo visible de una */
  var vistos = raiz.querySelectorAll('[data-cr]');
  if (!calma && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('cr-anima');
    var obs = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('cr-ver'); obs.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    vistos.forEach(function (el) { obs.observe(el); });
    /* red de seguridad: a los 4 s, lo que ya pasó por pantalla queda visible igual */
    setTimeout(function () { vistos.forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('cr-ver'); }); }, 4000);
  } else vistos.forEach(function (el) { el.classList.add('cr-ver'); });

  /* botón fijo: aparece al pasar el héroe y se esconde en el formulario y el pie */
  var heroe = raiz.querySelector('.cr-heroe');
  var mirar = function () {
    var f = $('pedir'), pie = document.querySelector('footer.pie');
    var enF = f ? (function (r) { return r.top < innerHeight && r.bottom > 0; })(f.getBoundingClientRect()) : false;
    var enPie = pie ? pie.getBoundingClientRect().top < innerHeight : false;
    fijo.classList.toggle('cr-fijo--ver', heroe.getBoundingClientRect().bottom < 0 && !enF && !enPie);
  };
  addEventListener('scroll', mirar, { passive: true }); addEventListener('resize', mirar); mirar();

  /* galería del héroe: tocar una miniatura cambia la foto grande */
  raiz.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-foto]'); if (!b) return;
    var g = $('crFotoP'); if (g) { g.src = b.getAttribute('data-foto'); g.alt = b.getAttribute('aria-label'); }
    Array.prototype.forEach.call(raiz.querySelectorAll('[data-foto]'), function (x) { x.classList.toggle('sel', x === b); });
  });

  /* botones que llevan al formulario (y eligen el nivel o el pago con tarjeta) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-ir]'); if (!a) return;
    var f = $('pedir'); if (!f) return; e.preventDefault();
    if (window.peElegir && (a.hasAttribute('data-pack') || a.hasAttribute('data-pago'))) window.peElegir(a.getAttribute('data-pack'), a.getAttribute('data-pago'));
    f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' });
  });
})();
