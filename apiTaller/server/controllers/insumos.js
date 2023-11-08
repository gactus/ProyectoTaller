const {insumos, insumosVw} = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

/*  Listamos todos los insumos activos */
const listarInsumos = async(req,res) =>{
    try{
        await insumosVw.findAll(
        {
            attributes: 
                [
                    'id','codigoInsumo','nombreInsumo','cantidadInsumos','precioCompra','precioVenta','tipoInsumo','estadoInsumo'
                ],
            where:{estadoInsumo: 1}
        })
        .then(insumoVw=>
            {
                if (insumoVw ? res.status(200).send(insumoVw) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/*  Listamos todos los insumos (Usado en matnedor de Insumos) */
const listarInsumosGeneral = async(req,res) =>{
    try{
        await insumosVw.findAll(
        {
            attributes: 
                [
                    'id','codigoInsumo','nombreInsumo','cantidadInsumos','precioCompra','precioVenta','tipoInsumo','estadoInsumo'
                ]
        })
        .then(insumoVw=>
            {
                if (insumoVw ? res.status(200).send(insumoVw) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
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
                'id','codigoInsumo','nombreInsumo','cantidadInsumos','precioCompra','precioVenta','tipoInsumo','estadoInsumo'
            ],
            where: 
            {
                estado: 1,
                id: idInsumo
            }
        })
        .then(insumoVw=>
            {
                if (insumoVw ? res.status(200).send(insumoVw) : res.status(200).send({message:"Atención: no existen registros asociados."}));
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
/* Damos de baja un insumo (eliminación lógica) */
const eliminarInsumo = async(req,res) =>{
    try{
        const idInsumo = req.params.id;
        await insumos.findByPk(idInsumo)
        .then(insumo=>{
            const datosInsumo = { //Cambiamos el estado del Insumo
                estado: 0
            }
            insumo.update(datosInsumo)
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
/* Realizamos un conteo de insumos con stock menor a 10 */
const insumosBajoStock = async(req,res) =>{
    try{
        await insumosVw.findAll({
            attributes:[ [sequelize.fn('COUNT', '*'), 'totalRegistros']],
            where: {
               estadoInsumo: 1, //solo insumos activos
               cantidadInsumos: { [Op.lte] : 9 }
            }
        })
        .then(insumoVw =>{
            if (insumoVw ? res.status(200).send(insumoVw) : res.status(200).send({totalRegistross: 0}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." });
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
module.exports ={
    listarInsumos,
    buscarInsumo,
    crearInsumo,
    editarInsumo,
    listarInsumosGeneral,
    eliminarInsumo,
    insumosBajoStock
}