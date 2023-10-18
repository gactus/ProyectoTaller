module.exports=(sequelize,DataTypes)=>{
    const detalle_notificaciones=sequelize.define('detalle_notificaciones',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipoNotificacioneId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        detalle_notificacion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return detalle_notificaciones;
}