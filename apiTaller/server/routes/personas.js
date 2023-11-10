const personasController=require('../controllers').personas;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.get('/api/personas',mdAuth.auth,personasController.listarPersonas);
    app.post('/api/personas',mdAuth.auth,personasController.crearPersona);
    app.get('/api/personas/:id',mdAuth.auth,personasController.buscarPersona);
    app.put('/api/personas/:id',mdAuth.auth,personasController.editarPersona);
}