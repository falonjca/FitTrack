const { docClient } = require('../config/dynamoConfig'); // Importar correctamente docClient
const { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

// Crear medida
exports.crearMedida = async (req, res) => {
  const { UserId, Timestamp, Grasa, Musculo, Altura, Peso } = req.body;

  const params = {
    TableName: 'Medidas',
    Item: { UserId, Timestamp, Grasa, Musculo, Altura, Peso }
  };

  try {
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: 'Medida registrada', Timestamp });
  } catch (error) {
    res.status(500).json({ error: 'Error registrando medida', details: error.message });
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
    const result = await docClient.send(new GetCommand(params));
    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: 'Medida no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo medida', details: error.message });
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
    const result = await docClient.send(new UpdateCommand(params));
    res.json({ message: 'Medida actualizada', result: result.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando medida', details: error.message });
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
    await docClient.send(new DeleteCommand(params));
    res.json({ message: 'Medida eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando medida', details: error.message });
  }
};

