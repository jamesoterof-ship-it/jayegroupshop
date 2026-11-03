/* ============================================================
   GAFAS MULTIFOCALES CON FILTRO AZUL · ESPAÑA · página propia (19-10-2026).
   Concepto de la página de Colombia (James 19-10: "el mismo concepto, diseño nuevo"):
   franja de letra pequeña que se lee nítida bajo la lupa, tres cifras grandes,
   "para qué sirven" con fotos, promoción, ventajas y comparativa.
   Diseño ui-ux-pro-max 20-10, corrida #25 (James: "DAEL"): HUD / Sci-Fi FUI, fondo #0B0B10, tarjeta #1E1E23,
   texto #F8FAFC, acento azul #3B82F6, Exo / Roboto Mono. Nada de verde. Estilos en gafas.css.
   🔴 Producto Dropi PRO 2816: sin graduación para elegir, funda blanda. Nada de estuche
   rígido ni paño (eso era el de Colombia).
   Solo actúa con ?p=gafas. Si este archivo falla, la ficha se ve igual.
   ============================================================ */
(function () {
  'use strict';
  var pid = '';
  try { pid = (window.__P || new URLSearchParams(location.search).get('p')) || ''; } catch (e) {}
  if (pid !== 'gafas') return;

  var QUIETO = false;
  try { QUIETO = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function nodo(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function svg(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; }
  function irAlPedido() { var f = document.getElementById('pedir'); if (f) f.scrollIntoView({ behavior: QUIETO ? 'auto' : 'smooth', block: 'start' }); }
  var FLECHA = svg('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>');
  function botonPedir(txt) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'cta gm-cta'; b.innerHTML = txt + ' ' + FLECHA;
    b.addEventListener('click', irAlPedido);
    return b;
  }

  /* 03-11 MÉXICO: cosas que se leen de cerca en México: la cinta de arriba y el texto de la lupa */
  var COSAS = ['El instructivo del medicamento', 'los mensajes del celular', 'el periódico del domingo', 'el menú del restaurante',
    'el precio en la etiqueta', 'la letra del crucigrama', 'la receta de la abuela', 'el ticket del súper',
    'el recibo de la luz', 'el libro del buró', 'las instrucciones de la caja', 'el grupo de la familia'];

  function tiraDeTexto(veces, marcarCada) {
    var s = '';
    for (var i = 0; i < veces; i++) {
      var c = COSAS[i % COSAS.length];
      s += (marcarCada && i % marcarCada === 1 ? '<b>' + c + '</b>' : c) + ' · ';
    }
    return s;
  }

  /* ---- 1 · LA LECTURA: cinta que corre + franja de letra pequeña con la lupa ---- */
  function bloqueLectura() {
    var cinta = tiraDeTexto(COSAS.length, 0);
    var letra = tiraDeTexto(48, 4);
    return '<section class="gm-lectura" aria-label="Así se lee con los lentes">'
      + '<div class="gm-cinta" aria-hidden="true"><div class="gm-cinta__va"><span>' + cinta + '</span><span>' + cinta + '</span></div></div>'
      + '<div class="gm-lupa" id="gmLupa" aria-hidden="true">'
      +   '<p class="gm-letra gm-letra--borrosa">' + letra + '</p>'
      +   '<p class="gm-letra gm-letra--clara">' + letra + '</p>'
      +   '<span class="gm-lente"></span>'
      + '</div>'
      + '<p class="gm-lupa__dice">Pasa el dedo por la letra: <b>así se lee con los lentes puestos</b></p>'
      + '<div class="gm-cifras">'
      +   '<div><b>2</b><span>zonas en el cristal: cerca abajo, lejos arriba</span></div>'
      +   '<div><b>0</b><span>marco: el cristal va al aire y casi no pesa</span></div>'
      +   '<div><b>1</b><span>sola medida: no hay graduación que elegir</span></div>'
      + '</div>'
      + '</section>';
  }

  /* ---- 2 · CERCA Y LEJOS: lo que en Colombia era "¿cuál me sirve?" ---- */
  function bloqueCercaLejos() {
    return '<section class="bloque gm-sec gm-cl">'
      + '<span class="gm-rot">Cerca y lejos</span>'
      + '<h2 class="gm-h2">Unos lentes, <em>dos distancias.</em></h2>'
      + '<p class="gm-lead">No hay graduación que elegir. El cristal tiene enfoque automático: cada zona tiene su trabajo.</p>'
      + '<div class="gm-zonas">'
      +   '<div class="gm-zona gm-zona--arriba"><i>Parte de arriba</i><b>Para mirar lejos</b><span>La tele, la calle, la persona que te saluda desde la otra mesa.</span></div>'
      +   '<div class="gm-zona gm-zona--abajo"><i>Parte de abajo</i><b>Para leer de cerca</b><span>El celular, el periódico, el instructivo, el precio de la etiqueta.</span></div>'
      + '</div>'
      + '<p class="gm-nota">Como todos los lentes de cerca y de lejos, piden unos días para acostumbrarse a mirar por abajo para leer. Si tienes una graduación alta, consulta con tu óptico.</p>'
      + '</section>';
  }

  /* ---- 3 · PARA QUÉ SIRVEN: tres fotos ---- */
  function bloqueUsos() {
    var usos = [
      ['img/gafas-letra.webp?v=1', 'Un hombre con los lentes sin marco leyendo el instructivo de un medicamento en la cocina', 'De cerca', 'La letra pequeña, sin alejarla', 'Se acabó estirar el brazo y entrecerrar los ojos para leer el instructivo o la etiqueta.'],
      ['img/gafas-pantalla.webp?v=1', 'Una mujer con los lentes sin marco trabajando con la computadora portátil', 'Pantallas', 'Celular, tablet y computadora', 'El filtro de luz azul los hace más cómodos cuando pasas rato delante de una pantalla.'],
      ['img/gafas-terraza.webp?v=1', 'Un hombre con los lentes puestos lee el periódico en una terraza y saluda a lo lejos junto a su pareja', 'Sin quitártelos', 'Lees y levantas la vista', 'El periódico en la terraza y, al mirar arriba, ves quién llega. Por eso el pack de 2: unos para cada uno.'],
    ];
    return '<section class="bloque gm-sec gm-usos">'
      + '<span class="gm-rot">Para qué sirven</span>'
      + '<h2 class="gm-h2">Para todo lo que <em>se lee de cerca.</em></h2>'
      + '<div class="gm-fotos">' + usos.map(function (u, i) {
          return '<figure class="gm-foto gm-entra" style="--i:' + i + '">'
            + '<div class="gm-foto__img"><img src="' + u[0] + '" alt="' + u[1] + '" loading="lazy" width="1000" height="1500"></div>'
            + '<figcaption><i>' + u[2] + '</i><b>' + u[3] + '</b><span>' + u[4] + '</span></figcaption></figure>';
        }).join('') + '</div>'
      + '</section>';
  }

  /* la lupa: recorre la franja sola; en el móvil sigue el dedo y en el ordenador el ratón */
  function moverLupa() {
    var caja = document.getElementById('gmLupa');
    if (!caja) return;
    var ancho = 0, alto = 0, px = 0, py = 0, ox = 0, oy = 0, inicio = performance.now(), tocado = -1e9, activo = true, pedido = 0;
    function medir() {
      ancho = caja.clientWidth; alto = caja.clientHeight;
      caja.style.setProperty('--gm-r', Math.round(Math.max(44, Math.min(70, alto * 0.4))) + 'px');
    }
    function colocar(x, y) { caja.style.setProperty('--gm-x', x.toFixed(1) + 'px'); caja.style.setProperty('--gm-y', y.toFixed(1) + 'px'); }
    function cuadro(ahora) {
      if (!activo) return;
      if (ahora - tocado > 2500) {
        var s = (ahora - inicio) / 1000;
        ox = ancho * (0.5 + 0.38 * Math.sin(s * 0.45));
        oy = alto * (0.5 + 0.18 * Math.cos(s * 1.1));
      }
      px += (ox - px) * 0.08; py += (oy - py) * 0.08;
      colocar(px, py);
      pedido = requestAnimationFrame(cuadro);
    }
    medir();
    window.addEventListener('resize', medir);
    px = ox = ancho / 2; py = oy = alto / 2; colocar(px, py);
    function seguir(ev) {
      var t = ev.touches ? ev.touches[0] : ev, r = caja.getBoundingClientRect();
      ox = t.clientX - r.left; oy = t.clientY - r.top; tocado = performance.now();
      if (QUIETO) { px = ox; py = oy; colocar(px, py); }
    }
    caja.addEventListener('pointermove', seguir, { passive: true });
    caja.addEventListener('touchmove', seguir, { passive: true });
    if (QUIETO) return;
    pedido = requestAnimationFrame(cuadro);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (v) {
        var ve = v[0].isIntersecting;
        if (ve && !activo) { activo = true; pedido = requestAnimationFrame(cuadro); }
        else if (!ve && activo) { activo = false; cancelAnimationFrame(pedido); }
      }).observe(caja);
    }
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod) return false;
    var hero = prod.querySelector('.heroP'), arriba = prod.querySelector('.arriba2');
    if (!hero || !arriba) return false;
    if (document.body.classList.contains('p-gafas')) return true;
    document.body.classList.add('p-gafas');

    if (!document.getElementById('gm-letras')) {
      var l = document.createElement('link');
      l.id = 'gm-letras'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Exo:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;700&display=swap';
      document.head.appendChild(l);
    }

    /* James 20-10: el titular va ENCIMA de la foto del héroe, con su efecto de cascada (las letras de .hCas caen al
       volver a entrar en la página). Arriba la foto es azul oscuro y vacía: ahí caben las estrellas y el titular. */
    var marco = hero.querySelector('.heroP__marco'), h1 = hero.querySelector('.heroP__h1');
    if (marco && h1 && !marco.querySelector('.gm-heroTit')) {
      var tit = document.createElement('div');
      tit.className = 'gm-heroTit';
      var arribaH = hero.querySelector('.heroP__nota') || hero.querySelector('.heroP__kicker');
      if (arribaH) tit.appendChild(arribaH);
      tit.appendChild(h1);
      var sombra = document.createElement('div');
      sombra.className = 'gm-heroSombra'; sombra.setAttribute('aria-hidden', 'true');
      marco.appendChild(sombra);
      marco.appendChild(tit);
      /* la línea que escanea (HUD) recorre el alto real de la foto */
      var alto = function () { marco.style.setProperty('--gm-alto', marco.clientHeight + 'px'); };
      alto(); window.addEventListener('resize', alto);
    }

    var hijos = [].slice.call(prod.children);
    var antesDespues = prod.querySelector('section.bloque.ba-sec');
    var ventajas = prod.querySelector('.form-sec');
    var descripcion = prod.querySelector('section.desc');
    var oferta = prod.querySelector('.promo-sec');
    var compara = prod.querySelector('.cmp-sec');
    var video = prod.querySelector('.vid-wrap');
    var tras = hijos[hijos.indexOf(arriba) + 1];
    if (tras && (tras.className || '').trim() !== 'bloque') tras = null;

    /* la galería repetía las fotos de "para qué sirven": fuera */
    ['.gal', '.miniz'].forEach(function (s) { var e = arriba.querySelector(s); if (e) e.remove(); });

    var ancla = hero;
    function pon(n) { if (!n) return; ancla.insertAdjacentElement('afterend', n); ancla = n; }
    pon(nodo(bloqueLectura()));
    pon(arriba); pon(tras);
    pon(antesDespues);
    var cl = nodo(bloqueCercaLejos()); pon(cl); cl.appendChild(botonPedir('Los quiero, pago al recibir'));
    var usos = nodo(bloqueUsos()); pon(usos); usos.appendChild(botonPedir('Pedir mis lentes'));
    if (video) {
      video.classList.add('gm-sec', 'gm-video');
      video.insertAdjacentHTML('afterbegin', '<span class="gm-rot">En video</span><h2 class="gm-h2">Así son <em>de cerca.</em></h2>'
        + '<p class="gm-lead">Sin armazón, con la zona de lectura abajo y el filtro que frena la luz azul.</p>');
      var v = video.querySelector('video');
      if (v) v.setAttribute('poster', 'img/gafas-ficha-h-poster.webp?v=1');
      pon(video);
    }
    pon(oferta); pon(ventajas); pon(compara); pon(descripcion);

    if (antesDespues) {
      var e1 = antesDespues.querySelector('.eyebrow'); if (e1) e1.textContent = 'Antes y después';
      var t1 = antesDespues.querySelector('h2'); if (t1) t1.innerHTML = 'La misma carta, <em>otra vista.</em>';
      var c1 = antesDespues.querySelector('.cta'); if (c1) c1.remove();
    }
    if (oferta) {
      var ot = oferta.querySelector('h2') || oferta.firstElementChild;
      /* 03-11 MÉXICO: fuera la foto de la promo de España (traía euros y fundas que en México no vienen) */
      void ot;
    }
    if (ventajas) ventajas.appendChild(botonPedir('Los quiero, pago al recibir'));
    if (compara) { var us = compara.querySelector('th.us'); if (us) us.textContent = 'Estos lentes'; }
    var flota = document.querySelector('.btn-flota');
    if (flota) flota.textContent = 'Los quiero';
    var pide = document.querySelector('#pedir h2');
    if (pide) pide.textContent = 'Pide los tuyos';
    return true;
  }

  /* fotos que entran en fundido al leerlas */
  function alLeer() {
    var ent = document.querySelectorAll('.p-gafas .gm-entra');
    if (QUIETO || !('IntersectionObserver' in window)) { ent.forEach(function (e) { e.classList.add('gm-visto'); }); return; }
    document.body.classList.add('gm-mueve');
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) { if (v.isIntersecting) { v.target.classList.add('gm-visto'); obs.unobserve(v.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    ent.forEach(function (e) { obs.observe(e); });
    /* red de seguridad: a los 4 s todo visible */
    setTimeout(function () { ent.forEach(function (e) { e.classList.add('gm-visto'); }); }, 4000);
  }

  var intentos = 0;
  (function esperar() {
    if (armar()) { moverLupa(); alLeer(); return; }
    if (++intentos > 60) return;
    setTimeout(esperar, 100);
  })();
})();
