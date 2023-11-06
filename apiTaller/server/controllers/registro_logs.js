const registro_logs = require('../models').registro_logs;

function registrarLog(req,res){
    try{
        registro_logs.create(req.body)
            .then(registro_log=>{
                res.status(200).send(registro_log);
            })
            .catch(err=>{
                res.status(500).send({message:"Atención: Ocurrió un error al crear el registro." + err});
        });
    }catch(err){
        res.status(500).send({message:"Atención: Ha ocurrido un error interno." + err});
    }
}

module.exports = {
    registrarLog
}