const { docClient } = require('../config/dynamoConfig'); // Importar correctamente docClient
const { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
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
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: 'Rutina creada', RutinaId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando rutina', details: error.message });
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
    const result = await docClient.send(new GetCommand(params));
    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: 'Rutina no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo rutina', details: error.message });
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
    const result = await docClient.send(new UpdateCommand(params));
    res.json({ message: 'Rutina actualizada', result: result.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando rutina', details: error.message });
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
    await docClient.send(new DeleteCommand(params));
    res.json({ message: 'Rutina eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando rutina', details: error.message });
  }
};
