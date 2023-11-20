const cambiarContrasenaController = require('../controllers/cambiarContrasena');
const authenticatedMiddleware = require('../authenticated/authenticated');

module.exports = (app) => {
    app.post('/api/cambiarContrasena',authenticatedMiddleware.auth,cambiarContrasenaController.cambiarContrasena);
};