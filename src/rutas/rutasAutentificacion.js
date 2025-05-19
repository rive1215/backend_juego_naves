const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');

enrutador.post('/registrar', usuarioControlador.crearUsuario);
enrutador.post('/iniciarSesion', usuarioControlador.iniciarSesion);

module.exports = enrutador;