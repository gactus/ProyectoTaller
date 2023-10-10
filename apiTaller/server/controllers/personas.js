const personas = require('../models').personas;

/* Listamos todos las personas */
function listarPersonas(req,res){
    try{
        personas.findAll(
            {
                where: {
                    estado: 1,
                }
            })
            .then(persona =>{
                res.status(200).send({persona});
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Buscamos una persona en especifico */
function buscarPersona(req,res){
    try{
        personas.findOne(
            {
                where: {
                    estado: 1,
                    rut: req.params.rut,
            }
            })
            .then(persona =>{
                res.status(200).send({persona});
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Creamos a una persona */
function crearPersona(req,res){
    try{
        const existe = personas.findOne( //verifico si el registro ya existe
            {
                where: {
                    rut: req.body.rut,
                }
            })
        .then(existe=>{
            if (!existe){ //En caso de no existir, se procede a crear el registro
                personas.create(req.body)
                .then(personas=>{
                    res.status(200).send({personas});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
                });
            }else{
                res.status(200).send({message: "La persona ya existe."});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Updateamos los datos de persona */
function actualizarPersona(req, res){
    try{
        const existe = personas.findByPk(req.body.personaId)
        if (existe){
            personas.update(req.body)
            .then(persona=>{
                res.status(200).send({persona});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: el registro no pudo ser actualizado." + err});
            });
        }else{
            res.status(200).send({mesage:"no existen datos para ser actualizados."});
        }
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports = {
    listarPersonas,
    buscarPersona,
    crearPersona,
    actualizarPersona
}