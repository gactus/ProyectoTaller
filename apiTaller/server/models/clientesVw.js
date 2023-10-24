module.exports=(sequelize,DataTypes)=>{
    const clientesVw=sequelize.define('clientesVw',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        rutCliente:{
            type: DataTypes.STRING,
        },
        nombreCliente: {
            type: DataTypes.STRING,
        },
        apellidoCliente: {
            type: DataTypes.STRING,
        },
        nombreCompletoCliente: {
            type: DataTypes.STRING,
        },
        telefonoCliente: {
            type: DataTypes.STRING,
        },
        emailCliente: {
            type: DataTypes.STRING,
        },
        estadoCliente:{
            type: DataTypes.BOOLEAN,
        }
    });
    return clientesVw;
}