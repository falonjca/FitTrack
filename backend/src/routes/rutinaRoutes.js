const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

// Rutas para rutinas
router.post('/', rutinaController.crearRutina); // Crear rutina
router.get('/:rutinaId', rutinaController.obtenerRutinaPorId); // Obtener rutina por ID
router.put('/:rutinaId', rutinaController.actualizarRutina); // Actualizar rutina
router.delete('/:rutinaId', rutinaController.eliminarRutina); // Eliminar rutina

module.exports = router;
