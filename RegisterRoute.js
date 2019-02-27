const express = require("express");
const bcrypt = require("bcryptjs");
const RegisterRoute = express.Router();
const db = require("./db");

RegisterRoute.post("/", async (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash;

  try {
    const newUser = await db.from("users").insert(credentials);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "We failed" });
  }
});

module.exports = RegisterRoute;
