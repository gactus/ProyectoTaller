'use strict';
module.exports=(sequelize,DataTypes)=>{
    const proveedores=sequelize.define('proveedores',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rut:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        razon_social:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validar que el campo sea un correo electrónico válido
            },
        },
        bancoId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        numero_cuenta:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        tipoCuentaId:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return proveedores;
}