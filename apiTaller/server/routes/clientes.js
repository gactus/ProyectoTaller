const clientesController = require('../controllers').clientes;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/clientes',mdAuth.auth,clientesController.crearCliente);
    app.get('/api/clientes/general/:rut',mdAuth.auth,clientesController.buscarClienteRut); //Permite buscar un clinte por su rut
    app.put('/api/clientes/delete/:id',mdAuth.auth,clientesController.eliminarCliente); //Eliminación Lógica
    app.get('/api/clientes',mdAuth.auth,clientesController.listarClientes);
    app.put('/api/clientes/:id',mdAuth.auth,clientesController.editarCliente);
    app.get('/api/clientes/:id',mdAuth.auth,clientesController.buscarCliente);
    app.get('/api/listadoClientes/',mdAuth.auth,clientesController.listarClientesGeneral);
}