const {perfil,tipo_perfiles, perfil_rutas} = require('../models');

/* Listo los tipos de perfiles activos */
const listarTiposPerfiles = async(req,res) =>{
    try{
        await tipo_perfiles.findAll(
            {
                attributes: [['id','idPerfil'],['descripcion','nombrePerfil']],
                where:{estado: 1}
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
            where:
            {
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
    listarTiposPerfiles,
    rutasTipoPerfil
 }