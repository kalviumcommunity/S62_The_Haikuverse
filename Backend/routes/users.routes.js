const express = require("express");
const { getDB } = require("../DB/mongo-client");
const app = express.Router();
const { ObjectId } = require('mongodb');


app.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const db = await getDB("User");
    const insertData = await db.insertOne({
      name,
      email,
      poems: [] 
    });

    const user = await db.findOne({ _id: insertData.insertedId });

    return res.status(201).send({
      message: "User created successfully",
      user,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    const db = await getDB("User");
    const userData = await db.find().toArray();
    return res.status(200).send(userData);
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});


app.delete("/:id", async (req, res) => {
  try {
    const db = await getDB("User");
    const { id } = req.params;
    const deleteUser = await db.deleteOne({ _id: new ObjectId(id) });
    return res
      .status(200)
      .send({ message: "Deleted successfully", deleteUser });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const db = await getDB("User");
    const { id } = req.params;
    let { password, ...userData } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 10);
      userData.password = password;
    }

    const updateUser = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: userData }
    );
    return res.status(200).send({ message: "Updated successfully", updateUser });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});


app.get("/user/:id/poems", async (req, res) => {
  try {
    const db = await getDB("User");
    const { id } = req.params;
    
    const user = await db.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const poemDb = await getDB("poems");
    const poems = await poemDb.find({ _id: { $in: user.poems.map(poemId => new ObjectId(poemId)) } }).toArray();

    return res.status(200).send(poems);
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

module.exports = app;
