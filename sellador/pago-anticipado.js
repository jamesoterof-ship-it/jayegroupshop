/* ============================================================
   "PAGA CON TARJETA Y GANA" · España y Portugal (05-10-2026)
   James: "hicimos en Chile una sección debajo de la promoción con el pago anticipado… hazlo así igual también"
   + "tienes que conservar los colores de cada página".
   - Skill ui-ux-pro-max corrida en esta conversación el 05-10 (Minimalism & Swiss: tarjeta blanca, borde #E2E8F0,
     texto #1E293B, gris #475569, mucho aire, 3 puntos + botón). El COLOR de acento es el de CADA producto
     (p.acento) y la LETRA es la de la página, como pidió James.
   - Va DEBAJO de la promoción. Además pone en la promoción "o X € pagando ahora · −10 % y entrega prioritaria".
   - El botón baja al formulario con "Paga ahora" ya elegido (igual que Chile).
   - Archivo aparte: no toca ficha.js (que comparte base con la ficha de Chile).
   ============================================================ */
(function () {
  var Q = new URLSearchParams(location.search);
  if (Q.get('pagar')) return;   /* en el enlace personal de pago no hace falta */
  var TODOS = window.PRODUCTOS || [], id = window.__P || Q.get('p');
  var p = id ? TODOS.filter(function (x) { return x.id === id; })[0] : TODOS[0];
  if (!p || !p.anticipado || !p.packs) return;
  var PT = ((window.TEXTOS || {})._pais === 'PT');
  var L = PT ? {
    tit: 'Pague com cartão e ganhe', dto: 'de desconto', menos: 'a menos', packs: 'em todos os packs',
    prio: 'Entrega prioritária', prio2: '— a sua encomenda sai primeiro',
    seg: 'Pagamento seguro', seg2: 'com PayPal: cartão de débito ou crédito, sem criar conta',
    btn: 'Pagar com cartão', o: 'ou', ahora: 'pagando agora com cartão', y: 'e entrega prioritária'
  } : {
    tit: 'Paga con tarjeta y gana', dto: 'de descuento', menos: 'menos', packs: 'en todos los packs',
    prio: 'Entrega prioritaria', prio2: 'en 14 h: tu pedido sale primero',
    seg: 'Pago seguro', seg2: 'con PayPal: tarjeta de débito o crédito, sin crear cuenta',
    btn: 'Pagar con tarjeta', o: 'o', ahora: 'pagando ahora con tarjeta', y: 'y entrega prioritaria'
  };
  var ac = p.acento || '#0f8a4b';
  var eur = function (n) { return Number(n).toFixed(2).replace('.', ',') + ' €'; };
  var pre = function (i) {
    var l = p.anticipado.precios;
    return (l && l[i] != null) ? l[i] : Math.max(0, p.packs[i].precio - (p.anticipado.descuento || 0));
  };
  var dto = p.anticipado.pct ? p.anticipado.pct + '&nbsp;%' : String(p.anticipado.descuento).replace('.', ',') + '&nbsp;€';

  function poner() {
    if (document.querySelector('.pagoAntES')) return;
    var promo = document.querySelector('.promo-sec');
    var ancla = promo || (document.getElementById('btnArriba') && document.getElementById('btnArriba').closest('section'));
    if (!ancla) return;
    /* la letra de los títulos de ESTA página */
    var h2 = document.querySelector('.tit2, h2');
    var fTit = h2 ? getComputedStyle(h2).fontFamily : 'inherit';

    /* 1) en la promoción: el precio pagando ahora */
    if (promo) {
      var bp = document.getElementById('btnPromo'), uni = promo.querySelector('.promo-uni');
      var i = bp ? Number(bp.getAttribute('data-i')) : -1;
      if (uni && i >= 0 && p.packs[i]) {
        var lin = document.createElement('p');
        lin.className = 'promo-uni promo-tarjeta';
        lin.innerHTML = L.o + ' <b>' + eur(pre(i)) + '</b> ' + L.ahora + ' · −' + dto + ' ' + L.y;
        uni.parentNode.insertBefore(lin, uni.nextSibling);
      }
    }

    /* 2) la sección, debajo de la promoción */
    var ic = function (d) {
      return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="' + ac + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none;margin-top:1px">' + d + '</svg>';
    };
    var li = function (d, h) {
      return '<li style="display:flex;gap:10px;align-items:flex-start;margin:10px 0;font-size:15.5px;line-height:1.45;color:#1E293B">' + ic(d) + '<span>' + h + '</span></li>';
    };
    var s = document.createElement('section');
    s.className = 'bloque pagoAntES';
    s.innerHTML = '<div style="background:#FFFFFF;border:1px solid #E2E8F0;border-top:4px solid ' + ac + ';border-radius:16px;padding:18px 16px 16px;box-shadow:0 6px 18px rgba(15,23,42,.06)">'
      + '<p style="display:flex;align-items:center;gap:10px;margin:0 0 4px;font-family:' + fTit.split('"').join("'") + ';font-weight:800;font-size:22px;line-height:1.15;color:#1E293B">'
      + '<span style="background:' + ac + ';color:#fff;border-radius:8px;padding:4px 9px;font-size:15px;white-space:nowrap">−' + dto + '</span>' + L.tit + '</p>'
      + '<ul style="list-style:none;padding:0;margin:0 0 14px">'
      + li('<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>', '<b>' + dto + ' ' + (p.anticipado.pct ? L.dto : L.menos) + '</b> ' + L.packs)
      + li('<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>', '<b>' + L.prio + '</b> ' + L.prio2)
      + li('<rect x="4" y="10" width="16" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>', '<b>' + L.seg + '</b> ' + L.seg2)
      + '</ul>'
      + '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px">'
      + '<span style="display:flex;gap:7px;align-items:center"><img src="/img/pago/paypal-texto.svg" alt="PayPal" width="58" height="18"><img src="/img/pago/visa-claro.svg" alt="Visa" width="38" height="23"><img src="/img/pago/mastercard-claro.svg" alt="Mastercard" width="38" height="23"></span>'
      + '<button type="button" id="btnPagoAnt" style="background:' + ac + ';color:#fff;border:0;border-radius:12px;padding:13px 20px;font-weight:800;font-size:16px;cursor:pointer;min-height:48px">' + L.btn + '</button>'
      + '</div></div>';
    ancla.parentNode.insertBefore(s, ancla.nextSibling);
    document.getElementById('btnPagoAnt').addEventListener('click', function () {
      var op = document.querySelector('.pagoOp[data-pago="pre"]'); if (op) op.click();
      var d = document.getElementById('pedir'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', poner); else poner();
})();
