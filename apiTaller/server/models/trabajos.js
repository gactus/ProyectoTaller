module.exports=(sequelize,DataTypes)=>{
    const trabajos=sequelize.define('trabajos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        detalle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_trabajo:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_prox_mantencion:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        requere_notificacion:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        costo_mano_obra:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado_trabajo_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return trabajos;
}