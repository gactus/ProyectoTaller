const {vehiculos, vehiculosVw} = require('../models');
/* creamos un nuevo registro para vehiculos */
const crearVehiculo = async(req,res) =>{
    try{
        const datosVehiculo = {
            patente: req.body.patenteVehiculo,
            personaId: req.body.idPersona,
            modeloId: req.body.idModelo,
            estado: 1
        }
        const existe = await vehiculos.findOne(
        {
            where: {patente: datosVehiculo.patente, personaId: datosVehiculo.personaId} //Validamos que el vehiculo se enceuntre registrado para el cliente
        })
        if (!existe){
            await vehiculos.create(datosVehiculo)
            .then(()=>{
                res.status(200).send({message:"Atención: Registro creado con éxito.",registroCreado:true})
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro." + err,registroCreado:false})  
            })
        }else{
            res.status(200).send({message:"Atención: el registro ya existe.",registroCreado:false})
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err})
    }
}
/* Editamos los datos del trabajo */
const editarVehiculo = async(req,res) => {
    try{
        const idTrabajo = req.params.id;
        const datosVehiculo = {
            patente: req.body.patenteVehiculo,
            personaId: req.body.idPersona,
            modeloId: req.body.idModelo,
            estado: req.body.idEstadoTrabajo
        }
        await vehiculos.findByPk(idTrabajo)
            .then(vehiculo=>{
                vehiculo.update(datosVehiculo)
                .then(()=>{
                    res.status(200).send({message: "registro actualizado con éxito", registroActualizado: true});
                })
                .catch(err=>{
                    res.status(500).send({message:"Atención: Ocurrió un problema al actualizar el registro",registroCreado:false})
                })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al consultar el registro",registroCreado:false})
            })
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Buscamos un vehiculo por patente */
const buscarVehiculoxPatente = async(req,res) =>{
    try{
        const nroPatente = req.params.nroPatente;
        await vehiculosVw.findOne(
        {
            attributes: 
            [
                ['id','idVehiculo'],'nroPatente', 'rutDueno','nombreDueno','modeloVehiculo','fechaRegistro','estadoVehiculo'
            ],
            where: 
            {
                nroPatente: nroPatente,
            }
        })
        .then(vehiculoVw =>{
            if (vehiculoVw ? res.status(200).send(vehiculoVw) : res.status(200).send({message:"Atención: no existen registros asociados."}));   
        })
        .catch(err =>{
            res.status(500).send({message:"Atención: Ha ocurrido un error al consultar el registro."});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Buscamos un vehiculo por su id */
const buscarVehiculo = async(req,res) =>{
    try{
        const idVehiculo = req.params.id;
        await vehiculosVw.findOne(
            {
                attributes: 
                [
                    ['id','idVehiculo'],'nroPatente', 'idDueno','rutDueno','nombreDueno','idMarca','marcaVehiculo',
                    'idModelo','modeloVehiculo','fechaRegistro','estadoVehiculo'
                ],
                where: 
                {
                    id: idVehiculo,
                }
            })
            .then(vehiculoVw =>{
                if (vehiculoVw ? res.status(200).send(vehiculoVw) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error al consultar el registro." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listamos todos los vehiculos activos para un usuario*/
const listarVehiculos = async(req,res) =>{
    try{
        const idUsuario = req.params.id;
        await vehiculosVw.findAll(
            {
                attributes: 
                [
                    ['id','idVehiculo'],'nroPatente', 'idDueno','rutDueno','nombreDueno','idMarca','marcaVehiculo',
                    'idModelo','modeloVehiculo','fechaRegistro','estadoVehiculo'
                ],
                where: 
                {
                    estadoVehiculo: 1,
                    idDueno: idUsuario
                }
            })
            .then(vehiculoVw =>{
                if (vehiculoVw ? res.status(200).send(vehiculoVw) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error la consultar el registro." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listamos todos los vehiculos (activos/inactivos) */
const listarVehiculosGeneral = async(req,res) =>{
    try{
        await vehiculosVw.findAll(
            {
                attributes: 
                [
                    ['id','idVehiculo'],'nroPatente', 'idDueno','rutDueno','nombreDueno','idMarca','marcaVehiculo',
                    'idModelo','modeloVehiculo','fechaRegistro','estadoVehiculo'
                ]
            })
            .then(vehiculoVw =>{
                if (vehiculoVw ? res.status(200).send(vehiculoVw) : res.status(200).send({message:"Atención: no existen registros asociados."}));
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error la consultar el registro." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Damos de baja un vehiculo (eliminación lógica) */
const eliminarVehiculo = async(req,res) =>{
    try{
        const idVehiculo = req.params.id;
        await vehiculos.findByPk(idVehiculo)
        .then(vehiculo=>{
            const datosVehiculo = { //Cambiamos el estado del Vehiculo
                estado: 0
            }
            vehiculo.update(datosVehiculo)
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
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
module.exports = {
    crearVehiculo,
    editarVehiculo,
    buscarVehiculoxPatente,
    buscarVehiculo,
    listarVehiculos,
    listarVehiculosGeneral,
    eliminarVehiculo
}