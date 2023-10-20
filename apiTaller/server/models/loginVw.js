'use strict';
module.exports=(sequelize,DataTypes)=>{
    const loginVw=sequelize.define('loginVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idPersona:{
            type: DataTypes.INTEGER,
        },
        contrasenaUsuario:{
            type: DataTypes.STRING,
        },
        rutUsuario:{
            type: DataTypes.STRING,
        },
        NombreUsuario:{
            type: DataTypes.STRING,
        }
    });
    return loginVw;
}