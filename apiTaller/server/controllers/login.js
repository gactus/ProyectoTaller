const usuarios = require('../models').usuarios;

function loginUsuario(req,res){
    usuarios.findOne(
    {
        where: {
          estado: 1,
          persona_id: req.body.idPersona,
        }
    })
    .then(usuario =>{
        res.status(200).send({usuario});
    })
    .catch(err =>{
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    });
}
 module.exports = {
    loginUsuario,
 }