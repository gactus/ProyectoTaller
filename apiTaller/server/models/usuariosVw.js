'use strict';
module.exports=(sequelize,DataTypes)=>{
    const usuariosVw=sequelize.define('usuariosVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        rutUsuario:{
            type: DataTypes.STRING
        },
        nombreUsuario:{
            type: DataTypes.STRING
        },
        apellidoUsuario:{
            type: DataTypes.STRING
        },
        nombreCompletoUsuario:{
            type: DataTypes.STRING
        },
        telefonoUsuario: {
            type: DataTypes.STRING
        },
        emailUsuario: {
            type: DataTypes.STRING 
        },
        estadoUsuario:{
            type: DataTypes.BOOLEAN
        },
        idPerfil: {
            type: DataTypes.INTEGER
        },
        idTipoPerfil: {
            type: DataTypes.INTEGER
        },
        tipoPerfil:{
            type: DataTypes.STRING
        },
        estadoTipoPerfil: {
            type: DataTypes.BOOLEAN
        },
        idUsuario:{
            type: DataTypes.INTEGER
        }
    });
    return usuariosVw;
}