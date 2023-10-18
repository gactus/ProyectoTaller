module.exports=(sequelize,DataTypes)=>{
    const tipo_cuentas=sequelize.define('tipo_cuentas',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return tipo_cuentas;
}