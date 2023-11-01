const handleError = (err, req, res, next) =>{
    if (err instanceof sequelize.ValidationError) {
       res.status(400).send({
         message: 'Atención: Error en la validación de los datos.'
       });
    } else if (err instanceof sequelize.DatabaseError) {
       res.status(500).send({
         message: 'Atención: Error al interactuar con la base de datos.'
       });
    } else {
       res.status(500).send({
         message: 'Atención: Error interno del servidor.'
       });
    }
   }

   module.exports = handleError;