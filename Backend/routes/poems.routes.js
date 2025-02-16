const express = require("express");
const { getDB } = require("../DB/mongo-client");
const { ObjectId } = require("mongodb");
const app = express.Router();

app.use(express.json());


app.post("/poem", async (req, res) => {
    try {
      const { userId, title, content } = req.body;

      if (!ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid user ID" });
      }
  
      const db = await getDB("poems");

      const newPoem = {
        title,
        content
      };
      const insertPoem = await db.insertOne(newPoem);
      const poemId = insertPoem.insertedId;
  
      const userDb = await getDB("User");
      const updateUser = await userDb.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { poems: poemId } } 
      );
  
      if (updateUser.modifiedCount === 0) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const createdPoem = await db.findOne({ _id: poemId });
  
      return res.status(201).send({
        message: "Poem created and added to user",
        poem: createdPoem,
      });
    } catch (er) {
      return res.status(500).send({ message: er.message });
    }
  });

  module.exports = app;