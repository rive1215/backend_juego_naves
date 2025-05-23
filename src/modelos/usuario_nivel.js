const defineUsuario_Nivel = (sequelize, DataTypes) => {
    return sequelize.define('Usuario_nivel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cedula_usuario: {
            type: DataTypes.STRING,
            references: {
                model: 'usuario',
                key: 'cedula'
            }
        },
        id_nivel: {
            type: DataTypes.INTEGER,
            references: {
                model: 'nivel',
                key: 'id'
            }
        }, 
        tiempo: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'usuario_nivel',
        timestamps: true,
    });
};

module.exports = defineUsuario_Nivel;