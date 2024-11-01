// src/models/entrenamientoModel.js
const { v4: uuidv4 } = require('uuid');

class Entrenamiento {
  constructor(userId, tipo, duracion, calorias, fecha) {
    this.EntrenamientoId = uuidv4(); // Genera un ID único para el entrenamiento
    this.UserId = userId;
    this.Tipo = tipo;
    this.Duracion = duracion;
    this.Calorias = calorias;
    this.Fecha = fecha || new Date().toISOString(); // Si no se proporciona, usa la fecha actual
  }

  // Método para validar el modelo
  validate() {
    if (!this.UserId || !this.Tipo || !this.Duracion || !this.Calorias) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (typeof this.Duracion !== 'number' || typeof this.Calorias !== 'number') {
      throw new Error('Duración y calorías deben ser números');
    }
  }
}

module.exports = Entrenamiento;
