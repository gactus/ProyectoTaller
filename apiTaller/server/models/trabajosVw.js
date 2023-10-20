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
        tipoPerfil:{
            type: DataTypes.STRING,
        }
    });
    return trabajosVw;
}