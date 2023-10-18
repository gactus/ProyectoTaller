var njwt = require('njwt');
var config = require('../config/config');
var secret = config.token_secret;

exports.createToken=(usuario)=>{
    var params = {
        sub:usuario.id,
        usuario: usuario.personaId,
    }
    var jwt = njwt.create(params,secret);

    var fechaExpiracion = new Date();
    fechaExpiracion.setHours(fechaExpiracion.getHours()+8);
        jwt.setExpiration(fechaExpiracion);

    var token = jwt.compact();

    return token;
}