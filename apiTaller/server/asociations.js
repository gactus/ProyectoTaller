const personas = require('./models').personas;
const usuarios = require('./models').usuarios;
const trabajos = require('./models').trabajos;
const perfiles = require('./models').perfiles;
const tipo_perfiles = require('./models').tipo_perfiles;

personas.hasOne(usuarios);
personas.hasOne(perfiles)
usuarios.belongsTo(personas);
trabajos.belongsTo(personas);
perfiles.belongsTo(personas);
perfiles.belongsTo(tipo_perfiles);
tipo_perfiles.hasOne(perfiles);