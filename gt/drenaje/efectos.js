/* ============================================================
   EFECTOS COMPARTIDOS · encabezado y apariciones

   Son los MISMOS de la tienda (tienda.js), copiados aca para que la ficha de
   producto se comporte igual sin tener que cargar la rejilla de productos
   entera. Si se cambia el efecto en la tienda, hay que cambiarlo aca tambien.
   ============================================================ */
(function () {
  'use strict';

  function cabecera() {
    var p = document.getElementById('pegado');
    if (!p) return;
    var esperando = false, bajando = false;
    /* Dos umbrales distintos (se activa a 90, se suelta a 24). Con un solo
       umbral, al quedar el dedo justo en el borde la barra oscilaba entre
       gris y negro y el logo parecia parpadear. */
    function mirar() {
      var y = window.scrollY || window.pageYOffset || 0;
      if (!bajando && y > 90) { bajando = true; p.classList.add('bajando'); }
      else if (bajando && y < 24) { bajando = false; p.classList.remove('bajando'); }
      esperando = false;
    }
    window.addEventListener('scroll', function () {
      if (esperando) return;
      esperando = true;
      requestAnimationFrame(mirar);
    }, { passive: true });
    mirar();
  }

  /* El video del hero: solo se muestra si de verdad existe y puede reproducirse.
     Si no, queda la foto y nadie ve un hueco negro. En datos moviles lentos
     tampoco se fuerza. */

  function revelar() {
    var nuevos = document.querySelectorAll('[data-rv]:not(.vino):not([data-visto])');
    if (!nuevos.length) return;

    if (!('IntersectionObserver' in window)) {
      nuevos.forEach(function (e) { e.classList.add('vino'); });
      return;
    }
    if (!ojoRv) {
      ojoRv = new IntersectionObserver(function (ent) {
        ent.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('vino');
          ojoRv.unobserve(e.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    }
    nuevos.forEach(function (e) { e.dataset.visto = '1'; ojoRv.observe(e); });
    barrer();
  }

  /* Red de seguridad de verdad: revisa a mano lo que esta dentro de la pantalla
     y lo muestra. El observador solo se entera de lo que CRUZA el borde, asi que
     si alguien cae a mitad de pagina (un enlace con #, volver atras, o un salto
     de golpe) lo que ya estaba ahi se quedaba invisible para siempre.
     Se cuelga del scroll y del cambio de tamano, no de un temporizador. */
  var barriendo = false;

  /* La barra de categorias: la misma de la tienda. Aca no hay rejilla que
     filtrar, asi que cada categoria lleva a la tienda ya filtrada. */
  function categorias() {
    var cont = document.getElementById('cats');
    if (!cont) return;
    /* "Inicio" NO va aca: ya esta abajo, en el encabezado, a la izquierda del
       logo. Repetirlo ocupa sitio y confunde. */
    var cats = ['Todos'];
    (window.PRODUCTOS || []).forEach(function (p) {
      if (p.categoria && cats.indexOf(p.categoria) < 0) cats.push(p.categoria);
    });
    var mia = (window.PRODUCTO_ACTUAL && window.PRODUCTO_ACTUAL.categoria) || '';
    cont.innerHTML = cats.map(function (c) {
      var url = (c === 'Inicio') ? '/' : ('/?cat=' + encodeURIComponent(c));
      return '<a href="' + url + '" role="button" aria-pressed="' +
             (c === mia) + '" data-cat="' + c + '">' + c + '</a>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    categorias();
    cabecera();
    /* la ficha revela lo suyo con revelarFicha(): si revelamos aca tambien,
       las dos se pisan y las secciones se quedan invisibles. */
  });
})();
