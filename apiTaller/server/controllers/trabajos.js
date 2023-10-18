const sequelize = require('sequelize');
const Op = sequelize.Op;
const {trabajos, detalle_trabajos,insumos, estado_trabajos, perfiles, personas} = require('../models');

/* Sección Trabajos */
/* Creamos el metodo para registrar un trabajo */
function crearTrabajo(req,res){
    try{
        trabajos.create(req.body)
        .then(trabajo=>{
            res.status(200).send({trabajo});
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Editamos los datos asociados a un trabajo */
function editarTrabajo(req, res){
    try{
        var id = req.params.id;
        var body = req.body;
        trabajos.findByPk(id)
        .then(trabajo=>{
            trabajo.update(body)
            .then(()=>{
                res.status(200).send({trabajo});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: el registro no pudo ser actualizado." + err});
            }); 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: el registro no pudo ser actualizado." + err});
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
//Listados
//Listamos los trabajos asociados a un mecánico (utilizado tanto por un mecánico, como el admin)
function ListarTrabajosMecanico(req, res){
    try{
        const idPerfil = req.params.id;
        trabajos.findAll({
            attributes: 
                [
                    ['detalle', 'detalleTrabajo'],['fecha_trabajo','fechaTrabajo'],['fecha_prox_mantencion','proximaMantencion'],
                    ['requere_notificacion', 'requiereNotificacion'],['costo_mano_obra','manoObra']
                ],
            where:{
                estado: 1
            },
            include:
            [
                {
                    model: estado_trabajos,
                    attributes: [['descripcion','estadoTrabajo']], //Obtenemos el estado del trabajo
                    where:{
                        estado: 1
                    },
                    required: true
                },
                {
                    model: perfiles,
                    attributes: [['id','idPerfil']], //Obtenemos el perfil del mecanico
                    where:{
                        estado: 1,
                        tipoPerfileId: idPerfil
                    },
                    include:{
                        model: personas,
                        attributes: [['nombres','nombreMcanico'],['apellidos','apellidoMecanico']], //Obtenemos los datos del mecanico quién realizó el trabajo
                        where:{
                            estado: 1
                        },
                        required: true
                    }                  
                }
            ],
        })
        .then(listadoTrabajos =>{
            if (listadoTrabajos ? res.status(200).send({listadoTrabajos}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
//Listamos los trabajos asociados a todos los perfiles (mecanico/admin) (utilizado solo por el admin)
function ListarTrabajosAdmin(req, res){
    try{
        const idPerfil = req.params.id;
        trabajos.findAll({
            attributes: 
                [
                    ['detalle', 'detalleTrabajo'],['fecha_trabajo','fechaTrabajo'],['fecha_prox_mantencion','proximaMantencion'],
                    ['requere_notificacion', 'requiereNotificacion'],['costo_mano_obra','manoObra']
                ],
            where:{
                estado: 1
            },
            include:
            [
                {
                    model: estado_trabajos,
                    attributes: [['descripcion','estadoTrabajo']], //Obtenemos el estado del trabajo
                    where:{
                        estado: 1
                    },
                    required: true
                },
                {
                    model: perfiles,
                    attributes: [['id','idPerfil']], //Obtenemos el perfil del mecanico
                    where:{
                        estado: 1
                    },
                    include:{
                        model: personas,
                        attributes: [['nombres','nombreMcanico'],['apellidos','apellidoMecanico']], //Obtenemos los datos del mecanico quién realizó el trabajo
                        where:{
                            estado: 1
                        },
                        required: true
                    }                  
                }
            ],
        })
        .then(listadoTrabajos =>{
            if (listadoTrabajos ? res.status(200).send({listadoTrabajos}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/*  Sección Detalle del Trabajo */
/* Creamos el detalle de un trabajo */
function crearDetalleTrabajo(req,res){
    try{
        const existe = detalle_trabajos.findOne(
            {
                where: {
                    insumoId: req.body.idInsumo,
                    trabajoId: req.body.idTrabajo
                }
            })
        .then(existe=>{
            if (!existe){
                detalle_trabajo.create(req.body)
                .then(detalle_trabajo=>{
                    res.status(200).send({detalle_trabajo});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
                });
            }else{
                res.status(200).send({message: "El proveedor ya existe."});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
//Este apartado se refiere a los insumos asociados al trabajo
function listarDetalleTrabajos(req,res){
    try{
        detalle_trabajos.findAll(
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
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
//DashhBorad de trabajos
//Realizo la consulta para mostrar los datos en el Dashboard
function datosDashBoard(req,res){
    try{
        const idEstadoTrabajo = req.params.id;
        const fechaActual = new Date();
        const fechaConsulta = new Date();
        fechaConsulta.setDate(fechaActual.getDate() - 7); //últimos 7 días, pero puede ampliarse
        trabajos.findAll({
            attributes:[ [sequelize.fn('COUNT', '*'), 'totalRegistros']],
            where: {
                fecha_trabajo: {
                  [Op.between]: [fechaConsulta, fechaActual]
                },
                estadoTrabajoId: idEstadoTrabajo //Con esto solo usamos 1 solo metodo, para obtener los registros
            }
        })
        .then(datosDashboard =>{
            if (datosDashboard ? res.status(200).send({datosDashboard}) : res.status(200).send({totalRegistros: 0}));
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
    ListarTrabajosMecanico,
    ListarTrabajosAdmin
}