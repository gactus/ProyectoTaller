module.exports=(sequelize,DataTypes)=>{
    const perfil_rutas=sequelize.define('perfil_rutas',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_ruta:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ruta:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        icono:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipoPerfileId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return perfil_rutas;
}