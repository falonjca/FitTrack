// src/models/usuarioModel.js
const { v4: uuidv4 } = require('uuid');

class Usuario {
  constructor(nombre, email, fechaRegistro, edad, sexo) {
    this.UserId = uuidv4(); // Genera un ID único para el usuario
    this.Nombre = nombre;
    this.Email = email;
    this.FechaRegistro = fechaRegistro || new Date().toISOString(); // Si no se proporciona, usa la fecha actual
    this.Edad = edad;
    this.Sexo = sexo;
  }

  // Método para validar el modelo
  validate() {
    if (!this.Nombre || !this.Email || !this.Edad || !this.Sexo) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (typeof this.Edad !== 'number') {
      throw new Error('La edad debe ser un número');
    }
  }
}

module.exports = Usuario;
