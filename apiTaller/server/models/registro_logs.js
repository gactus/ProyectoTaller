module.exports=(sequelize,DataTypes)=>{
    const registro_logs=sequelize.define('registro_logs',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        accion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tabla:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        personaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return registro_logs;
}