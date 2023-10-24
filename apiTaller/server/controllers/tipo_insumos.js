const tipo_insumos = require('../models').tipo_insumos;

/* Listamos solo los tipos de Insumos Activos (usado en mantenedores) */
const listarTiposInsumos = async(req,res) =>{
    try{
        await tipo_insumos.findAll(
        {
            attributes: ['id','descripcion'],
            where: {estado: 1}
        })
        .then(tipo_insumo=>
            {
                if (tipo_insumo ? res.status(200).send({tipo_insumo}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Listamos todos los tipos de insumos, usado en su propio mantenedor */
const listarTiposInsumosGeneral = async(req,res) =>{
    try{
        await tipo_insumos.findAll(
        {
            attributes: 
            [
                ['id','idTipoInsumo'],['descripcion','tipoInsumo'],'estado'
            ]
        })
        .then(tipo_insumo=>
            {
                if (tipo_insumo ? res.status(200).send({tipo_insumo}) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Buscamos un tipo de Insumo en particular (usado para revisar sus datos y poder editarlos) */
const buscarTipoInsumo = async(req,res) =>{
    try{
        const idTipoInsumo = req.params.id;
        await tipo_insumos.findOne(
        {
            attributes: 
            [
                ['id','idTTipoInsumo'],['descripcion','tipoInsumo'],'estado'
            ],
            where: {id: idTipoInsumo}
        })
        .then(tipo_insumo =>{
            if (tipo_insumo ? res.status(200).send({tipo_insumo}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Creamos un nuevo tipo de Insumo */
const crearTipoInsumo = async(req,res) =>{
    try{
        const datosTipoInsumo = { //Guardamos los datos recibidos en un objeto
            descripcion: req.body.nombre,
            estado: 1
        }
        const existe = await tipo_insumos.findOne(
            {
                where: {
                    descripcion: datosTipoInsumo.descripcion
                }
            })
        .then(existe=>{
            if (!existe){
                tipo_insumos.create(datosTipoInsumo)
                .then(()=>{
                    res.status(200).send({registroCreado: true});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
                });
            }else{
                res.status(200).send({message: "El estado ya existe.",registroCreado: false});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Editamos un Tipo de Insumo */
const editarTipoInsumo = async(req, res) =>{
    try{
        const idTipoInsumo = req.params.id;
        const datosTipoInsumo = {
            descripcion:req.body.nombre,
            estado: req.body.estado
        }
        await tipo_insumos.findByPk(idTipoInsumo)
        .then(tipo_insumo=>{
            tipo_insumo.update(datosTipoInsumo)
            .then(()=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al editar el registro",registroCreado:false})
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
/* Damos de baja un tipo de Insumo (eliminación Lógica) */
const eliminarTipoInsumo = async(req,res) =>{
    try{
        const idTipoInsumo = req.params.id;
        await tipo_insumos.findByPk(idTipoInsumo)
        .then(tipo_insumo=>{
            const datosTipoInsumo = { //Cambiamos el estado del Tipo de Insumo
                estado: 0
            }
            tipo_insumo.update(datosTipoInsumo)
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

module.exports = {
    listarTiposInsumos,
    listarTiposInsumosGeneral,
    buscarTipoInsumo,
    crearTipoInsumo,
    editarTipoInsumo,
    eliminarTipoInsumo
}