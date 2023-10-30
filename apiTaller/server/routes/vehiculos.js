const vehiculosController = require('../controllers').vehiculos;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/vehiculos',mdAuth.auth,vehiculosController.crearVehiculo);
    app.put('/api/vehiculos/:id',mdAuth.auth,vehiculosController.editarVehiculo);
    app.get('/api/vehiculos/:id',mdAuth.auth,vehiculosController.buscarVehiculo)
    app.get('/api/vehiculos/patente/:nroPatente',mdAuth.auth,vehiculosController.buscarVehiculoxPatente)
    app.get('/api/vehiculos/',mdAuth.auth,vehiculosController.listarVehiculos)
    app.get('/api/vehiculos/general',mdAuth.auth,vehiculosController.listarVehiculosGeneral)
    app.put('/api/vehiculos/:id',mdAuth.auth,vehiculosController.eliminarVehiculo)
}