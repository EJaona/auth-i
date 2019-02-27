require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const LoginRoute = express.Router();
const db = require("./db");

const generateToken = user => {
  const payload = {
    username: user.userName
  };
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: "10m"
  };

  return jwt.sign(payload, secret, options);
};

LoginRoute.post("/", async (req, res) => {
  let { userName, password } = req.body;
  try {
    const user = await db("users")
      .where({ userName: userName })
      .first();

    if (user && bcrypt.compareSync(password, user.password)) {
      // req.session.user = user;
      const token = generateToken(user);
      res.status(200).json({ message: `Welcome ${user.userName}`, token });
    } else {
      res.status(401).json({ message: "Thou shall not pass" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = LoginRoute;
