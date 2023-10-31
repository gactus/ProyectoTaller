const {usuarios,usuariosVw, personas, perfiles} = require('../models');
const {encrypt} = require('../services/handleBcrypt');

/* Creamos un registro de nuevo usuario */
const crearUsuario = async(req,res) =>{
    try{
        const contrasenaUsuario = await encrypt(req.body.contrasena);
        const datosPersona = {
            rut: req.body.rut,
            nombres: req.body.nombres, 
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            estado: 1
        }
        const existe = await personas.findOne({
            where:{
                rut: datosPersona.rut
            }
        })
        if (!existe){
            personas.create(datosPersona)
            .then(persona=>{
                const datosPerfil = {
                    personaId: persona.id,
                    tipoPerfileId: req.body.IdTipoPerfil,
                    estado: 1
                }
                perfiles.create(datosPerfil)
                .then(() =>{
                    const datosUsuario = {
                        personaId: persona.id,
                        contrasena: contrasenaUsuario,
                        estado: 1
                    }
                    usuarios.create(datosUsuario)
                    .then(()=>{
                        res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
                    })
                    .catch(err=>{
                        res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro." + err,registroCreado:false})  
                    })
                })
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro." + err,registroCreado:false})
            })
        }else{
            res.status(200).send({message:"Atención: el registro ya existe.",registroCreado:false})
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err})
    }
}
/*  Editamos los datos del usuario */
const editarUsuario = async(req,res)=>{
    try{
        const idPersona = req.params.id;
        const contrasenaUsuario = await encrypt(req.body.contrasena); //Encripto la contraseña del usuario //
        const datosPersona = {
            nombres: req.body.nombre,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            estado: req.body.estado
        }
        const datosUsuario = {
            contrasena: contrasenaUsuario 
        }
        await personas.findByPk(idPersona) //Verificamos si el registro existe
        .then(persona=>{
            persona.update(datosPersona) //Si existe, actualizo el registro
            .then(()=>{
                perfiles.findOne(            {
                    where: {personaId: persona.id}
                })
                .then((perfil)=>{
                    datosPerfil = {
                        tipoPerfilId: req.body.IdTipoPerfil
                    }
                    perfil.update(datosPerfil)
                    .then(()=>{
                        usuarios.findOne(
                        {
                            where: {personaId: persona.id}
                        })
                        .then(usuario=>{
                            usuario.update(datosUsuario)
                            .then(()=>{
                                res.status(200).send({message:"Atención: Registro actualizado con éxito.",registroActualizado:true})
                            })
                            .catch(err=>{
                                res.status(500).send({message:"Atención: El registro no pudo ser actualizado.",registroActualizado: false});
                            })
                        })
                    })
                })
            })
            .catch(err=>{
                res.status(500).send({message: "Atención: El registro no pudo ser actualizado."});
            })
        })
        .catch(err=>{
            res.status(500).send({message: "Atención: No existen registros para ser actualizados."});
        })
    }catch(err){
        res.status(500).send({message: "Atención: El registro no pudo ser actualizado."});
    }
}
/*  Buscamos a un usuario especificio, y obtengo todos sus datos (excepto la contraseña) */
const buscarUsuario = async(req,res)=>{
    try{
        const idUsuario = req.params.id;
        await usuariosVw.findOne(
        {
            attributes:         
            [['id','idPersona'],'nombreUsuario','apellidoUsuario','nombreCompletoUsuario','telefonoUsuario','emailUsuario','estadoUsuario','idTipoPerfil'],
            where:{idUsuario: idUsuario}
        })
        .then(usuarioVw =>{
            if (usuarioVw ? res.status(200).send({usuarioVw}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* listamos todos los usarios */
const listarUsuarios = async(req,res) =>{
    try{
        await usuariosVw.findAll()
        .then(usuarioVw=>{
            if (usuarioVw ? res.status(200).send({usuarioVw}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Damos de baja un usuario */
const eliminarUsuario = async(req,res)=>{
    try{
        const idUsuario = req.params.id;
        await usuarios.findByPk(idUsuario)
        .then(usuario=>{
            const datosUsuario = { //Cambiamos el estado del Vehiculo
                estado: 0
            }
            usuario.update(datosUsuario)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error al buscar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Obtengo el perfil de un usuario, en base al id. de la persona */
module.exports = {
    crearUsuario,
    editarUsuario,
    buscarUsuario,
    listarUsuarios,
    eliminarUsuario
}