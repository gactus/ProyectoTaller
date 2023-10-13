const {modelos,marcas} = require('../models');

function listarModelos(req,res){
    try{
        modelos.findAll(
            {
                attributes: ['id','descripcion'],
                where: {
                estado: 1,
                },
                include:
                [{
                    model: marcas,
                    attributes: ['descripcion'],
                    where: {
                        estado: 1,
                      }
                }]
            })
            .then(modelo =>{
                if (modelo ? res.status(200).send({modelo}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
function buscarModelo(req,res){
    try{
        modelos.findOne(
            {
                attributes: ['id','descripcion'],
                where: {
                estado: 1,
                id: req.params.id,
                },
                include:
                [{
                    model: marcas,
                    attributes: ['descripcion'],
                    where: {
                        estado: 1,
                      }
                }]
            })
            .then(modelo =>{
                if (modelo ? res.status(200).send({modelo}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
module.exports = {
    listarModelos,
    buscarModelo
}