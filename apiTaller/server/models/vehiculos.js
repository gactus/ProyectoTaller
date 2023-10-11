module.exports=(sequelize,DataTypes)=>{
    const vehiculos=sequelize.define('vehiculos',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patente:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        personaId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        modeloId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return vehiculos;
}