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
        persona_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        modelo_id:{
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