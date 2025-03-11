const express = require("express");
const mysqlDB = require("../DB/mysqlDB"); 
const app = express.Router();

app.use(express.json());

app.post("/poem", (req, res) => {
  const { userId, title, content } = req.body;


  if (!userId || isNaN(userId)) {
    return res.status(400).send({ message: "Invalid user ID" });
  }


  const insertPoemQuery = 'INSERT INTO poems (user_id, title, content) VALUES (?, ?, ?)';
  mysqlDB.query(insertPoemQuery, [userId, title, content], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    const poemId = result.insertId;

    const updateUserQuery = 'UPDATE users SET poems = CONCAT_WS(",", poems, ?) WHERE id = ?';
    mysqlDB.query(updateUserQuery, [poemId, userId], (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "User not found" });
      }

      const getPoemQuery = 'SELECT * FROM poems WHERE id = ?';
      mysqlDB.query(getPoemQuery, [poemId], (err, poemResult) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }

        return res.status(201).send({
          message: "Poem created and added to user",
          poem: poemResult[0],
        });
      });
    });
  });
});

module.exports = app;
