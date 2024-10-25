const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');

// Rutas para rutinas
router.post('/', rutinaController.crearRutina); // Crear rutina
router.get('/:id', rutinaController.obtenerRutinaPorId); // Obtener rutina por ID
router.put('/:id', rutinaController.actualizarRutina); // Actualizar rutina
router.delete('/:id', rutinaController.eliminarRutina); // Eliminar rutina

module.exports = router;
