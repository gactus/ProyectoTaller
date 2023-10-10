const proveedores = require('../models').proveedores;

function listarProveedores(req, res){
    try{
        proveedores.findAll(
        {
            where: {
                estado: 1,
            }
        })
        .then(proveedor=>
            {
                res.status(200).send({proveedor});
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
            where: {
            estado: 1,
            id: req.params.id,
            }
        })
        .then(proveedor =>{
            res.status(200).send({proveedor});
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