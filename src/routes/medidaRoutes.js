const express = require('express');
const router = express.Router();
const medidaController = require('../controllers/medidaController');

// Rutas para medidas
router.post('/', medidaController.crearMedida); // Crear medida
router.get('/:userId/:timestamp', medidaController.obtenerMedidaPorId); // Obtener medida por UserId y Timestamp
router.put('/:userId/:timestamp', medidaController.actualizarMedida); // Actualizar medida
router.delete('/:userId/:timestamp', medidaController.eliminarMedida); // Eliminar medida

module.exports = router;
