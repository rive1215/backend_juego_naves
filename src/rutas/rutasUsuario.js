const express = require('express');
const enrutador = express.Router();
const usuarioControlador = require('../controladores/usuarioControlador');
const autentificacion = require('../middleware/autentification');

enrutador.get('/listar', autentificacion,usuarioControlador.listarUsuarios);
enrutador.put('/actualizar/:cedula', autentificacion,usuarioControlador.actualizarUsuario);
enrutador.delete('/borrar/:cedula', autentificacion,usuarioControlador.borrarUsuario);
enrutador.get('/obtenercliente/:cedula', autentificacion,usuarioControlador.obtenerUsuario);

module.exports = enrutador;