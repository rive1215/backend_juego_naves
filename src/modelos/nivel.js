const defineNivel = (sequelize, DataTypes) => {
    return sequelize.define('Nivel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        velocidad: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'nivel',
        timestamps: true
    });
};

module.exports = defineNivel;