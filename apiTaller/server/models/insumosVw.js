'use strict';
module.exports=(sequelize,DataTypes)=>{
    const insumosVw=sequelize.define('insumosVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        codigoInsumo:{
            type: DataTypes.STRING
        },
        nombreInsumo:{
            type: DataTypes.STRING
        },
        cantidadInsumos:{
            type: DataTypes.INTEGER
        },
        precioCompra:{
            type: DataTypes.INTEGER
        },
        precioVenta:{
            type: DataTypes.INTEGER
        },
        tipoInsumo:{
            type: DataTypes.STRING
        },
        estadoInsumo:{
            type: DataTypes.BOOLEAN
        }
    });
    return insumosVw;
}