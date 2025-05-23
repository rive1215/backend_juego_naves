const express = require('express');
const enrutador = express.Router();
const usuario_nivelControlador = require('../controladores/usuario_nivelControlador');
const autentificacion = require('../middleware/autentification');

enrutador.post('/registar', usuario_nivelControlador.registrarUsuario_nivel);
enrutador.get('/obtener/:id',autentificacion,usuario_nivelControlador.obtenerNivelUsuario);
enrutador.get('/listar',autentificacion,usuario_nivelControlador.listarUsuario_nivel);

module.exports = enrutador;