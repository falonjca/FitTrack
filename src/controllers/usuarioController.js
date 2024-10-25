const { docClient } = require('../config/dynamoConfig'); // Importar correctamente docClient
const { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');


// Registrar usuario
exports.crearUsuario = async (req, res) => {
  const { Nombre, Email, Edad, Sexo } = req.body;
  const UserId = uuidv4(); // Genera un ID único para el usuario
  const FechaRegistro = new Date().toISOString(); // Asignar la fecha de registro actual

  const params = {
    TableName: 'Usuarios',
    Item: { UserId, Nombre, Email, FechaRegistro, Edad, Sexo }
  };

  try {
    await docClient.send(new PutCommand(params));
    res.status(201).json({ message: 'Usuario registrado', UserId });
  } catch (error) {
    res.status(500).json({ error: 'Error registrando usuario', details: error.message });
  }
};

// Iniciar sesión
exports.loguearUsuario = async (req, res) => {
  const { Email } = req.body;

  const params = {
    TableName: 'Usuarios',
    FilterExpression: 'Email = :email',
    ExpressionAttributeValues: {
      ':email': Email
    }
  };

  try {
    const result = await docClient.scan(params); // Usa docClient para hacer scan
    if (result.Items.length > 0) {
      res.json({ message: 'Inicio de sesión exitoso', User: result.Items[0] });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en inicio de sesión', details: error.message });
  }
};

// Obtener perfil de usuario
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: 'Usuarios',
    Key: { UserId: id }
  };

  try {
    const result = await docClient.get(params); // Usa docClient para hacer get
    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo perfil', details: error.message });
  }
};

// Actualizar perfil de usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Edad, Sexo } = req.body;

  const params = {
    TableName: 'Usuarios',
    Key: { UserId: id },
    UpdateExpression: 'SET Nombre = :n, Edad = :e, Sexo = :s',
    ExpressionAttributeValues: { ':n': Nombre, ':e': Edad, ':s': Sexo },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const result = await docClient.update(params); // Usa docClient para hacer update
    res.json({ message: 'Perfil actualizado', result });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando perfil', details: error.message });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: 'Usuarios',
    Key: { UserId: id }
  };

  try {
    await docClient.delete(params); // Usa docClient para hacer delete
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando usuario', details: error.message });
  }
};


// Obtener perfil de usuario
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: 'Usuarios',
    Key: { UserId: id }
  };

  try {
    const result = await docClient.send(new GetCommand(params)); // Ejecuta GetCommand
    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo perfil', details: error.message });
  }
};


// Actualizar perfil de usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Edad, Sexo } = req.body;

  const params = {
    TableName: 'Usuarios',
    Key: { UserId: id },
    UpdateExpression: 'SET Nombre = :n, Edad = :e, Sexo = :s',
    ExpressionAttributeValues: { ':n': Nombre, ':e': Edad, ':s': Sexo },
    ReturnValues: 'UPDATED_NEW'
  };

  try {
    const result = await docClient.send(new UpdateCommand(params)); // Ejecuta UpdateCommand
    res.json({ message: 'Perfil actualizado', result: result.Attributes });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando perfil', details: error.message });
  }
};


// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: 'Usuarios',
    Key: { UserId: id }
  };

  try {
    await docClient.send(new DeleteCommand(params)); // Ejecuta DeleteCommand
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando usuario', details: error.message });
  }
};

