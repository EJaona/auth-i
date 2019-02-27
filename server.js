const helmet = require("helmet");
const express = require("express");
const UserRoute = require("./UsersRoute");
const RegisterRoute = require("./RegisterRoute");
const LoginRoute = require("./LoginRoute");
const jwt = require("jsonwebtoken");

const db = require("./db");

const protected = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "No token provided" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const server = express();
server.use(express.json());
server.use(helmet());
server.use("/api/register", RegisterRoute);
server.use("/api/login", LoginRoute);
server.use("/api/users", protected, UserRoute);

module.exports = server;
