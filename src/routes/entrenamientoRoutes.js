const express = require('express');
const router = express.Router();
const entrenamientoController = require('../controllers/entrenamientoController');

// Rutas para entrenamientos
router.post('/', entrenamientoController.crearEntrenamiento); // Crear entrenamiento
router.get('/:id', entrenamientoController.obtenerEntrenamientoPorId); // Obtener entrenamiento por ID
router.put('/:id', entrenamientoController.actualizarEntrenamiento); // Actualizar entrenamiento
router.delete('/:id', entrenamientoController.eliminarEntrenamiento); // Eliminar entrenamiento

module.exports = router;
