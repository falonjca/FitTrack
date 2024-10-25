const express = require('express');
const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb'); // Importar ambas clases

const router = express.Router();
const dynamoDBClient = new DynamoDBClient({ // Cambié `client` a `dynamoDBClient` para ser consistente
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Función para crear la tabla de Usuarios
const createUsuariosTable = async () => {
    const params = {
        TableName: "Usuarios",
        KeySchema: [
            { AttributeName: "UserId", KeyType: "HASH" },
        ],
        AttributeDefinitions: [
            { AttributeName: "UserId", AttributeType: "S" },
            { AttributeName: "Email", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: "EmailIndex",
                KeySchema: [
                    { AttributeName: "Email", KeyType: "HASH" }
                ],
                Projection: {
                    ProjectionType: "ALL",
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            },
        ],
    };

    try {
        const data = await dynamoDBClient.send(new CreateTableCommand(params));
        console.log("Tabla Usuarios creada con éxito:", data);
    } catch (error) {
        console.error("Error al crear la tabla Usuarios:", error);
    }
};
// Función para crear la tabla de Entrenamientos
const createEntrenamientosTable = async () => {
    const params = {
        TableName: "Entrenamientos",
        KeySchema: [
            { AttributeName: "EntrenamientoId", KeyType: "HASH" }, // Clave primaria
        ],
        AttributeDefinitions: [
            { AttributeName: "EntrenamientoId", AttributeType: "S" }, // ID del entrenamiento
            { AttributeName: "UserId", AttributeType: "S" },         // ID del usuario para consultas
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    };

    try {
        const data = await dynamoDBClient.send(new CreateTableCommand(params));
        console.log("Tabla Entrenamientos creada con éxito:", data);
    } catch (error) {
        console.error("Error al crear la tabla Entrenamientos:", error);
    }
};
// Función para crear la tabla de Medidas
const createMedidasTable = async () => {
    const params = {
        TableName: "Medidas",
        KeySchema: [
            { AttributeName: "UserId", KeyType: "HASH" },  // Clave primaria
            { AttributeName: "Timestamp", KeyType: "RANGE" }, // Clave de ordenamiento
        ],
        AttributeDefinitions: [
            { AttributeName: "UserId", AttributeType: "S" },    // ID del usuario
            { AttributeName: "Timestamp", AttributeType: "S" },  // Marca de tiempo
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
    };

    try {
        const data = await dynamoDBClient.send(new CreateTableCommand(params));
        console.log("Tabla Medidas creada con éxito:", data);
    } catch (error) {
        console.error("Error al crear la tabla Medidas:", error);
    }
};

// Función para crear la tabla de Rutinas
// Función para crear la tabla de Rutinas con GSI
const createRutinasTable = async () => {
    const params = {
        TableName: "Rutinas",
        KeySchema: [
            { AttributeName: "RutinaId", KeyType: "HASH" }, // Clave primaria
        ],
        AttributeDefinitions: [
            { AttributeName: "RutinaId", AttributeType: "S" }, // ID de la rutina
            { AttributeName: "UserId", AttributeType: "S" },   // ID del usuario para el GSI
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        GlobalSecondaryIndexes: [
            {
                IndexName: "UserIdIndex",
                KeySchema: [
                    { AttributeName: "UserId", KeyType: "HASH" } // Clave del índice
                ],
                Projection: {
                    ProjectionType: "ALL",
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5,
                },
            },
        ],
    };

    try {
        const data = await dynamoDBClient.send(new CreateTableCommand(params));
        console.log("Tabla Rutinas creada con éxito:", data);
    } catch (error) {
        console.error("Error al crear la tabla Rutinas:", error);
    }
};

// Inicializa el servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Llama a las funciones para crear las tablas
const initializeTables = async () => {
    await createUsuariosTable();
    await createEntrenamientosTable();
    await createMedidasTable();
    await createRutinasTable();
};

// Ejecutar la inicialización y luego iniciar el servidor
initializeTables().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error("Error al inicializar las tablas:", error);
});

module.exports = router; // Asegúrate de que esto esté aquí