const modelos = require('../models').modelos;

function listarModelos(req,res){
    try{
        modelos.findAll(
            {
                where: {
                estado: 1,
                }
            })
            .then(modelo =>{
                res.status(200).send({modelo});
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
                where: {
                estado: 1,
                id: req.params.id,
                }
            })
            .then(modelo =>{
                res.status(200).send({modelo});
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