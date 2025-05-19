require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usuarioRutas = require('./rutas/rutasUsuario');
const nivelRutas = require('./rutas/rutasNivel');
const usuarioNivelRutas = require('./rutas/rutasUsuario_nivel');
const autentificacionRutas = require('./rutas/rutasAutentificacion');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.use('/api/usuarios', usuarioRutas);
app.use('/api/nivel', nivelRutas);
app.use('/api/usuarioNivel', usuarioNivelRutas);
app.use('/api/autentificacion', autentificacionRutas);

const PORT = process.env.PORT || 3002;
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});