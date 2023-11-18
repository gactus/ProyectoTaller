module.exports=(sequelize,DataTypes)=>{
    const notificacionesVw=sequelize.define('notificacionesVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        detalleTrabajo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechaTrabajo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fechaProxMantencion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        patenteVehiculo:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombreCliente:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailCliente:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefonoCliente:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return notificacionesVw;
}
