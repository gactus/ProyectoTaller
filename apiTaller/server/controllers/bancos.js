const bancos = require('../models').bancos;
/* Listo solo los bancos activos */
const listarBancos = async(req,res)=>{
    try{
        await bancos.findAll(
            {
                attributes: [['id', 'idBanco'],['nombre','nombreBanco'],'estado'],
                where: {estado: 1}
            })
            .then(banco=>
                {
                    if (banco ? res.status(200).json(banco) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listo todos los bancos */
const listarBancosGeneral = async(req,res)=>{
    try{
        await bancos.findAll(
            {
                attributes: [['id', 'idBanco'],['nombre','nombreBanco'],'estado'],
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
/* Buscamos un banco especifico */
const buscarBanco = async(req,res) =>{
    try{
        const idBanco = req.params.id;
        await bancos.findOne(
        {
            attributes: 
            [
                ['id','idBanco'],['nombre','NombreBanco'],'estado'
            ],
            where: {id: idBanco}
        })
        .then(banco =>{
            if (banco ? res.status(200).send({banco}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* creamos un nuevo banco */
const crearBanco = async(req,res)=>{
    try{
        const datosBanco = {
            nombre: req.body.nombre,
            estado: 1
        }
        const existe = await bancos.finOne(
            {
                where:{descripcion: datosBanco.nombre}
            })
        if (!existe){
            bancos.create(datosBanco)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
            })
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Editamos un banco */
const editarBanco = async(req, res) =>{
    try{
        const idBanco = req.params.id;
        const datosBanco = {
            nombre: req.body.nombre,
            estado: req.body.estado
        }
        await bancos.findByPk(idBanco)
        .then(banco=>{
            banco.update(datosBanco)
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al editar el registro",registroCreado:false})
            }); 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al buscar el registro"});
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Damos de baja un banco */
const eliminarBanco = async(req,res) =>{
    try{
        const idBanco = req.params.id;
        await bancos.findByPk(idBanco)
        .then(banco=>{
            const datosBanco = { //Cambiamos el estado del Banco
                estado: 0
            }
            banco.update(datosBanco)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error al buscar los datos." + err});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports={
    listarBancos,
    listarBancosGeneral,
    buscarBanco,
    crearBanco,
    editarBanco,
    eliminarBanco
}