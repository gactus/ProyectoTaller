module.exports=(sequelize,DataTypes)=>{
    const trabajosVw=sequelize.define('trabajosVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        detalleTrabajo:{
            type: DataTypes.STRING,
        },
        fechaTrabajo:{
            type: DataTypes.STRING,
        },
        fechaProxMantencion:{
            type: DataTypes.STRING,
        },
        fechaTrabajoFormato:{
            type: DataTypes.DATE,
        },
        fechaProxMantencionFormato:{
            type: DataTypes.DATE,
        },
        requiereNotificacion:{
            type: DataTypes.BOOLEAN,
        },  
        costoManoObra:{
            type: DataTypes.INTEGER,
        },  
        costoInsumos:{
            type: DataTypes.INTEGER,
        },  
        costoTotal:{
            type: DataTypes.INTEGER,
        }, 
        idUsuario:{
            type: DataTypes.INTEGER,
        },
        nombreMecanico:{
            type: DataTypes.STRING,
        }, 
        NombreUsuario:{
            type: DataTypes.STRING,
        },
        idTipoPerfil:{
            type: DataTypes.INTEGER,
        },
        observacionTrabajo: {
            type: DataTypes.STRING, 
        },
        idVehiculo: {
            type: DataTypes.INTEGER, 
        },
        patenteVehiculo: {
            type: DataTypes.STRING, 
        },
        detalleVehiculo: {
            type: DataTypes.STRING, 
        },       
        tipoPerfil:{
            type: DataTypes.STRING,
        },
        idEstadoTrabajo:{
            type: DataTypes.INTEGER,
        },
        estadoTrabajo:{
            type: DataTypes.STRING,
        }
    });
    return trabajosVw;
}