const estado_trabajos = require('../models').estado_trabajos;

function listarEstadosTrabajos(req,res){
    try{
        estado_trabajos.findAll(
        {
            attributes: ['descripcion'],
            where: {
                estado: 1,
            }
        })
        .then(estado_trabajo=>
            {
                if (estado_trabajo ? res.status(200).send({estado_trabajo}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}

function crearEstadoTrabajo(req,res){
    try{
        const existe = estado_trabajos.findOne(
            {
                where: {
                    descripcion: req.body.descripcion,
                }
            })
        .then(existe=>{
            if (!existe){
                estados_trabajos.create(req.body)
                .then(estado_trabajo=>{
                    res.status(200).send({estado_trabajo});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
                });
            }else{
                res.status(200).send({message: "El estado ya existe."});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}

module.exports = {
    listarEstadosTrabajos,
    crearEstadoTrabajo
}