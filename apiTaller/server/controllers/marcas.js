const marcas = require('../models').marcas;

function listarMarcas(req,res){
    try{
        marcas.findAll(
            {
                attributes: ['id','descripcion'],
                where: {
                  estado: 1,
                }
            })
            .then(marca =>{
                if (marca ? res.status(200).send({marca}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
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
                attributes: ['id','descripcion'],
                where: {
                estado: 1,
                id:req.params.id
                }
            })
            .then(marca =>{
                if (marca ? res.status(200).send({marca}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
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