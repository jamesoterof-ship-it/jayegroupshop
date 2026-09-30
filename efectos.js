/* ============================================================
   EFECTOS · Gafas TR90 Colombia — screen ui-ux-pro-max (movimiento 8/10)
   + librería del molde Jaye (gsap, ScrollTrigger, SplitText, tilt, confetti).

   HERO NUEVO "LA LUPA": detrás hay letra pequeña borrosa (lo que ve alguien
   que necesita gafas). Un lente dorado la recorre solo y, donde pasa, la
   letra se lee nítida. En el celular sigue el dedo; en computador, el mouse.

   Presets del screen, tal cual:
     - Título: SplitText por letra · y 20, rotateX -40, 0.6 s, stagger .015, expo.out
     - Tarjetas: cascada · scale .92, y 16, 0.4 s, each .06, back.out(1.4)
     - Parallax SOLO en fotos · yPercent 5-15, scrub
   Todo parte VISIBLE. Dos seguros: si el celular frena las animaciones, a los
   ~2 s todo queda en su estado final. prefers-reduced-motion apaga todo.
   ============================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ORO = ['#D8A52E', '#F1CF7A', '#A16207', '#ffffff'];

  window.jayeConfeti = function () {
    if (reduce || !window.confetti) return;
    var end = Date.now() + 1100;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 62, origin: { x: 0 }, colors: ORO });
      confetti({ particleCount: 6, angle: 120, spread: 62, origin: { x: 1 }, colors: ORO });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  /* ---------- la letra pequeña del fondo del hero ---------- */
  var FRASES = ['El periódico de la mañana', 'la letra pequeña del medicamento', 'los mensajes de la familia', 'la receta de la abuela',
    'el precio en la etiqueta', 'la cuenta del restaurante', 'el libro de la mesa de noche', 'el chat del grupo', 'la factura del mes',
    'el menú del día', 'la dirección en el sobre', 'las instrucciones de la caja'];
  function llenarLectura() {
    var txt = '';
    for (var i = 0; i < 60; i++) {
      var f = FRASES[i % FRASES.length];
      txt += (i % 5 === 2 ? '<b>' + f + '</b>' : f) + ' · ';
    }
    var b = document.getElementById('lecB'), n = document.getElementById('lecN');
    if (b) b.innerHTML = txt; if (n) n.innerHTML = txt;
  }
  llenarLectura();

  function lupa() {
    var fondo = document.getElementById('lupaFondo'); if (!fondo) return;
    var hero = document.getElementById('inicio');
    var W = 0, H = 0, x = 0, y = 0, tx = 0, ty = 0, t0 = performance.now(), manual = 0, on = true, raf = 0;
    function medir() {
      W = fondo.clientWidth; H = fondo.clientHeight;
      var r = Math.max(46, Math.min(72, H * 0.42));
      fondo.style.setProperty('--r', r + 'px');
    }
    medir(); window.addEventListener('resize', medir);
    function poner(px, py) { fondo.style.setProperty('--x', px + 'px'); fondo.style.setProperty('--y', py + 'px'); }
    /* recorrido solo: una curva suave (Lissajous) por la zona alta del hero */
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
    /* sigue el dedo o el mouse */
    function seguir(e) {
      var p = e.touches ? e.touches[0] : e, r = fondo.getBoundingClientRect();
      tx = p.clientX - r.left; ty = p.clientY - r.top; manual = performance.now();
    }
    fondo.addEventListener('pointermove', seguir, { passive: true });
    fondo.addEventListener('touchmove', seguir, { passive: true });
    /* se pausa fuera de vista (ahorra batería) */
    try {
      new IntersectionObserver(function (e) {
        var v = e[0].isIntersecting;
        if (v && !on) { on = true; if (!reduce) raf = requestAnimationFrame(paso); }
        else if (!v && on) { on = false; cancelAnimationFrame(raf); }
      }).observe(hero);
    } catch (e) {}
  }

  function init() {
    lupa();
    if (reduce) return;
    var g = window.gsap;
    if (!g) return;
    var hayST = !!window.ScrollTrigger;
    if (hayST) g.registerPlugin(ScrollTrigger);
    /* SEGURO 1: al entrar, a los 1,6 s reales la animación queda terminada sí o sí */
    function st(trigger, start) {
      return { trigger: trigger, start: start || 'top 85%', toggleActions: 'play none none none',
        onEnter: function (self) { setTimeout(function () { if (self.animation) self.animation.progress(1); }, 1600); } };
    }

    /* 1) Hero: título letra por letra + el resto sube en cascada */
    var heroT = [];
    try {
      if (window.SplitText) {
        g.registerPlugin(SplitText);
        var h1 = document.getElementById('heroTitle');
        var sp = new SplitText(h1, { type: 'words,chars' });
        g.set(h1, { perspective: 400 });
        heroT.push(g.from(sp.chars, { opacity: 0, y: 20, rotateX: -40, duration: 0.6, stagger: 0.015, ease: 'expo.out', delay: 0.2,
          onComplete: function () { sp.revert(); } }));
      }
      heroT.push(g.from('.lupa-copy .nota, .lupa-copy .lead, .lupa-copy .chips, .lupa-copy .cta, .lupa-copy .confia',
        { y: 24, opacity: 0, duration: 0.6, stagger: 0.09, delay: 0.5, ease: 'power3.out', clearProps: 'opacity,transform' }));
      heroT.push(g.from('.lupa-foto', { scale: 0.92, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'opacity,transform' }));
      heroT.push(g.from('.lente', { scale: 0, duration: 0.9, delay: 0.3, ease: 'back.out(1.8)', clearProps: 'scale' }));
      setTimeout(function () {
        heroT.forEach(function (t) { t.progress(1); });
        g.set('.lupa-copy > *, .lupa-foto', { clearProps: 'opacity,transform' });
      }, 2200);
    } catch (e) {}

    if (!hayST) return;

    /* 2) Parallax suave SOLO en fotos */
    g.to('.lupa-foto img', { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.lupa', start: 'top top', end: 'bottom top', scrub: true } });
    g.utils.toArray('.hist-foto img, .promo-foto img').forEach(function (im) {
      g.fromTo(im, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: im.parentElement, scrub: 0.5 } });
    });

    /* 3) Antes/después: la foto se ENFOCA al bajar (borrosa → nítida), como al ponerse las gafas */
    var ba = document.querySelector('#baFoto img');
    if (ba) g.fromTo(ba, { filter: 'blur(10px)', scale: 1.06 }, { filter: 'blur(0px)', scale: 1, ease: 'none',
      scrollTrigger: { trigger: '#baFoto', start: 'top 85%', end: 'center 55%', scrub: 0.6 } });

    /* 4) Títulos de sección */
    g.utils.toArray('.sec h2, .sec .sub, .sec .kick, .hist-txt, .porque h3').forEach(function (el) {
      g.from(el, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: st(el, 'top 88%') });
    });

    /* 5) Cascadas (preset Standard del screen) */
    [['.bt', '.bento'], ['.fl', '.tabla'], ['.porque li', '.porque ul'], ['.faq details', '.faq'], ['.pagos-logos img', '.pagos']].forEach(function (p) {
      var items = document.querySelectorAll(p[0]); if (!items.length) return;
      g.from(items, { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)', scrollTrigger: st(p[1], 'top 85%') });
    });
    g.from('.switch', { y: 20, opacity: 0, duration: 0.6, ease: 'expo.out', scrollTrigger: st('.switch', 'top 88%') });
    g.from('#packs .pack', { x: -30, opacity: 0, duration: 0.55, stagger: 0.12, ease: 'expo.out', scrollTrigger: st('#packs', 'top 88%') });

    /* 6) Historias: número que se dibuja y foto que entra */
    g.utils.toArray('.hist').forEach(function (h) {
      g.from(h.querySelector('.hist-foto'), { opacity: 0, scale: 0.9, duration: 0.8, ease: 'expo.out', scrollTrigger: st(h, 'top 82%') });
      g.from(h.querySelector('.num'), { opacity: 0, x: -30, duration: 0.8, ease: 'expo.out', scrollTrigger: st(h, 'top 82%') });
    });
    g.from('.promo-foto', { opacity: 0, rotate: -3, scale: 0.92, duration: 0.9, ease: 'expo.out', scrollTrigger: st('.promo', 'top 80%') });
    g.from('.form-card', { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: st('.form-card', 'top 88%') });

    /* SEGURO 2: no depende del reloj de animación. 1,2 s después de dejar de
       mover la pantalla, lo que ya está a la vista queda terminado. */
    var guardia;
    function barrer() {
      ScrollTrigger.getAll().forEach(function (t) {
        var el = t.trigger; if (!el || !t.animation || t.vars.scrub) return;
        if (el.getBoundingClientRect().top < innerHeight && t.animation.progress() < 1) t.animation.progress(1);
      });
      if (ba && ba.getBoundingClientRect().top < innerHeight * 0.6) g.set(ba, { filter: 'blur(0px)', scale: 1 });
    }
    window.addEventListener('scroll', function () { clearTimeout(guardia); guardia = setTimeout(barrer, 1200); }, { passive: true });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

    /* 7) Tilt 3D con brillo (motor del molde) — solo con mouse */
    try {
      if (window.VanillaTilt && window.matchMedia('(hover: hover)').matches) {
        VanillaTilt.init(document.querySelectorAll('.bt, .hist-foto, .promo-foto, .lupa-foto'), { max: 6, speed: 500, glare: true, 'max-glare': 0.16, scale: 1.02 });
      }
    } catch (e) {}
  }

  if (document.readyState === 'complete') setTimeout(init, 30);
  else document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 30); });
})();
