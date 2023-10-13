const {proveedores,insumos} = require('../models');

function listarProveedores(req, res){
    try{
        proveedores.findAll(
        {
            attributes: ['id','rut','razon_social','direccion','telefono','email','banco','numero_cuenta','tipo_cuenta','insumoId'],
            where: {
                estado: 1,
            },
            include:{
                model: insumos,
                attributes: ['descripcion'],
                where:{
                    estado: 1
                }
            }
        })
        .then(proveedor=>
            {
                if (proveedor ? res.status(200).send({proveedor}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
function buscarProveedor(req,res){
    try{
        proveedores.findOne(
        {
            attributes: ['id','rut','razon_social','direccion','telefono','email','banco','numero_cuenta','tipo_cuenta','insumoId'],
            where: {
                estado: 1,
                id: req.params.id,
            },
            include:{
                model: insumos,
                attributes: ['descripcion'],
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

module.exports = {
    listarProveedores,
    buscarProveedor,
    crearProveedor
}