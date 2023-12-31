module.exports=(sequelize,DataTypes)=>{
    const insumos=sequelize.define('insumos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        codigo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_compra:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_venta:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo_insumos_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return insumos;
}