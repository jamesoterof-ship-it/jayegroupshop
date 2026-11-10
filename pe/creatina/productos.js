/* ============================================================
   PERÚ · 09-11-2026 · CREATINA EN GOMITAS BEAST BITES
   Dropi Perú 9707 "BEAST BITES CREATINA" (producto simple), costo S/ 20, bodega 661 (NIBRESMA PERÚ), stock 860 (09-11).
   Etiqueta del frasco (fotos del proveedor): "Creatine infused gummies", 150 g, sabor Sweet Blue Raspberry (frambuesa azul),
   marca DR.USA · Beast Bites Supplements.
   OJO: la descripción de Dropi habla de "Male Performance Gummies" (energía y desempeño masculino); la etiqueta dice creatina.
   La página habla SOLO de lo que dice la etiqueta, sin promesas médicas ni cifras de la etiqueta que no cuadran
   (dice "30 porciones con 5 g de creatina" en un frasco de 150 g: no se publica).
   Escalera APROBADA por James el 09-11 ("Avanza"; 1 u. subida a S/ 87 por James el 09-11): contra entrega 1 u. S/ 87 · 2 u. S/ 145 · 3 u. S/ 175.
   Pago anticipado con tarjeta −10 % (entrega prioritaria): S/ 78 · S/ 131 · S/ 158. Tachado = +40 % redondeado (como México).
   ============================================================ */
window.PRODUCTOS = [{
  id: 'creatina', unidad: 'frasco',
  dropiId: 9707,
  nombre: 'Creatina en Gomitas Beast Bites',
  sub: 'Gomitas con creatina sabor frambuesa azul · frasco de 150 g',
  categoria: 'Deporte y bienestar',
  etiqueta: 'Nuevo en Perú',
  foto: 'img/cr-frasco.webp?v=1',
  packs: [
    { cant: 1, precio: 87, antes: 122, texto: '1 frasco', nivel: 'Nivel 1 · Empieza' },
    { cant: 2, precio: 145, antes: 203, texto: '2 frascos', nivel: 'Nivel 2 · Constante' },
    { cant: 3, precio: 175, antes: 245, texto: '3 frascos', nivel: 'Nivel 3 · Bestia' },
  ],
  popular: 1,
  anticipado: {
    pct: 10,
    titulo: 'Paga ahora con tarjeta',
    envio: 'Entrega prioritaria: sale primero',
    precios: [78, 131, 158],
  },
}];
/* Candado: solo la escalera aprobada por James el 09-11 */
window.PRECIOS_APROBADOS = [87, 145, 175, 78, 131, 158];

