/* ============================================================
   PÁGINAS DE PRODUCTO MÉXICO · motor común (05-11-2026) · drenaje y NAD+
   Composición del script ui-ux-pro-max (planos #100 drenaje-mexico y #101 nad-mexico, aprobados por James):
   estilo Biomimetic / Organic 2.0 (formas que respiran, curvas orgánicas, crecimiento suave) · patrón Hero + Features + CTA
   con CTA fijo en el héroe y abajo. ORDEN de las secciones: el de Lymphoria (James 29-10: "las secciones igualitas a la del
   drenador"). Los textos y precios viven en productos.js de cada página (window.PAGINA); las reseñas en resenas.js.
   ficha.js (../lentes/ficha.js) pinta el formulario #pedir en #prod con su lógica de precios, pago anticipado, PayPal y
   envío del pedido; aquí solo se mueve al bloque de compra.
   ============================================================ */
(function () {
  var P = window.PAGINA || {}, PR = (window.PRODUCTOS || [])[0] || {};
  var raiz = document.getElementById('mxp');
  if (!raiz || !P.heroe) return;
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mx = function (n) { return '$' + Number(n).toLocaleString('en-US'); };
  var packs = PR.packs || [], pre = (PR.anticipado || {}).precios || [];
  var pop = packs[PR.popular || 0] || packs[0] || {};
  var uno = packs[0] || {};
  var pct = function (k) { return k && k.antes ? Math.round((1 - k.precio / k.antes) * 100) : 0; };
  var ICO = {
    gota: '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/>',
    hoja: '<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l7-7"/>',
    reloj: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    caja: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    escudo: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    vaso: '<path d="M6 4h12l-1.5 16h-9z"/><path d="M7 9h10"/>',
    envio: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>',
    pago: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
  };
  var ico = function (n) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICO[n] || ICO.hoja) + '</svg>'; };
  var btn = function (txt, cls) { return '<a class="mx-btn ' + (cls || '') + '" href="#pedir" data-ir>' + esc(txt) + '</a>'; };
  var cap = function (t) { return '<p class="mx-cap" data-rev><i></i>' + t + '</p>'; };
  var sec = function (cls, inner, id) { return '<section class="mx-sec ' + (cls || '') + '"' + (id ? ' id="' + id + '"' : '') + '><div class="mx-env">' + inner + '</div></section>'; };
  var lista = function (a) { return '<ul class="mx-vin" data-rev>' + a.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
  var H = P.heroe, html = [];

  /* 1 · HÉROE: el producto solo y grande a pantalla completa, titular en cascada arriba y el efecto propio */
  html.push('<section class="mx-heroe"><div class="mx-heroe__foto"><img src="' + esc(H.img) + '" alt="' + esc(H.alt) + '" width="780" height="1170" fetchpriority="high">'
    + '<div class="mx-heroe__arriba"><span class="mx-rot">' + esc(H.rotulo) + '</span><h1 id="mxTit">' + H.titulo + '</h1><p>' + esc(H.frase) + '</p></div>'
    + '<div class="mx-efecto mx-efecto--' + esc(P.efecto || 'gotas') + '" aria-hidden="true">' + '<i></i><i></i><i></i><i></i><i></i><i></i>' + '</div>'
    + '<svg class="mx-ola" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40V22C60 2 120 2 200 18s140 16 200-4v26z"/></svg></div>'
  /* 2 · tres datos cortos */
    + '<div class="mx-chips">' + H.datos.map(function (d) { return '<div><b>' + esc(d[0]) + '</b><span>' + esc(d[1]) + '</span></div>'; }).join('') + '</div>'
  /* 3 · presentación: estrellas, nombre, frase y precio (sin galería ni descripción, como Lymphoria) */
    + '<div class="mx-env mx-pres"><div class="mx-est"><i>★★★★★</i><span id="mxNota">' + esc(P.notaEstrellas || 'Opiniones de compradores') + '</span></div>'
    + '<h2>' + esc(PR.nombre) + '</h2><p class="mx-pres__sub">' + esc(PR.sub) + '</p>'
    + '<div class="mx-precio"><b>' + mx(uno.precio) + '</b>' + (uno.antes ? '<s>' + mx(uno.antes) + '</s><em>−' + pct(uno) + ' %</em>' : '') + '</div>'
    + '<p class="mx-pres__packs">' + packs.map(function (k) { return esc(k.texto) + ' <b>' + mx(k.precio) + '</b>'; }).join(' · ') + '</p>'
    + (pre[0] ? '<p class="mx-pres__pre">' + ico('pago') + 'o <b>' + mx(pre[0]) + '</b> pagando ahora con tarjeta · −' + PR.anticipado.pct + ' % y entrega prioritaria</p>' : '')
  /* 4 · botón */
    + btn('Lo quiero, pago al recibir', 'mx-btn--ancho') + '<p class="mx-pres__nota">Envío gratis a todo México · pagas cuando lo tienes en la mano</p></div></section>');

  /* 5 · TRES PASOS Y LISTO */
  html.push(sec('', cap(esc(P.pasos.rotulo)) + '<h2 data-rev>' + esc(P.pasos.titulo) + '</h2><div class="mx-pasos">'
    + P.pasos.lista.map(function (p, i) { return '<figure class="mx-paso" data-rev><img src="' + esc(p[0]) + '" alt="' + esc(p[2]) + '" loading="lazy" width="720" height="720"><figcaption><span>' + (i + 1) + '</span>' + p[1] + '</figcaption></figure>'; }).join('') + '</div>'));

  /* 6 · QUÉ ES Y PARA QUÉ SIRVE: foto + texto + viñetas + 3 fichas con foto */
  var Q = P.quees;
  html.push(sec('mx-quees', cap('Qué es y para qué sirve') + '<div class="mx-quees__fila"><img class="mx-blob" data-rev src="' + esc(Q.img) + '" alt="' + esc(Q.alt) + '" loading="lazy" width="720" height="720"><div>'
    + '<h2 data-rev>' + esc(Q.titulo) + '</h2><p class="mx-txt" data-rev>' + esc(Q.texto) + '</p>' + lista(Q.puntos) + '</div></div>'
    + '<div class="mx-fichas">' + Q.fichas.map(function (f) { return '<article class="mx-ficha" data-rev><img src="' + esc(f[0]) + '" alt="" loading="lazy" width="480" height="480"><h3>' + esc(f[1]) + '</h3><p>' + esc(f[2]) + '</p></article>'; }).join('') + '</div>'));

  /* 7 · PROMOCIÓN con contador + PAGA CON TARJETA Y GANA */
  var preP = pre[PR.popular || 0];
  html.push(sec('mx-promo', cap('Tu paquete · La promoción') + '<div class="mx-promo__caja" data-rev>'
    + '<img src="' + esc(P.promoImg) + '" alt="' + esc(pop.texto) + '" loading="lazy" width="720" height="720">'
    + '<div class="mx-promo__cuerpo"><div class="mx-promo__cab"><span>Promoción</span><span>Termina hoy</span></div>'
    + '<h3>' + esc(P.promoTitulo) + '</h3><div class="mx-precio"><b>' + mx(pop.precio) + '</b>' + (pop.antes ? '<s>' + mx(pop.antes) + '</s><em>−' + pct(pop) + ' %</em>' : '') + '</div>'
    + '<p class="mx-promo__det">' + mx(Math.round(pop.precio / pop.cant * 100) / 100) + ' cada ' + esc(PR.unidad) + (pop.antes ? ' · ahorras ' + mx(pop.antes - pop.precio) : '') + '</p>'
    + (preP ? '<p class="mx-promo__det">o ' + mx(preP) + ' pagando ahora con tarjeta · −' + PR.anticipado.pct + ' % y entrega prioritaria</p>' : '')
    + '<div class="mx-reloj" id="mxReloj"><div><b data-h>00</b><span>horas</span></div><div><b data-m>00</b><span>min</span></div><div class="seg"><b data-s>00</b><span>seg</span></div></div>'
    + btn('Quiero la promoción', 'mx-btn--ancho') + '</div></div>'
    + '<div class="mx-tarjeta" data-rev><p class="mx-tarjeta__tit"><span>−' + (PR.anticipado || {}).pct + ' %</span>Paga con tarjeta y gana</p><ul>'
    + '<li><b>' + (PR.anticipado || {}).pct + ' % de descuento</b> en todos los paquetes</li><li><b>Entrega prioritaria:</b> tu pedido sale primero</li>'
    + '<li><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</li></ul>'
    + '<div class="mx-tarjeta__pie"><span class="mx-logos"><img src="/img/pago/paypal-texto-oscuro.svg" alt="PayPal" width="60" height="18"><img src="/img/pago/visa-oscuro.svg" alt="Visa" width="38" height="23"><img src="/img/pago/mastercard-oscuro.svg" alt="Mastercard" width="38" height="23"></span>'
    + '<a class="mx-btn mx-btn--chico" href="#pedir" data-ir>Pagar con tarjeta</a></div></div>', 'promo'));

  /* 8 · VIDEO de borde a borde (solo si hay video REAL del producto) */
  if (P.video) html.push('<section class="mx-video" data-rev><video data-src="' + esc(P.video) + '"' + (P.videoPoster ? ' poster="' + esc(P.videoPoster) + '"' : '') + ' muted loop playsinline preload="none" aria-label="' + esc(P.videoAlt || 'Video del producto') + '"></video></section>');

  /* 9 · LO QUE TRAE */
  var F = P.formula;
  html.push(sec('', cap(esc(F.rotulo)) + '<h2 data-rev>' + esc(F.titulo) + '</h2><p class="mx-txt" data-rev>' + esc(F.sub) + '</p><div class="mx-trae">'
    + F.lista.map(function (x) { return '<div class="mx-trae__i" data-rev><span class="mx-ico">' + ico(x[0]) + '</span><div><b>' + esc(x[1]) + '</b><p>' + esc(x[2]) + '</p></div></div>'; }).join('') + '</div>'));

  /* 10 · LO QUE TE GARANTIZAMOS */
  html.push(sec('mx-nums', cap('Lo que te garantizamos') + '<h2 data-rev>Sin letra pequeña</h2><div class="mx-nums__g">'
    + [['2 a 5', 'días hábiles de entrega'], ['$0', 'de envío a todo México'], ['30', 'días de garantía de satisfacción'], ['$0', 'por adelantado: pagas al recibir']]
      .map(function (n) { return '<div data-rev><b>' + n[0] + '</b><span>' + n[1] + '</span></div>'; }).join('') + '</div>'));

  /* 11 · COMPARACIÓN */
  var C = P.compara;
  html.push(sec('', '<h2 data-rev>' + esc(C.titulo) + '</h2><table class="mx-cmp" data-rev><thead><tr><th></th><th class="us">' + esc(C.nos) + '</th><th>' + esc(C.otro) + '</th></tr></thead><tbody>'
    + C.filas.map(function (f) { return '<tr><td>' + esc(f) + '</td><td class="si">✓</td><td class="no">✕</td></tr>'; }).join('') + '</tbody></table>'));

  /* 12 · OPINIONES REALES (resenas.js): solo si hay; primero las con foto */
  /* 05-11 James: "las reseñas igual a las demás páginas": aquí se muda la sección #resenas que pinta ficha.js (la de Brain y lentes);
     el bloque propio #mxOpis queda solo de respaldo si ficha.js no la pinta. */
  html.push(sec('mx-opis-s', '<div id="mxResFicha"></div><div class="mx-opis" id="mxOpis" hidden><h2>Lo que dicen quienes ya lo usan</h2>'
    + '<div class="mx-opis__res"><b id="mxProm"></b><div><i>★★★★★</i><span id="mxCuenta"></span></div></div><p class="mx-opis__nota">' + esc(P.notaResenas || '') + '</p>'
    + '<div class="mx-barras" id="mxBarras"></div><div class="mx-opis__fotos" id="mxFotos"></div><div class="mx-opis__lista" id="mxLista"></div>'
    + '<button type="button" class="mx-btn mx-btn--sec mx-btn--ancho" id="mxMas">Ver más opiniones</button></div>'));

  /* 13 · GARANTÍA */
  html.push(sec('', '<div class="mx-garantia" data-rev><div class="mx-sello"><b>30</b><span>días</span></div><h2>Garantía de satisfacción</h2>'
    + '<p>Si no quedas conforme, te devolvemos tu dinero dentro de los primeros 30 días. Sin preguntas.</p><div class="mx-chips2"><span>Devolución 100 %</span><span>Sin preguntas</span><span>Pago al recibir</span></div></div>'));

  /* 14 · EL CAMBIO / ANTES Y DESPUÉS (las palabras ANTES y DESPUÉS en HTML, nunca dentro de la imagen) */
  var B = P.cambio;
  /* como Lymphoria y el desengrasante: UNA sola imagen (ANTES arriba, DESPUÉS abajo) con las etiquetas en HTML */
  var baHtml = B.una
    ? '<div><img src="' + esc(B.una) + '" alt="' + esc(B.altA + ' / ' + B.altD) + '" loading="lazy" width="720" height="1080"><span class="et a">' + esc(B.etA || 'ANTES') + '</span><span class="et d">' + esc(B.etD || 'DESPUÉS') + '</span></div>'
    : '<div><img src="' + esc(B.antes) + '" alt="' + esc(B.altA) + '" loading="lazy"><span class="et a">' + esc(B.etA || 'ANTES') + '</span></div>'
      + '<div><img src="' + esc(B.despues) + '" alt="' + esc(B.altD) + '" loading="lazy"><span class="et d">' + esc(B.etD || 'DESPUÉS') + '</span></div>';
  html.push(sec('', cap(esc(B.rotulo)) + '<h2 data-rev>' + esc(B.titulo) + '</h2><p class="mx-txt" data-rev>' + esc(B.sub) + '</p>'
    + '<div class="mx-ba' + (B.una ? ' mx-ba--una' : '') + '" data-rev>' + baHtml + '</div>'
    + '<p class="mx-ba__nota">Imagen ilustrativa.</p>' + btn('Lo quiero', 'mx-btn--ancho')));

  /* 15 · PREGUNTAS */
  html.push(sec('', '<div class="mx-faq"><span class="mx-rot">Preguntas</span><h2>Lo que nos preguntan.</h2>'
    + P.preguntas.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div>'));

  /* 16 · CIERRE */
  html.push(sec('mx-cierre', '<div data-rev>' + cap('Por qué lo quieres') + '<h2>' + esc(PR.nombre) + '</h2>' + lista(P.cierre) + btn('Pedir el mío ahora', 'mx-btn--ancho') + '</div>'));

  /* 17 · CON QUIÉN SE DESPACHA */
  html.push(sec('', '<h2 data-rev>Con quién se despacha</h2><div class="mx-despacho" data-rev>'
    + '<div><img src="img/logos/veloces.webp" alt="Veloces" loading="lazy"><b>Veloces</b><span>Entrega a domicilio</span></div>'
    + '<div><img src="img/logos/afimex.webp" alt="Afimex" loading="lazy"><b>Afimex</b><span>Envío a todo México</span></div>'
    + '<div><img src="img/logos/quality-post.webp" alt="Quality Post" loading="lazy"><b>Quality Post</b><span>Guía rastreable por WhatsApp</span></div>'
    + '<div><b class="grande">Pagas al recibir</b><span>Al repartidor, cuando lo tienes en la mano</span></div></div>'));

  /* 18 · FORMULARIO */
  html.push(sec('mx-compra', '<h2 class="centro" data-rev>Pide el tuyo</h2><p class="mx-txt centro" data-rev>Lo despachamos hoy. Pagas al recibir o con tarjeta y ahorras el ' + (PR.anticipado || {}).pct + ' %.</p><div id="mxForm"></div>'));

  raiz.innerHTML = html.join('');
  var fijo = document.createElement('div'); fijo.className = 'mx-fijo'; fijo.id = 'mxFijo';
  fijo.innerHTML = '<a href="#pedir" data-ir>Lo quiero · ' + mx(uno.precio) + ' al recibir</a>'; document.body.appendChild(fijo);
  var $ = function (id) { return document.getElementById(id); };

  /* titular en cascada, letra por letra */
  var h1 = $('mxTit');
  if (h1 && !calma) {
    var k = 0;
    (function partir(nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
        if (n.nodeType === 1) { partir(n); return; }
        if (n.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (pal) {
          if (!pal) return;
          if (/^\s+$/.test(pal)) { frag.appendChild(document.createTextNode(pal)); return; }
          var w = document.createElement('span'); w.className = 'mx-pal';
          pal.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'mx-l'; s.style.animationDelay = (k++ * 30) + 'ms'; s.textContent = ch; w.appendChild(s); });
          frag.appendChild(w);
        });
        nodo.replaceChild(frag, n);
      });
    })(h1);
  }

  /* el formulario de la ficha al bloque de compra */
  var llevar = function () { var f = $('pedir'), d = $('mxForm'); if (!f || !d) return false; if (f.parentNode !== d) d.appendChild(f); return true; };
  if (!llevar()) { var vueltas = 0, tm = setInterval(function () { if (llevar() || ++vueltas > 60) clearInterval(tm); }, 100); }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-ir]'); if (!a) return;
    var f = $('pedir'); if (!f) return; e.preventDefault();
    f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' });
  });

  /* aparición orgánica al entrar en pantalla */
  var rev = raiz.querySelectorAll('[data-rev]');
  if (calma || !('IntersectionObserver' in window)) rev.forEach(function (el) { el.classList.add('mx-visto'); });
  else {
    var obs = new IntersectionObserver(function (ents) { ents.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('mx-visto'); obs.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rev.forEach(function (el) { obs.observe(el); });
    setTimeout(function () { rev.forEach(function (el) { el.classList.add('mx-visto'); }); }, 4500);
  }

  /* CTA fijo: después del héroe, nunca sobre el formulario ni sobre el pie */
  var heroe = raiz.querySelector('.mx-heroe');
  var mirarFijo = function () {
    var f = $('pedir'), pie = document.querySelector('footer.pie');
    var pasado = (window.scrollY || 0) > heroe.offsetTop + heroe.offsetHeight - 80;
    var enF = f ? (function (r) { return r.top < innerHeight && r.bottom > 0; })(f.getBoundingClientRect()) : false;
    var enPie = pie ? pie.getBoundingClientRect().top < innerHeight : false;
    fijo.classList.toggle('mx-ver', pasado && !enF && !enPie);
  };
  addEventListener('scroll', mirarFijo, { passive: true }); mirarFijo();

  /* contador hasta la medianoche de Ciudad de México */
  var reloj = $('mxReloj');
  var tic = function () {
    var m = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
    var fin = new Date(m); fin.setHours(24, 0, 0, 0);
    var s = Math.max(0, Math.floor((fin - m) / 1000)), d2 = function (v) { return (v < 10 ? '0' : '') + v; };
    reloj.querySelector('[data-h]').textContent = d2(Math.floor(s / 3600));
    reloj.querySelector('[data-m]').textContent = d2(Math.floor(s % 3600 / 60));
    reloj.querySelector('[data-s]').textContent = d2(s % 60);
  };
  if (reloj) { tic(); setInterval(tic, 1000); }

  /* video real: se carga al primer movimiento, no compite con el héroe */
  var v = raiz.querySelector('video[data-src]');
  if (v) {
    var prender = function () { if (v.src) return; v.src = v.getAttribute('data-src'); v.load(); var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); };
    addEventListener('scroll', prender, { once: true, passive: true }); addEventListener('touchstart', prender, { once: true, passive: true });
    addEventListener('load', function () { setTimeout(prender, 1500); });
  }

  /* opiniones reales: nota, barras, primero las que traen foto y después de 6 en 6 */
  var R = (window.RESENAS || []).slice();
  var mudarRes = function () { var s = $('resenas'), d = $('mxResFicha'); if (!s || !d) return false; if (s.parentNode !== d) d.appendChild(s); return true; };
  var propia = function () {
    if (!R.length || mudarRes()) return;
    $('mxOpis').hidden = false;
    var prom = Math.round(R.reduce(function (a, r) { return a + r.estrellas; }, 0) / R.length * 10) / 10;
    var promTxt = String(prom).replace('.', ',');
    $('mxProm').textContent = promTxt; $('mxCuenta').textContent = R.length + ' opiniones con comentario';
    $('mxNota').textContent = promTxt + ' · ' + R.length + ' opiniones';
    var est = function (n) { return '★★★★★'.slice(0, n) + '<em>' + '★★★★★'.slice(n) + '</em>'; };
    var fecha = function (f) { try { return new Date(f + 'T12:00:00').toLocaleDateString('es-MX', { month: 'short', year: 'numeric' }); } catch (e) { return ''; } };
    var tarjeta = function (r) {
      return '<article class="mx-opi">' + (r.foto ? '<img src="' + esc(r.foto) + '" alt="Foto del comprador" loading="lazy">' : '')
        + '<div class="mx-opi__cab"><i>' + est(r.estrellas) + '</i><span>' + esc(r.nombre) + (r.fecha ? ' · ' + esc(fecha(r.fecha)) : '') + '</span></div>'
        + '<p>' + esc(r.texto) + '</p><div class="mx-opi__ver">Compra verificada</div></article>';
    };
    $('mxBarras').innerHTML = [5, 4, 3, 2, 1].map(function (s) {
      var n = R.filter(function (r) { return r.estrellas === s; }).length;
      return '<div class="mx-barra"><span>' + s + ' ★</span><i><b style="width:' + Math.round(n / R.length * 100) + '%"></b></i><span>' + n + '</span></div>';
    }).join('');
    $('mxFotos').innerHTML = R.filter(function (r) { return r.foto; }).map(tarjeta).join('');
    var resto = R.filter(function (r) { return !r.foto; }), j = 0, mas = $('mxMas');
    var pinta = function () { $('mxLista').insertAdjacentHTML('beforeend', resto.slice(j, j + 6).map(tarjeta).join('')); j += 6; if (j >= resto.length) mas.hidden = true; };
    pinta(); mas.addEventListener('click', pinta);
  };
  if (R.length && !mudarRes()) { var vr = 0, tr = setInterval(function () { if (mudarRes()) clearInterval(tr); else if (++vr > 40) { clearInterval(tr); propia(); } }, 100); }
})();
