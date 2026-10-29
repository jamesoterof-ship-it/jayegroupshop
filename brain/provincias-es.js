// 28-10 MÉXICO: los 32 estados (el archivo conserva el nombre PROVINCIAS_ES porque es la
// variable que lee el motor ficha.js; el contenido es de México).
// Textos del motor para México: país MX, +52, 10 dígitos, moneda MXN, código postal de 5 dígitos.
window.TEXTOS = {
  _pais: 'MX',
  paises: [['MX', '+52', 10, 'México']],
  locale: 'es-MX',
  moneda: 'MXN',
  correo: 'gerencia@jayegroup.com.co',
  marca: 'Jaye Group México',
  recienLlegado: 'Recién llegado a México · sé de los primeros en probarlo',
  eMovil: 'Revisa tu celular: en México son 10 dígitos.',
  lProvincia: 'Estado',
  eProvincia: 'Selecciona tu estado.',
  phCiudad: 'Ej: Guadalajara',
  phCP: '06000',
  phMovil: '55 1234 5678',
  phDir: 'Calle, número y colonia',
  phRef: 'Entre calles, color de la casa, horario en que estás…',
  lCiudad: 'Ciudad o municipio',
  carriers: ['Paquetería nacional', 'Guía rastreable', 'Pago al recibir'],
  pagoCodSub: 'Envío gratis · 2 a 5 días hábiles',
  saleHoy: 'Sale de nuestra bodega en Ciudad de México. Pagas cuando lo recibes.',
  avisoEntrega: 'Tu pedido llega en 2 a 5 días hábiles. Como pagas al recibir, el repartidor te lo entrega en mano: si esos días no vas a estar, avísanos por WhatsApp y le indicamos otro día o que se lo deje a alguien de confianza. Así te llega a la primera 🚚',
  sinCobertura: 'Revisa tu código postal.',
  sellos: [
    ['Paquetería nacional', 'Envío a todo México'],
    ['Guía rastreable', 'Te mandamos la guía por WhatsApp'],
    ['Pagas al recibir', 'Al repartidor, cuando lo tienes en la mano'],
  ],
  resDatos: [
    ['2 a 5', 'días hábiles de entrega'],
    ['$0', 'de envío a todo México'],
    ['30', 'días de garantía de satisfacción'],
    ['$0', 'por adelantado: pagas al recibir'],
  ],
};
window.PROVINCIAS_ES = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Ciudad de México",
  "Coahuila","Colima","Durango","Estado de México","Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacán","Morelos",
  "Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco",
  "Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"
];
// En México no hay prefijos de código postal sin cobertura (Dropi México envía a todo el país).
window.CP_SIN_COBERTURA = [];
window.WA_NUM = '525597219871';   // WhatsApp de México (+52 55 9721 9871), comprado en Zadarma el 28-10
