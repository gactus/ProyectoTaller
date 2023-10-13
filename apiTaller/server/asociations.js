const {personas, usuarios, trabajos, perfiles, tipo_perfiles, tipo_notificaciones,
    detalle_notificaciones, tipo_insumos, insumos, marcas, modelos,detalle_trabajos,
    estado_trabajos,proveedores} = require('./models');

personas.hasOne(usuarios);
personas.hasOne(perfiles)
usuarios.belongsTo(personas);
trabajos.belongsTo(personas);
trabajos.belongsTo(detalle_trabajos);
trabajos.belongsTo(estado_trabajos);
tipo_perfiles.hasOne(perfiles);
tipo_insumos.hasOne(insumos);
insumos.hasOne(detalle_trabajos);
insumos.hasOne(proveedores);
insumos.belongsTo(tipo_insumos);
perfiles.belongsTo(personas);
perfiles.belongsTo(tipo_perfiles);
tipo_notificaciones.hasOne(detalle_notificaciones);
detalle_notificaciones.belongsTo(tipo_notificaciones);
marcas.hasOne(modelos);
modelos.belongsTo(marcas);
detalle_trabajos.belongsTo(trabajos);
detalle_trabajos.belongsTo(insumos);
estado_trabajos.hasOne(trabajos);
proveedores.belongsTo(insumos);