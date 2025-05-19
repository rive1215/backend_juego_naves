const express = require('express');
const enrutador = express.Router();
const nivelControlador = require('../controladores/nivelControlador');
const autentificacion = require('../middleware/autentification');

enrutador.post('/registrar', autentificacion,nivelControlador.crearNivel);
enrutador.get('/listar', autentificacion,nivelControlador.listarNiveles);
enrutador.put('/actualizar/:cedula', autentificacion,nivelControlador.actualizarNivel);
enrutador.delete('/borrar/:cedula', autentificacion,nivelControlador.borrarNivel);
enrutador.get('/obtenercliente/:cedula', autentificacion,nivelControlador.obtenerNivel);

module.exports = enrutador;