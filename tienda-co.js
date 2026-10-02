/* ============================================================
   TIENDA JAYE GROUP COLOMBIA · pinta el catálogo de la portada.
   Adaptado de la tienda de Chile (shilajit/tienda.js).
   - Lee window.PRODUCTOS de /productos-co.js.
   - Candado igual que Chile: si algún precio del producto (packs y pago
     anticipado) no está en window.PRECIOS_APROBADOS, NO se pinta.
   - Cada tarjeta lleva a la ficha corta del producto: /<id>/ (ej. /gafas/).
   - Funciona con 1, 2 o más productos, y con un producto sin foto todavía.
   ============================================================ */
(function () {
  'use strict';

  var pesos = function (n) { return '$' + Number(n).toLocaleString('es-CO'); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  };

  /* las rutas de productos-co.js vienen relativas ('img/card3.webp'):
     se pasan a absolutas para que sirvan desde cualquier carpeta */
  function ruta(src) {
    if (!src) return '';
    return /^(https?:)?\/\//.test(src) || src.charAt(0) === '/' ? src : '/' + src;
  }

  function preciosDe(p) {
    var l = (p.packs || []).map(function (k) { return k.precio; });
    if (p.anticipado && p.anticipado.precios) l = l.concat(p.anticipado.precios);
    return l;
  }

  function aprobados(p) {
    var lista = window.PRECIOS_APROBADOS || [];
    var precios = preciosDe(p);
    if (!p || !p.id || !(p.packs || []).length) return false;
    return precios.every(function (x) { return lista.indexOf(x) >= 0; });
  }

  /* La nota y cuántas opiniones tiene ESTE producto, filtradas igual que en
     la ficha, para que la portada y la ficha digan el mismo número. */
  function notaDe(p) {
    var todas = window.RESENAS || [];
    var mias = todas.filter(function (r) {
      var t = (r.producto || '').toLowerCase(), n = p.nombre.toLowerCase();
      return t && (n.indexOf(t.split(' ')[0]) >= 0 || t.indexOf(n.split(' ')[0].toLowerCase()) >= 0);
    });
    if (mias.length < 8) return null;
    var suma = mias.reduce(function (a, r) { return a + (Number(r.estrellas) || 5); }, 0);
    return { n: mias.length, prom: (suma / mias.length).toFixed(1) };
  }

  function estrellitas(prom) {
    var llenas = Math.round(Number(prom));
    var s = '';
    for (var i = 1; i <= 5; i++) {
      s += '<svg viewBox="0 0 24 24" class="' + (i <= llenas ? 'on' : '') + '">'
        + '<path d="M12 2l2.9 6.2 6.6.9-4.8 4.7 1.2 6.7L12 17.3 6.1 20.5l1.2-6.7L2.5 9.1l6.6-.9z"/></svg>';
    }
    return s;
  }

  function tarjeta(p) {
    var barato = p.packs.reduce(function (a, b) { return b.precio < a.precio ? b : a; });
    var nota = notaDe(p);
    var dest = '/' + encodeURIComponent(p.id) + '/';
    var nom = esc(p.nombre);
    var estr = nota
      ? '<div class="nota">'
        + '<div class="linea1"><span class="est">' + estrellitas(nota.prom) + '</span>'
        + '<b>' + nota.prom + '</b></div>'
        + '<small>' + nota.n + ' opiniones</small>'
        + '</div>'
      : '';
    var et = p.etiqueta
      ? '<span class="et' + (p.etiquetaOro ? ' oro' : '') + '">' + esc(p.etiqueta) + '</span>'
      : '';
    /* si la foto no existe todavía (o falla), se oculta y queda la inicial */
    var ini = esc(p.nombre.charAt(0));
    var img = p.foto
      ? '<img src="' + esc(ruta(p.foto)) + '" alt="' + nom + '" loading="lazy" decoding="async"'
        + ' onerror="var s=document.createElement(\'span\');s.className=\'vacio\';s.textContent=this.alt.charAt(0);this.replaceWith(s)">'
      : '<span class="vacio">' + ini + '</span>';
    return '<article class="ficha" data-cat="' + esc(p.categoria || '') + '" data-rv>'
      + '<a class="tapa" href="' + dest + '" aria-label="Ver ' + nom + '"></a>'
      + '<span class="im">' + et + img + '</span>'
      + '<div class="cuerpo">'
      + '<h3>' + nom + '</h3>'
      + estr
      + (p.sub ? '<p class="sub">' + esc(p.sub) + '</p>' : '')
      + '<div class="precio"><b>' + pesos(barato.precio) + '</b>'
      + (barato.antes ? '<s>' + pesos(barato.antes) + '</s>' : '') + '</div>'
      + '</div>'
      + '<a class="btn" href="' + dest + '">Lo quiero</a>'
      + '</article>';
  }

  function vendibles() { return (window.PRODUCTOS || []).filter(aprobados); }

  function pintar(cat) {
    var todos = vendibles();
    var lista = cat && cat !== 'Todos'
      ? todos.filter(function (p) { return p.categoria === cat; })
      : todos;
    var cont = document.getElementById('rejilla');
    if (!cont) return;
    cont.innerHTML = lista.map(tarjeta).join('');
    cont.querySelectorAll('.ficha').forEach(function (f, i) {
      f.style.setProperty('--d', Math.min(i, 7) * 0.055 + 's');
    });
    var c = document.getElementById('cuantos');
    if (c) c.textContent = lista.length + (lista.length === 1 ? ' producto' : ' productos');
    revelar();
  }

  /* El menú de categorías vive en la línea blanca del medio. Solo se arma con
     las categorías de productos que de verdad se muestran. */
  function categorias() {
    var cats = ['Todos'];
    vendibles().forEach(function (p) {
      if (p.categoria && cats.indexOf(p.categoria) < 0) cats.push(p.categoria);
    });
    var cont = document.getElementById('cats');
    if (!cont) return;
    cont.innerHTML = cats.map(function (c, i) {
      return '<button type="button" aria-pressed="' + (i === 0) + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');
    cont.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      cont.querySelectorAll('button').forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
      pintar(b.dataset.cat);
    });
  }

  /* Cinta de avisos: se repite el grupo hasta cubrir el ancho (igual que Chile). */
  function cintaAvisos() {
    var marq = document.querySelector('.marq');
    var pista = marq && marq.querySelector('.pista');
    if (!marq || !pista) return;
    var base = Array.prototype.slice.call(pista.children)
      .map(function (n) { return n.cloneNode(true); });
    if (!base.length) return;
    function poner() { base.forEach(function (n) { pista.appendChild(n.cloneNode(true)); }); }
    function ajustar() {
      pista.innerHTML = '';
      poner();
      var vueltas = 0;
      while (pista.scrollWidth / 2 < marq.clientWidth * 1.15 && vueltas < 14) { poner(); vueltas++; }
    }
    ajustar();
    window.addEventListener('load', function () { requestAnimationFrame(ajustar); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustar);
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t); t = setTimeout(ajustar, 200);
    });
  }

  /* Al bajar se esconde la barra blanca; al volver arriba, vuelve. */
  function cabecera() {
    var p = document.getElementById('pegado');
    if (!p) return;
    var esperando = false, bajando = false;
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

  /* El video del hero (igual que Chile): solo se muestra si de verdad existe y
     puede reproducirse; si no, queda la foto. En datos lentos no se fuerza. */
  function videoHero() {
    var v = document.getElementById('clipHero');
    if (!v) return;
    var con = navigator.connection || {};
    if (con.saveData || /2g/.test(con.effectiveType || '')) return;
    v.addEventListener('loadeddata', function () {
      v.classList.add('listo');
      var t = v.play();
      if (t && t.catch) t.catch(function () { v.classList.remove('listo'); });
    });
    v.addEventListener('error', function () { v.classList.remove('listo'); });
    v.load();
  }

  /* Video de la sección final (igual que Chile): se carga cuando el cliente
     llega. REGLA: el texto NUNCA puede quedar invisible. */
  function videoGarantia() {
    var sec = document.querySelector('.gar-video');
    if (!sec) return;
    var v = document.getElementById('clipGar');
    var yaEsta = false;
    function mostrar() { if (yaEsta) return; yaEsta = true; sec.classList.add('entro'); }
    if (v) {
      var encender = function () { v.classList.add('listo'); };
      v.addEventListener('playing', encender);
      v.addEventListener('loadeddata', function () { if (v.readyState >= 3) encender(); });
      v.addEventListener('error', function () { v.classList.remove('listo'); });
    }
    var red = setInterval(function () {
      if (yaEsta || sec.getBoundingClientRect().top < window.innerHeight * 0.9) {
        mostrar(); clearInterval(red);
      }
    }, 600);
    if (!('IntersectionObserver' in window)) { mostrar(); return; }
    var ojo = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) { if (v && !v.paused) v.pause(); return; }
        mostrar();
        if (!v) return;
        var con = navigator.connection || {};
        if (con.saveData || /2g/.test(con.effectiveType || '')) return;
        if (!v.dataset.cargado) { v.dataset.cargado = '1'; v.load(); }
        var t = v.play();
        if (t && t.catch) t.catch(function () {});
      });
    }, { threshold: 0.25 });
    ojo.observe(sec);
  }

  /* El título del hero entra letra por letra (igual que Chile). */
  function letrasDelHero() {
    var h = document.querySelector('.hero h1');
    if (!h || h.dataset.listo) return;
    var lineas = h.innerHTML.split(/<br\s*\/?>/i);
    var n = 0;
    h.innerHTML = lineas.map(function (linea) {
      var palabras = linea.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean);
      return '<span class="linea">' + palabras.map(function (pal) {
        var letras = pal.split('').map(function (ch) {
          var d = (0.18 + n * 0.058).toFixed(3); n++;
          return '<span class="ltr" style="animation-delay:' + d + 's">' + ch + '</span>';
        }).join('');
        n += 1.6;
        return '<span class="pal">' + letras + '</span>';
      }).join(' ') + '</span>';
    }).join('');
    h.dataset.listo = '1';
  }

  /* Suscripción del pie: por ahora solo confirma en pantalla (igual que Chile). */
  function boletin() {
    var f = document.getElementById('fBoletin');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var c = document.getElementById('correoBoletin');
      var ok = document.getElementById('aceptoBoletin');
      if (!c.value || c.value.indexOf('@') < 0) { c.focus(); return; }
      if (!ok.checked) { ok.focus(); return; }
      f.outerHTML = '<p class=gracias>Listo. Te avisamos cuando haya novedades.</p>';
    });
  }

  /* Entrada de las piezas con data-rv. REGLA: nada puede quedarse invisible. */
  var ojoRv = null;
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

  var barriendo = false;
  function barrer() {
    var falta = document.querySelectorAll('[data-rv]:not(.vino)');
    if (!falta.length) return;
    var alto = window.innerHeight;
    falta.forEach(function (e) {
      var c = e.getBoundingClientRect();
      if (c.top < alto * 0.96 && c.bottom > 0) e.classList.add('vino');
    });
  }
  window.addEventListener('scroll', function () {
    if (barriendo) return;
    barriendo = true;
    requestAnimationFrame(function () { barrer(); barriendo = false; });
  }, { passive: true });
  window.addEventListener('resize', barrer, { passive: true });
  window.addEventListener('load', barrer);

  /* ---------- opiniones ----------
     Son opiniones DEL PRODUCTO (resenas.js), no de "nuestros clientes".
     Arriba la tira de fotos, abajo las tarjetas. Si no hay, se oculta. */
  function resenas() {
    var lista = window.RESENAS || [];
    var sec = document.getElementById('resenas');
    if (!sec || !lista.length) { if (sec) sec.hidden = true; return; }

    var suma = lista.reduce(function (a, r) { return a + (Number(r.estrellas) || 5); }, 0);
    var n = document.getElementById('reseNota');
    var q = document.getElementById('reseCuantas');
    if (n) n.textContent = (suma / lista.length).toFixed(1);
    if (q) q.textContent = lista.length.toLocaleString('es-CO') + ' opiniones';

    var fotos = [];
    lista.forEach(function (r) { if (r.foto && fotos.indexOf(r.foto) < 0) fotos.push(ruta(r.foto)); });
    var tira = document.getElementById('reseTira');
    var caja = tira && tira.parentNode;
    if (tira) {
      if (!fotos.length) {
        if (caja) caja.hidden = true;   // sin fotos: no se muestra la tira
      } else {
        var doble = fotos.concat(fotos);
        tira.innerHTML = doble.map(function (f) {
          return '<div class="fo"><img src="' + esc(f) + '" alt="Foto de la opinión" decoding="async"'
            + ' onerror="this.parentNode.classList.add(\'hueco\');this.remove()"></div>';
        }).join('');
        tira.style.animationDuration = Math.max(28, fotos.length * 5) + 's';
      }
    }

    var estrellas = function (k) {
      var s = '';
      for (var i = 1; i <= 5; i++) s += (i <= k ? '★' : '<i>★</i>');
      return s;
    };
    var fecha = function (f) {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f || '');
      return m ? m[3] + '-' + m[2] + '-' + m[1] : esc(f || '');
    };
    var tarjetaR = function (r) {
      return '<article class="rsn">'
        + '<div class="quien"><span class="av">' + esc((r.nombre || '?').charAt(0).toUpperCase()) + '</span>'
        + '<div><div class="nom">' + esc(r.nombre) + '</div>'
        + '<div class="lug">' + (r.verificada ? 'Compra verificada' : '') + '</div></div></div>'
        + '<div class="est">' + estrellas(r.estrellas) + '</div>'
        + '<p>' + esc(r.texto) + '</p>'
        + '<div class="prod">' + esc(r.producto) + '</div>'
        + '<div class="fec">' + fecha(r.fecha) + '</div>'
        + '</article>';
    };
    /* se turnan los productos, uno de cada uno, para que se vean todos */
    var porProd = {};
    lista.forEach(function (r) { (porProd[r.producto] = porProd[r.producto] || []).push(r); });
    var prods = Object.keys(porProd), turnadas = [], k = 0;
    while (turnadas.length < 25) {
      var alguna = false;
      for (var j = 0; j < prods.length; j++) {
        var g = porProd[prods[j]];
        if (g[k]) { turnadas.push(g[k]); alguna = true; }
        if (turnadas.length >= 25) break;
      }
      if (!alguna) break;
      k++;
    }

    var pista = document.getElementById('resePista');
    if (pista) pista.innerHTML = turnadas.map(tarjetaR).join('');

    function mover(dir) {
      if (!pista) return;
      var t = pista.querySelector('.rsn');
      var paso = ((t ? t.offsetWidth : 190) + 10) * 3;
      var max = pista.scrollWidth - pista.clientWidth;
      var destino = pista.scrollLeft + dir * paso;
      if (destino > max - 4) destino = 0;
      if (destino < 0) destino = max;
      pista.scrollTo({ left: destino, behavior: 'smooth' });
    }
    var a = document.getElementById('reseIzq'), b = document.getElementById('reseDer');
    if (a) a.addEventListener('click', function () { mover(-1); });
    if (b) b.addEventListener('click', function () { mover(1); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pedida = 'Todos';
    try {
      var q = new URLSearchParams(location.search).get('cat');
      if (q && vendibles().some(function (p) { return p.categoria === q; })) pedida = q;
    } catch (e) {}
    categorias();
    var bt = document.querySelector('#cats button[data-cat="' + pedida + '"]');
    if (bt) document.querySelectorAll('#cats button').forEach(function (x) {
      x.setAttribute('aria-pressed', String(x === bt));
    });
    pintar(pedida);
    resenas();
    cintaAvisos();
    cabecera();
    videoHero();
    letrasDelHero();
    videoGarantia();
    boletin();
    revelar();
  });
})();
