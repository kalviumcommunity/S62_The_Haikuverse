const mysqlDB = require('./DB/mysqlDB');

const clearUsers = `DELETE FROM users`;
mysqlDB.query(clearUsers, (err, result) => {
    if (err) {
        console.error("Error clearing users:", err);
        return;
    }
    console.log("Users table cleared");

    seedUsers();
});

const seedUsers = () => {
    const seedUsersQuery = `
    INSERT INTO users (name, email, description, age) 
    VALUES
        ('John Doe', 'john@example.com', 'A poet with a love for nature', 30),
        ('Jane Smith', 'jane@example.com', 'An artist at heart, inspired by the world', 25),
        ('Albert Johnson', 'albert@example.com', 'A musician and a dreamer', 35)
    `;

    mysqlDB.query(seedUsersQuery, (err, result) => {
        if (err) {
            console.error("Error inserting users:", err);
            return;
        }
        console.log("Users seeded");


        const userIds = result.insertId;
        console.log("User IDs:", userIds);


        seedPoems(userIds);
    });
};

const seedPoems = (userIds) => {
    const poems = `
    INSERT INTO poems (user_id, title, content) 
    VALUES
        (15, 'The Haiku of Life', 'Life is a poem, pure, fleeting, bright.'),
        (16, 'Sunrise and Hope', 'A new dawn breaks, painting skies with gold.'),
        (17, 'Dreams Beyond the Stars', 'Reach for the stars, let your dreams be bold.')
    `;

    mysqlDB.query(poems, (err, result) => {
        if (err) {
            console.error("Error inserting poems:", err);
            return;
        }
        console.log("Poems seeded");


        seedEntities();
    });
};

const seedEntities = () => {
    const entities = `
    INSERT INTO entities (name, description, created_by) 
    VALUES
        ('Forest of Serenity', 'A peaceful forest where time slows down.', 15),
        ('Ocean Waves', 'A place where dreams meet the horizon.', 16),
        ('Mountains of Wisdom', 'Ancient mountains holding the secrets of the world.', 17)
    `;

    mysqlDB.query(entities, (err, result) => {
        if (err) {
            console.error("Error inserting entities:", err);
            return;
        }
        console.log("Entities seeded");
    });
};
