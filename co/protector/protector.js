/* ============================================================
   COMBO PROTECTOR + COBIJA NAVIDEÑA · Jaye Group Colombia (jayegroupshop.com/co/protector/)
   Plano del script, opción 172 (Funnel 3 pasos · Aurora UI · Outfit), James 10-11 "Sí, arma".
   Video, reseñas y botón fijo: como las páginas de Chile (organizador).
   El FORMULARIO es el de todas las tiendas: ../ficha.js (en #pedir).
   ============================================================ */
(function () {
  'use strict';
  var P = window.PRODUCTO_CO;
  var byId = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&quot;'; }); };
  var cop = function (n) { return '$' + Number(n).toLocaleString('es-CO'); };
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bajarA(el) { if (el) el.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' }); }
  if (!P) return;

  /* precios en toda la página, siempre desde productos.js */
  var precio = P.packs[0].precio, anticipado = P.anticipado.precios[0];
  document.querySelectorAll('[data-precio="cod"]').forEach(function (e) { e.textContent = cop(precio); });
  document.querySelectorAll('[data-precio="pre"]').forEach(function (e) { e.textContent = cop(anticipado); });

  /* medidas y colores */
  if (byId('prMedidas')) byId('prMedidas').innerHTML = P.medidas.map(function (m) {
    return '<div class="pr-med__fila" role="row"><span role="cell">' + esc(m[1]) + '</span><span role="cell">' + esc(m[2]) + '</span></div>';
  }).join('');
  if (byId('prColores')) byId('prColores').innerHTML = P.colores.map(function (c) {
    return '<li><i style="background:' + esc(c[2]) + '"></i>' + esc(c[1]) + '</li>';
  }).join('');

  /* botones de cada paso; los de "paga ahora" dejan marcado el pago anticipado */
  document.querySelectorAll('[data-ir]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.hasAttribute('data-pago-pre') && window.coElegir) window.coElegir(0, 'pre');
      bajarA(byId(b.getAttribute('data-ir')));
    });
  });

  /* video como Chile: no se baja al abrir; se carga al llegar, sin sonido y en bucle.
     Si el archivo todavía no está, la sección no se muestra. */
  (function () {
    var v = byId('prVideo'), caja = byId('video');
    if (!v || !caja) return;
    var src = v.getAttribute('data-src');
    caja.hidden = true;
    fetch(src, { method: 'HEAD' }).then(function (r) {
      if (!r.ok) return;
      caja.hidden = false;
      var puesto = false;
      var ojo = 'IntersectionObserver' in window ? new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          if (!puesto) { v.src = src; puesto = true; }
          if (!quieto) { var x = v.play(); if (x && x.catch) x.catch(function () {}); }
        } else if (!v.paused) v.pause();
      }, { threshold: 0.3 }) : null;
      if (ojo) ojo.observe(v); else v.src = src;
      v.addEventListener('error', function () { caja.hidden = true; });
    }).catch(function () {});
  })();

  /* ---------- reseñas REALES con el molde de Chile ---------- */
  var ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6 6.5.7-4.8 4.4 1.3 6.4L12 16.8 6.2 20l1.3-6.4L2.7 9.2l6.5-.7z"/></svg>';
  var lista = (window.RESENAS_CO || []).filter(function (r) { return r && r.texto; });
  var fila = function (n) { var s = ''; for (var i = 1; i <= 5; i++) s += '<span class="' + (i <= Math.round(n) ? 'si' : '') + '">' + ESTRELLA + '</span>'; return s; };
  if (lista.length && byId('prResenas')) {
    var nota = function (r) { return Number(r.estrellas) || 5; };
    var media = Math.round(lista.reduce(function (s, r) { return s + nota(r); }, 0) / lista.length * 10) / 10;
    if (byId('prEstrellas')) {
      byId('prEstrellas').innerHTML = '<span class="pr-est">' + fila(media) + '</span><a href="#resenas">' + media.toFixed(1) + ' · ' + lista.length + ' reseñas</a>';
      byId('prEstrellas').hidden = false;
    }
    /* primero las que traen foto */
    lista = lista.filter(function (r) { return r.foto; }).concat(lista.filter(function (r) { return !r.foto; }));
    /* tarjeta igual a la de las páginas de Chile (shilajit/ficha.js tarjetaResena), sin el sello "Verificado" (James 10-11) */
    var tarjeta = function (r) {
      return '<article class="rsc"><div class="arriba"><span class="ini">' + esc((r.nombre || '?').charAt(0)) + '</span>'
        + '<span class="quien">' + esc(r.nombre) + '<small>' + esc([r.ciudad, r.fecha].filter(Boolean).join(' · ')) + '</small></span>'
        + '<span class="est">' + fila(nota(r)) + '</span></div>'
        + '<p>' + esc(r.texto) + '</p>'
        + (r.foto ? '<img class="rfoto" src="' + esc(r.foto) + '" alt="" loading="lazy" onerror="this.remove()">' : '')
        + '</article>';
    };
    var barras = [5, 4, 3, 2, 1].map(function (e) {
      var n = lista.filter(function (r) { return nota(r) === e; }).length;
      return '<div class="bar"><span class="lvl">' + e + ' ★</span><div class="track"><i style="--p:' + (n / lista.length).toFixed(3) + '"></i></div><b>' + n + '</b></div>';
    }).join('');
    var VER = 4;
    byId('prResenas').innerHTML = '<section class="rev-sec" id="resenas">'
      + '<h2 class="rev-title">Opiniones del producto <span class="stars">★★★★★</span></h2>'
      + '<p class="rev-fuente">Opiniones reales de compradores de protectores de colchón acolchados con fundas, tal como las escribieron.</p>'
      + '<div class="rev-score"><span class="big">' + media.toFixed(1) + '</span><span class="cnt">' + lista.length + ' reseñas</span></div>'
      + '<div class="rev-bars">' + barras + '</div>'
      + '<button type="button" class="btn-write" id="btnWrite">Escribir una reseña</button>'
      + '<div class="rs" id="listaRs"></div>'
      + (lista.length > VER ? '<button type="button" class="masRs" id="masRs">Ver más reseñas</button>' : '')
      + '<p class="rev-auto-label">Más opiniones de quienes ya lo tienen</p>'
      + '<div class="rev-auto"><div class="rev-auto__track" id="revAuto"></div></div>'
      + '</section>';
    var mostradas = 0;
    var mas = function () {
      byId('listaRs').insertAdjacentHTML('beforeend', lista.slice(mostradas, mostradas + VER).map(tarjeta).join(''));
      mostradas += VER;
      if (mostradas >= lista.length && byId('masRs')) byId('masRs').hidden = true;
    };
    mas();
    if (byId('masRs')) byId('masRs').addEventListener('click', mas);
    /* carrusel de abajo: las que no se ven arriba, repetidas para que corra sin corte */
    var resto = lista.slice(VER, VER + 12);
    if (resto.length) byId('revAuto').innerHTML = resto.concat(resto).map(tarjeta).join('');
    else byId('revAuto').parentNode.hidden = true;
  }

  /* ---------- botón fijo abajo (como Chile): aparece al bajar, se va al llegar al formulario ---------- */
  var caja = byId('pedir');
  var fijo = document.createElement('div');
  fijo.className = 'pr-fijo';
  fijo.innerHTML = '<button type="button" class="pr-btn">Pedir ahora · pago contra entrega</button>';
  fijo.querySelector('button').addEventListener('click', function () { bajarA(caja); });
  document.body.appendChild(fijo);
  var pendiente = false;
  var pie = document.querySelector('footer.pie');
  function revisarFijo() {
    var r = caja ? caja.getBoundingClientRect() : null;
    var enForm = r && r.top < innerHeight && r.bottom > 0;
    /* 10-11 James: tampoco se muestra encima del pie de página (tapaba el logo y los medios de pago) */
    var p = pie ? pie.getBoundingClientRect() : null;
    var enPie = p && p.top < innerHeight;
    fijo.classList.toggle('ver', (window.scrollY || 0) > 500 && !enForm && !enPie);
    pendiente = false;
  }
  window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(revisarFijo); } }, { passive: true });
  revisarFijo();

  /* aparición suave de cada bloque al llegar */
  (function () {
    var partes = document.querySelectorAll('.pr-paso > *, .rev-sec > *, .pr-faq > *');
    if (quieto || !('IntersectionObserver' in window)) return;
    partes.forEach(function (e) { e.setAttribute('data-rv', ''); });
    document.documentElement.classList.add('pr-anima');
    var ojo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('dentro'); ojo.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    partes.forEach(function (e) { ojo.observe(e); });
  })();
})();
