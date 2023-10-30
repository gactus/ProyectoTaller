'use strict';
module.exports=(sequelize,DataTypes)=>{
    const ventas=sequelize.define('ventas',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valor_venta:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fecha:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return ventas;
}