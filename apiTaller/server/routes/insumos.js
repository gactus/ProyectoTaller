const insumosController = require('../controllers').insumos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.get('/api/insumos',mdAuth.auth,insumosController.listarInsumos);
    app.get('/api/insumos/general',mdAuth.auth,insumosController.listarInsumosGeneral);
    app.get('/api/insumos/:id',mdAuth.auth,insumosController.buscarInsumo);
    app.post('/api/insumos',mdAuth.auth,insumosController.crearInsumo);
    app.put('/api/insumos/:id',mdAuth.auth,insumosController.editarInsumo);
    app.put('/api/insumos/delete/:id',mdAuth.auth,insumosController.eliminarInsumo);
}