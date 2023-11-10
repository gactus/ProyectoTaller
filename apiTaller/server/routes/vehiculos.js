const vehiculosController = require('../controllers').vehiculos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/vehiculos',mdAuth.auth,vehiculosController.crearVehiculo);
    app.get('/api/vehiculos/',mdAuth.auth,vehiculosController.listarVehiculos)
    app.get('/api/vehiculos/general',mdAuth.auth,vehiculosController.listarVehiculosGeneral)
    app.get('/api/vehiculos/general/:nroPatente',mdAuth.auth,vehiculosController.buscarVehiculoxPatente)
    app.put('/api/vehiculos/:id',mdAuth.auth,vehiculosController.editarVehiculo);
    app.get('/api/vehiculos/:id',mdAuth.auth,vehiculosController.buscarVehiculo)
    app.put('/api/vehiculos/:id',mdAuth.auth,vehiculosController.eliminarVehiculo)
}