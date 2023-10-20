const bancos = require('../models').bancos;

const listarBancos = async(req,res)=>{
    try{
        await bancos.findAll(
            {
                attributes: [['id', 'idBanco'],['nombre','nombreBanco']],
                where: {estado: 1}
            })
            .then(banco=>
                {
                    if (banco ? res.status(200).json({banco}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}

module.exports={
    listarBancos
}