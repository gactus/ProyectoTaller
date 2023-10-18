const {proveedores,insumos, bancos, tipo_cuentas} = require('../models');

/* Listamos los proveedores activos */
const listarProveedores = async(req, res) =>{
    try{
        await proveedores.findAll(
        {
            attributes: 
            [
                ['id','idProveedor'],['rut','rutProveedor'],['razon_social','razonSocial'],
                ['direccion','direccionProveedor'],['telefono','telefonoProveedor'],
                ['email','emailProveedor'],['bancoId','idBanco'],['numero_cuenta','nroCuenta'],
                ['tipoCuentaId','idtipoCuenta']
            ],
            where: {
                estado: 1,
            },
            include:
            [
                {
                    model: insumos,
                    attributes: 
                    [
                        ['id','idinsumo'],['descripcion','detalleInsumo']
                    ],
                    where:{
                        estado: 1
                    }
                },
                {
                    model: bancos,
                    attributes: 
                    [
                        ['nombre','nombreBanco']
                    ],
                    where:{
                        estado: 1
                    }
                },
                {
                    model: tipo_cuentas,
                    attributes: 
                    [
                        ['nombre','tipoCuenta']
                    ],
                    where:{
                        estado: 1
                    }
                },
            ]
        })
        .then(proveedor=>
            {
                if (proveedor ? res.status(200).send({proveedor}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos." + err});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/*  Buscamos un proveedor especifico y su respectivo insumo*/
const buscarProveedor = async(req,res) =>{
    try{
        await proveedores.findOne(
        {
            attributes: 
            [
                ['id','idProveedor'],['rut','rutProveedor'],['razon_social','razonSocial'],
                ['direccion','direccionProveedor'],['telefono','telefonoProveedor'],
                ['email','emailProveedor'],['bancoId','idBanco'],['numero_cuenta','nroCuenta'],
                ['tipoCuentaId','idtipoCuenta']
            ],
            where: {
                estado: 1,
                id: req.params.id,
            },
            include:{
                model: insumos,
                attributes: 
                [
                    ['id','idinsumo'],['descripcion','detalleInsumo']
                ],
                where:{
                    estado: 1
                }
            }
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
            insumoId: req.body.IdInsumo,
            bancoId: req.body.idBanco,
            tipoCuentaId: req.body.idTipoCuenta,
            estado: 1
        }
        await proveedores.findOne(
            {
                where: {
                    rut: datosProveedor.rut,
                }
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
            insumoId: req.body.IdInsumo,
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

module.exports = {
    listarProveedores,
    buscarProveedor,
    crearProveedor,
    editarProveedor
}