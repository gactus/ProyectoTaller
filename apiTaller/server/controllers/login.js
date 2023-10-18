const {usuarios, personas} = require('../models');
const jwt = require('../services/jwt');
const {compare} = require('../services/handleBcrypt');

const loginUsuario = async(req,res) =>{
    const datosLogin = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }
    try{
        await usuarios.findOne(
            {
                attributes: 
                    [
                        ['personaId','idPersona']
                    ],
                where:{
                    contrasena: datosLogin.contrasena,
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
                        rut: datosLogin.usuario,
                      }
                }]
            })
            .then(usuario =>{
                if (usuario ? res.status(200).send({usuario:usuario, token:jwt.createToken(usuario)}) : res.status(401).send({message:"Error: Acceso no autorizado."},));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

 module.exports = {
    loginUsuario,
 }