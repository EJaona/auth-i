const express = require("express");
const bcrypt = require("bcryptjs");
const LoginRoute = express.Router();
const db = require("./db");

LoginRoute.post("/", async (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  try {
    const userLogin = await db("users").insert(credentials);
    res.status(200).json(userLogin);
  } catch (error) {
    res.status(500).json({ message: "We failed" });
  }
});

module.exports = LoginRoute;
