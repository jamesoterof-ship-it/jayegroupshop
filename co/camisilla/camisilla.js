/* ============================================================
   CAMISILLA IONFIT PRO · Colombia · 14-11-2026 · lo propio de la página (el formulario es ../ficha.js)
   Plano del script aprobado por James 14-11 (Hero-Centric + Glassmorphism):
   · botones [data-ir] bajan a su sección; [data-pack] elige el pack en el formulario
   · las secciones aparecen al bajar (.rev → .visto); las cifras de la franja cuentan
   · botón fijo de vidrio: aparece al bajar y se esconde en el formulario y en el pie
   ============================================================ */
(function () {
  'use strict';
  var byId = function (id) { return document.getElementById(id); };
  var caja = byId('pedir');
  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function bajarA(el) { if (el) el.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' }); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ir],[data-pack]');
    if (!b) return;
    if (b.hasAttribute('data-pack') && window.coElegir) window.coElegir(+b.getAttribute('data-pack'));
    bajarA(byId(b.getAttribute('data-ir') || 'pedir'));
  });

  /* aparecer al bajar + reflejo de las fotos + cifras que cuentan */
  function contar(el) {
    var fin = +el.getAttribute('data-cuenta'), suf = el.getAttribute('data-suf') || '', t0 = null;
    if (quieto || !fin) { el.textContent = fin + suf; return; }
    function paso(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(paso); }
    requestAnimationFrame(paso);
  }
  var obs = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (!x.isIntersecting) return;
      x.target.classList.add('visto');
      x.target.querySelectorAll('[data-cuenta]').forEach(contar);
      obs.unobserve(x.target);
    });
  }, { threshold: 0.18 }) : null;
  document.querySelectorAll('.rev,.cm-foto,.cm-ben,.cm-datos').forEach(function (el) {
    if (obs) obs.observe(el); else { el.classList.add('visto'); el.querySelectorAll('[data-cuenta]').forEach(contar); }
  });

  /* RESEÑAS reales (window.RESENAS_CO, del mismo modelo en AliExpress; James 14-11 "Ajá").
     Se ven como en todas las tiendas: nota grande, barras por estrellas, 4 tarjetas + "Ver más" y carrusel abajo. */
  var cmResenas = function () {
    var sec = byId('resenas'), datos = window.RESENAS_CO || [];
    if (!sec || !datos.length) return;
    var limpio = function (t) { var d = document.createElement('div'); d.textContent = t == null ? '' : String(t); return d.innerHTML; };
    var puntos = function (r) { return +r.estrellas || 5; };
    var prom = datos.reduce(function (a, r) { return a + puntos(r); }, 0) / datos.length;
    var cinco = function (k) {
      var out = '';
      for (var j = 0; j < 5; j++) out += '<span' + (j < k ? ' class="si"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.8 6 6.5.7-4.8 4.4 1.3 6.4L12 16.8 6.2 20l1.3-6.4L2.7 9.2l6.5-.7z"/></svg></span>';
      return out;
    };
    var card = function (r) {
      var lugar = [r.ciudad, r.fecha].filter(Boolean).join(' · ');
      return '<article class="rsc"><div class="arriba"><span class="ini">' + limpio(String(r.nombre || '?')[0].toUpperCase()) + '</span>'
        + '<span class="quien">' + limpio(r.nombre) + '<small>' + limpio(lugar) + '</small></span><span class="est">' + cinco(puntos(r)) + '</span></div>'
        + '<p>' + limpio(r.texto) + '</p>' + (r.foto ? '<img class="rfoto" src="' + limpio(r.foto) + '" alt="Foto del comprador" loading="lazy">' : '') + '</article>';
    };
    var filas = '';
    for (var s = 5; s >= 1; s--) {
      var cuantas = datos.filter(function (r) { return puntos(r) === s; }).length;
      filas += '<div class="bar"><span class="lvl">' + s + ' ★</span><div class="track"><i style="--p:' + (cuantas / datos.length).toFixed(3) + '"></i></div><b>' + cuantas + '</b></div>';
    }
    var arriba = byId('cmEstrellas');
    if (arriba) { arriba.innerHTML = '<i>★★★★★</i> ' + prom.toFixed(1).replace('.', ',') + ' · ' + datos.length + ' opiniones'; arriba.hidden = false; }
    sec.innerHTML = [
      '<h2 class="rev-title">Opiniones del producto <span class="stars">★★★★★</span></h2>',
      '<p class="rev-fuente">' + limpio(sec.getAttribute('data-fuente')) + '</p>',
      '<div class="rev-score"><span class="big">' + prom.toFixed(1) + '</span><span class="cnt">' + datos.length + ' reseñas</span></div>',
      '<div class="rev-bars">' + filas + '</div>',
      '<a class="btn-write" style="display:flex;align-items:center;justify-content:center;text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/573226087847?text=Hola%2C%20quiero%20dejar%20mi%20opini%C3%B3n%20de%20la%20camisilla">Escribir una reseña</a>',
      '<div class="rs" id="cmLista"></div>',
      datos.length > 4 ? '<button type="button" class="masRs" id="cmMas">Ver más reseñas</button>' : '',
      '<p class="rev-auto-label">Más opiniones de quienes ya la tienen</p>',
      '<div class="rev-auto"><div class="rev-auto__track" id="cmCarrusel"></div></div>'
    ].join('');
    var vistas = 0;
    var otras = function () {
      byId('cmLista').insertAdjacentHTML('beforeend', datos.slice(vistas, vistas + 4).map(card).join(''));
      vistas += 4;
      var b = byId('cmMas'); if (b && vistas >= datos.length) b.hidden = true;
    };
    otras();
    if (byId('cmMas')) byId('cmMas').addEventListener('click', otras);
    var giro = datos.slice(4, 16);
    if (giro.length) byId('cmCarrusel').innerHTML = giro.concat(giro).map(card).join('');
    else byId('cmCarrusel').parentNode.hidden = true;
  };
  cmResenas();

  /* botón fijo */
  var fijo = document.createElement('div');
  fijo.className = 'cm-fijo';
  fijo.innerHTML = '<button type="button" class="cm-btn late"></button>';
  fijo.querySelector('button').textContent = document.body.getAttribute('data-fijo') || 'Pedir ahora · pagas al recibir';
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
