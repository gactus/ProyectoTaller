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
            allowNull: true,
        },
        requere_notificacion:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        costo_mano_obra:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vehiculoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estadoTrabajoId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        perfileId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notificado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return trabajos;
}