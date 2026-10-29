/* ============================================================
   BRAIN · MEMORY & MOOD · MÉXICO · 28-10-2026
   Corre DESPUÉS de ficha.js. No toca precios, formulario ni los id que usa ficha.js. Como neocell.js en Chile:
     1. Héroe: el título (rótulo, titular y frase) va ENCIMA de la foto, en el tercio libre de arriba (molde de Chile,
        James 28-10: "ese hero está bien").
     2. Efectos del catálogo --domain gsap de la skill:
        · "Stagger List · Complex" en el titular: SplitText por letra, opacity 0, y 20, rotateX -40, 0.6 s, stagger 0.015, expo.out
        · "Scroll Reveal": opacity 0, y 24, 0.5 s, stagger 0.08, power2.out, al entrar en pantalla
        Con movimiento reducido no se anima nada (queda el estado final, legible).
   ============================================================ */
(function () {
  var p = ''; try { p = window.__P || new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  if (p !== 'brain') return;
  document.body.classList.add('p-brain');
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function heroe(prod) {
    var h = prod.querySelector('.heroP'); if (!h || h.querySelector('.b-sobre')) return !!h;
    var marco = h.querySelector('.heroP__marco'), txt = h.querySelector('.heroP__txt');
    if (!marco || !txt) return false;
    var sobre = document.createElement('div'); sobre.className = 'b-sobre';
    /* 28-10 reglas de James: el pago anticipado (−10 %) se promociona EN EL HÉROE. El aviso del motor vive en el bloque
       de texto que quedó oculto (una sola presentación), así que viaja con el título encima de la foto. */
    ['.heroP__kicker', '.heroP__h1', '.heroP__sub', '.heroP__ahorra'].forEach(function (q) { var el = txt.querySelector(q); if (el) sobre.appendChild(el); });
    marco.appendChild(sobre);
    return true;
  }

  /* 28-10 reglas de James: el pago anticipado también va EN LA PROMOCIÓN ("o $719 pagando ahora con tarjeta…").
     El precio sale del producto (productos.js, anticipado.precios), nunca escrito aquí. */
  function promoAnticipado(prod) {
    if (prod.querySelector('.promo-tarjeta')) return;
    var P = (window.PRODUCTOS || [])[0], bp = document.getElementById('btnPromo');
    var uni = prod.querySelector('.promo-sec .promo-uni');
    if (!P || !P.anticipado || !P.anticipado.precios || !bp || !uni) return;
    var i = Number(bp.getAttribute('data-i')), pre = P.anticipado.precios[i];
    if (!(pre > 0)) return;
    var lin = document.createElement('p');
    lin.className = 'promo-uni promo-tarjeta';
    lin.innerHTML = 'o <b>$' + Number(pre).toLocaleString('es-MX') + '</b> pagando ahora con tarjeta · −' + P.anticipado.pct + '&nbsp;% y entrega prioritaria';
    uni.parentNode.insertBefore(lin, uni.nextSibling);
  }

  /* 28-10 James: "los botones que tengan efecto". Catálogo --domain gsap de la skill, "Hover Micro-interaction · Standard":
     gsap.to(el, { y:-4, scale:1.02, boxShadow:'0 12px 24px …', duration:0.25, ease:'power2.out' }). En el celular no hay
     mouse: se repite solo (ida y vuelta) para que el botón llame, como en Chile. Al tocar baja a 0.96 y vuelve. */
  function botones() {
    if (calma || !window.gsap) return;
    document.querySelectorAll('#prod .cta, #prod .heroP__cta, #prod #btnPromo, #prod button[type="submit"], #stickycta a:not(.waBoton), #stickycta button').forEach(function (b, i) {
      if (b.dataset.bBtn) return; b.dataset.bBtn = '1';
      gsap.to(b, { y: -4, scale: 1.02, boxShadow: '0 12px 24px rgba(37,99,235,0.45)', duration: 0.25, ease: 'power2.out', yoyo: true, repeat: -1, repeatDelay: 1.6, delay: (i % 3) * 0.4 });
      b.addEventListener('pointerdown', function () { gsap.to(b, { scale: 0.96, duration: 0.12, ease: 'power1.out', overwrite: 'auto' }); });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { b.addEventListener(ev, function () { gsap.to(b, { scale: 1, duration: 0.2, ease: 'power2.out' }); }); });
    });
  }

  function efectos(prod) {
    if (calma || !window.gsap || prod.dataset.bFx) return;
    prod.dataset.bFx = '1';
    /* "Parallax Scroll · Subtle": gsap.to(capa, { yPercent:10, ease:'none', scrollTrigger:{ trigger:sección, scrub:true } }) */
    var foto = prod.querySelector('.heroP__img');
    /* 28-10 James vio una franja gris arriba de la foto: con el disparador por defecto la foto ya arrancaba corrida hacia
       abajo. Ahora empieza en 0 cuando la página está arriba del todo y solo se mueve al bajar. */
    if (foto && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); gsap.fromTo(foto, { yPercent: 0 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: prod.querySelector('.heroP'), start: 'top top', end: 'bottom top', scrub: true } }); }
    var tit = prod.querySelector('.b-sobre .heroP__h1');
    if (tit && window.SplitText) {
      gsap.registerPlugin(SplitText);
      var split = new SplitText(tit, { type: 'words,chars' });
      gsap.fromTo(split.chars, { opacity: 0, y: 20, rotateX: -40 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.015, ease: 'expo.out' });
    }
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        gsap.fromTo(e.target.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'all' });
      });
    }, { threshold: 0.15 });
    /* "Scroll Reveal" en TODAS las secciones (James: "las secciones que tengan efecto"); nada queda escondido antes */
    Array.prototype.forEach.call(prod.querySelectorAll(':scope > section, :scope > .bloque, .ing-grid, .res-grid, .sellos'), function (caja) {
      if (caja.classList.contains('heroP') || !caja.children.length) return;
      io.observe(caja);
    });
  }

  function armar() {
    var prod = document.getElementById('prod');
    if (!prod || !heroe(prod)) return false;
    promoAnticipado(prod);
    efectos(prod);
    botones(); setTimeout(botones, 1500);   /* el botón fijo de abajo aparece después */
    return true;
  }
  function intentar() {
    if (armar()) return;
    var n = 0, t = setInterval(function () { n++; if (armar() || n > 60) clearInterval(t); }, 100);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', intentar); else setTimeout(intentar, 50);
})();
