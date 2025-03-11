const express = require('express');
const mysqlDB = require('../DB/mysqlDB');
const app = express.Router();


app.use(express.json());

app.post('/user', (req, res) => {
    const { name, email, description, age } = req.body;

    const query = 'INSERT INTO users (name, email, description, age) VALUES (?, ?, ?, ?)';

    mysqlDB.query(query, [name, email, description, age], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        return res.status(201).send({
            message: 'User created successfully',
            user: { id: result.insertId, name, email, description, age }
        });
    });
});

app.get('/user', (req, res) => {
    const query = 'SELECT * FROM users';

    mysqlDB.query(query, (err, results) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        return res.status(200).send(results);
    });
});

app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, description, age } = req.body;

    const query = 'UPDATE users SET name = ?, email = ?, description = ?, age = ? WHERE id = ?';

    mysqlDB.query(query, [name, email, description, age, id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'User updated successfully' });
    });
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM users WHERE id = ?';

    mysqlDB.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'User deleted successfully' });
    });
});

app.get('/user/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM users WHERE id = ?';

    mysqlDB.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        if (result.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send(result[0]);
    });
});

app.get('/user/:id/poems', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM poems WHERE user_id = ?';

    mysqlDB.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        return res.status(200).send(result);
    });
});

app.post('/user/:id/poems', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const query = 'INSERT INTO poems (user_id, title, content) VALUES (?, ?, ?)';

    mysqlDB.query(query, [id, title, content], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }

        return res.status(201).send({
            message: 'Poem created successfully',
            poem: { id: result.insertId, user_id: id, title, content }
        });
    });
});

module.exports = app;
