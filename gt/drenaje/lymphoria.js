/* ============================================================
   Diseño propio de la LYMPHORIA, montado sobre la ficha.
   → COPIA PARA GUATEMALA (gt/drenaje/, 11-11-2026): mismo diseño con el frasco MASVELD (fotos aprobadas por James).
     Sin sabor a miel, vegano, sin gluten, ml ni gotero (no están confirmados: el frasco trae tapa de rosca).

   Corre DESPUES de ficha.js. Si el producto no es la Lymphoria se va sin
   hacer nada. No toca el encabezado (.top) ni el pie (.pie): viven fuera
   de #prod. Es la regla de James.

   Lo que hace:
     1. cambia la galeria por el HERO que hizo James (tocador, gota dorada)
        con el titulo arriba, la gota que cae y la onda en el frasco
     2. pone tres chips: sabor a miel · vegano · sin gluten
     3. mete «Tres pasos y listo» y dos fotos del producto real antes de
        «Que es y para que sirve»
   Lo demas de la ficha (promo, reseñas, preguntas, formulario) sigue
   tal cual, para no romper la compra.

   🔴 LIMITE LEGAL: es un suplemento (D.S. 977/96). Aca no se dice que
   desinflama, ni hinchazon, ni retencion, ni que adelgaza o desintoxica,
   ni cuantas gotas tomar. Solo hechos del producto y de la compra.
   ============================================================ */
