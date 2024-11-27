const express = require('express');
const router = express.Router();
const entrenamientoController = require('../controllers/entrenamientoController');

// Rutas para entrenamientos
router.post('/', entrenamientoController.crearEntrenamiento); // Crear entrenamiento
router.get('/', entrenamientoController.obtenerTodosLosEntrenamientos); 
router.get('/:entrenamientoId', entrenamientoController.obtenerEntrenamientoPorId); // Obtener entrenamiento por ID
router.put('/:entrenamientoId', entrenamientoController.actualizarEntrenamiento); // Actualizar entrenamiento
router.delete('/:entrenamientoId', entrenamientoController.eliminarEntrenamiento); // Eliminar entrenamiento

module.exports = router;
