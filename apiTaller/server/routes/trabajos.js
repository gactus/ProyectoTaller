const trabajosController = require('../controllers').trabajos;
module.exports=(app)=>{
    //app.get('/api/personas',trabajosController.listarTrabajos);
    app.post('/api/trabajos',trabajosController.crearTrabajo);
    app.put('/api/trabajos',trabajosController.editarTrabajo);
    app.post('/api/detalleTrabajos',trabajosController.crearDetalleTrabajo);
    app.get('/api/detalleTrabajos/:idTrabajo',trabajosController.listarDetalleTrabajos);
}