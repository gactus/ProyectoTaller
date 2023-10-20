const {modelos,marcas} = require('../models');

const listarModelos = async(req,res) =>{
    try{
        await modelos.findAll(
            {
                attributes: 
                [
                    ['id','idModelo'],['descripcion','nombreModelo']
                ],
                where: {
                estado: 1,
                },
                include:
                [{
                    model: marcas,
                    attributes: [['descripcion','nombreMarca']],
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
const buscarModelo = async(req,res) =>{
    try{
        const idModelo = req.params.id;
        await modelos.findOne(
            {
                attributes: 
                [
                    ['id','idModelo'],['descripcion','nombreModelo']
                ],
                where: 
                {
                    estado: 1,
                    id: idModelo,
                },
                include:
                [{
                    model: marcas,
                    attributes: [['descripcion','nombreMarca']],
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