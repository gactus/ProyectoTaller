const {proveedor_insumos, proveedorInsumosVw} = require('../models');
/* Creamos una nueva asociación Provedor/Insumo */
const crearProveedorInsumo = async(req,res) =>{
    try{
        const datosProveedorInsumo = {
            nro_documento: req.body.nroDocumento,
            proveedoreId: req.body.idProveedor,
            insumoId: req.body.idInsumo,
            cantidad: req.body.cantidadInsumos,
            precio_compra: req.body.precioCompra,
            precio_venta: req.body.precioVenta,
            fecha: fechaCompra,
            estado: 1
        }
        const existe = await proveedor_insumos.findOne({
            where:{
                nro_documento: datosProveedorInsumo.nro_documento, proveedoreId: datosProveedorInsumo.proveedoreId, insumoId: datosProveedorInsumo.insumoId //llave compuesta
            }
        })
        if (!existe){
            await proveedor_insumos.create(datosProveedorInsumo)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro creado con éxito.", registroCreado:true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Hubo un problema al crear el registro.", registroCreado:false});
            })
        }else{
            res.status(200).send({message:"Atención: El registro ya existe en la base.", registroCreado:false});
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ocurrió un error interno."});
    }
}
/* Editamos la asociación Provvedor/Insumo */
const editarProveedorInsumo = async(req,res) =>{
    try{
        const idProveedorInsumo = req.params.id;
        const datosProveedorInsumo = {
            nro_documento: req.body.nroDocumento,
            proveedoreId: req.body.idProveedor,
            insumoId: req.body.idInsumo,
            cantidad: req.body.cantidadInsumos,
            precio_compra: req.body.precioCompra,
            precio_venta: req.body.precioVenta,
            fecha: fechaCompra,
            estado: req.params.estado
        }
        await proveedor_insumos.findByPk(idProveedorInsumo)
        .then(proveedor_insumo =>{
            proveedor_insumo.update(datosProveedorInsumo)
            .then(()=>{
                res.status(200).send({message: "Atención Registro Actualizado con éxito.", registroActualizado: true});
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: el registro no pudo ser actualizado.", registroActualizado: false});
            })
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: ocurrió un problema al consultar el registro.", registroActualizado: false});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ocurrió un error interno."});
    }
}
/* Listados los proveedores versus sus insumos */
const listarProveedorInsumos = async(req,res) =>{
    try{
        await proveedorInsumosVw.findAll(
            {
                attributes: 
                [
                    ['id','idProveedorInsumos'],'nroDocumento','idProveedor','nombreProveedor','idInsumo','codigoInsumo',
                    'nombreInsumo','cantidadInsumos','precioCompra','precioVenta','fechaCompra','estado'
                ]
            })
            .then(proveedorInsumoVw=>
                {
                    if (proveedorInsumoVw ? res.status(200).send(proveedorInsumoVw) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
    }catch(err){
        res.status(500).send({message:"Atención: Ocurrió un error interno."});
    }
}
/* Buscamos un registro con la asociación Proveedor/Insumo */
const buscarProveedorInsumo = async(req,res) => {
    try{
        const idProveedorInsumo = req.params.id;
        await proveedor_insumos.findOne({
            attributes: 
            [
                ['id','idProveedorInsumos'],['nro_documento','nroDocumento'],['proveedoreId','idProveedor'],['insumoId','idInsumo'],['cantidad','cantidadInsumos'],
                ['precio_compra','PrecioCompra'],['precio_venta','precioVenta'],['fecha','fechaCompra'],'estado'
            ] ,
            where: {id: idProveedorInsumo}
        })
        .then(proveedor_insumo=>{
            if (proveedor_insumo ? res.status(200).send(proveedor_insumo) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." });
    }
}
/* Buscamos un registro con la asociación Proveedor/Insumo */
const buscarProveedorInsumoByIdProv = async(req,res) => {
    try{
        const idProveedor = req.params.id;
        await proveedor_insumos.findOne({
            attributes: 
            [
                ['id','idProveedorInsumos'],['nro_documento','nroDocumento'],['proveedoreId','idProveedor'],['insumoId','idInsumo'],['cantidad','cantidadInsumos'],
                ['precio_compra','PrecioCompra'],['precio_venta','precioVenta'],['fecha','fechaCompra'],'estado'
            ] ,
            where: {proveedoreId: idProveedor}
        })
        .then(proveedor_insumo=>{
            if (proveedor_insumo ? res.status(200).send(proveedor_insumo) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." });
    }
}
/* Damos de baja una asociación Provvedor/Insumo */
const eliminarProveedorInsumo = async(req,res) =>{
    try{
        const idProveedorInsumo = req.params.id;
        await proveedor_insumos.findByPk(idProveedorInsumo)
        .then(proveedor_insumo=>{
            const datosProveedorInsumo = { //Cambiamos el estado de la asociación
                estado: 0
            }
            proveedor_insumo.update(datosProveedorInsumo)
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
        console.log(err);
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});     
    }
}
module.exports = {
    crearProveedorInsumo,
    editarProveedorInsumo,
    listarProveedorInsumos,
    buscarProveedorInsumo,
    eliminarProveedorInsumo,
    buscarProveedorInsumoByIdProv
}