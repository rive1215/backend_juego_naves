const { verificarToken } = require('../utils/auth');

const autentificacion = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado", resultado:"" });
  }

  try {
    const decoded = await verificarToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "La autentificacion fallo", resultado:""});
  }
};

module.exports = autentificacion;