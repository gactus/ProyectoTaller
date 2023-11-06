const tipo_cuentas = require('../models').tipo_cuentas;
/* Listo solo los Tipos de Cuentas activos */
const listarTipoCuentas = async(req,res)=>{
    try{
        await tipo_cuentas.findAll(
            {
                attributes: [['id', 'idTipoCuenta'],['nombre','tipoCuenta']],
                where: {estado: 1}
            })
            .then(tipo_cuenta=>
                {
                    if (tipo_cuenta ? res.status(200).json(tipo_cuenta) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listo todos los Tipos de Cuenta (incluye Inactivas) */
const listarTipoCuentasGeneral = async(req,res)=>{
    try{
        await tipo_cuentas.findAll(
            {
                attributes: [['id', 'idTipoCuenta'],['nombre','tipoCuenta'],'estado'],
            })
            .then(tipo_cuenta=>
                {
                    if (tipo_cuenta ? res.status(200).json(tipo_cuenta) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Buscamos un banco especifico */
const buscarTipoCuenta = async(req,res) =>{
    try{
        const idTipoCuenta = req.params.id;
        await tipo_cuentas.findOne(
        {
            attributes: 
            [
                ['id','idTipoCuenta'],['nombre','tipoCuenta'],'estado'
            ],
            where: {id: idTipoCuenta}
        })
        .then(tipo_cuenta =>{
            if (tipo_cuenta ? res.status(200).send(tipo_cuenta) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* creamos un nuevo banco */
const crearTipoCuenta = async(req,res)=>{
    try{
        const datosTipoCuenta = {
            nombre: req.body.nombre,
            estado: 1
        }
        const existe = await tipo_cuentas.finOne(
            {
                where:{descripcion: datosTipoCuenta.nombre}
            })
        if (!existe){
            tipo_cuentas.create(datosTipoCuenta)
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
const editarTipoCuenta = async(req, res) =>{
    try{
        const idTipoCuenta = req.params.id;
        const datosTipoCuenta = {
            nombre: req.body.nombre,
            estado: req.body.estado
        }
        await tipo_cuentas.findByPk(idTipoCuenta)
        .then(tipo_cuenta=>{
            tipo_cuenta.update(datosTipoCuenta)
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
const eliminarTipoCuenta = async(req,res) =>{
    try{
        const idTipoCuenta = req.params.id;
        await tipo_cuentas.findByPk(idTipoCuenta)
        .then(tipo_cuenta=>{
            const datosTipoCuenta = { //Cambiamos el estado del Banco
                estado: 0
            }
            tipo_cuenta.update(datosTipoCuenta)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error al buscar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports={
    listarTipoCuentas,
    listarTipoCuentasGeneral,
    buscarTipoCuenta,
    crearTipoCuenta,
    editarTipoCuenta,
    eliminarTipoCuenta
}