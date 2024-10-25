// src/controllers/entrenamientoController.js
const dynamoDB = require('../config/dynamoConfig');
const { v4: uuidv4 } = require('uuid');

// Crear entrenamiento
exports.createEntrenamiento = async (req, res) => {
  const { UserId, Tipo, Duracion, Calorias, Fecha } = req.body;
  const EntrenamientoId = uuidv4();

  const params = {
    TableName: 'Entrenamientos',
    Item: { EntrenamientoId, UserId, Tipo, Duracion, Calorias, Fecha }
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Entrenamiento creado', EntrenamientoId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando entrenamiento', details: error });
  }
};

// Obtener entrenamiento
exports.getEntrenamiento = async (req, res) => {
  const { entrenamientoId } = req.params;

  const params = {
    TableName: 'Entrenamientos',
    Key: { EntrenamientoId: entrenamientoId }
  };

  try {
    const result = await dynamoDB.get(params).promise();
    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo entrenamiento', details: error });
  }
};

// Actualizar entrenamiento
exports.updateEntrenamiento = async (req, res) => {
  const { entrenamientoId } = req.params;
  const { Tipo, Duracion, Calorias } = req.body;

  const params = {
    TableName: 'Entrenamientos',
    Key: { EntrenamientoId: entrenamientoId },
    UpdateExpression: 'SET Tipo = :t, Duracion = :d, Calorias = :c',
    ExpressionAttributeValues: { ':t': Tipo, ':d': Duracion, ':c': Calorias },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const result = await dynamoDB.update(params).promise();
    res.json({ message: 'Entrenamiento actualizado', result });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando entrenamiento', details: error });
  }
};

// Eliminar entrenamiento
exports.deleteEntrenamiento = async (req, res) => {
  const { entrenamientoId } = req.params;

  const params = {
    TableName: 'Entrenamientos',
    Key: { EntrenamientoId: entrenamientoId }
  };

  try {
    await dynamoDB.delete(params).promise();
    res.json({ message: 'Entrenamiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando entrenamiento', details: error });
  }
};
