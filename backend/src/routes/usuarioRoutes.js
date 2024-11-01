const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para usuarios
router.post('/', usuarioController.crearUsuario); // Crear usuario
router.post('/login', usuarioController.loguearUsuario);
router.get('/:id', usuarioController.obtenerUsuarioPorId); // Obtener usuario por ID
router.put('/:id', usuarioController.actualizarUsuario); // Actualizar usuario
router.delete('/:id', usuarioController.eliminarUsuario); // Eliminar usuario


module.exports = router;
