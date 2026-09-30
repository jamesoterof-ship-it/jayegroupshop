/* ============================================================
   EFECTOS · Gafas TR90 Colombia
   Salen del screen ui-ux-pro-max (dial motion 8 = "Complex") y de la caja de
   motores del molde (_fabrica/molde/motors.js). Presets usados, tal cual:
     - Título: SplitText por letra · y 20, rotateX -40, 0.6 s, stagger 0.015, expo.out
     - Tarjetas: aparición en cascada · scale .92, y 16, 0.4 s, each .06, back.out(1.4)
     - Listas: y 8, 0.3 s, stagger .03, power1.out
     - Parallax: SOLO en fotos (nunca texto) · yPercent 5-15, scrub
   Más: destellos dorados sobre el hero, tilt 3D con brillo, cortina en el
   antes/después, contador de opiniones, barras que se llenan, confeti al pedir.
   Regla del screen: prefers-reduced-motion apaga todo y deja el estado final.
   Todo parte VISIBLE; si una librería no carga, la página se ve igual.
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ORO = ['#d8a52e', '#e8be62', '#a16207', '#ffffff'];

  window.jayeConfeti = function () {
    if (reduce || !window.confetti) return;
    var end = Date.now() + 1100;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 62, origin: { x: 0 }, colors: ORO });
      confetti({ particleCount: 6, angle: 120, spread: 62, origin: { x: 1 }, colors: ORO });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  function init() {
    if (reduce) return;
    var g = window.gsap;
    if (g && window.ScrollTrigger) g.registerPlugin(ScrollTrigger);
    /* SEGURO (lección de España 26-09): si el celular frena las animaciones (ahorro de batería,
       pestaña en segundo plano) lo animado se quedaba invisible. A los 1,6 s reales se completa sí o sí. */
    function st(trigger, start) {
      return { trigger: trigger, start: start || 'top 85%', toggleActions: 'play none none none',
        onEnter: function (self) { setTimeout(function () { if (self.animation) self.animation.progress(1); }, 1600); } };
    }
    var heroT = [];

    /* 1) Título letra por letra (preset Complex del screen) */
    try {
      if (g && window.SplitText) {
        g.registerPlugin(SplitText);
        var h1 = document.getElementById('heroTitle');
        var sp = new SplitText(h1, { type: 'words,chars' });
        g.set(h1, { perspective: 400 });
        heroT.push(g.from(sp.chars, { opacity: 0, y: 20, rotateX: -40, duration: 0.6, stagger: 0.015, ease: 'expo.out', delay: 0.15,
          onComplete: function () { sp.revert(); } }));   /* el screen pide revertir para lectores de pantalla */
        heroT.push(g.from('.hero-txt .rating', { y: -14, opacity: 0, duration: 0.5, delay: 0.05, ease: 'power3.out', clearProps: 'opacity,transform' }));
        heroT.push(g.from('.hero-txt .lead, .hero-txt .dospagos, .hero-txt .btn, .hero-txt .mini', { y: 22, opacity: 0, duration: 0.6, stagger: 0.09, delay: 0.55, ease: 'power3.out', clearProps: 'opacity,transform' }));
        heroT.push(g.from('.hero-txt .dp', { scale: 0.9, duration: 0.5, stagger: 0.12, delay: 0.75, ease: 'back.out(1.6)' }));
        setTimeout(function () { heroT.forEach(function (t) { t.progress(1); }); g.set('.hero-txt > *', { clearProps: 'opacity,transform' }); }, 2200);
      }
    } catch (e) {}

    /* 2) Destellos dorados sobre la foto del hero (motor del molde, en oro) */
    heroDestellos();

    if (g && window.ScrollTrigger) {
      /* 3) Parallax suave en fotos (solo capas de imagen) */
      g.to('.hero-img img', { yPercent: 8, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      g.utils.toArray('.dz-img img, .promo-img img').forEach(function (im) {
        g.fromTo(im, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: im.parentElement, scrub: 0.5 } });
      });

      /* 4) Títulos y textos de sección suben al llegar */
      g.utils.toArray('.sec h2, .sec .sub, .sec .kicker, .dz-txt').forEach(function (el) {
        g.from(el, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: st(el, 'top 88%') });
      });

      /* 5) Tarjetas en cascada (preset Standard del screen) */
      [['.modo', '.modos'], ['.pack', '#packs'], ['.f', '.fgrid'], ['.fila', '.tabla'], ['.porque li', '.porque'], ['details', '.faq']].forEach(function (p) {
        var items = document.querySelectorAll(p[0]); if (!items.length) return;
        g.from(items, { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)',
          scrollTrigger: st(p[1], 'top 85%') });
      });

      /* 6) Fotos: entran con zoom */
      g.utils.toArray('.dz-img, .promo-img').forEach(function (el) {
        g.from(el, { opacity: 0, scale: 0.94, duration: 0.8, ease: 'expo.out', scrollTrigger: st(el, 'top 85%') });
      });

      /* 7) Antes/después: cortina que se abre de izquierda a derecha */
      g.fromTo('.ba-img img', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'expo.inOut',
        scrollTrigger: st('.ba-img', 'top 75%') });

      /* 8) Opiniones: número que cuenta, barras que se llenan, fotos y tarjetas en cascada */
      var head = document.querySelector('.rev-head');
      if (head) {
        head.classList.add('bars-off');
        ScrollTrigger.create({ trigger: head, start: 'top 80%', once: true, onEnter: function () {
          head.classList.remove('bars-off');
          var tot = document.getElementById('revTotal'), fin = parseInt(tot.textContent, 10) || 0, o = { v: 0 };
          g.to(o, { v: fin, duration: 1.4, ease: 'power2.out', onUpdate: function () { tot.textContent = Math.round(o.v); } });
          var med = document.getElementById('revMedia'), m = { v: 0 }, mf = parseFloat((med.textContent || '0').replace(',', '.'));
          g.to(m, { v: mf, duration: 1.4, ease: 'power2.out', onUpdate: function () { med.textContent = m.v.toFixed(1).replace('.', ','); } });
          setTimeout(function () { tot.textContent = fin; med.textContent = mf.toFixed(1).replace('.', ','); }, 1800);
        } });
      }
      g.from('#revFotos button', { opacity: 0, scale: 0.85, duration: 0.4, stagger: 0.05, ease: 'back.out(1.4)', scrollTrigger: st('#revFotos', 'top 88%') });
      g.from('#revList .rc', { opacity: 0, y: 8, duration: 0.3, stagger: 0.03, ease: 'power1.out', scrollTrigger: st('#revList', 'top 88%') });

      /* 9) Formulario: la tarjeta sube */
      g.from('.form-card', { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: st('.form-card', 'top 85%') });

      /* SEGURO 2: no depende del reloj de animación (que el celular puede frenar).
         1,2 s después de dejar de mover la pantalla, todo lo que ya está a la vista
         o más arriba queda en su estado final, visible sí o sí. */
      var guardia;
      function barrer() {
        ScrollTrigger.getAll().forEach(function (t) {
          var el = t.trigger; if (!el || !t.animation) return;
          if (el.getBoundingClientRect().top < innerHeight && t.animation.progress() < 1) t.animation.progress(1);
        });
        if (head && head.getBoundingClientRect().top < innerHeight) {
          head.classList.remove('bars-off');
          document.getElementById('revTotal').textContent = window.RESENAS_TOTAL || 200;
          document.getElementById('revMedia').textContent = window.RESENAS_MEDIA || '4,8';
        }
      }
      window.addEventListener('scroll', function () { clearTimeout(guardia); guardia = setTimeout(barrer, 1200); }, { passive: true });

      /* el hero y las fotos cargan tarde: recalcular posiciones */
      window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    }

    /* 10) Tilt 3D con brillo (motor del molde) — solo con mouse, en táctil no estorba */
    try {
      if (window.VanillaTilt && window.matchMedia('(hover: hover)').matches) {
        VanillaTilt.init(document.querySelectorAll('.f, .dz-img, .promo-img, .porque, .modo'), { max: 7, speed: 500, glare: true, 'max-glare': 0.18, scale: 1.02 });
      }
    } catch (e) {}
  }

  function heroDestellos() {
    var cv = document.getElementById('heroFx'); if (!cv) return;
    var ctx = cv.getContext('2d'), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), P = [], on = true, raf = 0, fr = 0;
    function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener('resize', size);
    var N = Math.min(42, Math.round(W / 10));
    function mk() { return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .6, vy: -(Math.random() * .45 + .12), vx: (Math.random() - .5) * .22, a: Math.random() * .5 + .35, tw: Math.random() * 6.28, ts: Math.random() * .05 + .025, big: Math.random() < .2 }; }
    for (var i = 0; i < N; i++) P.push(mk());
    function loop() {
      if (!on) return; fr++;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < P.length; i++) {
        var p = P[i]; p.y += p.vy; p.x += p.vx;
        if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W; }
        var tw = 0.45 + 0.55 * Math.abs(Math.sin(fr * p.ts + p.tw)), al = p.a * tw;
        ctx.shadowColor = 'rgba(232,190,98,.95)'; ctx.shadowBlur = (p.big ? 12 : 6) * tw;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (p.big ? 1.3 : 1), 0, 6.2832);
        ctx.fillStyle = 'rgba(248,214,140,' + al + ')'; ctx.fill();
        if (p.big && tw > .85) {   /* destello en cruz cuando brilla fuerte */
          ctx.strokeStyle = 'rgba(255,230,170,' + (al * .85) + ')'; ctx.lineWidth = 1; ctx.beginPath();
          var gg = p.r * 4.5 * tw; ctx.moveTo(p.x - gg, p.y); ctx.lineTo(p.x + gg, p.y); ctx.moveTo(p.x, p.y - gg); ctx.lineTo(p.x, p.y + gg); ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    }
    loop();
    /* pausa fuera de vista o con la pestaña oculta (ahorra batería) */
    try { new IntersectionObserver(function (e) { var v = e[0].isIntersecting; if (v && !on) { on = true; loop(); } else if (!v && on) { on = false; cancelAnimationFrame(raf); } }, { threshold: 0.02 }).observe(cv); } catch (e) {}
    document.addEventListener('visibilitychange', function () { if (document.hidden) { on = false; cancelAnimationFrame(raf); } else if (!on) { on = true; loop(); } });
  }

  if (document.readyState === 'complete') setTimeout(init, 30);
  else document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 30); });
})();
