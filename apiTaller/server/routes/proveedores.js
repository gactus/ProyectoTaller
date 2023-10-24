const proveedoresController=require('../controllers').proveedores;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.get('/api/proveedores',mdAuth.auth,proveedoresController.listarProveedores);
    app.get('/api/proveedores/:id',mdAuth.auth,proveedoresController.buscarProveedor);
    app.post('/api/proveedores',mdAuth.auth,proveedoresController.crearProveedor);
    app.put('/api/proveedores/:id',mdAuth.auth,proveedoresController.editarProveedor);
    app.put('/api/proveedores/delete/:id',mdAuth.auth,proveedoresController.eliminarProveedor); //para eliminación lógica
}