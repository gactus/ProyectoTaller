const {clientesVw, perfiles, personas} = require('../models');
/* Listamos los clientes activos */
const listarClientes = async(req,res) =>{
    try{
        await clientesVw.findAll(
        {
            attributes: 
            [
                ['id','idCliente'],'rutCliente','nombreCliente','apellidoCliente','nombreCompletoCliente','telefonoCliente',
                'emailCliente','estadoCliente'
            ],
            where: {estadoCliente:1}
        })
        .then(clienteVw=>
            {
                if (clienteVw ? res.status(200).json({clienteVw}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Listamos todos clientes */
const listarClientesGeneral = async(req,res) =>{
    try{
        await clientesVw.findAll(
        {
            attributes: 
            [
                ['id','idCliente'],'rutCliente','nombreCliente','apellidoCliente','nombreCompletoCliente','telefonoCliente',
                'emailCliente','estadoCliente'
            ],
        })
        .then(clienteVw=>
            {
                if (clienteVw ? res.status(200).json({clienteVw}) : res.status(200).send({message:"Atención: no existen registros para mostrar."}));
            })
        .catch(err=>{
            res.status(500).send({message:"Atención: Ocurrió un problema al recuperar los datos."});
        })
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno."});
    }
}
/* Creamos un nuevo Cliente */
const crearCliente = async(req,res) =>{
    try{
        const datosCliente = { //Guardamos los datos recibidos en un objeto
            rut: req.body.rut,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            estado: 1
        }
        const existe = await clientesVw.findOne(
        {
            where: {rutCliente: datosCliente.rut}
        })
        if (!existe){
            personas.create(datosCliente)
            .then(()=>{
                personas.findOne({where: {rut: datosCliente.rut}}) //Una vez creada la persona, obtenemos su id, para crear el perfil
                .then(persona=>{
                    const datosPerfil = { //Guardamos sus datos en un objeto, para luego ser insertado
                        personaId: persona.id,
                        tipoPerfileId: 3,
                        estado: 1
                    }
                    perfiles.create(datosPerfil)
                    .then(()=>{res.status(200).send({registroCreado: true})})
                    .catch(err=>{res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro" + err,registroCreado:false})})
                })
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroCreado:false,err})
            });
        }else{
            res.status(200).send({message: "El estado ya existe.",registroCreado: false});
        }
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}
/* Editamos un cliente */
const editarCliente = async(req,res) =>{
    try{
        var idCliente = req.params.id;
        const datosCliente = {
            rut: req.body.rut,
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            email: req.body.email,
            estado: req.body.estado
        }
        await personas.findByPk(idCliente)
        .then(persona=>{
            persona.update(datosCliente)
            .then(()=>{
                res.status(200).send({registroActualizado: true});
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un problema al crear el registro",registroActualizado: false});
            }); 
        })
        .catch(err=>{
            res.status(500).send({message:"Atención: el registro no pudo ser actualizado."});
        });
    }catch(err) {
        res.status(500).send({message:"Atención: Ha ocurrido un error."});
    }
}
/* Damos de baja un cliente (Eliminación lógica) */
const eliminarCliente = async(req,res) =>{
    try{
        const idCliente = req.params.id;
        await personas.findByPk(idCliente)
        .then(cliente=>{
            const datosCliente = {
                estado: 0
            }
            cliente.update(datosCliente)
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
/* Buscamos los datos de un cliente específico */
const buscarCliente = async(req,res) =>{
    try{
        const idCliente = req.params.id;
        await clientesVw.findOne(
            {
                attributes:
                    [
                        ['id','idCliente'],'rutCliente','nombreCliente','apellidoCliente','nombreCompletoCliente','telefonoCliente',
                        'emailCliente','estadoCliente'
                    ],
                where: 
                {
                    id: idCliente
                }
            })
            .then(cliente =>{
                if (cliente ? res.status(200).send({cliente}) : res.status(200).send({message:"Atención: no existen registros asociados."}));   
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}
/* Buscamos los datos de un cliente específico */
const buscarClienteRut = async(req,res) =>{
    try{
        const rutCliente = req.params.rut;
        await clientesVw.findOne(
            {
                attributes:
                    [
                        ['id','idCliente'],'rutCliente','nombreCliente','apellidoCliente','nombreCompletoCliente','telefonoCliente',
                        'emailCliente','estadoCliente'
                    ],
                where: 
                {
                    rutCliente: rutCliente
                }
            })
            .then(cliente =>{
                if (cliente ? res.status(200).send({cliente}) : res.status(200).send({message:"Atención: no existen registros asociados."}));   
            })
            .catch(err =>{
                res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
            });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    }
}

module.exports = {
    listarClientes,
    listarClientesGeneral,
    crearCliente,
    editarCliente,
    eliminarCliente,
    buscarCliente,
    buscarClienteRut
}