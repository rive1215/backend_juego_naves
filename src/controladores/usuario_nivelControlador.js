const Joi = require('joi');
const { Usuario, Nivel, Usuario_nivel } = require('../bd');

const validadorUN = Joi.object({
    cedula_usuario: Joi.string().min(8).max(12).required().messages({
      'string.base': 'La cédula debe ser un texto.',
      'string.empty': 'La cédula es obligatoria.',
      'string.min': 'La cédula debe tener al menos {#limit} caracteres.',
      'string.max': 'La cédula no puede tener más de {#limit} caracteres.',
      'any.required': 'La cédula es un campo obligatorio.'
    }),
    id_nivel: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del producto debe ser un número.',
      'number.integer': 'El ID del producto debe ser un número entero.',
      'number.positive': 'El ID del producto debe ser un número positivo.',
      'any.required': 'El ID del producto es un campo obligatorio.'
    }),
    tiempo: Joi.number().integer().positive().required().messages({
      'number.base': 'La cantidad debe ser un número.',
      'number.integer': 'La cantidad debe ser un número entero.',
      'number.positive': 'La cantidad debe ser mayor a 0.',
      'any.required': 'La cantidad es un campo obligatorio.'
    })
});

const registrarUsuario_nivel = async (req, res) => {
    try {
      // Validar datos de entrada con Joi
      const { error } = validadorUN.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            cedula_usuario: '',
            id_nivel: '',
            tiempo: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { cedula_usuario, id_nivel, tiempo } = req.body;
  
      // Verificar si el usuario existe
      const usuario = await Usuario.findByPk(cedula_usuario);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'usuario no encontrado', resultado: null });
      }
  
      // Verificar si el nivel existe
      const nivel = await Nivel.findByPk(id_nivel);
      if (!nivel) {
        return res.status(404).json({ mensaje: 'Nivel no encontrado', resultado: null });
      }
     
      // Crear usuario_nivel
      const usuario_nivel = await Usuario_nivel.create({ cedula_usuario, id_nivel, tiempo });
  
      res.status(201).json({
        mensaje: 'Usuario por nivel registrada',
        resultado: {
          id: usuario_nivel.id,
          cedula_usuario: usuario_nivel.cedula_usuario,
          id_nivel: usuario_nivel.id_nivel,
          tiempo: usuario_nivel.tiempo,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const listarUsuario_nivel = async (req, res) => {
    try {
        const usuario_nivel = await Usuario_nivel.findAll();

        res.status(200).json({
            mensaje: 'Usuarios por clientes listados',
            resultado: usuario_nivel
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            resultado: null
        })
    }
};

const obtenerNivelUsuario = async (req, res) => {
  try {
    const un = await Usuario_nivel.findAll({
      where: {
        cedula_usuario:req.params.cedula
      }
    });

    if (!un.lenght) {
        return res.status(404).json({ mensaje: "Este usuario no va en ningún nivel", resultado:null });
    }
    return res.status(200).json({ mensaje: "Datos de los niveles", resultado:un});
  } catch (error) {
    return res.status(500).json({ mensaje: error.mensaje, resultado:null });
  }
};

module.exports = {
    registrarUsuario_nivel,
    listarUsuario_nivel,
    obtenerNivelUsuario
};