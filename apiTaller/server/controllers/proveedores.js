const {proveedores,proveedoresVw} = require('../models');

/* Listamos los proveedores activos */
const listarProveedores = async(req, res) =>{
    try{
        await proveedoresVw.findAll(
        {
            attributes: 
            [
                ['id','idProveedor'],'rutProveedor','razonSocial','direccionProveedor','telefonoProveedor','emailProveedor',
                'idBanco','nombreBanco','idTipoCuenta','tipoCuentaBancaria','numeroCuenta','idInsumo','nombreInsumo'
            ]
        })
        .then(proveedor=>
            {
                if (proveedor ? res.status(200).send({proveedor}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." });
    }
}
/*  Buscamos un proveedor especifico y su respectivo insumo*/
const buscarProveedor = async(req,res) =>{
    try{
        const idProveedor = req.params.id;
        await proveedoresVw.findOne(
        {
            attributes: 
            [
                ['id','idProveedor'],'rutProveedor','razonSocial','direccionProveedor','telefonoProveedor','emailProveedor',
                'idBanco','nombreBanco','idTipoCuenta','tipoCuentaBancaria','numeroCuenta','idInsumo','nombreInsumo'
            ],
            where: {id: idProveedor}
        })
        .then(proveedor =>{
            if (proveedor ? res.status(200).send({proveedor}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Creamos un proveedor */
const crearProveedor = async(req,res) =>{
    try{
        const datosProveedor = {
            rut: req.body.rut,
            razon_social: req.body.razonSocial,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            numero_cuenta: req.body.numeroCuenta,
            bancoId: req.body.idBanco,
            tipoCuentaId: req.body.idTipoCuenta,
            estado: 1
        }
        await proveedores.findOne(
            {
                where: {rut: datosProveedor.rut}
            })
        .then(existe=>{
            if (!existe){
                proveedores.create(datosProveedor)
                .then(()=>{
                    res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
                });
            }else{
                res.status(200).send({message:"Atención: el registro ya existe.",registroCreado:false})
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Editamos un proveedor */
const editarProveedor = async(req, res) =>{
    try{
        const idProveedor = req.params.id;
        const datosProveedor = {
            rut: req.body.rut,
            razon_social: req.body.razonSocial,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            numero_cuenta: req.body.numeroCuenta,
            bancoId: req.body.idBanco,
            tipoCuentaId: req.body.idTipoCuenta
        }
        await proveedores.findByPk(idProveedor)
        .then(proveedor=>{
            proveedor.update(datosProveedor)
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({registroActualizado: false});
            }); 
        })
        .catch(err=>{
            res.status(500).send({registroActualizado: false});;
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Damos de baja un proveedor (eliminación lógica) */
const eliminarProveedor = async(req,res) =>{
    try{
        const idProveedor = req.params.id;
        await proveedores.findByPk(idProveedor)
        .then(proveedor=>{
            const datosProveedor = { //Cambiamos el estado del proveedor
                estado: 0
            }
            proveedor.update(datosProveedor)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports = {
    listarProveedores,
    buscarProveedor,
    crearProveedor,
    editarProveedor,
    eliminarProveedor
}