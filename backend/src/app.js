require('dotenv').config({ path: __dirname + '/.env' });


console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require("cors");

const { crearTablas } = require('./config/dynamoConfig'); // Importar configuración de DynamoDB

// Importar las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const entrenamientoRoutes = require('./routes/entrenamientoRoutes');
const medidaRoutes = require('./routes/medidaRoutes');
const rutinaRoutes = require('./routes/rutinaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Usar las rutas importadas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/entrenamientos', entrenamientoRoutes);
app.use('/api/medidas', medidaRoutes);
app.use('/api/rutinas', rutinaRoutes);

app.get('/', (req, res) => {
  res.send("Bienvenido a la API de FitTrack");
});

const iniciarServidor = async () => {
  try {
    await crearTablas(); // Llama a la función para crear tablas
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

iniciarServidor();

module.exports.handler = serverless(app);
