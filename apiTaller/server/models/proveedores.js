module.exports=(sequelize,DataTypes)=>{
    const proveedores=sequelize.define('proveedores',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rut:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        razon_social:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validar que el campo sea un correo electrónico válido
            },
        },
        banco:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        numero_cuenta:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        tipo_cuenta:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
        insumoId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return proveedores;
}