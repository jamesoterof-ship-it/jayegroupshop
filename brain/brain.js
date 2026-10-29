/* ============================================================
   BRAIN · MEMORY & MOOD · MÉXICO · REDISEÑO OSCURO 29-10-2026
   James 29-10: "hazme las secciones igualitas a la del drenador (jayegroup.com.co/lymphoria)… no me cambies las
   secciones". Mismo orden y mismas secciones de Lymphoria; colores, letras y efectos de la opción #83 de la skill
   (brain-mx-libre, Nature Distilled, la que el script eligió libre y James aprobó con "dale").
     1. Héroe: rótulo, titular en cascada y frase ENCIMA de la foto
     2. Chips (3 datos cortos)
     3. Presentación: estrellas, nombre, frase, precio y "o $719 pagando ahora" (sin galería y sin descripción)
     4. Botón "Lo quiero, pago al recibir"
     5. "Tres pasos y listo"
     6. "Qué es y para qué sirve": foto del frasco, texto, viñetas y 3 fichas con foto (para qué sirve / cómo se
        toma / qué recibes)
     7. Promoción · 8. "Paga con tarjeta y gana" · 9. Video · 10. Lo que trae · 11. Lo que te garantizamos ·
     12. Comparación · 13. Opiniones · 14. Garantía · 15. Antes y después · 16. Preguntas · 17. Cierre ·
     18. Con quién se despacha · 19. Formulario
   Corre DESPUÉS de ficha.js. No toca precios, formulario ni los id que usa ficha.js: solo ordena y completa.
   Efectos de la skill (--domain gsap, suaves): "Scroll Reveal" y "Parallax Scroll · Subtle" con easing natural.
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'brain') return;
  document.body.classList.add('p-brain');
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var P = function () { return (window.PRODUCTOS || [])[0]; };
  var mx = function (n) { return '$' + Number(n).toLocaleString('es-MX'); };
  var irPedido = function () { var f = document.getElementById('pedir'); if (f) f.scrollIntoView({ behavior: 'smooth' }); };
  var ICO = {
    sinCafe: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M4 4l16 16"/>',
    capsula: '<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.2 7.9l5.6 8.2"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    check: '<path d="M4 12l5 5L20 6"/>'
  };
  var svg = function (k) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICO[k] + '</svg>'; };

  function heroe(prod) {
    var h = prod.querySelector('.heroP'); if (!h || h.querySelector('.b-sobre')) return !!h;
    var marco = h.querySelector('.heroP__marco'), txt = h.querySelector('.heroP__txt');
    if (!marco || !txt) return false;
    var sobre = document.createElement('div'); sobre.className = 'b-sobre';
    ['.heroP__kicker', '.heroP__h1', '.heroP__sub'].forEach(function (q) { var el = txt.querySelector(q); if (el) sobre.appendChild(el); });
    marco.appendChild(sobre);
    return true;
  }

  /* 2 · chips, como Lymphoria ("Sabor a miel · Vegano · Sin gluten") */
  function chips() {
    var s = document.createElement('div'); s.className = 'b-chips';
    s.innerHTML = [['sinCafe', 'Sin cafeína'], ['capsula', '60 cápsulas'], ['sol', '1 toma al día']].map(function (c, i) {
      return '<span class="b-chip" style="--i:' + i + '">' + svg(c[0]) + c[1] + '</span>'; }).join('');
    return s;
  }

  /* 5 · "Tres pasos y listo" */
  function pasos() {
    var s = document.createElement('section'); s.className = 'b-pasos';
    s.innerHTML = '<span class="eyebrow">Así de simple</span><h2 class="tit2">Tres pasos y listo</h2><ol class="b-pasos__lista">'
      + [['Lo recibes en tu casa', 'Envío gratis a todo México. Le pagas al repartidor cuando lo tienes en la mano.'],
         ['Dos cápsulas por la mañana', 'Con un vaso de agua, en el desayuno. Un frasco trae 60 cápsulas: te dura 30 días.'],
         ['Sigues con tu día', 'Sin cafeína ni estimulantes: no te acelera ni te quita el sueño.']].map(function (x, i) {
        return '<li data-n="' + (i + 1) + '" style="--i:' + i + '"><b>' + x[0] + '</b><p>' + x[1] + '</p></li>'; }).join('')
      + '</ol>';
    return s;
  }

  /* 6 · "Qué es y para qué sirve" con la foto del frasco arriba y 3 fichas con foto debajo (como Lymphoria) */
  function completarDesc(desc) {
    if (!desc || desc.querySelector('.b-fichas')) return;
    var h2 = desc.querySelector('h2');
    var Pr = P() || {};
    if (h2 && Pr.fotoFrasco) h2.insertAdjacentHTML('afterend', '<figure class="b-frasco"><img src="' + Pr.fotoFrasco + '" alt="Frasco de Brain Memory & Mood con sus cápsulas" loading="lazy" width="1024" height="1024"></figure>');
    var fichas = [
      [(Pr.fotos || [])[0], 'Mujer en su cocina con el frasco de Brain en una mano y un vaso de agua en la otra', 'Para qué sirve', 'Memoria y concentración, en tu día a día',
        'Trae fosfatidilserina y omega-3, que forman parte de la membrana de las neuronas, con vitaminas del complejo B, zinc y magnesio. Es un suplemento alimenticio para acompañar tu rutina, no un medicamento.'],
      [(Pr.fotos || [])[2], 'Mano con dos cápsulas beige junto al frasco abierto', 'Cómo se toma', 'Dos cápsulas y sigues con lo tuyo',
        'Una vez al día, por la mañana, con un vaso de agua. Son cápsulas vegetales del tamaño de una vitamina común, sin sabor y sin cafeína.'],
      [(Pr.fotos || [])[1], 'Hombre en su escritorio con el frasco de Brain Memory & Mood en la mano', 'Qué recibes', '60 cápsulas por frasco, sellado',
        'Cada frasco trae 60 cápsulas: 30 días de toma diaria. El pack de 2 son dos meses completos y el de 3, tres meses. Lo pagas cuando llega a tu casa.']
    ].filter(function (f) { return f[0]; });
    desc.insertAdjacentHTML('beforeend', '<div class="b-fichas">' + fichas.map(function (f) {
      return '<figure class="b-fi"><img src="' + f[0] + '" alt="' + f[1] + '" loading="lazy" width="1024" height="1024"><figcaption>'
        + '<span class="b-rot2">' + f[2] + '</span><b>' + f[3] + '</b><p>' + f[4] + '</p></figcaption></figure>'; }).join('') + '</div>');
  }

  /* 7 · la promoción con su línea del pago anticipado */
  function promoAnticipado(promo) {
    var Pr = P(), bp = document.getElementById('btnPromo'), uni = promo && promo.querySelector('.promo-uni');
    /* 29-10 James: "la promoción no tiene ni una foto": la pareja con los 3 frascos, sin texto (precios en HTML) */
    var card = promo && promo.querySelector('.promo-card');
    if (Pr && Pr.fotoOferta && card && !promo.querySelector('.b-foto')) {
      card.insertAdjacentHTML('beforebegin', '<img class="b-foto" src="' + Pr.fotoOferta + '" alt="Pareja mostrando sus frascos de Brain Memory & Mood" loading="lazy" width="1024" height="1024">');
    }
    if (!Pr || !Pr.anticipado || !bp || !uni || promo.querySelector('.promo-tarjeta')) return;
    var pre = Pr.anticipado.precios[Number(bp.getAttribute('data-i'))];
    if (!(pre > 0)) return;
    var lin = document.createElement('p'); lin.className = 'promo-uni promo-tarjeta';
    lin.innerHTML = 'o <b>' + mx(pre) + '</b> pagando ahora con tarjeta · −' + Pr.anticipado.pct + '&nbsp;% y entrega prioritaria';
    uni.parentNode.insertBefore(lin, uni.nextSibling);
  }

  /* 8 · "Paga con tarjeta y gana", la misma caja de Lymphoria. El botón deja marcada la opción del propio motor. */
  function pagoAnt() {
    var Pr = P(); if (!Pr || !Pr.anticipado) return null;
    var s = document.createElement('section'); s.className = 'bloque b-pagoAnt';
    var logos = document.querySelector('#pedir .pagoOp__logos');
    s.innerHTML = '<div class="b-pagoAnt__caja"><p class="b-pagoAnt__tit">Paga con tarjeta y gana</p><ul class="b-pagoAnt__lista">'
      + '<li>' + svg('check') + '<span><b>' + Pr.anticipado.pct + '&nbsp;% de descuento</b> en todos los packs</span></li>'
      + '<li>' + svg('check') + '<span><b>Entrega prioritaria</b>: tu pedido sale primero</span></li>'
      + '<li>' + svg('check') + '<span><b>Pago seguro</b> con PayPal: tarjeta de crédito o débito, sin crear cuenta</span></li></ul>'
      + '<div class="b-pagoAnt__pie">' + (logos ? '<span class="b-pagoAnt__logos">' + logos.innerHTML + '</span>' : '')
      + '<button type="button" class="cta b-pagoAnt__btn">Pagar con tarjeta</button></div></div>';
    s.querySelector('.b-pagoAnt__btn').addEventListener('click', function () {
      var op = document.querySelector('#pedir .pagoOp[data-pago="pre"]'); if (op) op.click();
      irPedido();
    });
    return s;
  }

  /* 15 · antes y después: las palabras en HTML encima de cada mitad, y "Imagen ilustrativa" debajo */
  function rotulosBA(ba) {
    var caja = ba && ba.querySelector('.ba-img'); if (!caja || caja.querySelector('.b-ba')) return;
    caja.insertAdjacentHTML('beforeend', '<span class="b-ba b-ba--antes">Antes</span><span class="b-ba b-ba--despues">Después</span>');
    caja.insertAdjacentHTML('afterend', '<p class="b-ilus">Imagen ilustrativa.</p>');
  }

  function ordenar(prod) {
    if (prod.dataset.bOrden) return; prod.dataset.bOrden = '1';
    var q = function (s) { return prod.querySelector(':scope > ' + s); };
    var arriba = q('.arriba2');
    var boton = arriba && arriba.nextElementSibling && arriba.nextElementSibling.querySelector('#btnArriba') ? arriba.nextElementSibling : null;
    var desc = prod.querySelectorAll(':scope > .desc');
    var bloques = Array.prototype.slice.call(prod.querySelectorAll(':scope > .bloque'));
    var preguntas = bloques.filter(function (x) { return x.querySelector('.fq'); })[0];
    var despacho = bloques.filter(function (x) { return x.querySelector('.sellos'); })[0];
    var promo = q('.promo-sec');
    completarDesc(desc[0]); promoAnticipado(promo); rotulosBA(q('.ba-sec'));
    /* Lymphoria no lleva el bloque de "salieron hoy" */
    var esc = q('.esc-sec'); if (esc) esc.remove();
    var orden = [q('.heroP'), chips(), arriba, boton, pasos(), desc[0], promo, pagoAnt(), q('.vid-wrap'), q('.form-sec'),
      q('.res-sec'), q('.cmp-sec'), q('#resenas'), q('.gar-sec'), q('.ba-sec'), preguntas, desc[1], despacho, q('#pedir')];
    orden.forEach(function (n) { if (n) prod.appendChild(n); });
    var form = q('#pedir');
    Array.prototype.forEach.call(prod.querySelectorAll(':scope > section'), function (n) {
      if (orden.indexOf(n) === -1 && form) prod.insertBefore(n, form);
    });
  }

  function precioAnticipadoArriba(prod) {
    var Pr = P(), pd = prod.querySelector('.arriba2 .packDe');
    if (!Pr || !Pr.anticipado || !Pr.anticipado.precios || !pd || prod.querySelector('.arriba2 .preTop')) return;
    var l = document.createElement('p'); l.className = 'preTop';
    l.innerHTML = 'o <b>' + mx(Pr.anticipado.precios[0]) + '</b> pagando ahora con tarjeta · <b class="preTop__tag">−' + Pr.anticipado.pct + '&nbsp;% y entrega prioritaria</b>';
    pd.parentNode.insertBefore(l, pd.nextSibling);
  }

  /* Efectos de la opción #83 (Nature Distilled): "Parallax Scroll · Subtle" del catálogo --domain gsap en la foto del
     héroe (yPercent 10, scrub, nunca en textos) y easing natural (ease-out). El segundero da un golpe suave cada segundo
     (James: "el segundero no tiene ningún efecto"). */
  function parallax(prod) {
    if (calma || !window.gsap || !window.ScrollTrigger || prod.dataset.bPx) return;
    var foto = prod.querySelector('.heroP__img'); if (!foto) return;
    prod.dataset.bPx = '1'; gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(foto, { yPercent: 0 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: prod.querySelector('.heroP'), start: 'top top', end: 'bottom top', scrub: true } });
  }
  function segundero() {
    var s = document.getElementById('cS'); if (calma || !window.gsap || !s || s.dataset.bSeg) return;
    s.dataset.bSeg = '1';
    new MutationObserver(function () { gsap.fromTo(s, { y: -6, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }); }).observe(s, { childList: true, characterData: true, subtree: true });
  }

  function efectos(prod) {
    if (calma || !window.gsap || prod.dataset.bFx) return;
    prod.dataset.bFx = '1';
    var tit = prod.querySelector('.b-sobre .heroP__h1');
    if (tit && window.SplitText) {
      gsap.registerPlugin(SplitText);
      var split = new SplitText(tit, { type: 'words,chars' });
      gsap.fromTo(split.chars, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.02, ease: 'power1.out' });
    }
    if (!('IntersectionObserver' in window)) return;
    /* "Scroll Reveal · Subtle" de la skill */
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        gsap.fromTo(e.target.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', clearProps: 'opacity,transform' });
      });
    }, { threshold: 0.1 });
    Array.prototype.forEach.call(prod.querySelectorAll(':scope > section'), function (caja) {
      if (!caja.classList.contains('heroP') && caja.id !== 'pedir') io.observe(caja);
    });
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !heroe(prod) || !document.getElementById('pedir')) return false;
    precioAnticipadoArriba(prod);
    ordenar(prod);
    efectos(prod);
    parallax(prod);
    segundero();
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
