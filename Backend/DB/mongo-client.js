if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config();
}

const mongoclient = require('mongodb').MongoClient;
const connection = new mongoclient(process.env.DB_URL);


async function getDB() {
    let db = connection.db('S62_The_Haikuverse');
    db = db.collection('User');
    return db;
}

module.exports = { getDB, connection };