'use strict';
module.exports=(sequelize,DataTypes)=>{
    const personaPerfilVw=sequelize.define('personaPerfilVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idPersona:{
            type: DataTypes.INTEGER
        },
        rutUsuario:{
            type: DataTypes.STRING
        },
        rutUsuario:{
            type: DataTypes.STRING
        },
        NombreUsuario:{
            type: DataTypes.STRING
        },
        tipoPerfil:{
            type: DataTypes.INTEGER
        }
    });
    return personaPerfilVw;
}