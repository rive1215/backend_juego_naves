const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generarToken = (usuario) => {
  return jwt.sign({ cedula: usuario.cedula }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verificarToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const hashContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(contrasena, salt);
};

const compararContrasena = async (contrasena, hash) => {
  return await bcrypt.compare(contrasena, hash);
};

module.exports = {
  generarToken,
  verificarToken,
  hashContrasena,
  compararContrasena,
};