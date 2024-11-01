// src/models/rutinaModel.js
const { v4: uuidv4 } = require('uuid');

class Rutina {
  constructor(userId, nombre, descripcion, ejercicios) {
    this.RutinaId = uuidv4(); // Genera un ID único para la rutina
    this.UserId = userId;
    this.Nombre = nombre;
    this.Descripcion = descripcion;
    this.Ejercicios = ejercicios; // Debe ser un array
    this.FechaCreacion = new Date().toISOString(); // Usa la fecha actual
  }

  // Método para validar el modelo
  validate() {
    if (!this.UserId || !this.Nombre || !this.Descripcion || !Array.isArray(this.Ejercicios)) {
      throw new Error('UserId, Nombre, Descripción y Ejercicios son obligatorios');
    }
  }
}

module.exports = Rutina;
