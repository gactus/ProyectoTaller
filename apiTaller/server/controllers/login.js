const loginVw = require('../models').loginVw;
const jwt = require('../services/jwt');
const {compare} = require('../services/handleBcrypt');

const loginUsuario = async(req,res) =>{
    const datosLogin = {
        usuario: req.body.usuario,
        contrasena: req.body.contrasena
    }
    try{
        await loginVw.findOne({
            attributes: [['id','idUsuario']],
            where:{
                rutUsuario: datosLogin.usuario,
                contrasenaUsuario: datosLogin.contrasena
            },
        })
        .then(login =>{
            if (login ? res.status(200).send({login, token:jwt.createToken(login)}) : res.status(401).send({message:"Error: Acceso no autorizado."},));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
            //const chkContrasena = await compare(datosLogin.contrasena,usuario.contrasena);;
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

 module.exports = {
    loginUsuario,
 }