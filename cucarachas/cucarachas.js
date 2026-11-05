/* ============================================================
   CEBO MOONSPRY · MÉXICO · 04-11-2026
   Comportamiento del plano del script (Zero Interface: revelado suave y divulgación progresiva; CTA fijo en el héroe).
   Corre DESPUÉS de ficha.js. No toca precios ni el formulario: solo pasa #pedir (lo pinta ficha.js con su lógica de
   precios, pago anticipado, PayPal y envío del pedido) al bloque de compra, y pinta las opiniones reales de resenas.js.
   ============================================================ */
(function () {
  document.body.classList.add('p-cuc');
  var calma = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* 0 · titular del héroe en cascada, letra por letra (regla de héroe de James) */
  var h1 = $('cucTit');
  if (h1 && !calma) {
    var k = 0;
    var parte = function (nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var f = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (pal) {
            if (!pal) return;
            if (/^\s+$/.test(pal)) { f.appendChild(document.createTextNode(pal)); return; }
            var w = document.createElement('span'); w.style.whiteSpace = 'nowrap';
            pal.split('').forEach(function (ch) { var s = document.createElement('span'); s.className = 'l'; s.style.animationDelay = (k++ * 28) + 'ms'; s.textContent = ch; w.appendChild(s); });
            f.appendChild(w);
          });
          nodo.replaceChild(f, n);
        } else if (n.nodeType === 1) parte(n);
      });
    };
    parte(h1);
  }

  /* 1 · el formulario de la ficha al bloque de compra */
  function moverForm() {
    var f = $('pedir'), dst = $('cucForm');
    if (!f || !dst) return false;
    if (f.parentNode !== dst) dst.appendChild(f);
    return true;
  }
  if (!moverForm()) { var n = 0, t = setInterval(function () { if (moverForm() || ++n > 50) clearInterval(t); }, 100); }

  /* 2 · ir al formulario */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-ir]');
    if (!a) return;
    var f = $('pedir'); if (!f) return;
    e.preventDefault();
    f.scrollIntoView({ behavior: calma ? 'auto' : 'smooth', block: 'start' });
  });

  /* 3 · revelado suave */
  var rev = document.querySelectorAll('.cuc [data-rev]');
  if (calma || !('IntersectionObserver' in window)) rev.forEach(function (el) { el.classList.add('visto'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rev.forEach(function (el) { io.observe(el); });
    setTimeout(function () { rev.forEach(function (el) { el.classList.add('visto'); }); }, 4000);   /* red de seguridad */
  }

  /* 4 · CTA fijo: aparece al pasar el héroe y se esconde en el formulario */
  var fijo = $('cucFijo'), heroe = document.querySelector('.cuc .heroe');
  function verFijo() {
    if (!fijo || !heroe) return;
    var f = $('pedir'), y = window.scrollY || 0;
    var pasado = y > heroe.offsetTop + heroe.offsetHeight - 80;
    var enForm = false;
    if (f) { var r = f.getBoundingClientRect(); enForm = r.top < window.innerHeight && r.bottom > 0; }
    fijo.classList.toggle('ver', pasado && !enForm);
  }
  window.addEventListener('scroll', verFijo, { passive: true }); verFijo();

  /* 5 · contador de la oferta: hasta la medianoche de Ciudad de México */
  var reloj = $('cucReloj');
  function tic() {
    if (!reloj) return;
    var ahora = new Date();
    var mx = new Date(ahora.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
    var fin = new Date(mx); fin.setHours(24, 0, 0, 0);
    var s = Math.max(0, Math.floor((fin - mx) / 1000));
    var d2 = function (v) { return (v < 10 ? '0' : '') + v; };
    reloj.querySelector('[data-h]').textContent = d2(Math.floor(s / 3600));
    reloj.querySelector('[data-m]').textContent = d2(Math.floor(s % 3600 / 60));
    reloj.querySelector('[data-s]').textContent = d2(s % 60);
  }
  tic(); setInterval(tic, 1000);

  /* 6 · video real: no se baja al abrir (no compite con el héroe); se enciende al primer scroll o toque */
  var v = document.querySelector('.cuc video[data-src]');
  if (v) {
    var on = function () {
      if (v.src) return; v.src = v.getAttribute('data-src'); v.load();
      var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
    };
    window.addEventListener('scroll', on, { once: true, passive: true });
    window.addEventListener('touchstart', on, { once: true, passive: true });
    window.addEventListener('load', function () { setTimeout(on, 1500); });
  }

  /* 7 · opiniones REALES (resenas.js): primero las 4 con foto, después de 6 en 6 (divulgación progresiva) */
  var R = (window.RESENAS || []).slice();
  if (R.length) {
    var box = $('cucOpis'); box.hidden = false;
    var prom = Math.round(R.reduce(function (a, r) { return a + r.estrellas; }, 0) / R.length * 10) / 10;
    $('cucProm').textContent = String(prom).replace('.', ',');
    $('cucCuenta').textContent = R.length + ' opiniones con comentario';
    var nota = $('cucNota'); if (nota) nota.textContent = String(prom).replace('.', ',') + ' · ' + R.length + ' opiniones';
    var est = function (n) { return '⭐⭐⭐⭐⭐'.slice(0, n * 2); };
    var fecha = function (f) { try { return new Date(f + 'T12:00:00').toLocaleDateString('es-MX', { month: 'short', year: 'numeric' }); } catch (e) { return ''; } };
    var tarjeta = function (r) {
      return '<article class="opi">' + (r.foto ? '<img src="' + esc(r.foto) + '" alt="Foto del comprador" loading="lazy">' : '')
        + '<div class="opi__cab"><i>' + est(r.estrellas) + '</i><span>' + esc(r.nombre) + ' · ' + esc(fecha(r.fecha)) + '</span></div>'
        + '<p>' + esc(r.texto) + '</p><div class="opi__ver">Compra verificada</div></article>';
    };
    /* barras por estrellas, como el desengrasante */
    var barras = $('cucBarras');
    if (barras) barras.innerHTML = [5, 4, 3, 2, 1].map(function (s) {
      var n = R.filter(function (r) { return r.estrellas === s; }).length;
      return '<div class="barra"><span>' + s + ' ★</span><i><b style="width:' + Math.round(n / R.length * 100) + '%"></b></i><span>' + n + '</span></div>';
    }).join('');
    var conFoto = R.filter(function (r) { return r.foto; }), sinFoto = R.filter(function (r) { return !r.foto; });
    $('cucFotos').innerHTML = conFoto.map(tarjeta).join('');
    var lista = $('cucLista'), mas = $('cucMas'), i = 0;
    var pinta = function () {
      lista.insertAdjacentHTML('beforeend', sinFoto.slice(i, i + 6).map(tarjeta).join(''));
      i += 6; if (i >= sinFoto.length) mas.hidden = true;
    };
    pinta(); mas.addEventListener('click', pinta);
  }
})();
