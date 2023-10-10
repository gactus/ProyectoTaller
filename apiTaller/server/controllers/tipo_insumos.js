const tipo_insumos = require('../models').tipo_insumos;

function listarTiposInsumos(req,res){
    try{
        tipo_insumos.findAll(
        {
            where: {
                estado: 1,
            }
        })
        .then(tipo_insumo=>
            {
                res.status(200).send({tipo_insumo});
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}

function buscarTipoInsumo(req,res){
    try{
        tipo_insumos.findOne(
        {
            where: {
            estado: 1,
            id: req.params.id,
            }
        })
        .then(tipo_insumo =>{
            res.status(200).send({tipo_insumo});
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}

module.exports = {
    listarTiposInsumos,
    buscarTipoInsumo
}