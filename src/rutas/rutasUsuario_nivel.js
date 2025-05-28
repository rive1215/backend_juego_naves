const express = require('express');
const enrutador = express.Router();
const usuario_nivelControlador = require('../controladores/usuario_nivelControlador');
const autentificacion = require('../middleware/autentification');

enrutador.post('/registrar', usuario_nivelControlador.registrarUsuario_nivel);
enrutador.get('/obtenerniveles/:cedula',autentificacion,usuario_nivelControlador.obtenerNivelUsuario);
enrutador.get('/listar',autentificacion,usuario_nivelControlador.listarUsuario_nivel);
enrutador.get('/obtenerusuarios/:id',autentificacion,usuario_nivelControlador.obtenerUsuarioNivel)

module.exports = enrutador;