if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}

const mongoclient = require('mongodb').MongoClient;
const connection = new mongoclient(process.env.DB_URL);

async function getDB(collectionName) {
    // Ensure the connection is established
    await connection.connect();

    // Access the database
    let db = connection.db('S62_The_Haikuverse');

    // Return the specified collection dynamically
    return db.collection(collectionName); 
}

module.exports = { getDB, connection };
