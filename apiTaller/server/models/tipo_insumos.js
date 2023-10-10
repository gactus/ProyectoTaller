module.exports=(sequelize,DataTypes)=>{
    const tipo_insumos=sequelize.define('tipo_insumos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return tipo_insumos;
}