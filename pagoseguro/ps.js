/* 19-11-2026 · TIENDA DE PAGO SEGURO (jayegroupshop.com/pagoseguro)
   James: «la misma tienda, los mismos productos, solo le quitas el pago contra entrega,
   y a los productos les haces un 14 % de descuento en sus escaleras; las políticas cambian; diseño todo igual».
   «Los lentes, los precios que ya estipulamos (399/525/665)». Política: «vamos con la que te dije y punto».
   NO copia páginas: carga las MISMAS de la tienda (portada, fichas, políticas) y encima aplica el modo
   «solo pago anticipado». Si la tienda normal cambia, esta cambia con ella.
   Plano: design-system/jaye-pago-seguro-mx (skill ui-ux-pro-max 19-11): las piezas nuevas en azul #2563EB,
   verde #059669, fondo #F8FAFC, tinta #0F172A; todo lo demás es la tienda tal cual.
   Uso: cada página de /pagoseguro/ define window.PS = { modo:'portada' | 'ficha' | 'legal', prod, doc } y carga este archivo. */
(function () {
  var PS = window.PS || {};
  var PRODS = {
    lentes:     { base: '/lentes/',     id: 'gafas',      nombre: 'Lentes TR90 Pro Titanium',        COD: [479, 629, 799],    PRE: [399, 525, 665] },
    cucarachas: { base: '/cucarachas/', id: 'cucarachas', nombre: 'Cebo MoonSpry contra Cucarachas', COD: [449, 599, 649],    PRE: [386, 515, 558] },
    colageno:   { base: '/colageno/',   id: 'neocell',    nombre: 'Colágeno NeoCell Bio-Peptides',   COD: [779, 1079, 1549],  PRE: [670, 928, 1332] },
    brain:      { base: '/brain/',      id: 'brain',      nombre: 'Brain Memory & Mood',             COD: [799, 1200],        PRE: [687, 1032] }
  };
  var TODOS = [];
  Object.keys(PRODS).forEach(function (k) { TODOS = TODOS.concat(PRODS[k].COD, PRODS[k].PRE); });

  /* ---------- estilos de las piezas nuevas (la sección de confianza de /lentes-paypal) ---------- */
  var CSS = ''
    + '#ppCarga{min-height:100vh;display:flex;align-items:center;justify-content:center;font:600 15px Inter,sans-serif;color:#475569;background:#F8FAFC}'
    + 'body.pp-modo .pagoOp[data-pago="cod"]{display:none !important}'
    + 'body.pp-modo .pagoSel{grid-template-columns:1fr !important}'
    + 'section.ppConf{background:#F8FAFC !important;border-radius:20px;margin:26px 12px 0;padding:28px 14px 18px}'
    + '.ppConf h2{font-family:"Be Vietnam Pro","Noto Sans",Inter,sans-serif;font-weight:800;font-size:clamp(22px,5.4vw,30px);line-height:1.15;color:#0F172A !important;text-align:center;margin:0 0 6px}'
    + '.ppConf .ppSub{font-family:"Noto Sans",Inter,sans-serif;font-size:15px;color:#475569 !important;text-align:center;margin:0 auto 18px;max-width:46ch;line-height:1.55}'
    + '.ppEscudo{max-width:560px;margin:0 auto 16px;background:#fff !important;border:2px solid #2563EB;border-radius:16px;padding:16px;display:flex;gap:14px;align-items:center;box-shadow:0 10px 26px rgba(37,99,235,.14)}'
    + '.ppEscudo svg{flex:none;width:46px;height:46px}'
    + '.ppEscudo b{display:block;font-family:"Be Vietnam Pro",Inter,sans-serif;font-size:16.5px;color:#0F172A !important;margin-bottom:3px}'
    + '.ppEscudo span{font-family:"Noto Sans",Inter,sans-serif;font-size:14px;color:#475569 !important;line-height:1.5}'
    + '.ppGar{border-color:#059669 !important;box-shadow:0 10px 26px rgba(5,150,105,.14) !important;margin-top:14px}'
    + '.ppGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:560px;margin:0 auto}'
    + '.ppItem{background:#fff !important;border:1px solid #E4ECFC;border-radius:14px;padding:14px 12px}'
    + '.ppItem svg{width:26px;height:26px;stroke:#059669;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;display:block;margin-bottom:7px}'
    + '.ppItem b{display:block;font-family:"Be Vietnam Pro",Inter,sans-serif;font-size:14.5px;color:#0F172A !important;margin-bottom:3px}'
    + '.ppItem span{font-family:"Noto Sans",Inter,sans-serif;font-size:13px;color:#475569 !important;line-height:1.45}'
    + '.ppH3{font-family:"Be Vietnam Pro",Inter,sans-serif;font-weight:800;font-size:19px;color:#0F172A !important;text-align:center;margin:22px 0 12px}'
    + '.ppPasos{list-style:none;padding:0;margin:0 auto;max-width:560px;display:grid;grid-template-columns:1fr 1fr;gap:10px}'
    + '.ppPasos li{background:#fff;border:1px solid #E4ECFC;border-radius:14px;padding:12px}'
    + '.ppPasos i{font-style:normal;display:inline-flex;width:26px;height:26px;border-radius:50%;background:#2563EB;color:#fff !important;font:800 14px "Be Vietnam Pro",Inter,sans-serif;align-items:center;justify-content:center;margin-bottom:6px}'
    + '.ppPasos b{display:block;font-family:"Be Vietnam Pro",Inter,sans-serif;font-size:14.5px;color:#0F172A !important}'
    + '.ppPasos span{font-family:"Noto Sans",Inter,sans-serif;font-size:13px;color:#475569 !important}'
    + '.ppContacto{max-width:560px;margin:14px auto 0;background:#fff;border:1px solid #E4ECFC;border-radius:14px;padding:14px;text-align:center}'
    + '.ppContacto b{display:block;font-family:"Be Vietnam Pro",Inter,sans-serif;font-size:15px;color:#0F172A !important}'
    + '.ppContacto span{display:block;font-family:"Noto Sans",Inter,sans-serif;font-size:13.5px;color:#475569 !important;margin:2px 0 10px}'
    + '.ppContacto > a{display:inline-block;background:#059669;color:#fff !important;font:700 14px "Noto Sans",Inter,sans-serif;padding:11px 18px;border-radius:999px;text-decoration:none}'
    + '.ppDatos{font-family:"Noto Sans",Inter,sans-serif;font-size:13.5px;line-height:1.6;color:#475569 !important;margin:12px 0 0}'
    + '.ppDatos a{display:inline !important;background:none !important;padding:0 !important;color:#2563EB !important;font-weight:700;text-decoration:underline}'
    + '.ppLogos{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin:16px 0 4px}'
    + '.ppLogos img{height:24px;width:auto}'
    /* James 19-11: «como la de Chile»: abajo un solo botón a lo ancho, y WhatsApp solo el círculo verde flotando encima */
    + 'body.pp-modo .stickycta .waFlota{display:none !important}'
    + 'body.pp-modo .stickycta .btn-flota{flex:1 1 100% !important;width:100% !important;max-width:none !important}'
    + 'body.pp-modo a.wa{bottom:86px !important}'
    /* la página escondía el círculo cuando salía la barra (opacity 0): aquí el círculo es el único WhatsApp, siempre visible */
    + 'body.pp-modo.con-barra a.wa{opacity:1 !important;visibility:visible !important;pointer-events:auto !important}'
    /* James 19-11: «estas imágenes se ven cortadas» (Para qué sirven): fotos verticales en recuadro horizontal → cuadradas, sin cortar la cara */
    + 'body.pp-modo .gm-usos img{aspect-ratio:auto !important;height:auto !important;max-height:none !important;object-fit:contain !important}'
    /* el recuadro de la foto tenía forma 4:3 con overflow hidden y cortaba igual: se adapta a la foto */
    + 'body.pp-modo .gm-usos .gm-foto__img{aspect-ratio:auto !important;height:auto !important;max-height:none !important}'
    + '.psFoto{display:block;width:100%;max-width:560px;aspect-ratio:1/1;object-fit:cover;border-radius:18px;margin:14px auto 18px;box-shadow:0 10px 28px rgba(0,0,0,.18)}'
    /* colágeno: la etiqueta del pago anticipado viene con «−10 %» escrito en su CSS */
    + 'body.pp-modo .pagoAnt__tit::before{display:none !important;content:none !important}body.pp-modo .pagoOp__cinta{display:none !important}'
    /* el precio que se ve YA es el de pago anticipado: fuera el «o $X pagando ahora con tarjeta» */
    + 'body.pp-modo .preTop,body.pp-modo .promo-tarjeta{display:none !important}'
    /* James 19-11 (lentes): las letras NO pueden tapar el lente en computadora */
    + '@media (min-width:700px){body.ps-lentes .heroP .heroP__img{object-position:50% 100% !important}body.ps-lentes .heroP .heroP__h1{font-size:clamp(30px,3.6vw,46px) !important;line-height:1.02 !important}}';
  function ponerCss() { var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); }

  /* ---------- textos de contra entrega → pago seguro ---------- */
  var CAMBIOS = [
    [/pagas cuando lo recibes en tu casa/gi, 'pagas seguro con PayPal'],
    [/por adelantado: pagas al recibir/gi, 'tu compra protegida por PayPal'],
    [/Al repartidor, cuando lo tienes en la mano/gi, 'Con PayPal o tarjeta, antes del envío'],
    [/Pagas en efectivo cuando te lleg(a|ue) el pedido\.?/gi, 'Pagas con PayPal o tarjeta de débito o crédito.'],
    [/Pago contra entrega en todo México/gi, 'Pago seguro con PayPal o tarjeta'],
    [/Pago 100% seguro contra entrega/gi, 'Pago 100% seguro con PayPal'],
    [/pago al recibir/gi, 'pago seguro con PayPal'],
    [/Pagas al recibir/g, 'Pago protegido por PayPal'],
    [/pagas al recibir/g, 'pago protegido por PayPal'],
    [/Pagas cuando lo recibes/g, 'Pago protegido con PayPal'],
    [/Pagas cuando lo tienes en la mano\.?/g, 'Pagas seguro con PayPal o tarjeta.'],
    [/No pagas nada por adelantado\.?/g, 'Pago protegido por PayPal'],
    [/no pagas nada por adelantado\.?/g, 'pago protegido por PayPal'],
    [/pagas en efectivo a la transportadora cuando recibes el pedido\.?/g, 'pago anticipado con PayPal o con tarjeta de débito o crédito a través de PayPal. El pedido se despacha cuando se confirma el pago.'],
    [/Le pagas al repartidor cuando lo tienes en la mano\.?/g, 'Pagas seguro con PayPal o tarjeta y sale con envío prioritario.'],
    [/contra entrega/gi, 'con PayPal'],
    /* garantía: la misma regla en toda la tienda (30 días por defecto de fábrica), nada de «te devolvemos tu dinero» */
    [/Si no quedas conforme, te devolvemos tu dinero dentro de los primeros 30 días\. Sin preguntas\./g, 'Tienes 30 días de garantía por defecto de fábrica. Si llega dañado, en mal estado o distinto a lo que pediste, te lo cambiamos sin costo.'],
    [/Sí: 30 días de garantía de satisfacción\. Si no quedas conforme, te devolvemos tu dinero\./g, 'Sí: 30 días de garantía por defecto de fábrica. Si llega dañado, en mal estado o distinto a lo que pediste, escríbenos por WhatsApp dentro de los 14 días siguientes a la entrega, con una foto, y lo resolvemos.'],
    [/Garantía de satisfacción/g, 'Garantía de fábrica'],
    [/garantía de satisfacción/g, 'garantía por defecto de fábrica'],
    [/Sí\. Tienes 30 días desde que lo recibes para pedir la devolución si no quedas conforme\. Revisa la Política de Reembolso\./g, 'Sí: 30 días de garantía por defecto de fábrica. Si llega dañado, en mal estado o distinto a lo que pediste, escríbenos por WhatsApp dentro de los 14 días siguientes a la entrega, con una foto, y lo resolvemos.'],
    [/Pagas en efectivo cuando recibes el producto, en tu propia dirección\. No pagas nada por adelantado ni dejas datos de tarjeta\./g, 'Con PayPal o con tarjeta de débito o crédito a través de PayPal, sin crear cuenta. Nosotros nunca vemos los datos de tu tarjeta.'],
    [/Paga al recibir o con tarjeta y ahorra 10 %/g, 'Pago seguro con PayPal o tarjeta'],
    [/^10 % de descuento$/, 'Entrega prioritaria'],
    [/^−10( | )?%$/, 'PayPal'],
    [/^Devolución 100 ?%$/, '30 días de garantía'],
    [/^Sin preguntas$/, 'Cambio sin costo']
  ];
  /* lo que algunas fichas traen escrito a mano en su HTML (precios y textos), por producto */
  var HTMLX = {
    cucarachas: [
      ['<span class="ya">$449</span><s>$629</s><span class="desc">−29 %</span>', '<span class="ya">$386</span><s>$629</s><span class="desc">−39 %</span>'],
      ['POR <b>1 CAJA</b> · 2 cajas $599 · 3 cajas $649', 'POR <b>1 CAJA</b> · 2 cajas $515 · 3 cajas $558'],
      ['<p class="heroe__pre">o $404 pagando ahora con tarjeta · −10 % y entrega prioritaria</p>', '<p class="heroe__pre">Pago seguro con PayPal o tarjeta · entrega prioritaria</p>'],
      ['Lo quiero, pago al recibir', 'Lo quiero, pago seguro'],
      ['Envío gratis · Pagas al recibir o con tarjeta y ahorras 10 %', 'Envío gratis · Pago seguro con PayPal o tarjeta'],
      ['<b>$599</b><span>por 2 cajas</span>', '<b>$515</b><span>por 2 cajas</span>'],
      ['Pagas al recibir, con envío gratis a todo México', 'Pagas seguro con PayPal o tarjeta, con envío gratis a todo México'],
      ['<s>$839</s><b>$599</b><em>−29 %</em>', '<s>$839</s><b>$515</b><em>−39 %</em>'],
      ['$299.50 cada caja · ahorras $240', '$257.50 cada caja · ahorras $324'],
      ['o $539 pagando ahora con tarjeta · −10 % y entrega prioritaria', 'Pago seguro con PayPal o tarjeta · entrega prioritaria'],
      ['<span class="chip">−10 %</span>Paga con tarjeta y gana', '<span class="chip">PayPal</span>Paga seguro y gana'],
      ['<b>10 % de descuento</b> en todos los paquetes', '<b>Entrega prioritaria</b> en todos los paquetes'],
      ['<b>$0</b><span>por adelantado: pagas al recibir</span>', '<b>100 %</b><span>pago protegido por PayPal</span>'],
      ['<summary>¿Cómo pago?</summary><p>Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.</p>',
       '<summary>¿Cómo pago?</summary><p>Con PayPal o con tarjeta de débito o crédito a través de PayPal, sin crear cuenta. Nosotros nunca vemos los datos de tu tarjeta.</p>'],
      ['Desde $449 · envío gratis y pagas cuando lo recibes', 'Desde $386 · envío gratis y pago seguro con PayPal'],
      ['Lo despachamos hoy. Pagas al recibir o con tarjeta y ahorras el 10 %.', 'Lo despachamos en cuanto se confirma tu pago. Pagas seguro con PayPal o tarjeta.'],
      ['Lo quiero · $449 al recibir', 'Lo quiero · $386 pago seguro']
    ]
  };
  /* en todas las fichas: el logo de texto «Pago al recibir» de los medios de pago sale */
  var HTML_TODAS = [['color:#cfcfcf">Pago al recibir</span>', 'color:#cfcfcf;display:none">Pago al recibir</span>']];
  function limpiarTextos(raiz) {
    var w = document.createTreeWalker(raiz || document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.parentNode && /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) continue;
      if (n.parentNode && n.parentNode.closest && n.parentNode.closest('#confianza, .pie .acepto')) continue;
      var v = n.nodeValue, nv = v;
      CAMBIOS.forEach(function (c) { nv = nv.replace(c[0], c[1]); });
      if (nv !== v) n.nodeValue = nv;
    }
  }

  /* ---------- todos los enlaces de la tienda se quedan dentro de /pagoseguro ---------- */
  var RUTAS = { '/': '/pagoseguro/', '/index.html': '/pagoseguro/',
    '/reembolso.html': '/pagoseguro/reembolso', '/envio.html': '/pagoseguro/envio', '/terminos.html': '/pagoseguro/terminos',
    '/lentes/': '/pagoseguro/lentes', '/lentes': '/pagoseguro/lentes', '/lentes-paypal/': '/pagoseguro/lentes', '/lentes-paypal': '/pagoseguro/lentes',
    '/cucarachas/': '/pagoseguro/cucarachas', '/cucarachas': '/pagoseguro/cucarachas',
    '/colageno/': '/pagoseguro/colageno', '/colageno': '/pagoseguro/colageno',
    '/brain/': '/pagoseguro/brain', '/brain': '/pagoseguro/brain' };
  function arreglarEnlaces(raiz) {
    if (!raiz || !raiz.querySelectorAll) return;
    raiz.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href') || '';
      if (!h || h.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(h)) return;
      var u; try { u = new URL(a.href); } catch (e) { return; }
      if (!/(^|\.)jayegroupshop\.com$/.test(u.hostname) && u.host !== location.host) return;
      var nuevo = RUTAS[u.pathname];
      if (nuevo) a.setAttribute('href', location.origin + nuevo + u.hash);
    });
  }
  function vigilar() {
    if (window._ppObs) return;
    window._ppObs = new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (x) { if (x.nodeType === 1) { limpiarTextos(x); arreglarEnlaces(x); } }); }); });
    window._ppObs.observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- la COMPRA del píxel sale solo cuando PayPal confirma el pago (James 19-11) ---------- */
  function guardarCompra() {
    var jp = window.jayePixel;
    if (!jp || !jp.track || jp.__pp) return;
    var orig = jp.track, pend = null;
    jp.track = function (ev, obj, id) {
      if (ev === 'Purchase' && !window._ppPagado) { pend = [ev, obj, id]; return id; }
      return orig.call(jp, ev, obj, id);
    };
    jp.__pp = true;
    var fe = window.fetch;
    window.fetch = function (u) {
      var p = fe.apply(this, arguments);
      if (String(u).indexOf('/webhook/paypal-captura') >= 0) {
        p.then(function (r) { return r.clone().json(); }).then(function (j) {
          if (j && j.ok && !window._ppPagado) { window._ppPagado = true; if (pend) { orig.apply(jp, pend); pend = null; } }
        }).catch(function () {});
      }
      return p;
    };
  }

  /* ---------- política de la tienda (James 19-11: «vamos con la que te dije y punto») ---------- */
  function preguntasPago() {
    return [
      { q: '¿Es seguro pagar por adelantado?', a: 'Sí. Pagas con PayPal o con tu tarjeta a través de PayPal: nosotros nunca vemos los datos de tu tarjeta. Tu pago queda protegido por PayPal.' },
      { q: '¿Tengo que tener cuenta de PayPal?', a: 'No. Puedes pagar con tarjeta de débito o crédito sin crear cuenta.' },
      { q: '¿Cómo sigo mi pedido?', a: 'Apenas sale de nuestra bodega en Ciudad de México te mandamos el número de guía por WhatsApp para que lo sigas hasta tu puerta.' },
      { q: '¿Tiene garantía?', a: 'Sí: 30 días de garantía por defecto de fábrica. Si llega dañado, en mal estado o distinto a lo que pediste, escríbenos por WhatsApp dentro de los 14 días siguientes a la entrega, con una foto, y lo resolvemos.' }
    ];
  }

  /* ---------- FICHA: ajustes ANTES de que ficha.js la pinte ---------- */
  function ajustarProducto(c) {
    var p = (window.PRODUCTOS || []).find(function (x) { return x.id === c.id; });
    if (!p) return;
    /* colágeno y Brain leen el precio anticipado de cada pack en `pre` */
    p.packs.forEach(function (k, i) { if (c.PRE[i] != null) { k.precio = c.PRE[i]; if ('pre' in k) k.pre = c.PRE[i]; } });
    var pct = Math.round((1 - c.PRE[0] / c.COD[0]) * 100);
    p.anticipado = { pct: pct, precios: c.PRE.slice(), titulo: 'Paga con PayPal o tarjeta',
      envio: 'Envío prioritario: tu pedido sale primero', sub: 'Pago protegido por PayPal. Débito, crédito o saldo PayPal.' };
    if (p.hero && p.hero.datos) p.hero.datos = [['envio', 'Envío gratis prioritario'], ['reloj', 'En 2 a 5 días'], ['pago', 'Pago protegido por PayPal']];
    if (p.escasez) p.escasez.nota = 'Se despacha desde la bodega en Ciudad de México en cuanto se confirma tu pago. Te mandamos tu número de guía por WhatsApp.';
    /* las preguntas del producto se quedan, menos las de pago, entrega al recibir y garantía: van las de esta tienda */
    var propias = (p.preguntas || []).filter(function (x) { return !/contra entrega|al recibir|pagar|pago|garant|devol|reembols/i.test(x.q + ' ' + x.a); });
    p.preguntas = preguntasPago().concat(propias);
    window.PRECIOS_APROBADOS = c.PRE.slice();
    /* sello de garantía de la ficha: la misma regla en todos lados */
    var T = window.TEXTOS = window.TEXTOS || {};
    T.selloArriba = 'GARANTÍA'; T.selloAbajo = 'DE FÁBRICA';
    T.garTit = 'Compra protegida';
    T.garTxt = 'Tienes <b>30 días de garantía por defecto de fábrica</b>. Si llega dañado, en mal estado o distinto a lo que pediste, te lo cambiamos sin costo.';
    T.garChips = ['30 días de garantía', 'Envío gratis', 'Pago seguro con PayPal'];
  }
  function seccionConfianza() {
    var s = document.createElement('section');
    s.className = 'ppConf'; s.id = 'confianza';
    s.innerHTML = '<h2>Tu compra está protegida</h2>'
      + '<p class="ppSub">Pagas con PayPal, la forma más segura de pagar en línea, y tu pedido sale con entrega prioritaria.</p>'
      + '<div class="ppEscudo"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4 7 10v12c0 11 7.4 19.6 17 22 9.6-2.4 17-11 17-22V10L24 4z" fill="#2563EB"/><path d="m16 24 6 6 11-12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '<div><b>Protección al Comprador de PayPal</b><span>Tu pago queda protegido por PayPal. Nosotros nunca vemos los datos de tu tarjeta.</span></div></div>'
      + '<div class="ppGrid">'
      + '<div class="ppItem"><svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg><b>Envío prioritario</b><span>Tu pedido sale primero, sin costo de envío.</span></div>'
      + '<div class="ppItem"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/></svg><b>Guía por WhatsApp</b><span>Te mandamos tu número de guía para que sigas tu pedido.</span></div>'
      + '<div class="ppItem"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg><b>Tarjeta o PayPal</b><span>Débito o crédito, sin crear cuenta.</span></div>'
      + '<div class="ppItem"><svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/></svg><b>Clientes reales</b><span>Lee abajo lo que dicen quienes ya lo usan.</span></div>'
      + '</div>'
      + '<div class="ppEscudo ppGar"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="#059669"/><text x="24" y="30" text-anchor="middle" font-family="Be Vietnam Pro,Arial" font-weight="800" font-size="17" fill="#fff">30</text></svg>'
      + '<div><b>30 días de garantía</b><span>Por defecto de fábrica. Si llega dañado, en mal estado o distinto a lo que pediste, escríbenos dentro de los 14 días siguientes a la entrega y te lo cambiamos.</span></div></div>'
      + '<h3 class="ppH3">Así llega tu pedido</h3>'
      + '<ol class="ppPasos">'
      + '<li><i>1</i><b>Pagas seguro</b><span>Con PayPal o tarjeta.</span></li>'
      + '<li><i>2</i><b>Te escribimos</b><span>Confirmamos tu pedido por WhatsApp.</span></li>'
      + '<li><i>3</i><b>Te mandamos la guía</b><span>Para que sigas tu paquete.</span></li>'
      + '<li><i>4</i><b>Lo recibes</b><span>En 2 a 5 días hábiles.</span></li>'
      + '</ol>'
      + '<div class="ppContacto"><b>¿Dudas antes de pagar?</b><span>Escríbenos y te atiende una persona.</span>'
      + '<a href="https://wa.me/525597219871" target="_blank" rel="noopener">WhatsApp +52 55 9721 9871</a>'
      + '<p class="ppDatos">Correo: <a href="mailto:gerencia@jayegroup.com.co">gerencia@jayegroup.com.co</a><br>Despachamos desde la bodega en Gustavo A. Madero, Ciudad de México</p></div>'
      + '<div class="ppLogos"><img src="/img/pago/paypal-texto.svg" alt="PayPal"><img src="/img/pago/visa-claro.svg" alt="Visa"><img src="/img/pago/mastercard-claro.svg" alt="Mastercard"><img src="/img/pago/amex.svg" alt="American Express"></div>';
    return s;
  }
  /* 19-11 James: «más imágenes en las secciones; después de las reseñas hay puro texto». Fotos reales que ya existen
     (fichas del producto, fotos de clientes, cuadros del video real del proveedor, sin letras chinas ni otras marcas). */
  var FOTOS = {
    /* James 19-11: «no me repitas imágenes y no cojas cortes de video para imagen». Solo fotos que NO salen en otra parte de la página. */
    lentes: [
      ['.gm-lectura', null, '/pagoseguro/img/lentes-lectura.webp', 'Señora leyendo el instructivo de su medicina con los lentes TR90'],
      ['.gm-cl', null, '/pagoseguro/img/lentes-cercalejos.webp', 'Lentes TR90: el menú de cerca y la calle de lejos'],
      ['.form-sec', null, '/pagoseguro/img/lentes-pantalla.webp', 'Lentes TR90 con filtro de luz azul junto al celular'],
      ['.res-sec', null, '/pagoseguro/img/lentes-llegan.webp', 'Así llegan los lentes a tu casa'],
      ['section.bloque', /Preguntas frecuentes/i, '/pagoseguro/img/lentes-pareja.webp', 'Pareja con sus lentes TR90 leyendo el celular'],
      ['.desc', /POR QU[ÉE] LO QUIERES/i, '/pagoseguro/img/lentes-dospares.webp', 'Dos pares de lentes TR90 en el buró']
    ]
  };
  function ponerFotos(prod) {
    (FOTOS[prod] || []).forEach(function (f) {
      var sec = Array.prototype.slice.call(document.querySelectorAll(f[0])).find(function (s) {
        return !s.querySelector('.psFoto') && (!f[1] || f[1].test(s.innerText || ''));
      });
      if (!sec) return;
      var im = document.createElement('img');
      im.className = 'psFoto'; im.src = f[2]; im.alt = f[3]; im.loading = 'lazy'; im.decoding = 'async';
      var tit = sec.querySelector('h2, .tit2, h3');
      if (tit && tit.parentNode) tit.parentNode.insertBefore(im, tit.nextSibling); else sec.insertBefore(im, sec.firstChild);
    });
  }
  function soloPayPal(c) {
    document.body.classList.add('pp-modo');
    limpiarTextos(); arreglarEnlaces(document); vigilar();
    document.title = c.nombre + ' · Pago seguro con PayPal · Jaye Group México';
    var pre = document.querySelector('.pagoOp[data-pago="pre"]');
    if (pre && pre.getAttribute('aria-checked') !== 'true') pre.click();
    var baj = document.querySelector('#pedir .baj');
    if (baj) baj.textContent = 'Sale con envío prioritario apenas se confirma tu pago. Te mandamos la guía por WhatsApp.';
    var form = document.getElementById('pedir');
    if (form && !document.getElementById('confianza')) form.parentNode.insertBefore(seccionConfianza(), form);
    ponerFotos(PS.prod);
    /* 19-11 James: solo las transportadoras que de verdad despachan (Veloces, Coordi, Quality-Post) */
    document.querySelectorAll('img').forEach(function (im) { if (/logos\/(ampm|afimex|tiui)\./i.test(im.getAttribute('src') || '')) im.style.display = 'none'; });
    /* candado: nunca sale un pedido contra entrega desde esta tienda */
    var f = document.getElementById('fPedido');
    if (f && !f._ppCandado) {
      f._ppCandado = true;
      f.addEventListener('submit', function () { var p2 = document.querySelector('.pagoOp[data-pago="pre"]'); if (p2 && p2.getAttribute('aria-checked') !== 'true') p2.click(); }, true);
    }
  }

  /* ---------- PORTADA: textos de la tienda normal → pago seguro ---------- */
  var PORTADA = [
    ['Jaye Group México · Envío gratis y pago contra entrega', 'Jaye Group México · Pago seguro con PayPal y envío gratis'],
    ['<h1>Pídelo hoy,<br>paga al recibir</h1>', '<h1>Paga seguro,<br>recibe en casa</h1>'],
    ['Envío gratis a todo México. Pagas cuando lo tienes en la mano.', 'Envío gratis y prioritario a todo México. Pagas con PayPal o tarjeta.'],
    ['Al recibir o con tarjeta −10 %', '30 días de garantía'],
    ['<span>−10 %</span> Nuevo en Jaye Group', '<span>PayPal</span> Tienda de pago seguro'],
    ['Paga con tarjeta y ahorra 10&nbsp;%', 'Tu compra, protegida de principio a fin'],
    ['<b>10&nbsp;% de descuento</b> en todos los productos', '<b>30 días de garantía</b> en todos los productos'],
    ['En el formulario de tu producto elige <b>Paga ahora con tarjeta</b>. Si prefieres, sigues pagando al recibir, como siempre.', 'Todos los productos se pagan con <b>PayPal o tarjeta</b>. Nosotros nunca vemos los datos de tu tarjeta.'],
    ['aria-label="Sello Jaye Group México: paga al recibir"', 'aria-label="Sello Jaye Group México: pago protegido"'],
    ['font-weight="800" font-size="40" fill="#17150F">PAGA</text>', 'font-weight="800" font-size="40" fill="#17150F">PAGO</text>'],
    ['letter-spacing="2.4" fill="#17150F" dx="1.2">AL RECIBIR</text>', 'letter-spacing="2.4" fill="#17150F" dx="1.2">PROTEGIDO</text>'],
    ['<b>Pago contra entrega</b>', '<b>Pago protegido con PayPal</b>'],
    ['<span>Pagas en efectivo cuando te llega el pedido.</span>', '<span>Con tarjeta de débito, crédito o PayPal. Nunca vemos los datos de tu tarjeta.</span>'],
    ['Envío incluido · Pago contra entrega en todo México', 'Envío incluido · Pago seguro con PayPal o tarjeta']
  ];
  function ajustarPortada() {
    (window.PRODUCTOS || []).forEach(function (p) {
      var c = PRODS[p.id];
      if (!c) return;
      p.packs.forEach(function (pk, i) { if (c.PRE[i] != null) { pk.precio = c.PRE[i]; } });
      p.anticipado = { pct: Math.round((1 - c.PRE[0] / c.COD[0]) * 100), precios: c.PRE.slice() };
    });
    window.PREGUNTAS = [
      { q: '¿Cuánto tarda en llegar?', a: 'Sale con envío prioritario apenas se confirma tu pago. Normalmente llega entre 2 y 5 días hábiles, según tu ciudad.' },
      { q: '¿Cómo pago?', a: 'Con PayPal o con tarjeta de débito o crédito, sin crear cuenta. Nosotros nunca vemos los datos de tu tarjeta.' },
      { q: '¿El envío tiene costo?', a: 'No. El envío a todo México ya está incluido en el precio.' }
    ];
    window.PRECIOS_APROBADOS = (window.PRECIOS_APROBADOS || []).concat(TODOS);
  }

  /* ---------- POLÍTICAS de esta tienda (solo pago anticipado) ---------- */
  var LEGAL = {
    reembolso: { titulo: 'Política de Garantía, Cambios y Devoluciones', html: ''
      + '<p>Queremos que compres con total confianza.</p>'
      + '<h2>1. Garantía de 30 días</h2>'
      + '<p>Todos nuestros productos tienen 30 días de garantía por defecto de fábrica, contados desde la entrega. Si el producto presenta una falla de fabricación, te lo cambiamos sin costo.</p>'
      + '<h2>2. Cuándo se acepta un cambio o una devolución</h2>'
      + '<p>Se acepta el cambio o la devolución cuando el producto:</p>'
      + '<ul><li>presenta un defecto de fábrica;</li><li>llega dañado o en mal estado;</li><li>es distinto al que pediste.</li></ul>'
      + '<h2>3. Plazo para pedirlo</h2>'
      + '<p>Tienes 14 días naturales desde que recibes tu pedido para reportarlo. Escríbenos por WhatsApp o correo con tu número de pedido, tu nombre y una foto del producto.</p>'
      + '<h2>4. Envío del cambio o la devolución</h2>'
      + '<p>Si el producto llegó con defecto, dañado o distinto al que pediste, el envío de regreso y el del cambio corren por nuestra cuenta.</p>'
      + '<h2>5. Cómo se devuelve el dinero</h2>'
      + '<p>Como pagaste con PayPal o con tarjeta a través de PayPal, el reembolso se hace por PayPal, al mismo medio con que pagaste, una vez que recibimos y revisamos el producto.</p>'
      + '<h2>Contacto</h2>'
      + '<p>WhatsApp: <a href="https://wa.me/525597219871">+52 55 9721 9871</a> · Correo: <a href="mailto:gerencia@jayegroup.com.co">gerencia@jayegroup.com.co</a></p>' },
    envio: { titulo: 'Política de Envíos', html: ''
      + '<h2>1. Cobertura</h2><p>Enviamos a todo México. El envío está incluido en el precio.</p>'
      + '<h2>2. Cuándo sale tu pedido</h2><p>Tu pedido se despacha desde nuestra bodega en Gustavo A. Madero, Ciudad de México, en cuanto se confirma tu pago con PayPal o tarjeta. Sale con envío prioritario.</p>'
      + '<h2>3. Tiempo de entrega</h2><p>Normalmente entre 2 y 5 días hábiles, según tu ciudad.</p>'
      + '<h2>4. Seguimiento</h2><p>Cuando tu pedido sale te mandamos el número de guía por WhatsApp para que lo sigas hasta tu puerta.</p>'
      + '<h2>5. Recepción</h2><p>Tu pedido ya está pagado: solo necesitas que alguien esté en la dirección para recibirlo.</p>'
      + '<h2>Contacto</h2><p>Correo: <a href="mailto:gerencia@jayegroup.com.co">gerencia@jayegroup.com.co</a></p>' }
  };
  /* términos: los de la tienda, con la forma de pago de esta */
  var TERM_PAGO = [/Pago contra entrega: pagas en efectivo a la transportadora cuando recibes el pedido\.?/i,
    'Pago anticipado con PayPal o con tarjeta de débito o crédito a través de PayPal. El pedido se despacha cuando se confirma el pago.'];

  function cargarScript(s) {
    return new Promise(function (ok) {
      var n = document.createElement('script');
      if (s.src) { n.src = s.getAttribute('src'); n.onload = ok; n.onerror = ok; document.body.appendChild(n); }
      else { n.textContent = s.textContent; document.body.appendChild(n); ok(); }
    });
  }
  function montar(url, cambiarHtml, antesDe, despues) {
    return fetch(url, { cache: 'no-store' }).then(function (r) { return r.text(); }).then(function (html) {
      var d = new DOMParser().parseFromString(html, 'text/html');
      d.head.querySelectorAll('link[rel="stylesheet"], style').forEach(function (n) { document.head.appendChild(n.cloneNode(true)); });
      ponerCss();
      /* la tienda esconde el logo JAYE GROUP hasta que carga la letra (clase fuentesListas, script del <head>) */
      var listo = function () { document.documentElement.classList.add('fuentesListas'); };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(listo); setTimeout(listo, 400);
      document.documentElement.classList.add('ba-lista');
      setTimeout(function () { document.documentElement.classList.add('ba-visto'); }, 3000);
      /* el PÍXEL de México vive en el <head> de cada página */
      var pix = Array.prototype.slice.call(d.head.querySelectorAll('script')).filter(function (s) { return /_cargarPixel|jayePixel|PIXEL_MX/.test(s.textContent); });
      var scripts = pix.concat(Array.prototype.slice.call(d.body.querySelectorAll('script')));
      scripts.forEach(function (s) { s.parentNode.removeChild(s); });
      document.body.className = (d.body.className + ' ' + (document.body.className || '')).trim();
      if (d.body.getAttribute('style')) document.body.setAttribute('style', d.body.getAttribute('style'));
      var carga = document.getElementById('ppCarga');
      var cont = document.createElement('div');
      cont.innerHTML = cambiarHtml ? cambiarHtml(d.body.innerHTML) : d.body.innerHTML;
      while (cont.firstChild) document.body.insertBefore(cont.firstChild, carga);
      if (carga) carga.remove();
      var cadena = Promise.resolve();
      scripts.forEach(function (s) {
        cadena = cadena.then(function () { if (antesDe) antesDe(s.getAttribute('src') || ''); return cargarScript(s); });
      });
      return cadena;
    }).then(function () { if (despues) despues(); });
  }

  /* con <base> un "#ancla" saltaría a otra página: se queda en esta */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    e.preventDefault();
    var el = id && document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, true);

  if (PS.modo === 'ficha') {
    var c = PRODS[PS.prod];
    window.__P = c.id; window.MODO_PAYPAL = true;
    document.body.classList.add('ps-' + PS.prod);
    montar(c.base + 'index.html', function (h) {
      HTML_TODAS.concat(HTMLX[PS.prod] || []).forEach(function (x) { h = h.split(x[0]).join(x[1]); });
      return h;
    }, function (src) {
      if (/ficha\.js/.test(src)) { guardarCompra(); ajustarProducto(c); }
    }, function () {
      var n = 0;
      (function esperar() {
        if (document.querySelector('.pagoOp[data-pago="pre"]')) { soloPayPal(c); return; }
        if (++n < 60) setTimeout(esperar, 150);
      })();
    }).catch(function () { location.replace(c.base); });
  } else if (PS.modo === 'portada') {
    montar('/index.html', function (h) {
      PORTADA.forEach(function (x) { h = h.split(x[0]).join(x[1]); });
      return h;
    }, function (src) {
      if (/tienda-co\.js/.test(src)) ajustarPortada();
    }, function () {
      /* tienda-co.js pinta en DOMContentLoaded, que ya pasó cuando se carga aquí: se le avisa de nuevo */
      document.dispatchEvent(new Event('DOMContentLoaded'));
      document.title = 'Jaye Group México · Pago seguro con PayPal y envío gratis';
      limpiarTextos(); arreglarEnlaces(document); vigilar();
    }).catch(function () { location.replace('/'); });
  } else if (PS.modo === 'legal') {
    var doc = PS.doc, url = doc === 'terminos' ? '/terminos.html' : doc === 'envio' ? '/envio.html' : '/reembolso.html';
    montar(url, function (h) {
      var d = document.createElement('div'); d.innerHTML = h;
      var m = d.querySelector('main.legal-body');
      if (m && LEGAL[doc]) m.innerHTML = '<h1>' + LEGAL[doc].titulo + '</h1><p class="upd">Última actualización: noviembre de 2026</p>' + LEGAL[doc].html;
      else if (m) m.innerHTML = m.innerHTML.replace(TERM_PAGO[0], TERM_PAGO[1]);
      return d.innerHTML;
    }, null, function () {
      document.title = (LEGAL[doc] ? LEGAL[doc].titulo : 'Términos y Condiciones') + ' | Jaye Group México · Pago seguro';
      limpiarTextos();
      /* los enlaces del pie legal son relativos (reembolso.html…): también se quedan aquí */
      var MAPA = { 'index.html': '/pagoseguro/', 'reembolso.html': '/pagoseguro/reembolso', 'envio.html': '/pagoseguro/envio', 'terminos.html': '/pagoseguro/terminos' };
      document.querySelectorAll('a[href]').forEach(function (a) { var m = MAPA[a.getAttribute('href')]; if (m) a.setAttribute('href', m); });
    }).catch(function () { location.replace(url); });
  }
})();
