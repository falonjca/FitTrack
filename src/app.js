const express = require('express');
const bodyParser = require('body-parser');
const { dynamoDB, crearTablas } = require('./config/dynamoConfig'); // Importar configuración de DynamoDB
const cors = require("cors");

// Importar las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const entrenamientoRoutes = require('./routes/entrenamientoRoutes');
const medidaRoutes = require('./routes/medidaRoutes');
const rutinaRoutes = require('./routes/rutinaRoutes');

const app = express();
const PORT = process.env.PORT || 3005;
app.use(cors());

app.use(express.json()); // Middleware para parsear JSON

// Usar las rutas importadas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/entrenamientos', entrenamientoRoutes);
app.use('/api/medidas', medidaRoutes);
app.use('/api/rutinas', rutinaRoutes);

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

