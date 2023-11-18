const marcas = require('../models').marcas;

/* Listamos las marcas activas (usado como campo en otros mantenedores) */
const listarMarcas = async(req,res) =>{
    try{
        await marcas.findAll(
            {
                attributes: [['id','idMarca'],['descripcion','nombreMarca']],
                where: {estado: 1},
                order: [['descripcion', 'ASC']]
            })
            .then(marca =>{
                if (marca ? res.status(200).send(marca) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Listamos todas las marcas (usado en el mantendor de marcas) */
const listarMarcasGeneral = async(req,res) =>{
    try{
        await marcas.findAll(
            {
                attributes: [['id','idMarca'],['descripcion','nombreMarca'],'estado'],
            })
            .then(marca =>{
                if (marca ? res.status(200).send(marca) : res.status(200).send({message:"Atención: no existen registros a mostrar."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Buscamos una marca especifica */
const buscarMarca = async(req,res) =>{
    try{
        await marcas.findOne(
            {
                attributes: [['id','idMarca'],['descripcion','nombreMarca']],
                where: 
                {
                    estado: 1,
                    id:req.params.id
                }
            })
            .then(marca =>{
                if (marca ? res.status(200).send(marca) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* creamos una nueva marca */
const crearMarca = async(req,res) =>{
    try{
        const datosMarca = { //Guardamos los datos recibidos en un objeto
            descripcion: req.body.nombre,
            estado: 1
        }
        const existe = await marcas.findOne(
        {
            where: {
                descripcion: datosMarca.descripcion, //Como las marcas no tienen código, utilizamos la descripción
            }
        })
        if (!existe){
            marcas.create(datosMarca)
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
/*  Editamos una marca */
const editarMarca = async(req, res) =>{
    try{
        const idMarca = req.params.id;
        const datosMarca = {
            descripcion: req.body.nombre,
            estado: req.body.estado
        }
        await marcas.findByPk(idMarca)
        .then(marca=>{
            marca.update(datosMarca)
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
/* Damos de baja una marca (Eliminación Lógica) */
const eliminarMarca = async(req,res) =>{
    try{
        const idMarca = req.params.id;
        await marcas.findByPk(idMarca)
        .then(marca=>{
            const datosMarca = { //Cambiamos el estado del Banco
                estado: 0
            }
            marca.update(datosMarca)
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
    listarMarcas,
    buscarMarca,
    listarMarcasGeneral,
    crearMarca,
    editarMarca,
    eliminarMarca
}