const {perfiles,tipo_perfiles, personas} = require('../models');

/* Listo los tipos de perfiles activos */

function listarTiposPerfiles(req,res){
    tipo_perfiles.findAll(
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
}

function perfilUsuario(req,res){
    perfiles.findOne(
    {
        attributes:         
        [
            ['id','idPerfil']
        ],
        where:{
            personaId: req.params.id,
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
}
 module.exports = {
    perfilUsuario,
    listarTiposPerfiles
 }