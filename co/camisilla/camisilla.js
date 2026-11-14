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
