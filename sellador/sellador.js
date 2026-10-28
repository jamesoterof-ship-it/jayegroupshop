/* ============================================================
   SPRAY SELLADOR IMPERMEABLE · ESPAÑA · página propia (02-10-2026).
   ui-ux-pro-max ORIGINAL, opción B aprobada por James:
     · Patrón  Hero + Features + CTA
     · Estilo  Minimalism & Swiss (ferretería): mucho aire, alto contraste
     · Color   pizarra #334155 / #0F172A sobre #F8FAFC + verde #059669
     · Letra   Outfit (títulos) + Work Sans (texto)
   Efectos propios (no los del cabezal): la lluvia que REBOTA sobre la foto
   del héroe, la línea de sellador que se dibuja bajo cada título y la foto
   que se descubre de izquierda a derecha como una pasada de spray.
   Solo actúa con ?p=sellador. Si este archivo falla, la ficha se ve igual.
   ============================================================ */
(function () {
  'use strict';
  var q = '';
  try { q = (window.__P || new URLSearchParams(location.search).get('p')) || ''; } catch (e) {}
  if (q !== 'sellador') return;

  var CALMA = false;
  try { CALMA = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function nodo(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function alPedido() { var f = document.getElementById('pedir'); if (f) f.scrollIntoView({ behavior: CALMA ? 'auto' : 'smooth' }); }
  function svg(trazo) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + trazo + '</svg>'; }

  var TRAZO = {
    limpia: '<path d="M4 20h16"/><path d="M7 16l9-9 3 3-9 9H7z"/><path d="M14 6l3 3"/>',
    agita:  '<rect x="8" y="6" width="8" height="15" rx="2"/><path d="M10 6V3h4v3"/><path d="M4 10l-1.5 2L4 14M20 10l1.5 2L20 14"/>',
    rocia:  '<rect x="3" y="9" width="7" height="12" rx="1.5"/><path d="M5 9V6h3v3"/><path d="M13 8h.01M16 6h.01M16 10h.01M19 8h.01M19 4h.01M19 12h.01"/>',
    seca:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    no:     '<circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/>',
    si:     '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16 10"/>',
  };

  /* ---- DÓNDE SE USA: tres fotos, cada una con su uso real (ficha oficial SPSIL) ---- */
  function bloqueUsos() {
    var u = [
      ['img/sellador-terraza.webp?v=1', 'Un hombre sellando con el spray una grieta del suelo de su terraza', 'Terrazas y azoteas', 'Grietas del suelo y la junta con el muro, por donde se cuela el agua al piso de abajo.'],
      ['img/sellador-tejado.webp?v=1', 'Un hombre sellando con el spray las juntas de las tejas de un tejado', 'Tejados', 'Juntas y fisuras entre tejas antes de que empiecen las goteras.'],
      ['img/sellador-ventana.webp?v=1', 'Una mujer sellando con el spray la junta del alféizar de una ventana', 'Ventanas y muros', 'La junta del alféizar y las grietas del muro por donde entra la humedad.'],
    ];
    return '<section class="bloque se-sec se-usos">'
      + '<span class="se-rot">Dónde se usa</span>'
      + '<h2 class="se-h2">Allí por donde <em>se cuela el agua.</em></h2>'
      + '<p class="se-lead">Grietas, juntas y fisuras de cemento, metal, PVC, madera y plástico. Por fuera y por dentro.</p>'
      + '<div class="se-usos-lista">' + u.map(function (x, i) {
          return '<figure class="se-uso se-sube" style="--i:' + i + '">'
            + '<div class="se-uso-img"><img src="' + x[0] + '" alt="' + x[1] + '" loading="lazy" width="1000" height="1000"></div>'
            + '<figcaption><b>' + x[2] + '</b><span>' + x[3] + '</span></figcaption></figure>';
        }).join('') + '</div>'
      + '</section>';
  }

  /* ---- CÓMO SE APLICA: los 4 pasos del envase, tal cual ---- */
  function bloquePasos() {
    var p = [
      ['limpia', 'Limpia y seca', 'Quita el polvo, la grasa y el agua de la grieta. Sobre mojado no agarra.'],
      ['agita', 'Agita 1-2 minutos', 'Así se mezcla bien y sale una capa pareja.'],
      ['rocia', 'Rocía a 20-25 cm', 'En capas finas, siguiendo la grieta o la junta. Sin goteos.'],
      ['seca', '15-20 min entre capas', 'Dos o tres capas para una grieta normal. Listo en menos de una hora.'],
    ];
    return '<section class="bloque se-sec se-pasos-sec">'
      + '<span class="se-rot">Cómo se aplica</span>'
      + '<h2 class="se-h2">Cuatro pasos, <em>sin albañil.</em></h2>'
      + '<ol class="se-pasos">' + p.map(function (x, i) {
          return '<li class="se-paso se-sube" style="--i:' + i + '">'
            + '<span class="se-paso-n">' + (i + 1) + '</span>'
            + '<span class="se-paso-ico">' + svg(TRAZO[x[0]]) + '</span>'
            + '<div><b>' + x[1] + '</b><p>' + x[2] + '</p></div></li>';
        }).join('') + '</ol>'
      + '</section>';
  }

  /* ---- SÍ / NO: lo que sirve y lo que no (James 02-10: ser claros, sin engañar) ---- */
  function bloqueSiNo() {
    var si = ['Grietas y fisuras de tejados, terrazas y muros', 'Juntas de alféizares, ventanas y puertas', 'Canalones y bajantes de lluvia', 'Cemento, metal, PVC, madera y plástico'];
    var no = ['Tuberías de agua o con presión (grifo, entrada de agua)', 'Tubos rotos o agujeros grandes', 'Superficies mojadas: hay que esperar a que sequen'];
    function lista(arr, k) { return '<ul>' + arr.map(function (t) { return '<li>' + svg(TRAZO[k]) + '<span>' + t + '</span></li>'; }).join('') + '</ul>'; }
    return '<section class="bloque se-sec se-sino">'
      + '<span class="se-rot">Antes de comprar</span>'
      + '<h2 class="se-h2">Para qué sirve <em>y para qué no.</em></h2>'
      + '<div class="se-sino-grid">'
      +   '<div class="se-caja se-caja-si se-sube"><b>Sí sirve para</b>' + lista(si, 'si') + '</div>'
      +   '<div class="se-caja se-caja-no se-sube" style="--i:1"><b>No sirve para</b>' + lista(no, 'no') + '</div>'
      + '</div>'
      + '<p class="se-nota">Si tienes dudas con tu caso, escríbenos por WhatsApp antes de pedir y te decimos si te sirve.</p>'
      + '</section>';
  }

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var hero = cont.querySelector('.heroP'), arriba = cont.querySelector('.arriba2');
    if (!hero || !arriba) return false;
    if (document.body.classList.contains('p-sellador')) return true;
    document.body.classList.add('p-sellador');

    if (!document.getElementById('se-letra')) {
      var l = document.createElement('link');
      l.id = 'se-letra'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }

    var hijos = [].slice.call(cont.children);
    var ba = cont.querySelector('section.bloque.ba-sec');
    var trae = cont.querySelector('.form-sec');
    var video = cont.querySelector('.vid-wrap');
    var desc = cont.querySelector('section.desc');
    var promo = cont.querySelector('.promo-sec');
    var esc = cont.querySelector('.esc-sec');
    var cmp = cont.querySelector('.cmp-sec');
    var suelto = hijos[hijos.indexOf(arriba) + 1];
    if (suelto && (suelto.className || '').trim() !== 'bloque') suelto = null;

    /* la galería repetía las fotos que ya van en "Dónde se usa": fuera */
    ['.gal', '.miniz'].forEach(function (s) { var e = arriba.querySelector(s); if (e) e.remove(); });

    /* ORDEN (Hero + Features + CTA): héroe → antes/después → compra → dónde se usa →
       por qué funciona → vídeo → cómo se aplica → sí/no → el producto → oferta… */
    var tras = hero;
    function sigue(s) { if (s) { tras.insertAdjacentElement('afterend', s); tras = s; } }
    sigue(ba); sigue(arriba); sigue(suelto);
    sigue(nodo(bloqueUsos()));
    sigue(trae); sigue(video);
    sigue(nodo(bloquePasos()));
    sigue(nodo(bloqueSiNo()));
    sigue(desc); sigue(promo); sigue(esc); sigue(cmp);

    if (ba) {
      var eb = ba.querySelector('.eyebrow'); if (eb) eb.textContent = 'Antes y después';
      var h = ba.querySelector('h2'); if (h) h.innerHTML = 'De la grieta con humedad <em>a la pared seca.</em>';
      var bb = ba.querySelector('.cta'); if (bb) bb.remove();
    }
    var flota = document.querySelector('.btn-flota');
    if (flota) flota.textContent = 'Lo quiero';
    if (trae) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'cta se-cta'; b.textContent = 'Lo quiero, pago al recibir';
      b.addEventListener('click', alPedido);
      trae.appendChild(b);
    }
    if (video) {
      video.insertAdjacentHTML('afterbegin', '<div class="se-cab"><span class="se-rot">En vídeo</span><h2 class="se-h2">Así se <em>aplica.</em></h2></div>');
      var v = video.querySelector('video, .vid-prod');
      if (v) v.setAttribute('poster', 'img/sellador-ficha-poster.webp?v=1');
    }
    if (promo) {
      var tit = promo.querySelector('h2') || promo.firstElementChild;
      if (tit) tit.insertAdjacentHTML('afterend', '<figure class="se-foto"><img src="img/sellador-promo.webp?v=1" alt="Cuatro botes del sellador sobre el banco de un garaje, con 1 bote a 28,99 €, 2 botes a 38,99 € y 4 botes a 58,99 €" loading="lazy" width="1000" height="1000"></figure>');
    }
    if (cmp) { var us = cmp.querySelector('th.us'); if (us) us.textContent = 'Este'; }
    /* Las opiniones son de compradores de un sellador impermeable DEL MISMO TIPO
       (James lo autorizó el 02-10 y pidió no poner aclaración). Así que aquí la
       ficha tampoco afirma lo contrario: fuera la frase "de este producto". */
    var rt = cont.querySelector('.rev-title');
    if (rt && rt.firstChild && rt.firstChild.nodeType === 3) rt.firstChild.textContent = 'Opiniones de compradores ';
    var rf = cont.querySelector('.rev-fuente');
    if (rf) rf.remove();
    var ra = cont.querySelector('.rev-auto-label');
    if (ra) ra.textContent = 'Más opiniones de compradores';
    return true;
  }

  /* ============================================================
     HÉROE: LLUVIA QUE REBOTA. Gotas que caen en diagonal sobre la foto y, al
     llegar a la "superficie" (el suelo mojado de la foto, al 78 % del alto),
     saltan en dos gotitas: el sellador no deja pasar el agua.
     La foto se descubre de izquierda a derecha como una pasada de spray, y el
     precio aparece de golpe con un sello. Solo con la foto en pantalla.
     ============================================================ */
  function heroLluvia() {
    var hero = document.querySelector('.p-sellador .heroP');
    var marco = hero && hero.querySelector('.heroP__marco');
    var img = marco && marco.querySelector('.heroP__img');
    if (!marco || !img) return;
    if (CALMA) return;

    var pasada = false;
    function descubre() { if (pasada) return; pasada = true; img.classList.add('se-pasa'); }
    if (img.complete && img.naturalWidth) setTimeout(descubre, 40);
    else { img.addEventListener('load', descubre); img.addEventListener('error', descubre); }
    setTimeout(descubre, 2400);

    var cv = document.createElement('canvas');
    cv.className = 'se-lluvia'; cv.setAttribute('aria-hidden', 'true');
    marco.insertBefore(cv, marco.querySelector('.heroP__fundido'));
    var cx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function mide() {
      var r = img.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    mide(); window.addEventListener('resize', mide);

    var caen = [], saltan = [], enPantalla = true, visible = true, raf = 0, t0 = Date.now();
    function gota() {
      return { x: Math.random() * W * 1.2 - W * .1, y: -20 - Math.random() * H * .4,
        v: H * (.012 + Math.random() * .008), l: 10 + Math.random() * 14, a: .25 + Math.random() * .35,
        suelo: H * (.70 + Math.random() * .12) };
    }
    function cuadro() {
      raf = 0;
      if (!enPantalla || !visible) return;
      cx.clearRect(0, 0, W, H);
      if (Date.now() - t0 > 900) while (caen.length < 70) caen.push(gota());
      cx.lineCap = 'round';
      for (var i = caen.length - 1; i >= 0; i--) {
        var g = caen[i];
        g.y += g.v; g.x -= g.v * .18;
        cx.strokeStyle = 'rgba(226,232,240,' + g.a + ')'; cx.lineWidth = 1.3;
        cx.beginPath(); cx.moveTo(g.x, g.y); cx.lineTo(g.x + g.l * .18, g.y - g.l); cx.stroke();
        if (g.y >= g.suelo) {
          /* rebote: dos gotitas hacia los lados */
          saltan.push({ x: g.x, y: g.y, vx: -1.2 - Math.random(), vy: -2.2 - Math.random() * 1.4, a: .75 });
          saltan.push({ x: g.x, y: g.y, vx: 1.2 + Math.random(), vy: -2 - Math.random() * 1.4, a: .75 });
          caen[i] = gota();
        }
      }
      for (var k = saltan.length - 1; k >= 0; k--) {
        var s = saltan[k];
        s.vy += .22; s.x += s.vx; s.y += s.vy; s.a -= .03;
        if (s.a <= 0) { saltan.splice(k, 1); continue; }
        cx.fillStyle = 'rgba(255,255,255,' + s.a + ')';
        cx.beginPath(); cx.arc(s.x, s.y, 1.6, 0, 6.283); cx.fill();
      }
      raf = requestAnimationFrame(cuadro);
    }
    function arranca() { if (!raf && enPantalla && visible) raf = requestAnimationFrame(cuadro); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { enPantalla = e[0].isIntersecting; arranca(); }).observe(marco);
    else arranca();
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; arranca(); });
  }

  /* LA LÍNEA DE SELLADOR: al leer cada título, una pasada blanca con borde
     verde se dibuja debajo, como cuando rocías la junta. Una vez por título. */
  function lineas() {
    if (CALMA || !('IntersectionObserver' in window)) return;
    var tits = document.querySelectorAll('.p-sellador #prod h2');
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) { if (v.isIntersecting) { v.target.classList.add('se-sellado'); obs.unobserve(v.target); } });
    }, { rootMargin: '0px 0px -20% 0px' });
    tits.forEach(function (t) { t.classList.add('se-tit'); obs.observe(t); });
  }

  function suben() {
    if (CALMA || !('IntersectionObserver' in window)) return;
    var els = document.querySelectorAll('.p-sellador .se-sube');
    document.body.classList.add('se-mueve');
    var obs = new IntersectionObserver(function (vs) {
      vs.forEach(function (v) { if (v.isIntersecting) { v.target.classList.add('se-ya'); obs.unobserve(v.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { obs.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add('se-ya'); }); }, 4000);
  }

  /* ============================================================
     RULETA DE REGALO (James 16-10, como la del desengrasante de Chile):
     al entrar gira y SIEMPRE cae en la cinta. Todas las casillas son cosas
     que el cliente igual recibe. La cinta (sellado 5 cm × 3 m, una por
     pedido) la agrega el montador: aquí solo se cuenta. Nunca tapa la compra:
     se cierra sola a los 5 s, con un toque o con Escape.
     ============================================================ */
  var FOTO_CINTA = 'img/sellador-regalo-cinta.webp?v=1';
  /* James 16-10: UNA sola casilla de regalo (la de arriba, donde siempre cae); el resto, lo que igual recibe */
  var CASILLAS = ['Cinta de regalo', 'Envío gratis', 'Pago al recibir', 'Entrega a domicilio', 'Llega en 24-48 h', 'Ayuda por WhatsApp'];
  function guarda(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lee(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function rueda() {
    var n = CASILLAS.length, paso = 360 / n, out = '';
    CASILLAS.forEach(function (t, i) {
      var a0 = (i * paso - 90 - paso / 2) * Math.PI / 180, a1 = ((i + 1) * paso - 90 - paso / 2) * Math.PI / 180;
      var x0 = 130 + 120 * Math.cos(a0), y0 = 130 + 120 * Math.sin(a0), x1 = 130 + 120 * Math.cos(a1), y1 = 130 + 120 * Math.sin(a1);
      var regalo = t === 'Cinta de regalo', oro = !regalo && i % 2 === 1;
      out += '<path d="M130 130L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + 'A120 120 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'Z" class="' + (regalo ? 'se-r-gana' : (oro ? 'se-r-a' : 'se-r-b')) + '"/>';
      var p = t.split(' '), med = Math.ceil(p.length / 2);
      out += '<g transform="rotate(' + (i * paso) + ' 130 130)"><text x="130" y="52" text-anchor="middle" class="se-r-txt' + (regalo ? ' se-r-txt-gana' : '') + (oro ? ' se-r-txt-osc' : '') + '">'
        + '<tspan x="130" dy="0">' + p.slice(0, med).join(' ') + '</tspan><tspan x="130" dy="15">' + p.slice(med).join(' ') + '</tspan></text></g>';
    });
    return '<svg class="se-r-rueda" viewBox="0 0 260 260" role="img" aria-label="Ruleta de regalo">' + out
      + '<circle cx="130" cy="130" r="22" class="se-r-eje"/></svg>';
  }

  /* James 16-10, "como el desengrasante": al tocar donde sea el regalo desaparece ENSEGUIDA, la primera vez
     el cliente queda arriba en el héroe (no se le manda a comprar) y queda el circulito "¡Ganaste tu regalo!" */
  var caja = null, cierre = 0, primera = false, festejo = 0;
  function cerrar() {
    clearTimeout(cierre); clearInterval(festejo);
    if (!caja) return;
    caja.classList.remove('se-r-abierta');
    caja.hidden = true;
    document.removeEventListener('keydown', teclas);
    insignia();
    if (primera) { primera = false; window.scrollTo({ top: 0, behavior: CALMA ? 'auto' : 'smooth' }); }
  }
  /* burbujas de festejo que salen volando del centro cuando gana */
  function burbujas(cuantas) {
    if (CALMA) return;
    for (var i = 0; i < cuantas; i++) {
      var s = document.createElement('span'), an = Math.random() * 6.28, d = 120 + Math.random() * 200, t = 8 + Math.random() * 16;
      s.className = 'se-r-pop';
      s.style.cssText = 'left:50%;top:45%;width:' + t + 'px;height:' + t + 'px;--x:' + (Math.cos(an) * d).toFixed(0) + 'px;--y:' + (Math.sin(an) * d).toFixed(0) + 'px;animation-delay:' + (Math.random() * .2).toFixed(2) + 's';
      document.body.appendChild(s);
      setTimeout(function (el) { el.remove(); }, 1700, s);
    }
  }
  function teclas(ev) { if (ev.key === 'Escape') cerrar(); }
  function abrir(modo) {
    if (!document.getElementById('se-r-letra')) {
      /* letras de la ventana: las que propuso ui-ux-pro-max para la ruleta (16-10) */
      var lr = document.createElement('link');
      lr.id = 'se-r-letra'; lr.rel = 'stylesheet';
      lr.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=Raleway:wght@500;600;700&display=swap';
      document.head.appendChild(lr);
    }
    if (!caja) {
      caja = document.createElement('div');
      caja.className = 'se-r'; caja.setAttribute('role', 'dialog'); caja.setAttribute('aria-modal', 'true'); caja.setAttribute('aria-label', 'Tu regalo');
      caja.addEventListener('click', function (e) {
        if (e.target.closest('.se-r-x')) { cerrar(); return; }
        if (caja.dataset.modo === 'ruleta') girar(); else cerrar();
      });
      document.body.appendChild(caja);
    }
    caja.dataset.modo = modo;
    if (modo === 'ruleta') {
      caja.innerHTML = '<div class="se-r-tarjeta"><button type="button" class="se-r-x" aria-label="Cerrar">×</button><span class="se-r-rot">Solo por entrar</span>'
        + '<h3>Gira y descubre tu regalo</h3><p>Todas las casillas ganan. Toca en cualquier parte.</p>'
        + '<div class="se-r-marco"><span class="se-r-flecha" aria-hidden="true"></span>' + rueda() + '</div>'
        + '<button type="button" class="cta se-r-btn">Girar</button></div>';
    } else {
      caja.innerHTML = '<div class="se-r-tarjeta se-r-premio"><button type="button" class="se-r-x" aria-label="Cerrar">×</button><span class="se-r-rot">¡Ganaste!</span>'
        + '<h3>Una cinta impermeable de regalo</h3>'
        + '<img src="' + FOTO_CINTA + '" alt="Rollo de cinta impermeable autoadhesiva plateada" width="600" height="600">'
        + '<p>Cinta autoadhesiva de 5 cm × 3 m para tapar grietas y juntas antes de rociar el sellador. Va gratis con tu pedido.</p>'
        + '<p class="se-r-nota">Toca en cualquier parte para seguir.</p></div>';
      cierre = setTimeout(cerrar, 5000);
      burbujas(26); clearInterval(festejo); if (!CALMA) festejo = setInterval(function () { burbujas(7); }, 900);
    }
    caja.hidden = false;
    requestAnimationFrame(function () { caja.classList.add('se-r-abierta'); });
    document.addEventListener('keydown', teclas);
  }
  function girar() {
    var r = caja && caja.querySelector('.se-r-rueda');
    if (!r || r.dataset.gira) return;
    r.dataset.gira = '1';
    var bt = caja.querySelector('.se-r-btn'); if (bt) { bt.disabled = true; bt.textContent = 'Girando…'; }
    /* cae en la casilla 0 ("Cinta de regalo"), que está arriba, bajo la flecha */
    var vueltas = CALMA ? 0 : 5;
    r.style.transition = CALMA ? 'none' : 'transform 3.2s cubic-bezier(.17,.67,.21,1)';
    r.style.transform = 'rotate(' + (vueltas * 360) + 'deg)';
    setTimeout(function () { guarda('se_gano_cinta', '1'); primera = true; abrir('premio'); insignia(); }, CALMA ? 200 : 3400);
  }

  /* circulito flotante con el icono del regalo (como el desengrasante): vuelve a mostrar el premio */
  var bd = null, pedido = false;
  function insignia() {
    if (!lee('se_gano_cinta') || pedido) return;
    if (!bd) {
      bd = document.createElement('button');
      bd.type = 'button'; bd.className = 'se-r-insignia'; bd.setAttribute('aria-label', 'Ver tu regalo');
      bd.innerHTML = '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>Tu regalo</span>';
      bd.addEventListener('click', function () { abrir('premio'); });
      document.body.appendChild(bd);
    }
    bd.hidden = false;
  }

  /* al completar el pedido: "Tu cinta va con tu pedido" */
  function avisoPedido() {
    var pd = document.getElementById('pedir'); if (!pd || !('MutationObserver' in window)) return;
    new MutationObserver(function () {
      var ok = pd.querySelector('.listo'); if (!ok || ok.querySelector('.se-r-ok')) return;
      ok.insertAdjacentHTML('beforeend', '<div class="se-r-ok"><img src="' + FOTO_CINTA + '" alt="" width="72" height="72"><div><b>Tu cinta de regalo va con tu pedido</b><span>Cinta impermeable de 5 cm × 3 m, gratis.</span></div></div>');
      pedido = true; if (bd) bd.hidden = true;
    }).observe(pd, { childList: true, subtree: true });
  }

  function ruleta() {
    avisoPedido();
    if (/[?&](sinruleta=1|pagar=)/.test(location.search)) return;
    /* ?ruleta=1: para revisarla aunque ese teléfono ya haya ganado (James 16-10 "no aparece") */
    if (/[?&]ruleta=1/.test(location.search)) { try { localStorage.removeItem('se_gano_cinta'); } catch (e) {} }
    if (lee('se_gano_cinta')) { insignia(); return; }
    setTimeout(function () { abrir('ruleta'); }, 1400);
  }

  var n = 0;
  (function espera() {
    if (montar()) { heroLluvia(); lineas(); suben(); ruleta(); return; }
    if (++n > 60) return;
    setTimeout(espera, 100);
  })();
})();
