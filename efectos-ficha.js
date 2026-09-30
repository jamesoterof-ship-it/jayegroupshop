/* ============================================================
   EFECTOS DE LA FICHA · con GSAP (lib/gsap.min.js)

   Las librerias ya estaban descargadas en lib/ y nadie las usaba. Se usa
   SOLO gsap.min.js (71 KB, del propio dominio). No se carga ScrollTrigger
   (otros 44 KB): para saber cuando algo entra en pantalla ya sirve
   IntersectionObserver, que viene en el navegador.

   Que hace, y por que asi:

   1. Los circulos ENTRAN despacio, uno detras de otro, al aparecer la
      seccion. Entrada suave, sin rebote de resorte: el rebote se ve
      jugueton y esto vende una compra.

   2. Un ANILLO se abre y se desvanece desde un circulo cada vez, en orden,
      con pausa larga entre uno y otro. Es lo unico que se mueve solo. Se
      eligio esto y no un latido porque el latido cambia el tamaño del
      circulo, mueve el texto de al lado y se siente barato; el anillo
      llama la atencion sin tocar la maqueta.

   3. Los BOTONES se hunden apenas al apretarlos y vuelven suave. Sin
      rebote elastico: un boton de compra que rebota parece un juego.

   El contenido lo escribe ficha.js despues, asi que se espera a que los
   elementos existan. Con el telefono en "menos animacion" no se hace nada.
   ============================================================ */
(function () {
  'use strict';

  var quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (quieto || !window.gsap) return;
  var gsap = window.gsap;

  /* ---------- 1 · los circulos entran en cadena ---------- */
  function circulos() {
    var cirs = document.querySelectorAll('.ing .cir');
    if (!cirs.length) return false;

    gsap.set(cirs, { scale: 0.86, opacity: 0, y: 10 });

    function soltar() {
      gsap.to(cirs, {
        scale: 1, opacity: 1, y: 0,
        duration: 0.85, ease: 'power3.out',
        stagger: 0.12,
        onComplete: anillos,
      });
    }

    /* ---------- 2 · el anillo que se abre, uno por vez ---------- */
    function anillos() {
      var i = 0;
      function siguiente() {
        var c = cirs[i % cirs.length];
        i++;
        var aro = document.createElement('span');
        aro.className = 'aro';
        c.appendChild(aro);
        gsap.fromTo(aro,
          { scale: 1, opacity: 0.55 },
          { scale: 1.6, opacity: 0, duration: 1.5, ease: 'power2.out',
            onComplete: function () { aro.remove(); } });
        /* pausa larga: llama la atencion sin volverse ruido */
        setTimeout(siguiente, 1900);
      }
      setTimeout(siguiente, 900);
    }

    var sec = cirs[0].closest('section') || cirs[0].parentNode;
    if (!('IntersectionObserver' in window)) { soltar(); return true; }
    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        soltar();
        ojo.disconnect();
      });
    }, { threshold: 0.2 });
    ojo.observe(sec);

    /* en computador, al pasar el mouse: crece apenas, sin girar */
    document.querySelectorAll('.ing').forEach(function (fila) {
      var c = fila.querySelector('.cir');
      if (!c) return;
      fila.addEventListener('mouseenter', function () {
        gsap.to(c, { scale: 1.07, duration: 0.4, ease: 'power2.out' });
      });
      fila.addEventListener('mouseleave', function () {
        gsap.to(c, { scale: 1, duration: 0.5, ease: 'power2.out' });
      });
    });
    return true;
  }

  /* ---------- 3 · los botones se hunden al apretar ---------- */
  function botones() {
    var btns = document.querySelectorAll('.prod .cta, .promo-card .cta');
    if (!btns.length) return false;
    btns.forEach(function (b) {
      if (b.dataset.gsap) return;
      b.dataset.gsap = '1';
      var abajo = function () { gsap.to(b, { scale: 0.98, duration: 0.14, ease: 'power2.out' }); };
      var arriba = function () { gsap.to(b, { scale: 1, duration: 0.32, ease: 'power2.out' }); };
      b.addEventListener('pointerdown', abajo);
      b.addEventListener('pointerup', arriba);
      b.addEventListener('pointerleave', arriba);
      b.addEventListener('pointercancel', arriba);
    });
    return true;
  }

  function intentar() { var a = circulos(), b = botones(); return a && b; }
  if (!intentar()) {
    var cont = document.getElementById('prod');
    if (cont && 'MutationObserver' in window) {
      var mo = new MutationObserver(function () { if (intentar()) mo.disconnect(); });
      mo.observe(cont, { childList: true, subtree: true });
      setTimeout(function () { mo.disconnect(); }, 8000);
    }
  }
})();

