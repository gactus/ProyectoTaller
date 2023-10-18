const usuariosController = require('../controllers').usuarios;
const mdAuth = require('../authenticated/authenticated');

module.exports=(app)=>{
    app.post('/api/usuarios',mdAuth.auth,usuariosController.crearUsuario);
    app.put('/api/usuarios/:id',mdAuth.auth,usuariosController.editarUsuario);
    app.get('/api/usuarios/:id',mdAuth.auth,usuariosController.buscarUsuario)
}