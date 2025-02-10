if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const bcrypt = require("bcryptjs");
const express = require("express");

const { getDB, connection } = require("../DB/mongo-client.js");
const app = express.Router();
const { ObjectId } = require('mongodb');
const port = process.env.PORT;

app.get("/user", async (req, res) => {
  try {
    const db = await getDB();
    const userData = await db.find().toArray();
    return res.status(200).send(userData);
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;
    const userData = await db.findOne({ _id: new ObjectId(id) });
    if (userData) {
      return res.status(200).send(userData);
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
     
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await getDB();
    const insertData = await db.insertOne({
      name,
      email,
      password: hashedPassword, 
    });

    return res.status(201).send({
      message: "Data inserted successfully",
      insertData,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;
    const deleteUser = await db.deleteOne({ _id: new ObjectId(id) });
    return res
      .status(200)
      .send({ message: "Deleted successfully", deleteUser });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const db = await getDB();
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


module.exports = app;
