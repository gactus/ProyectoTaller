const estado_trabajos = require('../models').estado_trabajos;

/* Listamos los estados de Trabajo (para matnenedores) */
const listarEstadosTrabajos = async(req,res) =>{
    try{
        await estado_trabajos.findAll(
        {
            attributes: [['id', 'idEstadoTrabajo'],['descripcion','estadoTrabajo']],
            where: {estado: 1}
        })
        .then(estado_trabajo=>
            {
                if (estado_trabajo ? res.status(200).json({estado_trabajo}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listamos los trabajos en general (para el mantenedor de este) */
const listarEstadosTrabajosGeneral = async(req,res) =>{
    try{
        await estado_trabajos.findAll(
        {
            attributes: [['id', 'idEstadoTrabajo'],['descripcion','estadoTrabajo'], 'estado'],
        })
        .then(estado_trabajo=>
            {
                if (estado_trabajo ? res.status(200).json({estado_trabajo}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Buscamos un Estado de Trabajo en particular (usado para revisar sus datos y poder editarlos) */
const buscarEstadoTrabajo = async(req,res) =>{
    try{
        const idEstadoTrabajo = req.params.id;
        await estado_trabajos.findOne(
        {
            attributes: 
            [
                ['id','idEstadoTrabajo'],['descripcion','estadoTrabajo'],'estado'
            ],
            where: {id: idEstadoTrabajo}
        })
        .then(estado_trabajo =>{
            if (estado_trabajo ? res.status(200).send({estado_trabajo}) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Creamos un nuevo estado */
const crearEstadoTrabajo = async(req,res) =>{
    try{
        const datosEstado = { //Guardamos los datos recibidos en un objeto
            descripcion: req.body.descripcion,
            estado: 1
        }
        const existe = await estado_trabajos.findOne(
            {
                where: {
                    descripcion: datosEstado.descripcion, //Como los estados no tienen un código único, se compara por descripción
                }
            })
        .then(existe=>{
            if (!existe){
                estado_trabajos.create(datosEstado)
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
/* Editamos un estado de trabajo */
const editarEstadoTrabajo = async(req, res) =>{
    try{
        const idEstadoTrabajo = req.params.id;
        const datosEstadoTrabajo = {
            descripcion:req.body.nombre,
            estado: req.body.estado
        }
        await estado_trabajos.findByPk(idEstadoTrabajo)
        .then(estado_trabajo=>{
            estado_trabajo.update(datosEstadoTrabajo)
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al editar el registro",registroCreado:false})
            }); 
        })
        .catch(err=>{
            res.status(500).send({registroActualizado: false});;
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Damos de baja el estado de un trabajo (Eliminación lógica) */
const eliminarEstadoTrabajo = async(req,res) =>{
    try{
        const idEstadoTrabajo = req.params.id;
        await estado_trabajos.findByPk(idEstadoTrabajo)
        .then(estado_trabajo=>{
            const datosEstadoTrabajo = { //Cambiamos el estado del Banco
                estado: 0
            }
            estado_trabajo.update(datosEstadoTrabajo)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja"});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja"});
            }) 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ha ocurrido un error al buscar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports = {
    listarEstadosTrabajos,
    listarEstadosTrabajosGeneral,
    buscarEstadoTrabajo,
    crearEstadoTrabajo,
    editarEstadoTrabajo,
    eliminarEstadoTrabajo
}