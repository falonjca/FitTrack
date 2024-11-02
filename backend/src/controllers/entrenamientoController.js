const { docClient } = require('../config/dynamoConfig'); // Importar correctamente docClient
const { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');


// Crear entrenamiento
exports.crearEntrenamiento = async (req, res) => {
  const { UserId, Tipo, Duracion, Calorias, Fecha } = req.body;
  const EntrenamientoId = uuidv4();

  const params = {
    TableName: 'Entrenamientos',
    Item: { EntrenamientoId, UserId, Tipo, Duracion, Calorias, Fecha }
  };

  try {
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: 'Entrenamiento creado', EntrenamientoId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando entrenamiento', details: error.message });
  }
};


// Obtener entrenamiento
exports.obtenerEntrenamientoPorId = async (req, res) => {
  const { entrenamientoId } = req.params;

  const params = {
    TableName: 'Entrenamientos',
    Key: { EntrenamientoId: entrenamientoId }
  };

  try {
    const result = await docClient.send(new GetCommand(params));
    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo entrenamiento', details: error.message });
  }
};


// Actualizar entrenamiento
exports.actualizarEntrenamiento = async (req, res) => {
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
    const result = await docClient.send(new UpdateCommand(params));
    res.json({ message: 'Entrenamiento actualizado', result: result.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando entrenamiento', details: error.message });
  }
};


// Eliminar entrenamiento
exports.eliminarEntrenamiento = async (req, res) => {
  const { entrenamientoId } = req.params;

  const params = {
    TableName: 'Entrenamientos',
    Key: { EntrenamientoId: entrenamientoId }
  };

  try {
    await docClient.send(new DeleteCommand(params));
    res.json({ message: 'Entrenamiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando entrenamiento', details: error.message });
  }
};