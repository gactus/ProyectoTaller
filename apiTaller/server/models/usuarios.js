module.exports=(sequelize,DataTypes)=>{
    const usuarios=sequelize.define('usuarios',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        persona_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contrasena:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return usuarios;
}