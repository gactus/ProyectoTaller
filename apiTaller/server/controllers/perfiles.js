const {perfiles,tipo_perfiles, personas, perfil_rutas} = require('../models');

/* Listo los tipos de perfiles activos */
const listarTiposPerfiles = async(req,res) =>{
    try{
        await tipo_perfiles.findAll(
            {
                attributes: 
                [
                    ['id','idPerfil'],['descripcion','nombrePerfil']
                ],
                where:{
                    estado: 1
                }
            })
            .then(tipo_perfil=>{
                if (tipo_perfil ? res.status(200).send({tipo_perfil}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error Interno."});
    }
}
/**/
const perfilUsuario = async(req,res) =>{
    try{
        const idPerfil = req.params.id;
        await perfiles.findOne(
            {
                attributes:         
                [
                    ['id','idPerfil']
                ],
                where:{
                    personaId: idPerfil,
                    estado: 1
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
                    },
                    {
                    model: tipo_perfiles,
                    attributes: 
                    [
                        ['descripcion','tipoPerfil']
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
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/*Obtengo las rutas, dependiendo del tipo de perfil*/
const rutasTipoPerfil = async(req,res) =>{
    try{
        const idTipoPerfil = req.params.id;
        await perfil_rutas.findAll(
        {
            attributes: 
            [
                ['id','idRuta'],['nombre_ruta','nombreRuta'],['ruta','rutaMenu'],
                ['icono','iconoRuta'],['tipoPerfileId','idTipoPerfil']
            ],
            where:{
                estado: 1,
                tipoPerfileId: idTipoPerfil
            }
        })
        .then(perfil_ruta=>{
            if (perfil_ruta ? res.status(200).send({perfil_ruta}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
 module.exports = {
    perfilUsuario,
    listarTiposPerfiles,
    rutasTipoPerfil
 }