module.exports=(sequelize,DataTypes)=>{
    const proveedor_insumos=sequelize.define('proveedor_insumos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nro_documento:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        proveedoreId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        insumoId:{
            type: DataTypes.INTEGER,
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
            allowNull:false,
        },
        fecha:{
            type: DataTypes.DATE,
            allowNull:true,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return proveedor_insumos;
}