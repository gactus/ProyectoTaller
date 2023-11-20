var njwt = require('njwt');
var config = require('../config/config');
var secret = config.token_secret;


function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Atención: No existen los valores necesarios para autorizar la solicitud." });
  }

  var token = req.headers.authorization.replace(/Bearer\s/i, ''); 

  console.log('Token recibido en el servidor:', token);

  njwt.verify(token, secret, (err, verifiedJwt) => {
    if (err) {
      console.error(err);
      return res.status(401).send({ message: "Atención: Acceso no autorizado." });
    } else {
      console.log({ verifiedJwt })
      req.user = {
        idUsuario: verifiedJwt.body.idUsuario,
      };

      next();
    }
  }); 
}

module.exports = {
    auth
  };