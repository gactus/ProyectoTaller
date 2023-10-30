const {ventas, ventas_insumos} = require('../models');
/* Sección Ventas */
/* Registramos una venta */
const crearVenta = async(req,res) =>{
    try{
        const datosVenta = {
            personaId: req.body.idPersona,
            valor_venta: req.body.valorVenta,
            fecha: req.body.fechaVenta,
            estado: 1
        }
        await ventas.create(datosVenta)
        .then(()=>{
            res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
        })
    }catch(err){
        res.status(500).send({message:"Atención: ha ocurrido un error interno",registroCreado:false})
    }
}
/* Editamos la venta */
const editarVenta = async(req,res) =>{
    try{
        const idVenta = req.params.id;
        const datosVenta = {
            personaId: req.body.idPersona,
            valor_venta: req.body.valorVenta,
            fecha: req.body.fechaVenta
        }
        await ventas.findByPk(idVenta)
        .then(venta=>{
            venta.update(datosVenta)
            .then(()=>{
                res.status(200).send({message:"Registro actualizado con éxito", registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al editar el registro",registroCreado:false})
            })
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al consultar el registro",registroCreado:false})
        })
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Atención: ha ocurrido un error interno",registroCreado:false})
    }
}
/* Listo solo mis ventas */
const listarVentas = async(req,res) =>{
    const idPersona = req.params.id;
    try{
        await ventas.findAll({
            attributes: [['id', 'idVenta'],['valor_venta','valorVenta'],['fecha','fechaVenta'],['estado','estadoVenta']],
            where: {personaId: idPersona}
        })
        .then(venta=>{
            if (venta ? res.status(200).json({venta}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listo todas las ventas (vista para el administrador) */
const listarVentasAdmin = async(req,res) =>{
    try{
        await ventas.findAll({
            attributes: [['id', 'idVenta'],['personaId','idPersona'],['valor_venta','valorVenta'],['fecha','fechaVenta'],['estado','estadoVenta']],
        })
        .then(venta=>{
            if (venta ? res.status(200).json({venta}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Buscamos una venta especifica */
const buscarVenta = async(req,res) =>{
    try{
        const idVenta = req.params.id;
        await ventas.findOne({
            attributes: [['id', 'idVenta'],['personaId','idPersona'],['valor_venta','valorVenta'],['fecha','fechaVenta'],['estado','estadoVenta']],
            where: {id: idVenta}
        })
        .then(venta=>{
            if (venta ? res.status(200).json({venta}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Damos de baja una venta (eliminación lógica) */
const eliminarVenta = async(req,res) =>{
    try{
        const idVenta = req.params.id;
        await ventas.findByPk(idVenta)
        .then(venta=>{
            const datosVenta = { //Cambiamos el estado de la venta
                estado: 0
            }
            venta.update(datosVenta)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al buscar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." });
    }
}
/* Sección Detalle Ventas */
const crearVentaInsumo = async(req,res) =>{
    try{
        const datosVentaInsumo = {
            ventaId: req.body.idVenta,
            cantidad_insumos: req.body.cantidad_insumos,
            proveedorInsumoId: req.body.proveedorInsumoId,
            estado: 1
        }
        await ventas_insumos.create(datosVentaInsumo)
        .then(()=>{
            res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listado los detalles de las ventas de insumos (solo las activas) */
const listarVentasInsumos = async(req,res) =>{
    try{
        try{
            await ventas_insumos.findAll(
            {
                attributes: 
                [
                    ['id','idVenta'],['cantidad_insumos','cantidadInsumos'],['proveedorInsumoId','idProveedorInsumo']
                ],
                where: {estado: 1}
            })
            .then(ventas_insumo=>
                {
                    if (ventas_insumo ? res.status(200).send({ventas_insumo}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
            })
        }catch(err){
            res.status(500).send({message:"Atención: Ha ocurrido un error." });
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Damos de baja la asociación Venta/Insumo (eliminación lógica) */
const eliminarVentaInsumo = async(req,res) =>{
    try{
        const idVentaInsumo = req.params.id;
        await ventas_insumos.findByPk(idVentaInsumo)
        .then(ventas_insumo=>{
            const datosVentasInsumo = { //Cambiamos el estado de la venta
                estado: 0
            }
            ventas_insumo.update(datosVentasInsumo)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al buscar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." });
    }
}
module.exports = {
    crearVenta,
    editarVenta,
    listarVentas,
    listarVentasAdmin,
    buscarVenta,
    eliminarVenta,
    crearVentaInsumo,
    listarVentasInsumos,
    eliminarVentaInsumo
}