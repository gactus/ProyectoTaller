module.exports=(sequelize,DataTypes)=>{
    const estados_trabajos=sequelize.define('estados_trabajos',{
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
    return estados_trabajos;
}