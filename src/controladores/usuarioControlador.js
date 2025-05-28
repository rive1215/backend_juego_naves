const Joi = require('joi');
const { Usuario } = require('../bd');
const { generarToken, hashContrasena, compararContrasena } = require('../utils/auth');


const validadorUsuario = Joi.object({
  cedula: Joi.string().min(8).max(12).required().messages({
    'string.base': 'La cédula debe ser un texto.',
    'string.empty': 'La cédula es obligatoria.',
    'string.min': 'La cédula debe tener al menos {#limit} caracteres.',
    'string.max': 'La cédula no puede tener más de {#limit} caracteres.',
    'any.required': 'La cédula es un campo obligatorio.'
  }),
  nombre: Joi.string().min(2).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
    'any.required': 'El nombre es un campo obligatorio.'
  }),
  contrasena: Joi.string().min(8).max(15).required().messages({
    'string.base': 'La contrasena debe ser un texto.',
    'string.empty': 'La contrasena es obligatorio.',
    'string.min': 'La contrasena debe tener al menos {#limit} caracteres.',
    'string.max': 'La contrasena no puede tener más de {#limit} caracteres.',
    'any.required': 'La contrasena es un campo obligatorio.'
  })
});

const validadorSesion = Joi.object({
  cedula: Joi.string().required().messages({
    'string.base': 'La cedula debe ser un texto',
    'any.required': 'La cedula es un campo obligatorio'
  }),
  contrasena: Joi.string().min(8).required().messages({
    'string.base': 'La contraseña debe ser un texto',
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'any.required': 'La contraseña es un campo obligatorio'
  })
});

const crearUsuario = async (req, res) => {
    try {
        const { error } = validadorUsuario.validate(req.body, { abortEarly: false});

        if (error) {
            const mensajesErrores = error.details.map(detail => detail.message).join('|');
            return res.status(400).json({
                mensaje: 'Errores en la validación',
                resultado: {
                    cedula: '',
                    nombre: '',
                    contrasena: '',
                    erroresValidacion: mensajesErrores
                }
            });
        }

        const { cedula, nombre, contrasena } = req.body;

        const usuarioExiste = await Usuario.findByPk(cedula);
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El usuario ya existe', resultado: null });
        }

        const hashedpassword = await hashContrasena(contrasena);

        const usuarioNuevo = await Usuario.create({ cedula, nombre, contrasena:hashedpassword });

        const token = generarToken(usuarioNuevo);

        res.status(201).json({
            mensaje: 'Usuario creado',
            resultado: {
                token: token,
                cedula: usuarioNuevo.cedula,
                nombre: usuarioNuevo.nombre,
                erroresValidacion: ''
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', resultado: null });
    }
};

const iniciarSesion = async (req, res) => {
    try {
        const { error } = validadorSesion.validate(req.body, { abortEarly: false });

        if (error) {
            const mensajesErrores = error.details.map(detail => detail.message).join('|');
            return res.status(400).json({
                mensaje: mensajesErrores,
                resultado: null
            });
        }

        const { cedula, contrasena } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                cedula: cedula
            },
        });

        if (!usuario) {
            return res.status(404).json({ mensaje:"Usuario no encontrado", resultado:null});
        }

        const esValida = await compararContrasena(contrasena, usuario.contrasena);
        if (!esValida) {
            return res.status(401).json({ mensaje:"Contraseña incorrecta", resultado:null });
        }
        const token = generarToken(usuario);
        res.status(200).json({ mensaje:"Sesión iniciada",
          resultado: {
            token: token,
            nombre: usuario.nombre,
            cedula: usuario.cedula,
          }
        });
    } catch (error) {
        res.status(500).json({ mensaje:error.message, resultado:null });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        res.status(200).json({
            mensaje: 'Lista de usuarios',
            resultado: usuarios
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            resultado: null
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { cedula } = req.params;
        let { nombre, contrasena } = req.body;

        const usuario = await Usuario.findByPk(cedula);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado',
                resultado: null
            });
        }

        // Encriptar la contraseña antes de actualizar
        if (contrasena) {
            const hashedContrasena = await hashContrasena(contrasena);
            contrasena = hashedContrasena;
        }

        await usuario.update({ nombre, contrasena });

        res.status(200).json({
            mensaje: 'Usuario actualizado',
            resultado: {
                cedula: usuario.cedula,
                nombre: usuario.nombre,
                contrasena: usuario.contrasena  // Encriptada
            }
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            resultado: null
        });
    }
};

const borrarUsuario = async (req, res) => {
    try {
        const { cedula } = req.params;

        const usuario = await Usuario.findByPk(cedula);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado',
                resultado: null
            });
        }

        await usuario.destroy();

        res.status(200).json({
            mensaje: 'Usuario borrado',
            resultado: null
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            resultado: null
        });
    }
};

const obtenerUsuario = async (req, res) => {
    try {
        const { cedula } = req.params;

        const usuario = await Usuario.findByPk(cedula);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado',
                resultado: null
            });
        }

        res.status(200).json({
            mensaje: 'Usuario encontrado',
            resultado: usuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            resultado: null
        });
    }
};

module.exports = {
    crearUsuario,
    listarUsuarios,
    actualizarUsuario,
    borrarUsuario,
    obtenerUsuario,
    iniciarSesion
};
