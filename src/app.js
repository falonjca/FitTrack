require('dotenv').config(); // Cargar las variables de entorno desde .env
const express = require('express');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const router = require('./routes/dynamoRoutes'); // Asegúrate de que el archivo de rutas se importe correctamente

const app = express();
const PORT = process.env.PORT || 3000;

const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Asegúrate de que el router esté configurado correctamente
app.use('/dynamo', router);

// Inicializa el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
