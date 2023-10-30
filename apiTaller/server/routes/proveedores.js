const proveedoresController = require('../controllers').proveedores;
const proveedorInsumosController = require('../controllers').proveedor_insumos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.get('/api/proveedores',mdAuth.auth,proveedoresController.listarProveedores);
    app.get('/api/proveedores/:id',mdAuth.auth,proveedoresController.buscarProveedor);
    app.post('/api/proveedores',mdAuth.auth,proveedoresController.crearProveedor);
    app.put('/api/proveedores/:id',mdAuth.auth,proveedoresController.editarProveedor);
    app.put('/api/proveedores/delete/:id',mdAuth.auth,proveedoresController.eliminarProveedor); //para eliminación lógica
/*  rutas para la asociación Proveedor/Insumo */
    app.get('/api/proveedores/insumos',mdAuth.auth,proveedorInsumosController.listarProveedorInsumos);
    app.get('/api/proveedores/insumos/:id',mdAuth.auth,proveedorInsumosController.buscarProveedorInsumo);
    app.get('/api/proveedores/insumos/buscar/:id',mdAuth.auth,proveedorInsumosController.buscarProveedorInsumoByIdProv);
    app.post('/api/proveedores/insumos',mdAuth.auth,proveedorInsumosController.crearProveedorInsumo);
    app.put('/api/proveedores/insumos/:id',mdAuth.auth,proveedorInsumosController.editarProveedorInsumo);
    app.put('/api/proveedores/insumos/delete/:id',mdAuth.auth,proveedorInsumosController.eliminarProveedorInsumo); //para eliminación lógica
}