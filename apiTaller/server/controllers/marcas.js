const marcas = require('../models').marcas;

function listarMarcas(req,res){
    try{
        marcas.findAll(
            {
                where: {
                  estado: 1,
                }
            })
            .then(marca =>{
                res.status(200).send({marca});
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }

}
function buscarMarca(req,res){
    try{
        marcas.findOne(
            {
                where: {
                estado: 1,
                id:req.params.id
                }
            })
            .then(marca =>{
                res.status(200).send({marca});
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
module.exports = {
    listarMarcas,
    buscarMarca,
}