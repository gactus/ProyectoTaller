const insumos = require('../models').insumos;

function listarInsumos(req,res){
    try{
        insumos.findAll(
        {
            where: {
                estado: 1,
            }
        })
        .then(insumo=>
            {
                res.status(200).send({insumo});
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
function buscarInsumo(req,res){
    try{
        insumos.findOne(
        {
            where: {
                estado: 1,
                id: req.params.id
            }
        })
        .then(insumo=>
            {
                res.status(200).send({insumo});
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
module.exports ={
    listarInsumos,
    buscarInsumo
}