const express = require("express");
const bcrypt = require("bcryptjs");
const LoginRoute = express.Router();
const db = require("./db");

LoginRoute.post("/", (req, res) => {
  let { userName, password } = req.body;
  db("users")
    .where({ userName: userName })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.userName}` });
      } else {
        res.status(401).json({ message: "Thou shall not pass" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = LoginRoute;
