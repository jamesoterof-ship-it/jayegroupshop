/* 01-10 · efectos del hero nuevo de Chao Canas (ui-ux-pro-max):
   título letra por letra · hojas de romero cayendo · parallax suave de la foto (solo la foto, nunca el texto).
   Todo se apaga con prefers-reduced-motion y se pausa cuando el hero no se ve. */
(function () {
  'use strict';
  var quieto = false;
  try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var hero = document.querySelector('.cc-hero2'); if (!hero) return;

  /* 1 · título letra por letra (los lectores de pantalla leen el aria-label del h1) */
  var h1 = hero.querySelector('.cc-hero2__h1');
  if (h1 && !quieto) {
    h1.setAttribute('aria-label', h1.textContent.replace(/\s+/g, ' ').trim());
    var n = 0;
    h1.querySelectorAll('.cc-hero2__l1, .cc-hero2__l2').forEach(function (linea) {
      var txt = linea.textContent; linea.textContent = '';
      linea.setAttribute('aria-hidden', 'true');
      /* cada palabra va entera (no se parte entre líneas) y dentro de ella las letras entran una a una */
      txt.trim().split(/\s+/).forEach(function (palabra, i) {
        if (i) linea.appendChild(document.createTextNode(' '));
        var w = document.createElement('span'); w.style.display = 'inline-block'; w.style.whiteSpace = 'nowrap';
        palabra.split('').forEach(function (ch) {
          var s = document.createElement('span'); s.className = 'cc-letra';
          s.textContent = ch; s.style.animationDelay = (n++ * 28) + 'ms';
          w.appendChild(s);
        });
        linea.appendChild(w);
      });
    });
  }
  if (quieto) return;

  /* 2 · hojas de romero cayendo sobre la foto */
  var caja = document.getElementById('ccHojas');
  var HOJA = '<svg viewBox="0 0 24 24"><path d="M12 2C8 6 6 11 7 16c.6 3 2.6 5 5 6 2.4-1 4.4-3 5-6 1-5-1-10-5-14z" fill="#3F8F5A"/><path d="M12 4v17" stroke="#1F5E3A" stroke-width="1.2" fill="none"/></svg>';
  if (caja) for (var i = 0; i < 9; i++) {
    var h = document.createElement('span'); h.className = 'cc-hoja'; h.innerHTML = HOJA;
    var t = 10 + Math.random() * 8;
    h.style.left = (4 + Math.random() * 92) + '%';
    h.style.width = h.style.height = (12 + Math.random() * 10) + 'px';
    h.style.animationDuration = t + 's';
    h.style.animationDelay = (-Math.random() * t) + 's';
    caja.appendChild(h);
  }

  /* 3 · parallax suave: la foto se mueve un poco más lento que la página */
  /* 01-10: la foto queda quieta y completa; lo que se mueve es la capa de hojas (decorativa) */
  var img = document.getElementById('ccHojas'), foto = document.getElementById('ccHeroFoto'), visible = true, pedido = false;
  function mover() {
    pedido = false; if (!visible || !img || !foto) return;
    var r = foto.getBoundingClientRect();
    var avance = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
    img.style.transform = 'translate3d(0,' + (avance * -12).toFixed(2) + '%,0)';
  }
  addEventListener('scroll', function () { if (!pedido) { pedido = true; requestAnimationFrame(mover); } }, { passive: true });
  mover();

  /* pausa las hojas cuando el hero no se ve */
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) {
    visible = e[0].isIntersecting; hero.classList.toggle('quieto', !visible);
  }).observe(hero);
})();
