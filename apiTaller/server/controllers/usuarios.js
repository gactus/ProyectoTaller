const {usuarios,personas, perfiles, tipo_perfiles} = require('../models');
const {encrypt} = require('../services/handleBcrypt');

/* Creo un registro de nuevo usuario */
const crearUsuario = async(req,res) =>{
    try{
        const datosUsuario = {
            personaId: req.body.idPersona,
            contrasena: await encrypt(req.body.contrasena), //Encripto la contraseña del usuario
            estado: 1
        }
        await usuarios.findOne({
            where:{
                personaId: datosUsuario.personaId
            }
        })
        .then(existe=>{
            if (!existe){
                usuarios.create(datosUsuario)
                .then(()=>{
                    res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro." + err,registroCreado:false})
                })
            }else{
                res.status(200).send({message:"Atención: el registro ya existe.",registroCreado:false})
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err})
    }
}
/*  Edito los datos del usuario */
const editarUsuario = async(req,res)=>{
    try{
        const idUsuario = req.params.id;
        const datosUsuario = {
            contrasena: await encrypt(req.body.contrasena), //Encripto la contraseña del usuario
            estado: req.body.estado
        }
        await usuarios.findByPk(idUsuario) //Verificamos si el registro existe
        .then(usuario=>{
            usuario.update(datosUsuario) //Si existe, actualizo el registro
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({registroActualizado: false, err});
            })
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/*  Busco a un usuario especificio, y obtengo todos sus datos (excepto la contraseña) */
const buscarUsuario = async(req,res)=>{
    try{
        const idUsuario = req.params.id;
        await usuarios.findOne(
            {
                attributes:         
                [
                    ['id','idUsuario'],['personaId','idPersona']
                ],
                where:{
                    id: idUsuario,
                },
                include:
                [
                    {
                        model: personas,
                        attributes: 
                        [
                            ['nombres','nombreUsuario'],['apellidos','apellidosUsuario']
                        ],
                        where: {
                            estado: 1
                          }
                    }
                ]
            })
            .then(perfiles =>{
                if (perfiles ? res.status(200).send({perfiles}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){

    }
}
module.exports = {
    crearUsuario,
    editarUsuario,
    buscarUsuario
}