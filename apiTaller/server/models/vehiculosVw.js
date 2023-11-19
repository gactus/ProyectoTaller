module.exports=(sequelize,DataTypes)=>{
    const vehiculosVw=sequelize.define('vehiculosVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nroPatente:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        idDueno:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rutDueno:{
            type: DataTypes.STRING
        },
        nombreDueno:{
            type: DataTypes.STRING
        },
        idMarca:{
            type: DataTypes.INTEGER,
        },
        marcaVehiculo:{
            type: DataTypes.STRING
        },
        idModelo:{
            type: DataTypes.INTEGER,
        },
        modeloVehiculo:{
            type: DataTypes.STRING
        },
        estadoModelo: {
            type: DataTypes.BOOLEAN
        },
        estadoVehiculo:{
            type: DataTypes.BOOLEAN,
        },
        fechaRegistro: {
            type: DataTypes.STRING
        }
    });
    return vehiculosVw;
}