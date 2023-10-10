module.exports=(sequelize,DataTypes)=>{
    const perfiles=sequelize.define('perfiles',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        persona_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tipo_perfil_id:{
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