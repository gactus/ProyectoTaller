const {detalle_notificaciones,tipo_notificaciones, notificacionesVw} = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
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
/* Listamos los próximos trabajos que requieren ser Notificados */
const listarTrabajosNotificar = async(req,res) =>{
    try{
        await notificacionesVw.findAll(
        {
            attributes: 
            [
                ['id','idNotificacionTrabajo'],'detalleTrabajo', 'fechaTrabajo', 'fechaProxMantencion', 'patenteVehiculo',
                'nombreCliente','emailCliente','telefonoCliente'
            ]
        })
        .then(notificacionVw =>{
            if (notificacionVw ? res.status(200).send(notificacionVw) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Realizamos un conteo de los próximos trabajos que deben ser notificados */
const trabajosNotificarDashboard = async(req,res) =>{
    try{
        await notificacionesVw.findAll(
        {
            attributes: [[sequelize.fn('COUNT', '*'), 'totalRegistros']]
        })
        .then(notificacionesDashBoard =>{
            if (notificacionesDashBoard ? res.status(200).send(notificacionesDashBoard) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Buscamos los datos de un trabajo en especifico, para notificar al cliente */
const buscarClienteNotificacion = async(req,res) =>{
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
    buscarDetalleNotificacion,
    listarTrabajosNotificar,
    trabajosNotificarDashboard
}