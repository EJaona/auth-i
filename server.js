const helmet = require("helmet");
const express = require("express");
const UserRoute = require("./UsersRoute");
const RegisterRoute = require("./RegisterRoute");
const LoginRoute = require("./LoginRoute");
const db = require("./db");

const protected = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    next();
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
