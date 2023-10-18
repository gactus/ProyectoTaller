'use strict';
module.exports=(sequelize,DataTypes)=>{
    const personas=sequelize.define('personas',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rut: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombres:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            validate: {
                isEmail: true, // Validar que el campo sea un correo electrónico válido
            },
            allowNull: true
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return personas;
}
