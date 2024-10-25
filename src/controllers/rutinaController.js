// src/controllers/rutinaController.js
const dynamoDB = require('../config/dynamoConfig');
const { v4: uuidv4 } = require('uuid');

// Crear rutina
exports.crearRutina = async (req, res) => {
  const { UserId, Nombre, Descripcion, Ejercicios } = req.body;
  const RutinaId = uuidv4();

  const params = {
    TableName: 'Rutinas',
    Item: { RutinaId, UserId, Nombre, Descripcion, Ejercicios, FechaCreacion: new Date().toISOString() }
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Rutina creada', RutinaId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando rutina', details: error });
  }
};

// Obtener rutina
exports.obtenerRutinaPorId = async (req, res) => {
  const { rutinaId } = req.params;

  const params = {
    TableName: 'Rutinas',
    Key: { RutinaId: rutinaId }
  };

  try {
    const result = await dynamoDB.get(params).promise();
    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo rutina', details: error });
  }
};

// Actualizar rutina
exports.actualizarRutina = async (req, res) => {
  const { rutinaId } = req.params;
  const { Nombre, Descripcion, Ejercicios } = req.body;

  const params = {
    TableName: 'Rutinas',
    Key: { RutinaId: rutinaId },
    UpdateExpression: 'SET Nombre = :n, Descripcion = :d, Ejercicios = :e',
    ExpressionAttributeValues: { ':n': Nombre, ':d': Descripcion, ':e': Ejercicios },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const result = await dynamoDB.update(params).promise();
    res.json({ message: 'Rutina actualizada', result });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando rutina', details: error });
  }
};

// Eliminar rutina
exports.eliminarRutina = async (req, res) => {
  const { rutinaId } = req.params;

  const params = {
    TableName: 'Rutinas',
    Key: { RutinaId: rutinaId }
  };

  try {
    await dynamoDB.delete(params).promise();
    res.json({ message: 'Rutina eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando rutina', details: error });
  }
};
