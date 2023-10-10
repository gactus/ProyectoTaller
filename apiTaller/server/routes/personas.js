const personasController=require('../controllers').personas;

module.exports=(app)=>{
    app.get('/api/personas',personasController.listarPersonas);
    app.get('/api/personas/:rut',personasController.buscarPersona);
    app.post('/api/personas',personasController.crearPersona);
    app.put('/api/personas/:id',personasController.editarPersona);
}