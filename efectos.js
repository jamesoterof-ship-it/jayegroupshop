/* ============================================================
   LA LUPA · Gafas TR90 Colombia (James la aprobó el 29-09: "déjalo así")
   Franja de letra pequeña borrosa (lo que ve quien necesita gafas). Un lente
   dorado la recorre solo y, donde pasa, la letra se lee nítida. En el
   celular sigue el dedo; en computador, el mouse. Se pausa fuera de vista.
   Aquí también vive el confeti dorado del pedido. Lo demás de la página
   son los efectos de Chile (efectos-ficha.js y efectos-tienda.js, copiados).
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.jayeConfeti = function () {
    if (reduce || !window.confetti) return;
    var col = ['#D8A52E', '#F1CF7A', '#A16207', '#ffffff'], end = Date.now() + 1100;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 62, origin: { x: 0 }, colors: col });
      confetti({ particleCount: 6, angle: 120, spread: 62, origin: { x: 1 }, colors: col });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  var FRASES = ['El periódico de la mañana', 'la letra pequeña del medicamento', 'los mensajes de la familia', 'la receta de la abuela',
    'el precio en la etiqueta', 'la cuenta del restaurante', 'el libro de la mesa de noche', 'el chat del grupo', 'la factura del mes',
    'el menú del día', 'la dirección en el sobre', 'las instrucciones de la caja'];
  var txt = '';
  for (var i = 0; i < 60; i++) { var f = FRASES[i % FRASES.length]; txt += (i % 5 === 2 ? '<b>' + f + '</b>' : f) + ' · '; }
  var b = document.getElementById('lecB'), n = document.getElementById('lecN');
  if (b) b.innerHTML = txt; if (n) n.innerHTML = txt;

  var fondo = document.getElementById('lupaFondo'); if (!fondo) return;
  var W = 0, H = 0, x = 0, y = 0, tx = 0, ty = 0, t0 = performance.now(), manual = 0, on = true, raf = 0;
  function medir() { W = fondo.clientWidth; H = fondo.clientHeight; fondo.style.setProperty('--r', Math.max(46, Math.min(72, H * 0.42)) + 'px'); }
  medir(); window.addEventListener('resize', medir);
  function poner(px, py) { fondo.style.setProperty('--x', px + 'px'); fondo.style.setProperty('--y', py + 'px'); }
  function paso(now) {
    if (!on) return;
    if (now - manual > 2200) {
      var t = (now - t0) / 1000;
      tx = W * (0.5 + 0.40 * Math.sin(t * 0.5));
      ty = H * (0.5 + 0.16 * Math.sin(t * 1.3 + 1.1));
    }
    x += (tx - x) * 0.09; y += (ty - y) * 0.09;
    poner(x, y);
    raf = requestAnimationFrame(paso);
  }
  x = tx = W * 0.5; y = ty = H * 0.5; poner(x, y);
  if (!reduce) raf = requestAnimationFrame(paso);
  function seguir(e) {
    var p = e.touches ? e.touches[0] : e, r = fondo.getBoundingClientRect();
    tx = p.clientX - r.left; ty = p.clientY - r.top; manual = performance.now();
  }
  fondo.addEventListener('pointermove', seguir, { passive: true });
  fondo.addEventListener('touchmove', seguir, { passive: true });
  try {
    new IntersectionObserver(function (e) {
      var v = e[0].isIntersecting;
      if (v && !on) { on = true; if (!reduce) raf = requestAnimationFrame(paso); }
      else if (!v && on) { on = false; cancelAnimationFrame(raf); }
    }).observe(fondo);
  } catch (e) {}
})();

/* ============================================================
   EFECTOS DEL HÉROE · copiados de clorofila.js (jayegroup.com.co)
   título letra por letra con destello, tarjetas que entran de lado,
   el número que cuenta, y las redes de seguridad de allá: ningún
   efecto puede dejar texto invisible ni un dato mal.
   ============================================================ */
(function () {
  var cont = document.getElementById('prod');
  if (!cont || !cont.querySelector('.gf-hero')) return;
  document.body.classList.add('p-gafas');
  var quieto = false;
  try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var letras = cont.querySelectorAll('.gf-cae');
  if (quieto) letras.forEach(function (el) { el.classList.remove('gf-cae'); });
  else setTimeout(function () { letras.forEach(function (el) { el.classList.remove('gf-cae'); }); }, 2500);

  var h1 = cont.querySelector('.gf-h1.gf-listo');
  if (h1) {
    var k = 0;
    h1.querySelectorAll('span, em').forEach(function (linea) {
      var palabras = linea.textContent.split(' ');
      linea.textContent = '';
      palabras.forEach(function (pal, i) {
        var w = document.createElement('span'); w.className = 'gf-w';
        Array.prototype.forEach.call(pal, function (ch) {
          var l = document.createElement('span'); l.className = 'gf-l';
          l.textContent = ch; l.style.setProperty('--k', k++); w.appendChild(l);
        });
        linea.appendChild(w);
        if (i < palabras.length - 1) linea.appendChild(document.createTextNode(' '));
      });
    });
    if (quieto) h1.classList.remove('gf-listo');
    else setTimeout(function () { h1.classList.remove('gf-listo'); }, 5000);
  }

  var piezas = [];
  cont.querySelectorAll('.gf-fi').forEach(function (el, i) { piezas.push([el, i % 2 ? 'gf-entra-d' : 'gf-entra-i']); });
  ['.gf-med', '.gf-blq'].forEach(function (s) { cont.querySelectorAll(s).forEach(function (el) { piezas.push([el, 'gf-sec-entra']); }); });

  function contar(el, hasta, ms) {
    if (el.dataset.contado) return;
    el.dataset.contado = '1';
    var listo = false, t0 = null;
    function paso(t) {
      if (t0 === null) t0 = t;
      var q = Math.min(1, (t - t0) / ms);
      if (listo) return;
      el.textContent = String(Math.round(hasta * (1 - Math.pow(1 - q, 3))));
      if (q < 1) requestAnimationFrame(paso); else { listo = true; el.textContent = String(hasta); }
    }
    setTimeout(function () { if (!listo) { listo = true; el.textContent = String(hasta); } }, ms + 700);
    el.textContent = '0';
    requestAnimationFrame(function (t) { if (!listo) paso(t); });
  }
  if (quieto || !('IntersectionObserver' in window)) return;
  piezas.forEach(function (p) { p[0].classList.add(p[1]); });
  function encender(el, conNumero) {
    el.classList.remove('gf-entra-i', 'gf-entra-d', 'gf-sec-entra');
    if (!conNumero) return;
    var n = el.querySelector && el.querySelector('.gf-num');
    if (n) setTimeout(function () { contar(n, 7, 1200); }, 180);
  }
  var obs = new IntersectionObserver(function (filas) {
    filas.forEach(function (f) { if (f.isIntersecting) { encender(f.target, true); obs.unobserve(f.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  piezas.forEach(function (p) { obs.observe(p[0]); });
  setTimeout(function () { piezas.forEach(function (p) { encender(p[0]); }); }, 2500);
})();
