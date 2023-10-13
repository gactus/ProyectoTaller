const {usuarios, personas} = require('../models');
const jwt = require('../services/jwt');

function loginUsuario(req,res){
    usuarios.findOne(
    {
        attributes: ['personaId'],
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
        if (usuario ? res.status(200).send({usuario:usuario, token:jwt.createToken(usuario)}) : res.status(200).send({message:"Error: usuario/contraseña incorrectos."}));
    })
    .catch(err =>{
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    });
}
 module.exports = {
    loginUsuario,
 }