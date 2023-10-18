/* Controlador para url's varias */
const marcasController = require('../controllers').marcas;
const modelosController=require('../controllers').modelos;
const proveedoresController=require('../controllers').proveedores;
const insumosController = require('../controllers').insumos;
const tipoInsumosController = require('../controllers').tipo_insumos;
const registroLogsController = require('../controllers').registro_logs;
const estadoTrabajosController = require('../controllers').estado_trabajos;
const perfilesController = require('../controllers').perfiles;
const trabajosController = require('../controllers').trabajos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.get('/api/marcas',mdAuth.auth,marcasController.listarMarcas);
    app.get('/api/marcas/:id',mdAuth.auth,marcasController.buscarMarca);
    app.get('/api/modelos',mdAuth.auth,modelosController.listarModelos);
    app.get('/api/modelos/:id',mdAuth.auth,modelosController.buscarModelo);
    app.get('/api/proveedores',mdAuth.auth,proveedoresController.listarProveedores);
    app.get('/api/proveedores/:id',mdAuth.auth,proveedoresController.buscarProveedor);
    app.post('/api/proveedores',mdAuth.auth,proveedoresController.crearProveedor);
    app.get('/api/insumos',mdAuth.auth,insumosController.listarInsumos);
    app.get('/api/insumos/:id',mdAuth.auth,insumosController.buscarInsumo);
    app.get('/api/tipoInsumos',mdAuth.auth,tipoInsumosController.listarTiposInsumos);
    app.get('/api/tipoInsumos/:id',mdAuth.auth,tipoInsumosController.buscarTipoInsumo);
    app.post('/api/proveedores',mdAuth.auth,registroLogsController.registrarLog);
    app.get('/api/estadoTrabajos',mdAuth.auth,estadoTrabajosController.listarEstadosTrabajos)
    app.post('/api/estadoTrabajos',mdAuth.auth,estadoTrabajosController.crearEstadoTrabajo);
    app.get('/api/perfil/:id',mdAuth.auth,perfilesController.perfilUsuario);
    app.get('/api/datosDashBoard/:id',mdAuth.auth,trabajosController.datosDashBoard);
    app.get('/api/rutasPerfil/:id',mdAuth.auth,perfilesController.rutasTipoPerfil);
}