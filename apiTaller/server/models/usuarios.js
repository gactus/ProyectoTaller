'use strict';
module.exports=(sequelize,DataTypes)=>{
    const usuarios=sequelize.define('usuarios',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contrasena:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return usuarios;
}