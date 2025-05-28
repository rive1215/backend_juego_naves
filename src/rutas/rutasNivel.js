const express = require('express');
const enrutador = express.Router();
const nivelControlador = require('../controladores/nivelControlador');
const autentificacion = require('../middleware/autentification');

enrutador.post('/registrar',nivelControlador.crearNivel);
enrutador.get('/listar', autentificacion,nivelControlador.listarNiveles);
enrutador.put('/actualizar/:id', autentificacion,nivelControlador.actualizarNivel);
enrutador.delete('/borrar/:id', autentificacion,nivelControlador.borrarNivel);
enrutador.get('/obtenerNivel/:id', autentificacion,nivelControlador.obtenerNivel);

module.exports = enrutador;