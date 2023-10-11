/* Controlador para url's varias */
const marcasController = require('../controllers').marcas;
const modelosController=require('../controllers').modelos;
const proveedoresController=require('../controllers').proveedores;
const insumosController = require('../controllers').insumos;
const tipoInsumosController = require('../controllers').tipo_insumos;
const registroLogsController = require('../controllers').registro_logs;
const estadosTrabajosController = require('../controllers').estados_trabajos;
const perfilesController = require('../controllers').perfiles;

module.exports=(app)=>{
    app.get('/api/marcas',marcasController.listarMarcas);
    app.get('/api/marcas/:id',marcasController.buscarMarca);
    app.get('/api/modelos',modelosController.listarModelos);
    app.get('/api/modelos/:id',modelosController.buscarModelo);
    app.get('/api/proveedores',proveedoresController.listarProveedores);
    app.get('/api/proveedores/:id',proveedoresController.buscarProveedor);
    app.post('/api/proveedores',proveedoresController.crearProveedor);
    app.get('/api/insumos',insumosController.listarInsumos);
    app.get('/api/insumos/:id',insumosController.buscarInsumo);
    app.get('/api/tipoInsumos',tipoInsumosController.listarTiposInsumos);
    app.get('/api/tipoInsumos/:id',tipoInsumosController.buscarTipoInsumo);
    app.post('/api/proveedores',registroLogsController.registrarLog);
    app.get('/api/estadosTrabajos',estadosTrabajosController.listarEstadosTrabajos)
    app.post('/api/estadosTrabajos',estadosTrabajosController.crearEstadoTrabajo);
    app.get('/api/perfil/:id',perfilesController.perfilUsuario);
}