const {detalle_notificaciones,tipo_notificaciones} = require('../models');
/* Controlador general para notificaciones */
/* Listamos los tipos de notificaciones (ya predefinidos) */ 
const listarTipoNotificaciones = async(req,res)=>{
    try{
        await tipo_notificaciones.findAll(
            {
                attributes: [['id', 'idTipoNotificacion'],['descripcion','tipoNotificacion']],
                where: {estado: 1}
            })
            .then(tipo_notificacion=>
                {
                    if (tipo_notificacion ? res.status(200).json(tipo_notificacion) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Buscamos una notificacion asociada a un tipo */
const buscarDetalleNotificacion = async(req,res) =>{
    try{
        const idTipoNotificacion = req.params.id;
        await detalle_notificaciones.findOne(
        {
            attributes: 
            [
                ['id','idDetalleNotificacion'],['dettale_notificacion','detalleNotificacion']
            ],
            where: 
            {
                    tipoNotificacioneId: idTipoNotificacion, 
                    estado: 1
            }
        })
        .then(detalle_notificacion =>{
            if (detalle_notificacion ? res.status(200).send(detalle_notificacion) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}

module.exports = {
    listarTipoNotificaciones,
    buscarDetalleNotificacion
}