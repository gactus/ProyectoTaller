const {insumos, insumosVw} = require('../models');

/*  Listamos todos los insumos activos */
const listarInsumos = async(req,res) =>{
    try{
        await insumosVw.findAll(
        {
            attributes: 
                [
                    ['id','idInsumo'],'codigoInsumo','nombreInsumo','cantidadInsumos','precioCompra','precioVenta','tipoInsumo','estadoInsumo'
                ]
        })
        .then(insumoVw=>
            {
                if (insumoVw ? res.status(200).send({insumoVw}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/*  Buscamos un insumo especifico */
const buscarInsumo = async(req,res) =>{
    try{
        const idInsumo = req.params.id;
        await insumosVw.findOne(
        {
            attributes: 
                [
                    ['id','idInsumo'],'codigoInsumo','nombreInsumo','cantidadInsumos','precioCompra','precioVenta','tipoInsumo','estadoInsumo'
                ],
            where: {
                estado: 1,
                id: idInsumo
            }
        })
        .then(insumoVw=>
            {
                if (insumoVw ? res.status(200).send({insumoVw}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/*  Creamos un nuevo insumo */
const crearInsumo = async(req,res) =>{
    try{
        const datosInsumo = {
            codigo: req.body.codigoInsumo,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            precio_compra: req.body.precioCompra,
            precio_venta: req.body.precioVenta,
            tipoInsumoId: req.body.idTipoInsumo,
            estado: 1
        }
        await insumos.findOne({
            where: {
                codigo: datosInsumo.codigo
            }
        })
        .then(existe=>{
            if (!existe){
                insumos.create(datosInsumo)
                .then(()=>{
                    res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
                })
            }else{
                res.status(200).send({message:"Atención: el registro ya existe.",registroCreado:false})
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."})
    }
}
/*  Editamos un insumo */
const editarInsumo = async(req,res) =>{
    try{
        var idInsumo = req.params.id;
        const datosInsumo = { //Recojo los datos enviados y asigno a un objeto
            codigo: req.body.codigoInsumo,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            precio_compra: req.body.precioCompra,
            precio_venta: req.body.precioVenta,
            tipoInsumoId: req.body.idTipoInsumo
        }
        await insumos.findByPk(idInsumo) //Verificamos si el registro existe
        .then(insumo=>{
            insumo.update(datosInsumo) //Si existe, actualizo el registro
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({registroActualizado: false});
            })
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
module.exports ={
    listarInsumos,
    buscarInsumo,
    crearInsumo,
    editarInsumo
}