'use strict';
module.exports=(sequelize,DataTypes)=>{
    const proveedoresVw=sequelize.define('proveedoresVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        rutProveedor:{
            type: DataTypes.STRING
        },
        razonSocial:{
            type: DataTypes.STRING
        },
        direccionProveedor:{
            type: DataTypes.STRING
        },
        telefonoProveedor:{
            type: DataTypes.STRING
        },
        emailProveedor:{
            type: DataTypes.STRING
        },
        idBanco:{
            type: DataTypes.INTEGER
        },
        nombreBanco:{
            type: DataTypes.STRING
        },
        idTipoCuenta:{
            type: DataTypes.INTEGER
        },
        tipoCuentaBancaria: {
            type: DataTypes.STRING,
        },
        numeroCuenta:{
            type: DataTypes.STRING
        },
        idInsumo:{
            type: DataTypes.INTEGER
        },
        nombreInsumo:{
            type: DataTypes.STRING
        }
    });
    return proveedoresVw;
}