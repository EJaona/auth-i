const express = require("express");
const bcrypt = require("bcryptjs");
const LoginRoute = express.Router();
const db = require("./db");

LoginRoute.post("/", async (req, res) => {
  let { userName, password } = req.body;
  try {
    const user = await db("users")
      .where({ userName: userName })
      .first();

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.userName}` });
    } else {
      res.status(401).json({ message: "Thou shall not pass" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = LoginRoute;
