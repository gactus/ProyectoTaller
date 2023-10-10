const trabajosController = require('../controllers').trabajos;
module.exports=(app)=>{
    //app.get('/api/personas',personasController.listarPersonas);
    app.post('/api/trabajos',trabajosController.crearTrabajo);
    //app.put('/api/personas',personasController.actualizarPersona);
    app.post('/api/detalleTrabajos',trabajosController.crearDetalleTrabajo);
}