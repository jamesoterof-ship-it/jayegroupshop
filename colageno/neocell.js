/* ============================================================
   COLÁGENO NEOCELL · 14-10 · solo aplica lo que dio la skill ui-ux-pro-max (ver el encabezado de neocell.css).
   Corre DESPUÉS de ficha.js y solo en ?p=neocell. No toca precios, formulario ni los id que usa ficha.js.
     1. Héroe: color de marca, foto limpia a todo el ancho y el título escrito por la página encima (regla de James 09-10).
     2. Orden del patrón "Hero > Problem > Solution > Testimonials > CTA" con las secciones de la tienda (orden acordado con James).
     3. Testimonios en carrusel accesible: anterior / pausa / siguiente, posición anunciada ("3 de 26"), se detiene con foco,
        hover, pestaña oculta y movimiento reducido; todo se recorre con botones, sin arrastrar.
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'neocell') return;
  document.body.classList.add('p-neo');
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVG = function (d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; };

  function heroe(prod) {
    if (prod.querySelector('.neo-heroe')) return;
    var arriba = prod.querySelector('.arriba2');
    var s = document.createElement('section');
    s.className = 'neo-heroe';
    /* 14-10 James: "el título ahí mismo en la foto, que entra en cascada, sin tapar el producto" -> el título va ENCIMA de la
       foto, en la franja de cielo de arriba; el frasco queda abajo, libre */
    s.innerHTML = '<div class="neo-foto"><img src="img/neo-heroe.webp?v=1" alt="Mujer sonriente extendiendo hacia la cámara el frasco celeste de colágeno NeoCell" width="1024" height="1536" fetchpriority="high">'
      + '<div class="neo-tit"><p class="neo-rot">Colágeno hidrolizado · 567 g</p><h1>Se nota en tu piel, tu pelo y tus uñas.</h1></div></div>';
    if (arriba) {
      arriba.parentNode.insertBefore(s, arriba);
      ['.gal', '.miniz'].forEach(function (q) { var el = arriba.querySelector(q); if (el) el.remove(); });
    } else prod.insertBefore(s, prod.firstChild);
  }

  /* orden acordado: Héroe > Problema > Solución > Testimonios > Compra > el resto */
  function ordenar(prod) {
    if (prod.dataset.neoOrden) return;
    var hijo = function (sel) { return prod.querySelector(':scope > ' + sel); };
    var arriba = hijo('.arriba2');
    var orden = [
      hijo('.neo-heroe'), arriba, arriba && arriba.nextElementSibling,          /* 1. héroe + precio + botón */
      hijo('.ba-sec'),                                                          /* 2. problema */
      hijo('.desc'), hijo('.vid-wrap'), hijo('.form-sec'), hijo('.cmp-sec'),    /* 3. solución (la 1ª .desc = "qué es y para qué sirve") */
      hijo('.rev-sec'), hijo('.res-sec'),                                       /* 4. testimonios */
      hijo('.promo-sec'), hijo('.pagoAnt'), hijo('section.form'),               /* 5. compra */
      hijo('.gar-sec'),
    ].filter(Boolean);
    var resto = Array.prototype.filter.call(prod.children, function (el) { return orden.indexOf(el) === -1; });
    orden.concat(resto).forEach(function (el) { prod.appendChild(el); });
    prod.dataset.neoOrden = '1';
  }

  /* la imagen de beneficios va en "la solución" (qué es y para qué sirve) */
  function solucion(prod) {
    var d = prod.querySelector(':scope > .desc');
    if (!d || d.querySelector('.neo-benef')) return;
    var f = document.createElement('img');
    f.className = 'neo-benef'; f.src = 'img/neo-pasos.webp?v=1'; f.width = 1024; f.height = 1024; f.loading = 'lazy';
    f.alt = 'Cómo se toma el colágeno NeoCell en 3 pasos: una medida, en tu café o jugo, sin sabor';
    f.style.cssText = 'display:block;width:100%;height:auto;margin:14px 0 4px';
    var h = d.querySelector('.tit2'); if (h) h.insertAdjacentElement('afterend', f); else d.appendChild(f);
  }

  /* 14-10 · imágenes nuevas (James: "crea nuevas imágenes, solo deja la del héroe"): el problema va arriba del antes y después,
     y el pack de 2 encima de la tarjeta de la promoción */
  function imagenesNuevas(prod) {
    var pon = function (sel, antesDe, src, alt, clase) {
      var s = prod.querySelector(sel); if (!s || s.querySelector('.' + clase)) return;
      var im = document.createElement('img'); im.className = clase; im.src = src; im.alt = alt; im.width = 1024; im.height = 1024; im.loading = 'lazy';
      var ref = s.querySelector(antesDe); if (ref) ref.parentNode.insertBefore(im, ref); else s.appendChild(im);
    };
    pon('.ba-sec', '.eyebrow', 'img/neo-problema.webp?v=1', 'Mujer frente al espejo mirando su piel: ¿tu piel ya no es la misma? Desde los 25 el cuerpo produce menos colágeno', 'neo-img-problema');
    /* 29-10 MÉXICO: la imagen del pack de 2 (img/neo-promo2.webp) trae escrito el precio de Chile ($34.500): aquí no se usa */
  }

  function carrusel(prod) {
    var sec = prod.querySelector('.rev-sec'), lista = document.getElementById('listaRs'), mas = document.getElementById('masRs');
    if (!sec || !lista || sec.classList.contains('neo-con-carril')) return;
    /* trae todas las reseñas que ficha.js tiene guardadas antes de armar el carril */
    for (var i = 0; i < 60 && mas && mas.style.display !== 'none' && !mas.disabled; i++) mas.click();
    lista.classList.add('neo-carril'); sec.classList.add('neo-con-carril');
    lista.setAttribute('role', 'region'); lista.setAttribute('aria-roledescription', 'carrusel'); lista.setAttribute('aria-label', 'Opiniones de compradores');
    var mandos = document.createElement('div'); mandos.className = 'neo-mandos';
    mandos.innerHTML = '<button type="button" data-a="-1" aria-label="Opinión anterior">' + SVG('<path d="M15 18l-6-6 6-6"/>') + '</button>'
      + '<button type="button" data-a="pausa" aria-label="Pausar">' + SVG('<path d="M9 5v14M15 5v14"/>') + '</button>'
      + '<span class="neo-pos" aria-live="polite"></span>'
      + '<button type="button" data-a="1" aria-label="Opinión siguiente">' + SVG('<path d="M9 18l6-6-6-6"/>') + '</button>';
    lista.insertAdjacentElement('afterend', mandos);
    var pos = mandos.querySelector('.neo-pos'), bPausa = mandos.querySelector('[data-a="pausa"]');
    var tarjetas = function () { return lista.querySelectorAll(':scope > .rsc'); };
    var actual = 0, enPausa = calma, quieto = false, reloj = null;
    function ir(n) {
      var t = tarjetas(); if (!t.length) return;
      actual = (n + t.length) % t.length;
      lista.scrollTo({ left: t[actual].offsetLeft - lista.offsetLeft - (lista.clientWidth - t[actual].clientWidth) / 2, behavior: calma ? 'auto' : 'smooth' });
      pos.textContent = (actual + 1) + ' de ' + t.length;
      alto();
    }
    /* 14-10 James: "las reseñas feas" (quedaba un hueco blanco bajo las tarjetas cortas): el carril toma el alto de la tarjeta visible */
    function alto() { var t = tarjetas(); if (t[actual]) lista.style.height = (t[actual].offsetHeight + 16) + 'px'; }
    window.addEventListener('resize', alto);
    function dibujaPausa() {
      bPausa.setAttribute('aria-label', enPausa ? 'Reanudar' : 'Pausar');
      bPausa.innerHTML = enPausa ? SVG('<path d="M8 5l11 7-11 7z"/>') : SVG('<path d="M9 5v14M15 5v14"/>');
    }
    function andar() { clearInterval(reloj); if (!enPausa) reloj = setInterval(function () { if (!quieto && !document.hidden) ir(actual + 1); }, 6000); }
    mandos.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'pausa') { enPausa = !enPausa; dibujaPausa(); andar(); return; }
      ir(actual + parseInt(b.dataset.a, 10)); andar();
    });
    ['mouseenter', 'focusin'].forEach(function (ev) { sec.addEventListener(ev, function () { quieto = true; }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { sec.addEventListener(ev, function () { quieto = false; }); });
    lista.addEventListener('scroll', function () {
      var t = tarjetas(), c = lista.scrollLeft + lista.clientWidth / 2, mejor = 0, dist = 1e9;
      for (var k = 0; k < t.length; k++) { var m = t[k].offsetLeft - lista.offsetLeft + t[k].clientWidth / 2, d = Math.abs(m - c); if (d < dist) { dist = d; mejor = k; } }
      if (mejor !== actual) { actual = mejor; pos.textContent = (actual + 1) + ' de ' + t.length; alto(); }
    }, { passive: true });
    dibujaPausa(); pos.textContent = '1 de ' + tarjetas().length; andar(); setTimeout(alto, 300);
    lista.querySelectorAll('img').forEach(function (im) { im.addEventListener('load', alto); });
  }

  /* pages/producto.md del script: "organic curves, flowing SVG shapes" -> una onda arriba de cada sección, del color de esa sección */
  function ondas(prod) {
    if (prod.dataset.neoOndas) return;
    var secs = prod.querySelectorAll(':scope > section'), k = 0;
    Array.prototype.forEach.call(secs, function (s, i) {
      if (i < 2 || s.classList.contains('neo-heroe')) return;
      var bg = getComputedStyle(s).backgroundColor; if (!bg || bg === 'rgba(0, 0, 0, 0)') bg = '#F0F9FF';
      var d = (k++ % 2) ? 'M0,42 C240,6 480,6 720,24 C960,42 1200,42 1440,10 L1440,42 Z' : 'M0,42 C200,10 440,0 720,20 C1000,40 1240,30 1440,6 L1440,42 Z';
      s.insertAdjacentHTML('afterbegin', '<svg class="neo-ola" viewBox="0 0 1440 42" preserveAspectRatio="none" aria-hidden="true" style="color:' + bg + '"><path d="' + d + '"/></svg>');
    });
    prod.dataset.neoOndas = '1';
  }

  /* MASTER.md · Motion "Stagger List" (Standard): gsap.from(items, { opacity:0, scale:0.92, y:16, duration:0.4,
     stagger:{ each:0.06, from:'start', grid:'auto' }, ease:'back.out(1.4)' }), al llegar con el scroll; con movimiento reducido no se anima */
  function movimiento(prod) {
    if (calma || !window.gsap || prod.dataset.neoMov) return;
    /* 14-10 · ERROR CORREGIDO: con scrollTrigger el gsap.from dejaba los packs, los resultados y las tarjetas en opacidad 0 desde
       el inicio, y en el celular de James el disparador nunca llegaba (posiciones calculadas antes de reordenar): quedaban en blanco.
       Ahora NADA se esconde antes: todo está visible y la animación corre recién cuando la caja aparece en pantalla. */
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        gsap.fromTo(e.target.children, { opacity: 0, scale: 0.92, y: 16 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)', clearProps: 'all' });
      });
    }, { threshold: 0.15 });
    ['.ing-grid', '.res-grid', '.sellos', '.otros', '.gar-chips'].forEach(function (q) {
      var caja = prod.querySelector(q); if (caja && caja.children.length) io.observe(caja);
    });
    prod.dataset.neoMov = '1';
  }

  /* EFECTOS DEL HÉROE (James: "quiero que el héroe tenga efectos"), los tres del catálogo --domain gsap de la skill:
     1. "Stagger List · Complex": SplitText por letra -> gsap.from(chars, { opacity:0, y:20, rotateX:-40, duration:0.6, stagger:0.015, ease:'expo.out' })
     2. "Parallax Scroll · Subtle": gsap.to(foto, { yPercent:10, ease:'none', scrollTrigger:{ trigger:sección, scrub:true } })
     3. "Stagger List · Subtle": gsap.from(items, { opacity:0, y:8, duration:0.3, stagger:0.03 }) para estrellas, precio y botón
     Con movimiento reducido no se anima nada (queda el texto quieto y legible). */
  function efectosHeroe(prod) {
    var h = prod.querySelector('.neo-heroe');
    if (calma || !window.gsap || !h || h.dataset.neoFx) return;
    h.dataset.neoFx = '1';
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    var img = h.querySelector('.neo-foto img');
    if (img && window.ScrollTrigger) gsap.to(img, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: h, scrub: true } });
    var arriba = prod.querySelector('.arriba2'), cta = arriba && arriba.nextElementSibling;
    var items = [].concat(arriba ? Array.prototype.slice.call(arriba.querySelectorAll('.estrellas, h1, h2, .sub, .precioTop, .preTop')) : [], cta ? [cta] : []);
    if (items.length) gsap.fromTo(items, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.03, clearProps: 'all' });
    var tit = h.querySelector('h1');
    function letras() {
      if (!window.SplitText || !tit) return;
      gsap.registerPlugin(SplitText);
      var split = new SplitText(tit, { type: 'words,chars' });
      gsap.fromTo(split.chars, { opacity: 0, y: 20, rotateX: -40 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.015, ease: 'expo.out' });
    }
    if (window.SplitText) letras();
    else { var sc = document.createElement('script'); sc.src = 'lib/SplitText.min.js'; sc.onload = letras; document.head.appendChild(sc); }
  }

  /* 14-10 James: "los botones tienen que tener efecto y no tienen". Efectos del catálogo de la skill ui-ux-pro-max (--domain gsap):
     1. "Hover Micro-interaction · Standard": gsap.to(el, { y:-4, scale:1.02, boxShadow:'0 12px 24px …', duration:0.25, ease:'power2.out' })
        -> en el celular no hay mouse: se repite solo (ida y vuelta, cada ~2 s) para que el botón "llame".
     2. Brillo: "backgroundPosition 200%, 1.4 s, sine.inOut, repeat:-1" (el tornasol iba a 8 s y no se notaba; ver neocell.css).
     3. Quick Reference "scale-feedback": al tocar baja a 0.96 y vuelve.
     Con movimiento reducido no se anima nada. */
  function botones() {
    if (calma || !window.gsap) return;
    document.querySelectorAll('#prod .cta, #prod #btnPromo, #prod #btnPagoAnt, #prod .cc-btn, #stickycta a, #stickycta button').forEach(function (b, i) {
      if (b.dataset.neoBtn) return; b.dataset.neoBtn = '1';
      gsap.to(b, { y: -4, scale: 1.02, boxShadow: '0 12px 24px rgba(245,158,11,0.45)', duration: 0.25, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: 1.6, delay: (i % 3) * 0.4 });
      b.addEventListener('pointerdown', function () { gsap.to(b, { scale: 0.96, duration: 0.12, ease: 'power1.out', overwrite: 'auto' }); });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { b.addEventListener(ev, function () { gsap.to(b, { scale: 1, duration: 0.2, ease: 'power2.out' }); }); });
    });
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !prod.querySelector('.arriba2') || !document.getElementById('listaRs')) return false;
    heroe(prod); /* 14-10 James: "ese desorden… el formulario por la mitad… la promoción por debajo": sin ordenar(), queda el orden
       de la ficha, el mismo de las tabletas (producto > promoción > pago con tarjeta > … > preguntas > formulario al final) */ solucion(prod); imagenesNuevas(prod); movimiento(prod);
    /* 14-10 James: "cinco fotos, nada más aparece una": las 5 con foto van primero en productos.js y la ficha muestra 4; se abre una tanda más */
    var mas = document.getElementById('masRs'); if (mas && !prod.dataset.neoRs) { prod.dataset.neoRs = '1'; mas.click(); }
    botones(); setTimeout(botones, 1500);   /* el botón fijo de abajo aparece después */ efectosHeroe(prod);   /* 14-10: Aurora UI · sin carrusel (James: reseñas como en las demás páginas) */
    /* red de seguridad (14-10, James vio secciones en blanco): nada que YA pasó por la pantalla puede quedar invisible.
       14-10 tarde, James: "no tiene nada de efecto": antes destapaba TODA la página a los 2,5 s y lo de abajo ya no se animaba al llegar.
       Ahora solo destapa lo que está en pantalla o arriba de ella, cada vez que se mueve la página. */
    var destapar = function () {
      var lim = innerHeight * 0.95;
      prod.querySelectorAll('[data-rv]:not(.vino)').forEach(function (e) { if (e.getBoundingClientRect().top < lim) e.classList.add('vino'); });
      prod.querySelectorAll('[style*="opacity"]').forEach(function (e) { if (e.getBoundingClientRect().top < lim - 200 && parseFloat(getComputedStyle(e).opacity) < 0.5) { e.style.opacity = '1'; e.style.transform = 'none'; } });
    };
    var espera = null;
    addEventListener('scroll', function () { clearTimeout(espera); espera = setTimeout(destapar, 1200); }, { passive: true });
    setTimeout(destapar, 2500);
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
