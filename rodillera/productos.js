/* ============================================================
   MÉXICO · 08-11-2026 · RODILLERA CON RESORTES (par)
   Dropi México 47695 "Par de Rodillera Ortopedica Con Resorte" (HYPER MODA), costo $230 el par, stock 672 (08-11), público.
   Ficha del proveedor: rodillera de neopreno negro con dos correas de velcro (arriba y abajo de la rodilla) y bisagra lateral
   con resortes de acero que acompañan el movimiento al doblar y estirar la pierna. Viene el PAR (dos rodilleras).
   Competencia Meta MX (07-11, 6 anunciantes): Benivox par $949 (el más barato) · Amekro $990 · Compra Inteligente $999 ·
   Casa Zohelo $1.199 · Smart Finds $1.499 · Diacaz 1 pieza $749.
   Escalera APROBADA por James el 07-11 ("Sí, esos precios"): 1 par $899 · 2 pares $1.299 · 3 pares $1.649.
   Pago anticipado −10 % (aprobado junto con la escalera): $809 / $1.169 / $1.484, entrega prioritaria. Tachado = +40 %.
   Sin barra de "salieron hoy": Dropdata de la 47695 casi no tiene movimiento propio y no se pone el de otro proveedor.
   ============================================================ */
window.PRODUCTOS = [{
  id: 'rodillera', unidad: 'par', promo: 2, promoRef: true,
  dropiId: 47695,
  nombre: 'Rodillera con Resortes',
  sub: 'Par de rodilleras de neopreno con bisagra de resortes de acero',
  categoria: 'Salud y bienestar',
  etiqueta: 'Nuevo en México',
  etiquetaOro: true,
  foto: 'img/rod-packs.webp?v=1',
  fotos: ['img/rod-packs.webp?v=1', 'img/rod-heroe.webp?v=1', 'img/rod-escaleras.webp?v=1'],
  acento: '#16A34A',   /* Accent/CTA del plano #125 Azul clínico, aprobado por James el 07-11 */
  desc: 'Par de rodilleras de neopreno con bisagra de resortes de acero. Los resortes acompañan a tu rodilla cuando subes escaleras, te agachas o te levantas de la silla.',
  puntos: [
    'Viene el par: una rodillera para cada pierna',
    'Bisagra lateral con resortes de acero',
    'Neopreno con dos correas de velcro ajustables',
    'Pagas al recibir, con envío gratis a todo México',
  ],
  preguntas: [
    { q: '¿Cómo pago?', a: 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.' },
  ],
  packs: [
    { cant: 1, precio: 899, antes: 1259, texto: '1 par' },
    { cant: 2, precio: 1299, antes: 1819, texto: '2 pares' },
    { cant: 3, precio: 1649, antes: 2309, texto: '3 pares' },
  ],
  popular: 1,
  anticipado: {
    pct: 10,
    envio: 'Entrega prioritaria: tu pedido sale primero',
    titulo: 'Paga ahora con tarjeta',
    sub: 'Con entrega prioritaria, sin costo. Se paga con tarjeta de débito o crédito o con PayPal.',
    precios: [809, 1169, 1484],
  },
}];
/* Candado: solo la escalera aprobada por James el 07-11 */
window.PRECIOS_APROBADOS = [899, 1299, 1649, 809, 1169, 1484];

/* Textos de la página (plano #125 Azul clínico: Hero + Testimonials + CTA, en el orden de secciones de las páginas que venden) */
window.PAGINA = {
  heroe: {
    img: 'img/rod-heroe.webp?v=1', alt: 'Par de rodilleras negras con resortes de acero en la bisagra',
    rotulo: 'Nuevo en México · Salud y bienestar',
    l1: 'Tu rodilla,', l2: 'con', clave: 'impulso',
    frase: 'Resortes de acero que acompañan a tu rodilla al subir escaleras, agacharte y levantarte.',
    datos: [['Par', 'una para cada rodilla'], ['Velcro', 'se ajusta sobre el pantalón'], ['$0', 'envío a todo México']],
  },
  usos: ['subir escaleras', 'levantarte de la silla', 'agacharte en el trabajo', 'caminar con confianza'],
  problema: {
    rotulo: 'El problema', titulo: '¿Te cuesta subir las escaleras?',
    texto: 'Cuando la rodilla molesta, cada escalón, cada vez que te agachas y cada vez que te levantas de la silla se vuelve un esfuerzo.',
    img: 'img/rod-antes-despues.webp?v=1', alt: 'Antes: señora con dolor de rodilla en la escalera. Después: la misma señora subiendo con la rodillera puesta',
  },
  solucion: {
    rotulo: 'La solución', titulo: 'Resortes que trabajan contigo',
    texto: 'La rodillera abraza la pierna arriba y abajo de la rodilla con dos correas de velcro. En el costado lleva una bisagra con resortes de acero: al doblar la pierna se cargan y al estirarla te devuelven ese impulso.',
    tarjetas: [
      ['img/rod-escaleras.webp?v=1', 'Al subir escaleras', 'El resorte acompaña a la rodilla en cada escalón.', 'Señor subiendo la escalera de su casa con la rodillera puesta'],
      ['img/rod-sillon.webp?v=1', 'Al levantarte', 'Te ayuda a pararte del sillón o de la silla.', 'Señora levantándose del sillón con la rodillera puesta'],
      ['img/rod-trabajo.webp?v=1', 'Al agacharte', 'Para el trabajo, la bodega o el jardín.', 'Trabajador agachándose a levantar una caja con rodilleras en las dos piernas'],
    ],
  },
  video: '', videoPoster: '', videoAlt: '',   /* 08-11: falta el video real de la rodillera negra (sin marca de agua) */
  partes: [
    ['Resortes de acero', 'En la bisagra lateral: se cargan al doblar la pierna y empujan al estirarla.'],
    ['Neopreno', 'Abraza la pierna arriba y abajo de la rodilla.'],
    ['Dos correas de velcro', 'Ajustas la rodillera a tu medida, sobre el pantalón.'],
    ['Viene el par', 'Una rodillera para cada pierna.'],
  ],
  promoImg: 'img/rod-promo.webp?v=1',
  promoTitulo: 'Paquete de 2 pares · el más pedido',
  compara: {
    titulo: 'Con rodillera de resortes o sin ella', nos: 'Con resortes', otro: 'Sin rodillera',
    filas: ['Impulso al estirar la pierna', 'Apoyo a los lados de la rodilla', 'Se ajusta con velcro sobre la ropa', 'Para las dos rodillas'],
  },
  packsImg: 'img/rod-packs.webp?v=1',
  preguntas: [
    ['¿Qué es?', 'Un par de rodilleras de neopreno con una bisagra lateral de resortes de acero que acompañan el movimiento de la rodilla.'],
    ['¿Cuántas vienen?', 'Viene el par: dos rodilleras, una para cada pierna.'],
    ['¿Cómo me la pongo?', 'Se coloca centrada en la rodilla: una correa de velcro va arriba, en el muslo, y la otra abajo, en la pantorrilla. La bisagra queda al costado de la rodilla.'],
    ['¿Se usa sobre la ropa?', 'Sí, se ajusta con velcro y se puede usar sobre el pantalón.'],
    ['¿Sirve si tengo una lesión?', 'Es un apoyo para la rodilla, no un tratamiento médico. Si tienes una lesión o una indicación de tu doctor, consúltalo con él.'],
    ['¿Cómo pago?', 'Contra entrega: pagas en efectivo al repartidor cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta con 10 % de descuento y entrega prioritaria.'],
    ['¿A dónde envían y cuánto tarda?', 'A todo México, sin costo de envío. Entre 2 y 5 días hábiles según tu ciudad.'],
    ['¿Tiene garantía?', 'Sí: 30 días de garantía de satisfacción. Si no quedas conforme, te devolvemos tu dinero.'],
  ],
};
