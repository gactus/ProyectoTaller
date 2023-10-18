const {proveedores,insumos, bancos, tipo_cuentas} = require('../models');

/* Listamos los proveedores activos */
function listarProveedores(req, res){
    try{
        proveedores.findAll(
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
function buscarProveedor(req,res){
    try{
        proveedores.findOne(
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
function crearProveedor(req,res){
    try{
        const existe = proveedores.findOne(
            {
                where: {
                    rut: req.body.rut,
                }
            })
        .then(existe=>{
            if (!existe){
                proveedores.create(req.body)
                .then(proveedor=>{
                    res.status(200).send({proveedor});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
                });
            }else{
                res.status(200).send({message: "El proveedor ya existe."});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Editamos un proveedor */
function editarProveedor(req, res){
    try{
        var id = req.params.id;
        var body = req.body;
        proveedores.findByPk(id)
        .then(proveedor=>{
            proveedor.update(body)
            .then(()=>{
                res.status(200).send({proveedor});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: el registro no pudo ser actualizado." + err});
            }); 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: el registro no pudo ser actualizado." + err});
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports = {
    listarProveedores,
    buscarProveedor,
    crearProveedor,
    editarProveedor
}