/* Textos de la página (los pinta creatina.js con el plano del script "creatina-peru"). */
window.PAGINA = {
  heroe: {
    img: 'img/cr-01-heroe.webp?v=1', alt: 'Frasco de Beast Bites en el piso del gimnasio junto a una pesa, con gomitas celestes regadas',
    galeria: [['img/cr-01-heroe.webp?v=1', 'Frasco de Beast Bites junto a una pesa'], ['img/cr-02-heroe-mano.webp?v=1', 'Mano sosteniendo el frasco abierto y sacando una gomita en el gimnasio'], ['img/cr-03-detalle.webp?v=1', 'Tres gomitas celestes en la palma de la mano'], ['img/cr-frasco.webp?v=1', 'Frasco de Beast Bites con gomitas alrededor']],
    rotulo: 'Creatina en gomitas',
    l1: 'Tu creatina,', l2: 'en', clave: 'gomitas.',
    frase: 'Para los que entrenan: la creatina apoya la fuerza y el rendimiento en el entrenamiento. Aquí viene en gomitas sabor frambuesa azul, sin polvo ni shaker.',
    datos: [['150 g', 'por frasco'], ['Frambuesa', 'azul'], ['S/ 0', 'de envío']],
  },
  rasgos: { rotulo: 'Por qué en gomitas', titulo: 'Todo lo bueno, sin el shaker', lista: [
    ['gomita', 'En gomitas', 'Te la comes y listo: sin medir polvo, sin mezclar, sin grumos.'],
    ['fuerza', 'Para tu entrenamiento', 'La creatina es de los suplementos más usados para apoyar la fuerza y el rendimiento.'],
    ['sabor', 'Sabor frambuesa azul', 'Dulce y frutal. Nada que ver con el sabor a tiza del polvo.'],
    ['mochila', 'Va en tu mochila', 'Frasco con tapa de rosca: al gym, a la chamba o a la cancha.'],
    ['frasco', 'Frasco de 150 g', 'Gomitas Beast Bites de DR.USA, con su etiqueta y su sello.'],
    ['caja', 'Pagas al recibir', 'Envío gratis a todo el Perú y pagas cuando lo tienes en la mano.'] ] },
  video: { rotulo: 'Míralo en video', titulo: 'Tu rutina, a tu manera', src: 'img/cr-video.mp4?v=1', poster: 'img/cr-video-poster.webp?v=1' },
  comoSeToma: { rotulo: 'Cómo se toma', titulo: 'Así de fácil', img: 'img/cr-08-como-se-toma.webp?v=1', alt: 'Tres pasos: abre el frasco, mastica tus gomitas y entrena con todo' },
  antesAhora: { rotulo: 'Antes y ahora', titulo: 'Adiós al polvo y al shaker', img: 'img/cr-09-antes-despues.webp?v=1', alt: 'Antes: polvo regado y shaker con grumos. Ahora: el frasco de gomitas en la mano, listo para llevar' },
  usos: { rotulo: 'Para tu rutina', titulo: 'Dónde entra Beast Bites',
    fotos: [
      ['img/cr-04-gym-ella.webp?v=1', 'En el gym', 'Entre serie y serie, sin cargar shaker.', 'Mujer sentada en una banca del gimnasio comiendo una gomita con el frasco en la mano'],
      ['img/cr-05-pesas-el.webp?v=1', 'En las pesas', 'Para tus días de barra, crossfit o máquinas.', 'Hombre con magnesio en las manos junto a la barra tomando una gomita del frasco'],
      ['img/cr-06-casa-manana.webp?v=1', 'Antes de salir', 'En la cocina, antes de ir a entrenar.', 'Joven en la cocina sacando gomitas del frasco con la mochila del gym al lado'],
      ['img/cr-07-oficina-mochila.webp?v=1', 'En tu mochila', 'Del trabajo al gym: el frasco va contigo.', 'Mujer en su oficina guardando el frasco en el bolso del gimnasio'] ] },
  packsImg: 'img/cr-10-packs.webp?v=1', promoImg: 'img/cr-11-promo.webp?v=1',
  garantias: [['S/ 0', 'de envío a todo el Perú'], ['2 a 5', 'días de despacho'], ['Al recibir', 'pagas en efectivo'], ['-10 %', 'si pagas con tarjeta']],
  preguntas: [
    ['¿Qué es?', 'Gomitas Beast Bites con creatina, sabor frambuesa azul. Vienen en un frasco de 150 g.'],
    ['¿Para qué sirve la creatina?', 'Es un suplemento muy usado por quienes entrenan para apoyar la fuerza y el rendimiento en el entrenamiento. No es un medicamento ni reemplaza una alimentación balanceada.'],
    ['¿Cómo se toma?', 'Sigue la porción que indica la etiqueta del frasco y acompáñala con agua durante el día.'],
    ['¿La puedo tomar si tengo alguna condición de salud?', 'Si tienes una enfermedad, estás embarazada, das de lactar o tomas medicamentos, consulta antes con tu médico. No apto para menores de edad.'],
    ['¿Cómo pago?', 'Contra entrega: pagas en efectivo cuando recibes el paquete. Si prefieres, pagas ahora con tarjeta, con 10 % de descuento y entrega prioritaria.'],
    ['¿A dónde envían y cuánto tarda?', 'A todo el Perú, sin costo de envío. El despacho tarda de 2 a 5 días según tu ciudad.'],
    ['¿Y si llega mal?', 'Si te llega dañado o distinto, escríbenos dentro de las 48 horas con una foto y lo solucionamos sin costo para ti.'] ],
  cierre: { rotulo: 'Sube de nivel', titulo: 'Pide tu Beast Bites hoy', lista: [
    'Creatina en gomitas sabor frambuesa azul',
    'Sin polvo, sin shaker, sin grumos',
    'Envío gratis a todo el Perú',
    'Pagas al recibir o con tarjeta y ahorras 10 %'] },
};
