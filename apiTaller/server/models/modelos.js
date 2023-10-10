module.exports=(sequelize,DataTypes)=>{
    const modelos=sequelize.define('modelos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return modelos;
}