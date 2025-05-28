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
            primaryKey: true,
            unique: true
        }
    }, {
        tableName: 'usuario',
        timestamps: true
    });
};

module.exports = defineUsuario;