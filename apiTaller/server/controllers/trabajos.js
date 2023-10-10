const trabajos = require('../models').trabajos;
const detalle_trabajos = require('../models').detalle_trabajos;

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

function crearDetalleTrabajo(req,res){
    try{
        const existe = detalle_trabajos.findOne(
            {
                where: {
                    insumo_id: req.body.idInsumo,
                    trabajo_id: req.body.idTrabajo
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

module.exports = {
    crearTrabajo,
    crearDetalleTrabajo
}