// src/models/medidaModel.js
class Medida {
  constructor(userId, timestamp, grasa, musculo, altura, peso) {
    this.UserId = userId;
    this.Timestamp = timestamp; // Se debe proporcionar
    this.Grasa = grasa;
    this.Musculo = musculo;
    this.Altura = altura;
    this.Peso = peso;
  }

  // Método para validar el modelo
  validate() {
    if (!this.UserId || !this.Timestamp) {
      throw new Error('UserId y Timestamp son obligatorios');
    }
    if (typeof this.Grasa !== 'number' || typeof this.Musculo !== 'number' || typeof this.Altura !== 'number' || typeof this.Peso !== 'number') {
      throw new Error('Grasa, músculo, altura y peso deben ser números');
    }
  }
}

module.exports = Medida;
