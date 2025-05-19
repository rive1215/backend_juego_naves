require('dotenv').config();

const { Sequelize,Datatypes } = require('sequelize');

const defineNivel = require('../modelos/nivel');
const defineUsuario = require('../modelos/usuario');
const defineUsuario_Nivel = require('../modelos/usuario_nivel');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    }    
);

const Nivel = defineNivel(sequelize, Datatypes);
const Usuario = defineUsuario(sequelize, Datatypes);
const Usuario_nivel = defineUsuario_Nivel(sequelize,Datatypes);

sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));
 
sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error en la sincronización:', err));
 
module.exports = {
    Usuario,
    Nivel,
    Usuario_nivel,
    sequelize
};