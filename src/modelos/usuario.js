const defineUsuario = (sequelize, Datatypes) => {
    return sequelize.define('Usuario', {
        contrasena: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: Datatypes.STRING,
            allowNull: false
        },
        cedula: {
            type: Datatypes.STRING,
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