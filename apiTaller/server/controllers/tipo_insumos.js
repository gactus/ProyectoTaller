const tipo_insumos = require('../models').tipo_insumos;

const listarTiposInsumos = async(req,res) =>{
    try{
        await tipo_insumos.findAll(
        {
            attributes: ['id','descripcion'],
            where: {estado: 1}
        })
        .then(tipo_insumo=>
            {
                if (tipo_insumo ? res.status(200).send({tipo_insumo}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}

const buscarTipoInsumo = async(req,res) =>{
    try{
        const idTipoInsumo = req.params.id;
        await tipo_insumos.findOne(
        {
            attributes: ['id','descripcion'],
            where: {id: idTipoInsumo}
        })
        .then(tipo_insumo =>{
            if (tipo_insumo ? res.status(200).send({tipo_insumo}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
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