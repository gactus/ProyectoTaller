const {insumos, tipo_insumos} = require('../models');

function listarInsumos(req,res){
    try{
        insumos.findAll(
        {
            attributes: 
                [
                    ['id','idInsumo'],['descripcion', 'nombreInsumo'],['cantidad', 'cantidadInsumos'],
                    ['precio_compra','precioCompra'],['precio_venta','precioVenta'],['tipoInsumoId','idTipoInsumo'],
                    ['estado', 'estadoInsumo']
                ],
            where: {
                estado: 1,
            },
            include:{
                model: tipo_insumos,
                attributes: 
                    [
                        ['descripcion','tipoInsumo']
                    ],
                where: {
                    estado: 1
                }
            }
        })
        .then(insumo=>
            {
                if (insumo ? res.status(200).send({insumo}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
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
            attributes: 
                [
                    ['id','idInsumo'],['descripcion', 'nombreInsumo'],['cantidad', 'cantidadInsumos'],
                    ['precio_compra','precioCompra'],['precio_venta','precioVenta'],['tipoInsumoId','idTipoInsumo'],
                    ['estado', 'estadoInsumo']
                ],
            where: {
                estado: 1,
                id: req.params.id
            },
            include:{
                model: tipo_insumos,
                attributes: ['descripcion'],
                where: {
                    estado: 1
                }
            }
        })
        .then(insumo=>
            {
                if (insumo ? res.status(200).send({insumo}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
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