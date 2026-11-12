/* ============================================================
   FUNDA NAVIDEÑA PUERTA + FUNDAS SILLA · Colombia · 11-11-2026 · lo propio de la página (el formulario es ../ficha.js)
   · botones [data-ir] bajan a su sección; [data-pack]/[data-adic] eligen pack y adicional en el formulario
   · galería: muestra 9 y "Ver todos los diseños"
   · botón fijo abajo: sin fondo blanco (James 10-11), aparece al bajar y se esconde en el formulario y en el pie
   ============================================================ */
(function () {
  'use strict';
  var byId = function (id) { return document.getElementById(id); };
  var caja = byId('pedir');
  function bajarA(el) { if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ir],[data-pack],[data-adic]');
    if (!b) return;
    if (b.hasAttribute('data-pack') && window.coElegir) window.coElegir(+b.getAttribute('data-pack'), b.hasAttribute('data-pago-pre') ? 'pre' : undefined);
    if (b.hasAttribute('data-adic') && window.coAdicional) window.coAdicional(+b.getAttribute('data-adic'));
    bajarA(byId(b.getAttribute('data-ir') || 'pedir'));
  });

  /* 12-11 James: tocar una foto de la galería deja ese diseño escogido en el formulario y baja a la sección
     opcional (sillas / puerta), que está justo antes del formulario: así no se salta esa oferta */
  document.addEventListener('click', function (e) {
    var f = e.target.closest('#disenos figure'); if (!f || !window.coDiseno) return;
    var img = f.querySelector('img'); if (!img) return;
    var archivo = (img.getAttribute('src') || '').split('?')[0].split('/').pop();
    var P = (window.PRODUCTOS || [])[0] || {}, d = (P.disenos || []).filter(function (x) { return String(x[2] || '').split('/').pop() === archivo; })[0];
    if (!d || !window.coDiseno(d[0])) return;
    document.querySelectorAll('#disenos figure.elegido').forEach(function (x) { x.classList.remove('elegido'); });
    f.classList.add('elegido');
    var opc = byId('coAdicional');
    bajarA(opc ? (opc.parentNode.querySelector('h3') || opc) : caja);
  });

  /* galería: 9 a la vista, el resto con un botón */
  document.querySelectorAll('[data-galeria]').forEach(function (g) {
    var figs = g.querySelectorAll('figure'), max = +g.getAttribute('data-galeria') || 9;
    if (figs.length <= max) return;
    for (var i = max; i < figs.length; i++) figs[i].setAttribute('data-oculto', '');
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'nv-mas'; btn.textContent = 'Ver los ' + figs.length + ' diseños';
    btn.addEventListener('click', function () { g.querySelectorAll('[data-oculto]').forEach(function (f) { f.removeAttribute('data-oculto'); }); btn.remove(); });
    g.parentNode.insertBefore(btn, g.nextSibling);
  });

  /* reseñas reales (window.RESENAS_CO): resumen, estrellas en la portada, 6 a la vista y "Ver más" */
  (function () {
    var L = (window.RESENAS_CO || []).filter(function (r) { return r && r.texto; });
    var sec = byId('resenas'); if (!L.length || !sec) return;
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var media = L.reduce(function (a, r) { return a + (+r.estrellas || 5); }, 0) / L.length, mt = media.toFixed(1).replace('.', ',');
    var est = function (n) { var s = ''; for (var i = 1; i <= 5; i++) s += i <= Math.round(n) ? '★' : '☆'; return s; };
    var e = byId('nvEstrellas'); if (e) { e.innerHTML = '<i>' + est(media) + '</i> ' + mt + ' · ' + L.length + ' reseñas'; e.hidden = false; }
    L.sort(function (a, b) { return (b.foto ? 1 : 0) - (a.foto ? 1 : 0); });
    var VER = 6;
    var tarjeta = function (r, i) {
      return '<article class="nv-rs"' + (i >= VER ? ' data-oculto' : '') + '>' + (r.foto ? '<img src="' + esc(r.foto) + '" alt="Foto de ' + esc(r.nombre) + ' con la funda puesta" loading="lazy">' : '')
        + '<div><i>' + est(r.estrellas) + '</i><b>' + esc(r.nombre) + '</b><small>' + esc(r.fecha) + '</small><p>' + esc(r.texto) + '</p></div></article>';
    };
    sec.innerHTML = '<h2 class="nv-h2">Lo que dicen los <em>clientes</em></h2>'
      + '<div class="nv-rs-res"><b>' + mt + '</b><div><i>' + est(media) + '</i><span>' + L.length + ' reseñas</span></div></div>'
      + '<div class="nv-rs-lista">' + L.map(tarjeta).join('') + '</div>'
      + (L.length > VER ? '<button type="button" class="nv-mas" id="nvMasRs">Ver más reseñas</button>' : '');
    var b = byId('nvMasRs'); if (b) b.addEventListener('click', function () { sec.querySelectorAll('.nv-rs[data-oculto]').forEach(function (x, k) { if (k < 10) x.removeAttribute('data-oculto'); }); if (!sec.querySelector('.nv-rs[data-oculto]')) b.remove(); });
  })();

  /* botón fijo */
  var txt = document.body.getAttribute('data-fijo') || 'Pedir ahora · pago contra entrega';
  var fijo = document.createElement('div');
  fijo.className = 'nv-fijo';
  fijo.innerHTML = '<button type="button" class="nv-btn"></button>';
  fijo.querySelector('button').textContent = txt;
  fijo.querySelector('button').addEventListener('click', function () {
    var p = document.body.getAttribute('data-fijo-pack');
    if (p !== null && window.coElegir) window.coElegir(+p);
    bajarA(caja);
  });
  document.body.appendChild(fijo);
  var pie = document.querySelector('footer.pie');
  function mirar() {
    var f = caja ? caja.getBoundingClientRect() : null, p = pie ? pie.getBoundingClientRect() : null;
    var enForm = f && f.top < innerHeight && f.bottom > 0;
    var enPie = p && p.top < innerHeight;
    fijo.classList.toggle('ver', (window.scrollY || 0) > 500 && !enForm && !enPie);
  }
  window.addEventListener('scroll', mirar, { passive: true });
  window.addEventListener('resize', mirar);
  mirar();
})();
