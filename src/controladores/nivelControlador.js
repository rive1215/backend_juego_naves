const Joi = require('joi');
const { Nivel } = require('../bd');

const validadorNivel = Joi.object({
    nombre: Joi.string().min(3).max(100).required().messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres.',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),
    
    velocidad: Joi.number().integer().min(1).required().messages({
      'number.base': 'La velocidad debe ser un número.',
      'number.integer': 'La velocidad debe ser un número entero.',
      'number.min': 'La velocidad debe ser al menos {#limit}.',
      'any.required': 'La velocidad es un campo obligatorio.'
    }),
});

const crearNivel = async (req, res) => {
    try {
      const { error } = validadorNivel.validate(req.body, { abortEarly: false });
  
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            nombre: '',
            velocidad: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      const { nombre, velocidad } = req.body;
  
    
      const nivelExistente = await Nivel.findOne({
        where: { nombre }
      });

      if (nivelExistente) {
        return res.status(400).json({ mensaje: 'Ya existe un nivel con este nombre', resultado: null });
      }
  
      // Crear el nuevo nivel
      const nuevoNivel = await Nivel.create({ nombre, velocidad });
  
      res.status(201).json({
        mensaje: 'Nivel creado exitosamente',
        resultado: {
          id: nuevoNivel.id,
          nombre: nuevoNivel.nombre,
          velocidad: nuevoNivel.velocidad,
          erroresValidacion: ''
        }
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const listarNiveles = async (req, res) => {
    try {
      const niveles = await Nivel.findAll();
      
      res.status(200).json({
        mensaje: 'Niveles listadas correctamente',
        resultado: niveles
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const obtenerNivel = async (req, res) => {
    try {
      const { id } = req.params;
      const nivel = await Nivel.findByPk(id);
  
      if (!nivel) {
        return res.status(404).json({
          mensaje: 'Nivel no encontrado',
          resultado: null
        });
      }
  
      res.status(200).json({
        mensaje: 'Nivel encontrado',
        resultado: nivel
      });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const actualizarNivel = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, velocidad } = req.body;
  
      // Validar los datos con Joi
      const { error } = validadorNivel.validate(req.body, { abortEarly: false });
      if (error) {
        const mensajesErrores = error.details.map(detail => detail.message).join('|');
        return res.status(400).json({
          mensaje: 'Errores en la validación',
          resultado: {
            nombre: '',
            velocidad: '',
            erroresValidacion: mensajesErrores
          }
        });
      }
  
      // Buscar El nivel
      const nivel = await Nivel.findByPk(id);
      if (!nivel) {
        return res.status(404).json({ mensaje: 'Nivel no encontrado', resultado: null });
      }
  
      // Actualizar el nivel
      await tienda.update({ nombre, velocidad });
  
      res.status(200).json({
        mensaje: 'Nivel actualizado',
        resultado: nivel
      });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

const borrarNivel = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el nivel
      const nivel = await Nivel.findByPk(id);
      if (!nivel) {
        return res.status(404).json({ mensaje: 'Nivel no encontrado', resultado: null });
      }
  
      // Eliminar el nivel
      await nivel.destroy();
  
      res.status(200).json({ mensaje: 'Nivel eliminado', resultado: null });
  
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
};

module.exports = {
    crearNivel,
    listarNiveles,
    obtenerNivel,
    actualizarNivel,
    borrarNivel
};
