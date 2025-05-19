const defineUsuario_Nivel = (sequelize, Datatypes) => {
    return sequelize.define('Usuario_nivel', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cedula_usuario: {
            type: Datatypes.STRING,
            references: {
                model: 'usuario',
                key: 'cedula'
            }
        },
        id_nivel: {
            type: Datatypes.INTEGER,
            references: {
                model: 'nivel',
                key: 'id'
            }
        }, 
        tiempo: {
            type: Datatypes.INTEGER,
        }
    }, {
        tableName: 'usuario_nivel',
        timestamps: true,
    });
};

module.exports = defineUsuario_Nivel;