const usuarios = require('../models').usuarios;
const personas = require('../models').personas;

function loginUsuario(req,res){
    usuarios.findOne(
    {
        where:{
            contrasena: req.body.contrasena,
            estado: 1
        },
        include:
        [{
            model: personas,
            attributes: ['nombres','apellidos'],
            where: {
                estado: 1,
                rut: req.body.rut,
              }
        }]
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