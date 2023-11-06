const personas = require('../models').personas;

/* Listamos todos las personas */
const listarPersonas = async(req,res) =>{
    try{
        await personas.findAll(
            {
                attributes:
                    [
                        ['id','idPersona'],['rut','rutPersona'],['nombres','nombrePersona'],['apellidos','apellidoPersona'],
                        ['telefono','telefonoPersona'],['email','emailPersona'],['estado','estadoPersona']
                    ],
                where: {estado: 1}
            })
            .then(persona =>{
                if (persona ? res.status(200).send(persona) : res.status(200).send({message:"Atención: existen registros."}));   
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error."});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Buscamos una persona en especifico */
const buscarPersona = async(req,res) =>{
    try{
        const idPersona = req.params.id;
        await personas.findOne(
            {
                attributes:
                    [
                        ['id','idPersona'],['rut','rutPersona'],['nombres','nombrePersona'],['apellidos','apellidoPersona'],
                        ['telefono','telefonoPersona'],['email','emailPersona'],['estado','estadoPersona']
                    ],
                where: 
                {
                    estado: 1,
                    id: idPersona,
                }
            })
            .then(persona =>{
                if (persona ? res.status(200).send(persona) : res.status(200).send({message:"Atención: no existen registros asociados."}));   
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Creamos a una persona */
const crearPersona = async(req,res) =>{
    const datosPersona = {
        rut: req.body.rut,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        email: req.body.email,
        estado: 1
    }
    try{
        await personas.findOne( //verifico si el registro ya existe
        {
            where: {rut: datosPersona.rutPersona}
        })
        .then(existe=>{
            if (!existe){ //En caso de no existir, se procede a crear el registro
                personas.create(datosPersona)
                .then(()=>{
                    res.status(200).send({message: "Atención: Registro creado con éxito", registroCreado: true});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
                });
            }else{
                res.status(200).send({message: "Atención: el registro ya existe.",registroCreado: false});
            }
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Updateamos los datos de persona */
const editarPersona = async(req, res) =>{
    try{
        var idPersona = req.params.id;
        const datosPersona = {
            rut: req.body.rut,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            estado: req.body.estado
        }
        await personas.findByPk(idPersona)
        .then(persona=>{
            persona.update(datosPersona)
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({registroActualizado: false});
            }); 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: el registro no pudo ser actualizado."});
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Damos de baja una persona (eliminación lógica) y de paso, desactivamos su perfil*/
const eliminarPersona = async(req,res) =>{

}


module.exports = {
    listarPersonas,
    buscarPersona,
    crearPersona,
    editarPersona,
    eliminarPersona
}