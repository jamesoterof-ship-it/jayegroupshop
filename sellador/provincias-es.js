// 28-10 ECUADOR: las 24 provincias (el archivo conserva el nombre PROVINCIAS_ES porque
// es la variable que lee el motor ficha.js; el contenido es de Ecuador).
// Galápagos se deja fuera: Dropi Ecuador no tiene transportadora para las islas.
// Textos del motor para Ecuador: país EC, +593, moneda USD, sin código postal.
window.TEXTOS = {
  _pais: 'EC',
  paises: [['EC', '+593', 9, 'Ecuador']],
  locale: 'es-EC',
  moneda: 'USD',
  correo: 'gerencia@jayegroup.com.co',
  marca: 'Jaye Group Ecuador',
  eMovil: 'Revisa tu celular: en Ecuador son 10 dígitos y empieza por 09.',
  recienLlegado: 'Recién llegado a Ecuador · sé de los primeros en probarlo',
  eCP: 'Escribe tu ciudad.',
};
window.PROVINCIAS_ES = [
  "Azuay","Bolívar","Cañar","Carchi","Chimborazo","Cotopaxi","El Oro","Esmeraldas","Guayas","Imbabura",
  "Loja","Los Ríos","Manabí","Morona Santiago","Napo","Orellana","Pastaza","Pichincha","Santa Elena",
  "Santo Domingo de los Tsáchilas","Sucumbíos","Tungurahua","Zamora Chinchipe"
];
// En Ecuador no se usa el código postal: no hay prefijos sin cobertura.
window.CP_SIN_COBERTURA = [];
window.WA_NUM = '';   // todavía no hay número de WhatsApp de Ecuador (se pone cuando James lo compre)
