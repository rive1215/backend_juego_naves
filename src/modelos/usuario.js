const defineUsuario = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cedula: {
            type: DataTypes.STRING,
            allowNull: false,
            primarykey: true,
            unique: 'cedula'
        }
    }, {
        tableName: 'usuario',
        timestamps: true
    });
};

module.exports = defineUsuario;