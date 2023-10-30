'use strict';
module.exports=(sequelize,DataTypes)=>{
    const ventas_insumos=sequelize.define('ventas_insumos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ventaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad_insumos:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        proveedorInsumoId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return ventas_insumos;
}