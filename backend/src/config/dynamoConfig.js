// src/config/dynamoConfig.js

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const { ListTablesCommand } = require('@aws-sdk/client-dynamodb');

// Configuración de AWS
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  //credentials: {
  //  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 // },
});

// Crear un DocumentClient
const docClient = DynamoDBDocumentClient.from(client);


// Función para crear las tablas necesarias
const crearTablas = async () => {

  // revisar esto
  const tablasCreadas = await client.send(new ListTablesCommand({}));

  const tablas = [
    {
      TableName: 'Usuarios',
      KeySchema: [
        { AttributeName: 'UserId', KeyType: 'HASH' } // Clave primaria
      ],
      AttributeDefinitions: [
        { AttributeName: 'UserId', AttributeType: 'S' }, // 'S' para String
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
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      TableName: 'Medidas',
      KeySchema: [
        { AttributeName: 'UserId', KeyType: 'HASH' }, // Partition Key
        { AttributeName: 'Timestamp', KeyType: 'RANGE' } // Sort Key
      ],
      AttributeDefinitions: [
        { AttributeName: 'UserId', AttributeType: 'S' },
        { AttributeName: 'Timestamp', AttributeType: 'S' } 
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
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ];

  for (const tabla of tablas) {
    if(!tablasCreadas.TableNames.includes(tabla.TableName)){
    try {
      await client.send(new CreateTableCommand(tabla));
      console.log(`Tabla ${tabla.TableName} creada exitosamente`);
    } catch (error) {
      console.error(`Error creando la tabla ${tabla.TableName}:`, error);
    }
    }else{
      console.log(`La tabla ${tabla.TableName} ya existe`);
    }

  }

};

module.exports = { client, docClient, crearTablas };