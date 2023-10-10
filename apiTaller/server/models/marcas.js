module.exports=(sequelize,DataTypes)=>{
    const marcas=sequelize.define('marcas',{
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
    return marcas;
}