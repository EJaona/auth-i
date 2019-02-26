const express = require("express");
const helmet = require("helmet");
const UserRoute = require("./UsersRoute");
const RegisterRoute = require("./RegisterRoute");
const LoginRoute = require("./LoginRoute");
const session = require("express-session");

const sessionConfig = {
  name: "oatmeals",
  secret: "it's a secret, don't tell anyone",
  cookies: {
    maxAge: 600000,
    security: false
  },
  httpOnly: true,
  reSave: false,
  saveUninitialized: false
};

const server = express();
server.use(express.json());
server.use(session(sessionConfig));
server.use(helmet());
server.use("/api/register", RegisterRoute);
server.use("/api/login", LoginRoute);
server.use("/api/users", UserRoute);

module.exports = server;
