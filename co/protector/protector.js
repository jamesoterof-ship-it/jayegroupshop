/* ============================================================
   COMBO PROTECTOR + COBIJA NAVIDEÑA · Jaye Group Colombia (jayegroupshop.com/co/protector/)
   Plano del script "protector-navidad-colombia" (Funnel 3 pasos · Aurora UI), aprobado por James 10-11.
   Este archivo solo arma las secciones de la página. El FORMULARIO es el de todas las tiendas: ../ficha.js (en #pedir).
   James 10-11: promocionar el pago anticipado → los botones "pagar ahora" dejan marcado el pago anticipado.
   ============================================================ */
(function () {
  'use strict';
  var P = window.PRODUCTO_CO;
  var byId = function (id) { return document.getElementById(id); };
  var html = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&quot;'; }); };
  var cop = function (n) { return '$' + Number(n).toLocaleString('es-CO'); };
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bajarA(el) { if (el) el.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' }); }

  /* fotos que todavía no existen: recuadro con lo que va ahí */
  document.querySelectorAll('.pr-foto img').forEach(function (im) {
    function falta() { im.closest('.pr-foto').classList.add('sin-foto'); }
    if (im.complete && !im.naturalWidth) falta(); else im.addEventListener('error', falta);
  });
  if (!P) return;

  /* precios en toda la página, siempre desde productos.js */
  var precio = P.packs[0].precio, anticipado = P.anticipado.precios[0];
  document.querySelectorAll('[data-precio="cod"]').forEach(function (e) { e.textContent = cop(precio); });
  document.querySelectorAll('[data-precio="pre"]').forEach(function (e) { e.textContent = cop(anticipado); });

  /* tabla de medidas y muestrario de colores */
  if (byId('prMedidas')) byId('prMedidas').innerHTML = P.medidas.map(function (m) {
    return '<div class="pr-med__fila" role="row"><span role="cell">' + html(m[1]) + '</span><span role="cell">' + html(m[2]) + '</span></div>';
  }).join('');
  if (byId('prColores')) byId('prColores').innerHTML = P.colores.map(function (c) {
    return '<li><i style="background:' + c[2] + '"></i>' + html(c[1]) + '</li>';
  }).join('');

  /* botones: "Lo quiero", pasos y los de "pagar ahora" (dejan marcado el pago anticipado en el formulario) */
  document.querySelectorAll('[data-ir]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.hasAttribute('data-pago-pre') && window.coElegir) window.coElegir(0, 'pre');
      bajarA(byId(b.getAttribute('data-ir')));
    });
  });

  /* video: arranca solo y sin sonido al llegar, se pausa al salir; botón de sonido */
  (function () {
    var v = byId('prVideo'), bs = byId('prVideoSonido');
    if (!v) return;
    /* si el video todavía no está subido, la sección no se muestra */
    v.addEventListener('error', function () { var s = byId('video'); if (s) s.hidden = true; }, true);
    fetch(v.getAttribute('src'), { method: 'HEAD' }).then(function (r) { if (!r.ok) { var s = byId('video'); if (s) s.hidden = true; } }).catch(function () {});
    var ver = false;
    function revisar() { if (ver && !quieto && !document.hidden) { var x = v.play(); if (x && x.catch) x.catch(function () {}); } else if (!v.paused) v.pause(); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { ver = e[0].isIntersecting; revisar(); }, { threshold: 0.4 }).observe(v);
    document.addEventListener('visibilitychange', revisar);
    if (bs) bs.addEventListener('click', function () { v.muted = !v.muted; bs.textContent = v.muted ? 'Activar sonido' : 'Silenciar'; if (!v.muted) v.play(); });
  })();

  /* ---------- reseñas REALES (solo si hay) ---------- */
  var ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6 6.5.7-4.8 4.4 1.3 6.4L12 16.8 6.2 20l1.3-6.4L2.7 9.2l6.5-.7z"/></svg>';
  var lista = (window.RESENAS_CO || []).filter(function (r) { return r && r.texto; });
  if (lista.length && byId('prResenas')) {
    var media = Math.round(lista.reduce(function (s, r) { return s + (Number(r.estrellas) || 5); }, 0) / lista.length * 10) / 10;
    var fila = function (n) { var s = ''; for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= Math.round(n) ? 'si' : '') + '">' + ESTRELLA + '</span>'; return s; };
    if (byId('prEstrellas')) { byId('prEstrellas').innerHTML = '<span class="pr-est">' + fila(media) + '</span><a href="#resenas">' + media.toFixed(1) + ' · ' + lista.length + ' opiniones</a>'; byId('prEstrellas').hidden = false; }
    var tarjeta = function (r) {
      return '<article class="pr-op pr-card"><header><b>' + html(r.nombre) + '</b><small>' + html([r.ciudad, r.fecha].filter(Boolean).join(' · ')) + '</small>'
        + '<span class="pr-est">' + fila(Number(r.estrellas) || 5) + '</span></header><p>' + html(r.texto) + '</p>'
        + (r.foto ? '<img src="' + html(r.foto) + '" alt="Foto de la compradora" loading="lazy" onerror="this.remove()">' : '') + '</article>';
    };
    byId('prResenas').innerHTML = '<section class="pr-sec pr-ops" id="resenas" data-rv><span class="pr-rot">Opiniones reales</span>'
      + '<h2 class="pr-h2">Opiniones del producto</h2><p class="pr-sub"><b>' + media.toFixed(1) + '</b> de 5 · ' + lista.length + ' opiniones de compradores</p>'
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

  /* ---------- barra de abajo: aparece al bajar, se va al llegar al formulario ---------- */
  var caja = byId('pedir');
  var barra = document.createElement('div');
  barra.className = 'pr-barra';
  barra.innerHTML = '<span><b>' + cop(precio) + '</b><small>o ' + cop(anticipado) + ' pagando ahora</small></span><button type="button" class="pr-btn pr-btn--compra">Lo quiero</button>';
  barra.querySelector('button').addEventListener('click', function () { bajarA(caja); });
  document.body.appendChild(barra);
  var pendiente = false;
  function revisarBarra() {
    var ver = (window.scrollY || 0) > 480 && (!caja || caja.getBoundingClientRect().top > innerHeight * 0.9);
    barra.classList.toggle('ver', ver); pendiente = false;
  }
  window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(revisarBarra); } }, { passive: true });
  revisarBarra();

  /* las secciones entran suave al llegar (nada si el celular pide menos movimiento) */
  (function aparecer() {
    var partes = document.querySelectorAll('[data-rv]');
    if (quieto || !('IntersectionObserver' in window)) { partes.forEach(function (e) { e.classList.add('dentro'); }); return; }
    document.documentElement.classList.add('pr-anima');
    var ojo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dentro'); ojo.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    partes.forEach(function (e) { ojo.observe(e); });
    setTimeout(function () { document.querySelectorAll('[data-rv]:not(.dentro)').forEach(function (e) { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('dentro'); }); }, 400);
  })();
})();
