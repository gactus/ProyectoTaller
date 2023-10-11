module.exports=(sequelize,DataTypes)=>{
    const perfiles=sequelize.define('perfiles',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipoPerfileId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return perfiles;
}