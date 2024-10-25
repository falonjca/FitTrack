// src/controllers/medidaController.js
const dynamoDB = require('../config/dynamoConfig');

// Crear medida
exports.crearMedida = async (req, res) => {
  const { UserId, Timestamp, Grasa, Musculo, Altura, Peso } = req.body;

  const params = {
    TableName: 'Medidas',
    Item: { UserId, Timestamp, Grasa, Musculo, Altura, Peso }
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Medida registrada', Timestamp });
  } catch (error) {
    res.status(500).json({ error: 'Error registrando medida', details: error });
  }
};

// Obtener medidas
exports.obtenerMedidaPorId = async (req, res) => {
  const { userId, timestamp } = req.params;

  const params = {
    TableName: 'Medidas',
    Key: { UserId: userId, Timestamp: timestamp }
  };

  try {
    const result = await dynamoDB.get(params).promise();
    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo medida', details: error });
  }
};

// Actualizar medida
exports.actualizarMedida = async (req, res) => {
  const { userId, timestamp } = req.params;
  const { Grasa, Musculo, Altura, Peso } = req.body;

  const params = {
    TableName: 'Medidas',
    Key: { UserId: userId, Timestamp: timestamp },
    UpdateExpression: 'SET Grasa = :g, Musculo = :m, Altura = :a, Peso = :p',
    ExpressionAttributeValues: { ':g': Grasa, ':m': Musculo, ':a': Altura, ':p': Peso },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const result = await dynamoDB.update(params).promise();
    res.json({ message: 'Medida actualizada', result });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando medida', details: error });
  }
};

// Eliminar medida
exports.eliminarMedida = async (req, res) => {
  const { userId, timestamp } = req.params;

  const params = {
    TableName: 'Medidas',
    Key: { UserId: userId, Timestamp: timestamp }
  };

  try {
    await dynamoDB.delete(params).promise();
    res.json({ message: 'Medida eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando medida', details: error });
  }
};
