const mysqlDB = require('../DB/mysqlDB'); 

// Users table schema
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    age INT,
    poems TEXT  -- Comma-separated list of poem IDs
)`;

// Poems table schema
const createPoemsTable = `
CREATE TABLE IF NOT EXISTS poems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

// Entities table schema
const createEntitiesTable = `
CREATE TABLE IF NOT EXISTS entities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
)`;

mysqlDB.query(createUsersTable, (err, result) => {
    if (err) throw err;
    console.log("Users table created or already exists");
});
mysqlDB.query(createPoemsTable, (err, result) => {
    if (err) throw err;
    console.log("Poems table created or already exists");
});
mysqlDB.query(createEntitiesTable, (err, result) => {
    if (err) throw err;
    console.log("Entities table created or already exists");
});

module.exports = mysqlDB;
