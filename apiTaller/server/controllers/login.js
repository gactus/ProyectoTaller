const loginVw = require('../models').loginVw;
const jwt = require('../services/jwt');
const {compare} = require('../services/handleBcrypt');

const loginUsuario = async(req,res) =>{
    const datosLogin = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }
    try{
        const existe = await loginVw.findOne({
            attributes: [['id','idUsuario'],'contrasenaUsuario'],
            where:{
                rutUsuario: datosLogin.usuario,
            },
        })
        if (existe){
            const chkContrasena = await compare(datosLogin.contrasena,existe.contrasenaUsuario);
            if (chkContrasena ? res.status(200).send({existe, token:jwt.createToken(existe)}) : res.status(401).send({message:"Error: Acceso no autorizado."},));
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

 module.exports = {
    loginUsuario,
 }