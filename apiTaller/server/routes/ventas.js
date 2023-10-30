const ventasController = require('../controllers').ventas;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/ventas',mdAuth.auth,ventasController.crearVenta);
    app.put('/api/ventas',mdAuth.auth,ventasController.editarVenta);
    app.get('/api/ventas/:id',mdAuth.auth,ventasController.buscarVenta);
    app.get('/api/ventas/listar/:id',mdAuth.auth,ventasController.listarVentas);
    app.get('/api/ventas/listarAdmin',mdAuth.auth,ventasController.listarVentasAdmin); 
    app.put('/api/ventas/delete/:id',mdAuth.auth,ventasController.eliminarVenta); 
    app.post('/api/ventas/ventasInsumo',mdAuth.auth,ventasController.crearVentaInsumo);
    app.get('/api/ventas/ventasInsumo',mdAuth.auth,ventasController.listarVentasInsumos);
    app.put('/api/ventas/ventasInsumo/delete/:id',mdAuth.auth,ventasController.eliminarVentaInsumo);
}