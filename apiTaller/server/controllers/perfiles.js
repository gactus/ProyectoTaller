const perfiles = require('../models').perfiles;
const tipo_perfiles = require('../models').tipo_perfiles;

function perfilUsuario(req,res){
    perfiles.findOne(
    {
        where:{
            personaId: req.params.id,
            estado: 1
        },
        include:
        [{
            model: tipo_perfiles,
            attributes: ['descripcion'],
            where: {
                estado: 1
              }
        }]
    })
    .then(perfiles =>{
        res.status(200).send({perfiles});
    })
    .catch(err =>{
        res.status(500).send({message:"Atención: Ha ocurrido un error." + err});
    });
}
 module.exports = {
    perfilUsuario,
 }