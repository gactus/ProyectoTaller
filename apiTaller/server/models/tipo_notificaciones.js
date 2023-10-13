module.exports=(sequelize,DataTypes)=>{
    const tipo_notificaciones=sequelize.define('tipo_notificaciones',{
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
    return tipo_notificaciones;
}