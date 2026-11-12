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

  /* reseñas reales (window.RESENAS_CO) con el MOLDE DE TODOS LOS PAÍSES (igual que co/protector y la ficha de Chile):
     nota grande, barras, tarjetas, "Ver más reseñas" y carrusel. James 12-11: este estilo NO se cambia. */
  (function () {
    var lista = (window.RESENAS_CO || []).filter(function (r) { return r && r.texto; });
    var sec = byId('resenas'); if (!lista.length || !sec) return;
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    var ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6 6.5.7-4.8 4.4 1.3 6.4L12 16.8 6.2 20l1.3-6.4L2.7 9.2l6.5-.7z"/></svg>';
    var fila = function (n) { var s = ''; for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= Math.round(n) ? 'si' : '') + '">' + ESTRELLA + '</span>'; return s; };
    var nota = function (r) { return Number(r.estrellas) || 5; };
    var media = Math.round(lista.reduce(function (s, r) { return s + nota(r); }, 0) / lista.length * 10) / 10;
    var e = byId('nvEstrellas'); if (e) { e.innerHTML = '<i>★★★★★</i> ' + media.toFixed(1).replace('.', ',') + ' · ' + lista.length + ' reseñas'; e.hidden = false; }
    lista = lista.filter(function (r) { return r.foto; }).concat(lista.filter(function (r) { return !r.foto; }));
    var tarjeta = function (r) {
      return '<article class="rsc"><div class="arriba"><span class="ini">' + esc((r.nombre || '?').charAt(0)) + '</span>'
        + '<span class="quien">' + esc(r.nombre) + '<small>' + esc([r.ciudad, r.fecha].filter(Boolean).join(' · ')) + '</small></span>'
        + '<span class="est">' + fila(nota(r)) + '</span></div>'
        + '<p>' + esc(r.texto) + '</p>'
        + (r.foto ? '<img class="rfoto" src="' + esc(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '')
        + '</article>';
    };
    var barras = [5, 4, 3, 2, 1].map(function (n5) {
      var n = lista.filter(function (r) { return nota(r) === n5; }).length;
      return '<div class="bar"><span class="lvl">' + n5 + ' ★</span><div class="track"><i style="--p:' + (n / lista.length).toFixed(3) + '"></i></div><b>' + n + '</b></div>';
    }).join('');
    var VER = 4;
    sec.innerHTML = '<h2 class="rev-title">Opiniones del producto <span class="stars">★★★★★</span></h2>'
      + '<p class="rev-fuente">' + esc(sec.getAttribute('data-fuente') || '') + '</p>'
      + '<div class="rev-score"><span class="big">' + media.toFixed(1) + '</span><span class="cnt">' + lista.length + ' reseñas</span></div>'
      + '<div class="rev-bars">' + barras + '</div>'
      + '<button type="button" class="btn-write" id="btnWrite">Escribir una reseña</button>'
      + '<div class="rs" id="listaRs"></div>'
      + (lista.length > VER ? '<button type="button" class="masRs" id="masRs">Ver más reseñas</button>' : '')
      + '<p class="rev-auto-label">Más opiniones de quienes ya lo tienen</p>'
      + '<div class="rev-auto"><div class="rev-auto__track" id="revAuto"></div></div>';
    var mostradas = 0;
    var mas = function () {
      byId('listaRs').insertAdjacentHTML('beforeend', lista.slice(mostradas, mostradas + VER).map(tarjeta).join(''));
      mostradas += VER;
      if (mostradas >= lista.length && byId('masRs')) byId('masRs').hidden = true;
    };
    mas();
    if (byId('masRs')) byId('masRs').addEventListener('click', mas);
    var resto = lista.slice(VER, VER + 12);
    if (resto.length) byId('revAuto').innerHTML = resto.concat(resto).map(tarjeta).join('');
    else byId('revAuto').parentNode.hidden = true;
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
