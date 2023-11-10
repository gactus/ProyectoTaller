/* Controlador para url's varias */
const marcasController = require('../controllers').marcas;
const modelosController=require('../controllers').modelos;
const tipoInsumosController = require('../controllers').tipo_insumos;
const registroLogsController = require('../controllers').registro_logs;
const estadoTrabajosController = require('../controllers').estado_trabajos;
const trabajosController = require('../controllers').trabajos;
const perfilesController = require('../controllers').perfiles;
const bancosController = require('../controllers').bancos;
const tipoCuentasController = require('../controllers').tipo_cuentas;
const notificacionesController = require('../controllers').notificaciones;
const insumosController = require('../controllers').insumos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
/*  Marcas */
    app.get('/api/marcas',mdAuth.auth,marcasController.listarMarcas);
    app.put('/api/marcas/delete/:id',mdAuth.auth,marcasController.eliminarMarca); //Dar de baja
    app.get('/api/marcas/general',mdAuth.auth,marcasController.listarMarcas);
    app.post('/api/marcas',mdAuth.auth,marcasController.crearMarca);
    app.put('/api/marcas/:id',mdAuth.auth,marcasController.editarMarca);
    app.get('/api/marcas/:id',mdAuth.auth,marcasController.buscarMarca);
/*  modelos */
    app.get('/api/modelos',mdAuth.auth,modelosController.listarModelos);
    app.get('/api/modelos/general',mdAuth.auth,modelosController.listarModelosGeneral);
    app.put('/api/modelos/delete/:id',mdAuth.auth,modelosController.eliminarModelo); //Dar de baja
    app.post('/api/modelos',mdAuth.auth,modelosController.crearModelo);
    app.get('/api/modelos/:id',mdAuth.auth,modelosController.buscarModelo);
    app.put('/api/modelos/:id',mdAuth.auth,modelosController.editarModelo);
/* Tipo de Insumos */
    app.get('/api/tipoInsumos',mdAuth.auth,tipoInsumosController.listarTiposInsumos);
    app.get('/api/tipoInsumos/general',mdAuth.auth,tipoInsumosController.listarTiposInsumosGeneral);
    app.put('/api/tipoInsumos/delete/:id',mdAuth.auth,tipoInsumosController.editarTipoInsumo);
    app.post('/api/tipoInsumos',mdAuth.auth,tipoInsumosController.crearTipoInsumo);
    app.get('/api/tipoInsumos/:id',mdAuth.auth,tipoInsumosController.buscarTipoInsumo);
    app.put('/api/tipoInsumos/:id',mdAuth.auth,tipoInsumosController.editarTipoInsumo);
/* Estados Trabajos */
    app.get('/api/estadoTrabajos',mdAuth.auth,estadoTrabajosController.listarEstadosTrabajos)
    app.get('/api/estadoTrabajos/general',mdAuth.auth,estadoTrabajosController.listarEstadosTrabajosGeneral)
    app.put('/api/estadoTrabajos/delete/:id',mdAuth.auth,estadoTrabajosController.eliminarEstadoTrabajo); //Dar de baja
    app.post('/api/estadoTrabajos',mdAuth.auth,estadoTrabajosController.crearEstadoTrabajo);
    app.put('/api/estadoTrabajos/:id',mdAuth.auth,estadoTrabajosController.editarEstadoTrabajo);
    app.get('/api/estadoTrabajos/:id',mdAuth.auth,estadoTrabajosController.buscarEstadoTrabajo)
/*  Dashboard */
    app.get('/api/datosDashBoard/trabajos/:id',mdAuth.auth,trabajosController.datosDashBoard);
    app.get('/api/datosDashBoard/insumos/',mdAuth.auth,insumosController.insumosBajoStock)
/*  Rutas para tipo de perfil (solo mecánicos y Admin) */
    app.get('/api/rutasPerfil/:id',mdAuth.auth,perfilesController.rutasTipoPerfil);
/*  Bancos */
    app.get('/api/bancos',mdAuth.auth,bancosController.listarBancos);
    app.get('/api/bancos/general',mdAuth.auth,bancosController.listarBancosGeneral); //Ruta para el matendor de Bancos
    app.put('/api/bancos/delete/:id',mdAuth.auth,bancosController.eliminarBanco); //Dar de baja
    app.post('/api/bancos',mdAuth.auth,bancosController.crearBanco);
    app.get('/api/bancos/:id',mdAuth.auth,bancosController.buscarBanco);
    app.put('/api/bancos/:id',mdAuth.auth,bancosController.editarBanco);
/*  Tipo de Cuentas Bancarias */
    app.get('/api/tipoCuentas',mdAuth.auth,tipoCuentasController.listarTipoCuentas);
    app.get('/api/tipoCuentas/general',mdAuth.auth,tipoCuentasController.listarTipoCuentasGeneral); //Ruta para el matendor de Tipo Cuentas (a futuro)
    app.put('/api/tipoCuentas/delete/:id',mdAuth.auth,tipoCuentasController.eliminarTipoCuenta); //Dar de baja
    app.post('/api/tipoCuentas',mdAuth.auth,tipoCuentasController.crearTipoCuenta);
    app.get('/api/tipoCuentas/:id',mdAuth.auth,tipoCuentasController.buscarTipoCuenta);
    app.put('/api/tipoCuentas/:id',mdAuth.auth,tipoCuentasController.editarTipoCuenta);
/* Notificaciones */
    app.get('/api/tipoNotificacion',mdAuth.auth,notificacionesController.listarTipoNotificaciones);
    app.get('/api/notificacion/:id',mdAuth.auth,notificacionesController.buscarDetalleNotificacion);
/*  Logs */
    app.post('/api/logs',mdAuth.auth,registroLogsController.registrarLog);
}