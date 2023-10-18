const {usuarios, personas} = require('../models');
const jwt = require('../services/jwt');

function loginUsuario(req,res){
    usuarios.findOne(
    {
        attributes: 
            [
                ['personaId','idPersona']
            ],
        where:{
            contrasena: req.body.contrasena,
            estado: 1
        },
        include:
        [{
            model: personas,
            attributes: 
                [
                    ['nombres','nombresPersona'],['apellidos','apellidosPersona']
                ],
            where: {
                estado: 1,
                rut: req.body.rut,
              }
        }]
    })
    .then(usuario =>{
        if (usuario ? res.status(200).send({usuario:usuario, token:jwt.createToken(usuario)}) : res.status(401).send({message:"Error: Acceso no autorizado."},));
    })
    .catch(err =>{
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    });
}

 module.exports = {
    loginUsuario,
 }