(function () {
  function slug() {
    try { return window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) { return ''; }
  }
  if (slug() !== 'drenaje') return;

  /* iconos en SVG, nunca emojis */
  var ICO = {
    miel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 4.2 6 7.4 6 10.6a6 6 0 0 1-12 0C6 10.4 9 7.2 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    hoja: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 11 10 6 19 5c-1 9-6 14-14 14zm0 0 7-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    /* GT: el tercer chip es "Pago al recibir" (el trigo tachado era de "sin gluten", que no está confirmado) */
    pago: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 10.5h19" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
  };
  function chip(ico, txt) { return '<span class="ly-chip">' + ico + txt + '</span>'; }

  /* polvo de miel del hero: posiciones y tiempos al azar, asi no marchan en fila */
  function motas() {
    var s = '';
    for (var i = 0; i < 14; i++) {
      s += '<i class="ly-mota" style="left:' + (30 + Math.random() * 64).toFixed(1) + '%;' +
        '--s:' + (5 + Math.random() * 5).toFixed(1) + 'px;--d:' + (Math.random() * 6).toFixed(2) + 's;' +
        '--t:' + (7 + Math.random() * 5).toFixed(2) + 's;--x:' + Math.round(Math.random() * 40 - 20) + 'px"></i>';
    }
    return s;
  }

  /* pone el estado "antes" y lo quita cuando el elemento entra en pantalla.
     conRed: a los 10 s lo quita igual (para lo que es contenido, no adorno) */
  function revelar(els, espera, conRed) {
    els = [].slice.call(els);
    if (!els.length) return;
    els.forEach(function (el) { el.classList.add(espera); });
    var obs = new IntersectionObserver(function (filas) {
      filas.forEach(function (f) {
        if (f.isIntersecting) { f.target.classList.remove(espera); obs.unobserve(f.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    els.forEach(function (el) { obs.observe(el); });
    if (conRed) setTimeout(function () { els.forEach(function (el) { el.classList.remove(espera); }); }, 10000);
  }

  function pasos() {
    var P = [
      ['Lo recibes en tu casa', 'Envío gratis a toda Guatemala. Le pagas al repartidor cuando lo tienes en la mano.'],
      ['Unas gotas en tu vaso', 'En agua o en jugo, en el momento del día que prefieras. La dosis sugerida viene en la etiqueta.'],
      ['Sigues con tu día', 'No hay que preparar nada aparte y el frasco cabe en la cartera.'],
    ];
    return '<section class="ly-pasos">' +
      '<span class="ly-rot2">Así de simple</span>' +
      '<h2 class="ly-h2">Tres pasos y listo</h2>' +
      '<ol class="ly-lista">' + P.map(function (p, i) {
        return '<li data-n="' + (i + 1) + '" style="--i:' + i + '"><b>' + p[0] + '</b><p>' + p[1] + '</p></li>';
      }).join('') + '</ol>' +
    '</section>';
  }

  /* las tres fotos 1:1 de James van DENTRO de «Que es y para que sirve»,
     como en la clorofila. Cada pie cuenta algo que la foto no trae escrito,
     para no decir dos veces lo mismo. Ninguno promete salud: es suplemento
     y el D.S. 977/96 lo prohibe. */
  function fichas() {
    var F = [
      ['gt-dren-p3.webp', 'Mujer en su cocina con el frasco Drenaje Linfático Masveld en una mano y un vaso de agua con limón en la otra',
       'Para qué sirve', 'Apoyo al sistema linfático, en tu día a día',
       'Está pensado para apoyar el funcionamiento del sistema linfático, acompañar el equilibrio natural de líquidos del organismo y sumarse a una rutina de alimentación equilibrada y actividad física. Su etiqueta lo presenta como «linfático tradicional · extracto 100 % natural».'],
      ['gt-dren-p2.webp', 'Vaso de agua con hielo y limón junto al frasco Drenaje Linfático Masveld y su tapa',
       'Cómo se toma', 'Unas gotas y sigues con lo tuyo',
       'Es líquido: unas gotas en tu vaso de agua o de jugo y se reparte solo. No hay cápsulas que tragar ni polvo que quede en el fondo del vaso.'],
      ['gt-dren-p1.webp', 'La caja de envío abierta sobre el mueble y una mano con el frasco Drenaje Linfático Masveld',
       'Qué recibes', 'Tu frasco, directo a tu casa',
       'Frasco de vidrio ámbar con tapa de rosca, con extractos de plantas en gotas. Te llega a tu dirección y lo pagas cuando lo tienes en la mano.'],
    ];
    return '<div class="ly-fichas">' + F.map(function (f) {
      return '<figure class="ly-fi">' +
        '<img src="img/' + f[0] + '?v=1" alt="' + f[1] + '" loading="lazy" width="1000" height="1000">' +
        '<figcaption><span class="ly-rot2">' + f[2] + '</span><b>' + f[3] + '</b><p>' + f[4] + '</p></figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  /* El antes/ahora NO se arma aca: va en la seccion «El cambio» de la tienda
     (ba-sec), que sale de productos.js. Asi queda en el MISMO lugar que en la
     clorofila, despues de la garantia (James, 11-sep). */

  /* «El producto real» se saco (James, 11-sep: «quita esto»). Las fotos del
     frasco ya estan en las tarjetas de «Que es y para que sirve» y en el video. */

  function montar() {
    var cont = document.getElementById('prod');
    if (!cont) return false;
    var arriba = cont.querySelector('.arriba2');
    if (!arriba) return false;                          /* ficha.js todavia no pinto */
    if (cont.querySelector('.ly-hero')) return true;    /* ya estaba puesto */

    document.body.classList.add('p-lymphoria');

    var html =
      '<div class="ly-hero">' +
        '<img src="img/gt-dren-hero.webp?v=1" alt="Frasco Drenaje Linfático Masveld sobre un tocador, junto a una mano que lo abre" fetchpriority="high" width="1024" height="1536">' +
        '<div class="ly-velo"></div>' + motas() +
        '<div class="ly-caida"><i class="ly-gota"></i></div>' +
        '<i class="ly-onda"></i>' +
        '<div class="ly-sobre">' +
          '<span class="ly-rot">Masveld · Drenaje linfático en gotas</span>' +
          '<h1 class="ly-h1">' +
            '<span class="ly-linea"><span class="ly-sube" style="--i:0">Tu rutina,</span></span>' +
            '<span class="ly-linea"><span class="ly-sube" style="--i:1">en gotas</span></span>' +
            '<span class="ly-linea"><span class="ly-sube ly-oro" style="--i:2">doradas.</span></span>' +
          '</h1>' +
          '<p class="ly-bajada ly-sube2">Extractos de plantas en gotas. Pagas cuando te llega.</p>' +
        '</div>' +
      '</div>' +
      '<div class="ly-chips">' + chip(ICO.miel, 'En gotas') + chip(ICO.hoja, 'Natural') + chip(ICO.pago, 'Pago al recibir') + '</div>';

    /* la GALERIA se va (arriba queda el hero); la cabecera con estrellas,
       nombre, precio y boton se queda, justo debajo de los chips */
    arriba.insertAdjacentHTML('beforebegin', html);
    ['.gal', '.miniz'].forEach(function (s) { var el = arriba.querySelector(s); if (el) el.remove(); });
    var chips = cont.querySelector('.ly-chips');
    if (chips) chips.insertAdjacentElement('afterend', arriba);

    /* pasos + producto real antes de la descripcion. Ninguno lleva boton:
       debajo del precio ya esta el de la ficha, y dos seguidos rompen la regla */
    var desc = cont.querySelector('section.desc');
    if (desc && !cont.querySelector('.ly-pasos')) desc.insertAdjacentHTML('beforebegin', pasos());
    /* «Que es y para que sirve» PASA A SER las tres tarjetas, igual que en la
       clorofila: la seccion se busca por su titulo y se le quitan el parrafo
       y la lista de puntos, que las tarjetas reemplazan (James, 11-sep).
       El dato que se pierde no se pierde de la pagina: el frasco, el sabor y
       los sellos siguen en «Que es» (formula), en las preguntas y en la ficha. */
    if (!cont.querySelector('.ly-fichas')) {
      var descSec = null;
      var secs = cont.querySelectorAll('section.desc');
      for (var i = 0; i < secs.length; i++) {
        var t = secs[i].querySelector('.tit2');
        if (t && t.textContent.indexOf('Qué es') >= 0) { descSec = secs[i]; break; }
      }
      if (descSec) {
        /* el frasco flotando sobre su halo de miel, apenas debajo del titulo */
        var tit = descSec.querySelector('.tit2');
        if (tit) tit.insertAdjacentHTML('afterend',
          '<figure class="ly-frasco"><img src="img/prod-drenaje.webp?v=1" ' +
          'alt="Frasco de vidrio ámbar Drenaje Linfático Masveld" loading="lazy" width="1000" height="1000"></figure>');
        /* 🔴 La tienda deja los puntos en opacidad 0 hasta que la seccion recibe
           la clase «vino», y su observador exige ver el 12% de la seccion. Con el
           frasco y las tres tarjetas esta seccion pasa de 7.000 px: ese 12% NO CABE
           en la pantalla de un celular, asi que los puntos se quedaban invisibles
           para siempre. Aca se prende viendo cualquier parte, con red a los 4 s. */
        var prender = function () { descSec.classList.add('vino'); };
        if ('IntersectionObserver' in window) {
          var ojo = new IntersectionObserver(function (filas) {
            if (filas.some(function (f) { return f.isIntersecting; })) { prender(); ojo.disconnect(); }
          }, { threshold: 0 });
          ojo.observe(descSec);
        } else prender();
        setTimeout(prender, 4000);
        descSec.insertAdjacentHTML('beforeend', fichas());
      }
    }

    efectos(cont);
    return true;
  }

  function efectos(cont) {
    var quieto = false;
    try { quieto = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var primera = cont.querySelector('details');
    if (primera) primera.open = true;

    /* RED DE SEGURIDAD del titulo: la animacion termina en 1,2 s; a los 2,6 s
       se quita la clase y el texto queda en su estado normal, que es visible.
       Nunca puede quedar un titulo escondido por culpa de un efecto. */
    cont.querySelectorAll('.ly-chip').forEach(function (c, i) {
      c.style.setProperty('--i', i);
      if (!quieto) c.classList.add('ly-pop');
    });
    var subir = cont.querySelectorAll('.ly-sube, .ly-sube2, .ly-pop');
    setTimeout(function () {
      subir.forEach(function (el) { el.classList.remove('ly-sube', 'ly-sube2', 'ly-pop'); });
    }, quieto ? 0 : 2600);

    /* destello en las estrellas de la cabecera */
    var est = cont.querySelector('.estrellas .est');
    if (est && !est.querySelector('.ly-glint')) est.insertAdjacentHTML('beforeend', '<i class="ly-glint"></i>');

    /* trazo de miel bajo cada titulo de seccion (el h1 del hero no) */
    var tits = cont.querySelectorAll('.ly-h2, section.bloque h2, section.form h2');
    tits.forEach(function (h) {
      if (h.querySelector('.ly-trazo')) return;
      h.insertAdjacentHTML('beforeend', '<svg class="ly-trazo" viewBox="0 0 120 10" aria-hidden="true"><path d="M3 7C30 2 62 9 117 4"/></svg>');
      if (getComputedStyle(h).textAlign === 'center') h.classList.add('ly-centro');
    });

    /* barra de miel arriba, se llena al bajar */
    if (!quieto && !document.querySelector('.ly-barra')) {
      var barra = document.createElement('div');
      barra.className = 'ly-barra'; barra.setAttribute('aria-hidden', 'true');
      document.body.appendChild(barra);
      var pend = false;
      var medir = function () {
        pend = false;
        var h = document.documentElement.scrollHeight - innerHeight;
        barra.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, scrollY / h) : 0) + ')';
      };
      addEventListener('scroll', function () { if (!pend) { pend = true; requestAnimationFrame(medir); } }, { passive: true });
      medir();
    }

    if (!quieto && 'IntersectionObserver' in window) {
      revelar(tits, 'ly-espera', false);                          /* adorno: sin red */
      revelar(cont.querySelectorAll('.ly-fi'), 'ly-espera', true); /* fotos: con red */
    }

    /* la linea de los pasos se dibuja cuando el cliente llega a ella */
    var lista = cont.querySelector('.ly-lista');
    if (!lista || quieto || !('IntersectionObserver' in window)) return;
    lista.classList.add('ly-antes');
    var hecho = false;
    function prender() { if (hecho) return; hecho = true; lista.classList.remove('ly-antes'); }
    var obs = new IntersectionObserver(function (filas) {
      if (filas.some(function (f) { return f.isIntersecting; })) { prender(); obs.disconnect(); }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    obs.observe(lista);
    /* red de seguridad: si el observador no avisa, a los 6 s se muestra igual */
    setTimeout(function () { prender(); obs.disconnect(); }, 6000);
  }

  /* ficha.js pinta cuando termina de leer productos.js: se reintenta */
  if (!montar()) {
    var n = 0;
    var t = setInterval(function () { if (montar() || ++n > 60) clearInterval(t); }, 120);
    document.addEventListener('DOMContentLoaded', montar);
    window.addEventListener('load', montar);
  }
})();
