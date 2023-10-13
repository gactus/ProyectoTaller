const {trabajos, detalle_trabajos,insumos, estado_trabajos} = require('../models');

/* Sección Trabajos */
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
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

/*  Sección Detalle del Trabajo */
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

function listarDetalleTrabajos(req,res){
    try{
        detalle_trabajos.findOne(
        {
            attributes: ['costo','cantidad_insumos'],
            where: {
            trabajoId: req.params.idTrabajo,
            },
            include:
            {
                model: insumos,
                where:{
                    estado: 1
                },
                required: false
            },
            include:
            {
                attributes: ['detalle','fecha_trabajo','fecha_prox_mantencion','requere_notificacion','costo_mano_obra'],
                model: trabajos,
                where:{
                    estado: 1
                },
                include:
                {
                    attributes: ['descripcion'],
                    model: estado_trabajos,
                    where:{
                        estado: 1
                    }
                }
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

module.exports = {
    crearTrabajo,
    crearDetalleTrabajo,
    editarTrabajo,
    listarDetalleTrabajos
}