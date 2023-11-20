const {personas, usuarios, trabajos, perfiles, tipo_perfiles, tipo_notificaciones,
    detalle_notificaciones, tipo_insumos, insumos, marcas, modelos,detalle_trabajos,
    estado_trabajos, proveedores, bancos, tipo_cuentas} = require('./models');
/*
personas.hasOne(usuarios);
personas.hasOne(perfiles);
usuarios.belongsTo(personas);
trabajos.hasMany(detalle_trabajos);
trabajos.belongsTo(estado_trabajos);
trabajos.belongsTo(perfiles);
tipo_perfiles.hasOne(perfiles);
tipo_insumos.hasOne(insumos);
insumos.hasOne(detalle_trabajos);
insumos.belongsTo(tipo_insumos);
perfiles.hasOne(trabajos);
perfiles.belongsTo(personas);
perfiles.belongsTo(tipo_perfiles);
tipo_notificaciones.hasOne(detalle_notificaciones);
detalle_notificaciones.belongsTo(tipo_notificaciones);
marcas.hasOne(modelos);
modelos.belongsTo(marcas);
detalle_trabajos.belongsTo(trabajos);
detalle_trabajos.belongsTo(insumos);
estado_trabajos.hasOne(trabajos);
bancos.hasOne(proveedores);
tipo_cuentas.hasOne(proveedores);
proveedores.belongsTo(bancos);
proveedores.belongsTo(tipo_cuentas); */