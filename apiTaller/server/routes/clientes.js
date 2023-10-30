const clientesController = require('../controllers').clientes;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/clientes',mdAuth.auth,clientesController.crearCliente);
    app.put('/api/clientes/:id',mdAuth.auth,clientesController.editarCliente);
    app.get('/api/clientes/:id',mdAuth.auth,clientesController.buscarCliente);
    app.put('/api/clientes/general/:rut',mdAuth.auth,clientesController.buscarClienteRut); //Permite buscar un clinte por su rut
    app.get('/api/clientes',mdAuth.auth,clientesController.listarClientes);
    app.get('/api/clientes/general/',mdAuth.auth,clientesController.listarClientesGeneral);
    app.put('/api/clientes/delete/:id',mdAuth.auth,clientesController.eliminarCliente); //Eliminación Lógica
}