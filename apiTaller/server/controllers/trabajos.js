const sequelize = require('sequelize');
const Op = sequelize.Op;
const {trabajos, detalle_trabajos,insumos, trabajosVw} = require('../models');

/* Sección Trabajos */
/* Creamos el metodo para registrar un trabajo */
const crearTrabajo = async(req,res) =>{
    try{
        const datosTrabajo = {
            detalle: req.body.descripcionTrabajo,
            fecha_trabajo: req.body.fechaTrabajo,
            fecha_proxima_mantencion: req.body.proximaMantencion,
            requiere_notificacion: req.body.requiereNotificacion,
            conto_mano_obra: req.body.costoManoObra,
            vehiculoId: req.body.idVehiculo,
            estadoTrabajoId: req.body.idEstadoTrabajo,
            perfileId: req.body.idPerfil,
            estado: 1
        }
        await trabajos.create(datosTrabajo)
        .then(()=>{
            res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true});
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un error al crear el registro.", registroCreado:false});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Editamos los datos asociados a un trabajo */
const editarTrabajo = async(req, res) =>{
    try{
        var id = req.params.id;
        const datosTrabajo = {
            detalle: req.body.descripcionTrabajo,
            fecha_trabajo: req.body.fechaTrabajo,
            fecha_proxima_mantencion: req.body.proximaMantencion,
            requiere_notificacion: req.body.requiereNotificacion,
            conto_mano_obra: req.body.costoManoObra,
            vehiculoId: req.body.idVehiculo,
            estadoTrabajoId: req.body.idEstadoTrabajo,
            perfileId: req.body.idPerfil,
            estado: req.body.idEstadoTrabajo
        }
        await trabajos.findByPk(id)
        .then(trabajo=>{
            trabajo.update(datosTrabajo)
            .then(()=>{
                res.status(200).send({message: "Atención Registro Actualizado con éxito.", registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: el registro no pudo ser actualizado.", registroActualizado: false});
            }); 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: ocurrió un problema al consultar el registro.", registroActualizado: false});
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
//Listados
//Listamos los trabajos asociados a un mecánico (utilizado tanto por un mecánico, como el admin)
const listarTrabajosMecanico = async(req, res) =>{
    try{
        const idUsuario = req.params.id;
        trabajosVw.findAll({
            attributes: 
                [
                    ['id','idTrabajo'],'detalleTrabajo','fechaTrabajo','fechaProxMantencion','requiereNotificacion','costoManoObra',
                    'costoInsumos','costoTotal','nombreMecanico','tipoPerfil'
                ],
            where:{idUsuario: idUsuario},
        })
        .then(listadoTrabajos =>{
            if (listadoTrabajos ? res.status(200).send(listadoTrabajos) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + + err});
    }
}
//Listamos los trabajos asociados a todos los perfiles (mecanico/admin) (utilizado solo por el admin)
const listarTrabajosAdmin = async(req, res) =>{
    try{
        await trabajosVw.findAll({
            attributes: 
                [
                    ['id','idTrabajo'],'detalleTrabajo','fechaTrabajo','fechaProxMantencion','requiereNotificacion','costoManoObra',
                    'costoInsumos','costoTotal','nombreMecanico','tipoPerfil','idEstadoTrabajo','estadoTrabajo'
                ]
        })
        .then(listadoTrabajos =>{
            if (listadoTrabajos ? res.status(200).send(listadoTrabajos) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Mostramos el detalle de un trabajo */
const buscarTrabajo = async(req, res) =>{
    try{
        const idTrabajo = req.params.id;
        await trabajosVw.findAll({
            attributes: 
                [
                    ['id','idTrabajo'],'detalleTrabajo','fechaTrabajo','fechaProxMantencion','requiereNotificacion','costoManoObra',
                    'costoInsumos','costoTotal','nombreMecanico','tipoPerfil','idEstadoTrabajo','estadoTrabajo'
                ],
            where:{
                id: idTrabajo
            }
        })
        .then(detalleTrabajo =>{
            if (detalleTrabajo ? res.status(200).send(detalleTrabajo) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/*  Sección Detalle del Trabajo */
/* Creamos el detalle de un trabajo */
const crearDetalleTrabajo = async(req,res) =>{
    try{
        const existe = await detalle_trabajos.findOne(
        {
            where: {
                insumoId: req.body.idInsumo,
                trabajoId: req.body.idTrabajo
            }
        })
        if (!existe){
            detalle_trabajo.create(req.body)
            .then(detalle_trabajo=>{
                res.status(200).send(detalle_trabajo);
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
            });
        }else{
            res.status(200).send({message: "El proveedor ya existe."});
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
//Este apartado se refiere a los insumos asociados al trabajo
const listarDetalleTrabajos = async(req,res) =>{
    try{
        await detalle_trabajos.findAll(
        {
            attributes: [['costo','costoTrabajo'],['cantidad_insumos', 'cantidadInsumos']],
            where: {
            trabajoId: req.params.id,
            },
            include:
            {
                model: insumos,
                attributes: 
                [
                    ['codigo', 'codigoInsumo'],['descripcion','nombreInsumo'],['precio_venta','precioInsumo']
                ], //Obtenemos los datos de los insumos asociados
                where:{
                    estado: 1
                },
                required: false
            }
        })
        .then(detalle_trabajo =>{
            if (detalle_trabajo ? res.status(200).send({detalle_trabajo}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
//DashhBorad de trabajos
//Realizo la consulta para mostrar los datos en el Dashboard
const datosDashBoard = async(req,res) =>{
    try{
        const idEstadoTrabajo = req.params.id;
        const fechaActual = new Date();
        const fechaConsulta = new Date();
        fechaConsulta.setDate(fechaActual.getDate() - 7); //últimos 7 días, pero puede ampliarse
        await trabajos.findAll({
            attributes:[ [sequelize.fn('COUNT', '*'), 'totalRegistros']],
            where: {
                estadoTrabajoId: idEstadoTrabajo //Con esto solo usamos 1 solo metodo, para obtener los registros
            }
        })
        .then(datosDashboard =>{
            if (datosDashboard ? res.status(200).send(datosDashboard) : res.status(200).send({totalRegistros: 0}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports = {
    crearTrabajo,
    crearDetalleTrabajo,
    editarTrabajo,
    listarDetalleTrabajos,
    datosDashBoard,
    listarTrabajosMecanico,
    listarTrabajosAdmin,
    buscarTrabajo
}