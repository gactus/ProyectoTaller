module.exports=(sequelize,DataTypes)=>{
    const detalle_trabajos=sequelize.define('detalle_trabajos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        insumo_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trabajo_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad_insumos:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        costo:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return detalle_trabajos;
}