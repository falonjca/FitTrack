// src/config/dynamoConfig.js

const AWS = require('aws-sdk');

// Configuración de DynamoDB
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Crear instancia de DocumentClient para interactuar con DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Función para crear las tablas necesarias
const crearTablas = async () => {
  const tablas = [
    {
      TableName: 'Usuarios',
      KeySchema: [
        { AttributeName: 'UserId', KeyType: 'HASH' } // Clave primaria
      ],
      AttributeDefinitions: [
        { AttributeName: 'UserId', AttributeType: 'S' }, // 'S' para String
        { AttributeName: 'Email', AttributeType: 'S' }, // Email como atributo adicional
        { AttributeName: 'FechaRegistro', AttributeType: 'S' }, // Atributo adicional
        { AttributeName: 'Edad', AttributeType: 'N' }, // Atributo adicional
        { AttributeName: 'Sexo', AttributeType: 'S' } // Atributo adicional
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      TableName: 'Entrenamientos',
      KeySchema: [
        { AttributeName: 'EntrenamientoId', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'EntrenamientoId', AttributeType: 'S' },
        { AttributeName: 'UserId', AttributeType: 'S' }, // Clave foránea
        { AttributeName: 'Tipo', AttributeType: 'S' }, // Atributo adicional
        { AttributeName: 'Duracion', AttributeType: 'N' }, // Atributo adicional
        { AttributeName: 'Calorias', AttributeType: 'N' }, // Atributo adicional
        { AttributeName: 'Fecha', AttributeType: 'S' } // Atributo adicional
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      TableName: 'Medidas',
      KeySchema: [
        { AttributeName: 'UserId', KeyType: 'HASH' },
        { AttributeName: 'Timestamp', KeyType: 'RANGE' } // Clave compuesta
      ],
      AttributeDefinitions: [
        { AttributeName: 'UserId', AttributeType: 'S' },
        { AttributeName: 'Timestamp', AttributeType: 'S' },
        { AttributeName: 'Grasa', AttributeType: 'N' }, // Atributo adicional
        { AttributeName: 'Musculo', AttributeType: 'N' }, // Atributo adicional
        { AttributeName: 'Altura', AttributeType: 'N' }, // Atributo adicional
        { AttributeName: 'Peso', AttributeType: 'N' } // Atributo adicional
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      TableName: 'Rutinas',
      KeySchema: [
        { AttributeName: 'RutinaId', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'RutinaId', AttributeType: 'S' },
        { AttributeName: 'UserId', AttributeType: 'S' }, // Clave foránea
        { AttributeName: 'Nombre', AttributeType: 'S' }, // Atributo adicional
        { AttributeName: 'Descripcion', AttributeType: 'S' }, // Atributo adicional
        { AttributeName: 'FechaCreacion', AttributeType: 'S' } // Atributo adicional
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ];

  for (const tabla of tablas) {
    try {
      await dynamoDB.createTable(tabla).promise();
      console.log(`Tabla ${tabla.TableName} creada exitosamente.`);
    } catch (error) {
      if (error.code !== 'ResourceInUseException') {
        console.error(`Error creando la tabla ${tabla.TableName}:`, error);
      } else {
        console.log(`La tabla ${tabla.TableName} ya existe.`);
      }
    }
  }
};

// Llamar a la función para crear las tablas (puedes comentar esto después de la primera ejecución)
// crearTablas();

module.exports = dynamoDB;
