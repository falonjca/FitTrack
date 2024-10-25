// src/controllers/usuarioController.js
const dynamoDB = require('../config/dynamoConfig');
const { v4: uuidv4 } = require('uuid');

// Registrar usuario
exports.crearUsuario = async (req, res) => {
  const { Nombre, Email, FechaRegistro, Edad, Sexo } = req.body;
  const UserId = uuidv4();
  
  const params = {
    TableName: 'Usuarios',
    Item: { UserId, Nombre, Email, FechaRegistro, Edad, Sexo }
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Usuario registrado', UserId });
  } catch (error) {
    res.status(500).json({ error: 'Error registrando usuario', details: error });
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
    const result = await dynamoDB.scan(params).promise(); // Cambiar a scan
    if (result.Items.length > 0) {
      res.json({ message: 'Inicio de sesión exitoso', User: result.Items[0] });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en inicio de sesión', details: error });
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
    const result = await dynamoDB.get(params).promise();
    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo perfil', details: error });
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
    const result = await dynamoDB.update(params).promise();
    res.json({ message: 'Perfil actualizado', result });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando perfil', details: error });
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
    await dynamoDB.delete(params).promise();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando usuario', details: error });
  }
};
