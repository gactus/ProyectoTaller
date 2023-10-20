const estado_trabajos = require('../models').estado_trabajos;

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
                    res.status(500).send({registroCreado: false});
                });
            }else{
                res.status(200).send({message: "El estado ya existe.",registroCreado: false});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}

module.exports = {
    listarEstadosTrabajos,
    crearEstadoTrabajo
}