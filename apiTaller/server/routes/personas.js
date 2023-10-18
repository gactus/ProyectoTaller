const personasController=require('../controllers').personas;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.get('/api/personas',mdAuth.auth,personasController.listarPersonas);
    app.get('/api/personas/:id',mdAuth.auth,personasController.buscarPersona);
    app.post('/api/personas',mdAuth.auth,personasController.crearPersona);
    app.put('/api/personas/:id',mdAuth.auth,personasController.editarPersona);
}