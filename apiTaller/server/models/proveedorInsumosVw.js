'use strict';
module.exports=(sequelize,DataTypes)=>{
    const proveedorInsumosVw=sequelize.define('proveedorInsumosVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nroDocumento:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idProveedor:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombreProveedor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        idInsumo:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        codigoInsumo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nombreInsumo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidadInsumos:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        precioCompra:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        precioVenta:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        fechaCompra:{
            type: DataTypes.DATE,
            allowNull:false
        }, 
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return proveedorInsumosVw;
}