/* ---- Bloque de escasez: el número sube y la barra se llena cuando entra en
   pantalla. Usa CountUp, que ya estaba descargado en lib/ y no se usaba.
   Si CountUp no cargó, el número se pone directo: nunca queda en cero. ---- */
(function () {
  'use strict';
  function animar(caja) {
    var n = caja.querySelector('.cnt-hoy');
    var barra = caja.querySelector('.esc-barra');
    if (n) {
      var meta = parseInt(n.getAttribute('data-n'), 10) || 0;
      var CU = window.countUp && (window.countUp.CountUp || window.countUp);
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (CU && !reduce) { try { new CU(n, meta, { duration: 1.3 }).start(); } catch (e) { n.textContent = meta; } }
      else n.textContent = meta;
    }
    if (barra) setTimeout(function () { barra.style.width = (barra.getAttribute('data-w') || 0) + '%'; }, 120);
  }
  function arranca() {
    var caja = document.querySelector('.esc-sec');
    if (!caja) return;
    if (!('IntersectionObserver' in window)) return animar(caja);
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { animar(caja); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(caja);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(arranca, 600); });
  else setTimeout(arranca, 600);
})();



/* ---- HERO: mirar el producto de cerca. El movimiento sirve, no adorna. ---- */
(function () {
  'use strict';
  function arranca() {
    var p = window.PRODUCTO_ACTUAL;
    if (!p || !p.heroEfecto) return;
    var marco = document.querySelector('.gal .marco');
    var img = marco && marco.querySelector('img');
    if (!marco || !img) return;

    var st = document.createElement('style');
    st.textContent =
      '.gal .marco{position:relative;cursor:zoom-in}'
      + '.gal .marco img{transition:transform .28s cubic-bezier(.2,.8,.2,1)}'
      + '.lupa{position:absolute;right:12px;bottom:12px;z-index:4;width:42px;height:42px;border-radius:50%;'
        + 'background:rgba(255,255,255,.94);box-shadow:0 3px 14px rgba(0,0,0,.22);display:flex;align-items:center;'
        + 'justify-content:center;pointer-events:none}'
      + '.lupa svg{width:21px;height:21px;stroke:#1a1a1a;fill:none;stroke-width:2.1;stroke-linecap:round}'
      + '.zoomcapa{position:fixed;inset:0;z-index:9999;background:rgba(10,12,16,.94);display:flex;'
        + 'align-items:center;justify-content:center;opacity:0;transition:opacity .22s ease;touch-action:none}'
      + '.zoomcapa.on{opacity:1}'
      + '.zoomcapa img{max-width:none;width:170%;transform:translate(0,0);will-change:transform;user-select:none;-webkit-user-drag:none}'
      + '.zoomsalir{position:absolute;top:16px;right:16px;width:44px;height:44px;border-radius:50%;border:0;'
        + 'background:rgba(255,255,255,.94);font-size:24px;line-height:1;cursor:pointer;color:#111}'
      + '.zoompista{position:absolute;bottom:26px;left:0;right:0;text-align:center;color:#fff;font-size:14px;opacity:.85}';
    document.head.appendChild(st);

    /* la lupa avisa que se puede mirar de cerca */
    var lupa = document.createElement('div');
    lupa.className = 'lupa';
    lupa.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6M11 8v6M8 11h6"/></svg>';
    marco.appendChild(lupa);
    /* la galeria se redibuja al cambiar de foto y se lleva la lupa: se repone */
    setInterval(function () {
      var m = document.querySelector('.gal .marco');
      if (m && !m.querySelector('.lupa')) m.appendChild(lupa.cloneNode(true));
    }, 1200);

    /* ---- abrir a pantalla completa ---- */
    function abrir() {
      var capa = document.createElement('div');
      capa.className = 'zoomcapa';
      var g = document.createElement('img');
      g.src = img.currentSrc || img.src;
      g.alt = img.alt || '';
      var x = document.createElement('button');
      x.className = 'zoomsalir'; x.type = 'button'; x.setAttribute('aria-label', 'Cerrar'); x.textContent = '×';
      var pista = document.createElement('div');
      pista.className = 'zoompista'; pista.textContent = 'Arrastra para recorrer la foto';
      capa.appendChild(g); capa.appendChild(x); capa.appendChild(pista);
      document.body.appendChild(capa);
      document.body.style.overflow = 'hidden';
      setTimeout(function () { capa.classList.add('on'); }, 25);

      /* arrastrar para recorrer */
      var ax = 0, ay = 0, px = 0, py = 0, activo = false;
      function punto(e) { var t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; }
      function ini(e) { activo = true; var q = punto(e); px = q.x - ax; py = q.y - ay; }
      function mov(e) {
        if (!activo) return;
        var q = punto(e);
        ax = q.x - px; ay = q.y - py;
        var lx = Math.max(0, (g.offsetWidth - window.innerWidth) / 2);
        var ly = Math.max(0, (g.offsetHeight - window.innerHeight) / 2);
        ax = Math.max(-lx, Math.min(lx, ax)); ay = Math.max(-ly, Math.min(ly, ay));
        g.style.transform = 'translate(' + ax + 'px,' + ay + 'px)';
        if (e.cancelable) e.preventDefault();
      }
      function fin() { activo = false; }
      capa.addEventListener('mousedown', ini); capa.addEventListener('touchstart', ini, { passive: true });
      window.addEventListener('mousemove', mov); capa.addEventListener('touchmove', mov, { passive: false });
      window.addEventListener('mouseup', fin); capa.addEventListener('touchend', fin);

      function cerrar() {
        capa.classList.remove('on');
        document.body.style.overflow = '';
        window.removeEventListener('mousemove', mov); window.removeEventListener('mouseup', fin);
        setTimeout(function () { capa.remove(); }, 220);
      }
      x.addEventListener('click', cerrar);
      capa.addEventListener('click', function (e) { if (e.target === capa) cerrar(); });
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { cerrar(); document.removeEventListener('keydown', esc); }
      });
    }
    marco.addEventListener('click', function (e) {
      if (e.target.closest('.flecha')) return;   /* las flechas siguen pasando fotos */
      abrir();
    });

    /* ---- continuidad al cambiar de foto: la nueva crece hasta su sitio ---- */
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      new MutationObserver(function (ms) {
        ms.forEach(function (m) {
          if (m.attributeName !== 'src') return;
          img.style.transition = 'none';
          img.style.transform = 'scale(.92)';
          img.style.opacity = '.35';
          requestAnimationFrame(function () {
            img.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1), opacity .28s ease';
            img.style.transform = 'scale(1)';
            img.style.opacity = '1';
          });
        });
      }).observe(img, { attributes: true, attributeFilter: ['src'] });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(arranca, 420); });
  else setTimeout(arranca, 420);
})();

/* ---- Video del producto: solo corre mientras se ve ---- */
(function () {
  'use strict';
  function arranca() {
    var v = document.querySelector('.vid-prod');
    if (!v) return;

    /* no gasta datos ni bateria si el cliente ya paso de largo */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          if (x.isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function(){}); }
          else v.pause();
        });
      }, { threshold: 0.25 }).observe(v);
    } else { var pr = v.play(); if (pr && pr.catch) pr.catch(function(){}); }

  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(arranca, 500); });
  else setTimeout(arranca, 500);
})();
