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
