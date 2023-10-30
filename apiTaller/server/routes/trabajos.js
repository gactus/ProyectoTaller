const trabajosController = require('../controllers').trabajos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    //app.get('/api/personas',trabajosController.listarTrabajos);
    app.post('/api/trabajos',mdAuth.auth,trabajosController.crearTrabajo);
    app.put('/api/trabajos',mdAuth.auth,trabajosController.editarTrabajo);
    app.post('/api/trabajos/detalleTrabajos',mdAuth.auth,trabajosController.crearDetalleTrabajo);
    app.get('/api/trabajos/detalleTrabajos/:id',mdAuth.auth,trabajosController.listarDetalleTrabajos);
    app.get('/api/trabajos/listadoTrabajosMecanico/:id',mdAuth.auth,trabajosController.listarTrabajosMecanico);
    app.get('/api/trabajos/listadoTrabajosAdmin',mdAuth.auth,trabajosController.listarTrabajosAdmin);
}