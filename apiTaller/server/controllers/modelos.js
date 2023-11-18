const {modelos,marcas} = require('../models');

/* Listamos solo los modelos activos (usado en mantenedores) */
const listarModelos = async(req,res) =>{
    try{
        const idMarca = req.params.id;
        await modelos.findAll(
            {
                attributes: 
                [
                    ['id','idModelo'],['descripcion','nombreModelo'],'marcaId'
                ],
                where:
                {
                    estado: 1, 
                    marcaId: idMarca
                },
                order: [['descripcion', 'ASC']]
            })
            .then(modelo =>{
                if (modelo ? res.status(200).send(modelo) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Listamos todos los modelos, usado en su propio mantenedor */
const listarModelosGeneral = async(req,res) =>{
    try{
        const idMarca = req.params.idMarca;
        await modelos.findAll(
            {
                attributes: 
                [
                    ['id','idModelo'],['descripcion','nombreModelo'],'estado'
                ],
                where:{marcaId: idMarca}
            })
            .then(modelo =>{
                if (modelo ? res.status(200).send(modelo) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Buscamos un modelo especifico (usado para ver/editar los datos de este mismo) */
const buscarModelo = async(req,res) =>{
    try{
        const idModelo = req.params.id;
        await modelos.findOne(
            {
                attributes: 
                [
                    ['id','idModelo'],['descripcion','nombreModelo'],['marcaId','idMarca']
                ],
                where: 
                {
                    estado: 1,
                    id: idModelo,
                }
            })
            .then(modelo =>{
                if (modelo ? res.status(200).send(modelo) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Creamos un nuevo modelo */
const crearModelo = async(req,res) =>{
    try{
        const datosModelo = { //Guardamos los datos recibidos en un objeto
            descripcion: req.body.nombre,
            marcaId: req.body.IdMarca,
            estado: 1
        }
        const existe = await marcas.findOne(
        {
            where: {
                descripcion: datosModelo.descripcion, //Como los modelos no llevan código, utilizamos descripción
                marcaId: datosModelo.idMarca
            }
        })
        if (!existe){
            modelos.create(datosModelo)
            .then(()=>{
                res.status(200).send({registroCreado: true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false})
            });
        }else{
            res.status(200).send({message: "El estado ya existe.",registroCreado: false});
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Editamos un modelo */
const editarModelo = async(req, res) =>{
    try{
        const idModelo = req.params.id;
        const datosModelo = {
            descripcion: req.body.nombre,
            estado: req.body.estado
        }
        await modelos.findByPk(idModelo)
        .then(modelo=>{
            modelo.update(datosModelo)
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
/* Damos de baja un modelo (Eliminación lógica) */
const eliminarModelo = async(req,res) =>{
    try{
        const idModelo = req.params.id;
        await modelos.findByPk(idModelo)
        .then(modelo=>{
            const datosModelo = { //Cambiamos el estado del modelo
                estado: 0
            }
            modelo.update(datosModelo)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro dado de baja."});
            })
            .catch(err=>{
                res.status(200).send({message:"Atención: El registro no pudo ser dado de baja."});
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
    listarModelos,
    listarModelosGeneral,
    buscarModelo,
    crearModelo,
    editarModelo,
    eliminarModelo,
    eliminarModelo
}