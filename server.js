const helmet = require("helmet");
const express = require("express");
const UserRoute = require("./UsersRoute");
const RegisterRoute = require("./RegisterRoute");
const LoginRoute = require("./LoginRoute");
const db = require("./db");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const sessionConfig = {
  name: "oatmeals",
  secret: "it's a secret, don't tell anyone",
  cookies: {
    maxAge: 1000,
    security: false
  },
  httpOnly: true,
  reSave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    tablename: "sessions",
    sidfieldname: "sessionID",
    knex: db,
    createTable: true,
    clearInterval: 600000
  })
};

const protected = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Aint nobody got time for that" });
  }
};

const server = express();
server.use(express.json());
server.use(session(sessionConfig));
server.use(helmet());
server.use("/api/register", RegisterRoute);
server.use("/api/login", LoginRoute);
server.use("/api/users", protected, UserRoute);

server.get("/api/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.json({ message: "bye bye" });
  } else {
    res.json({ message: "You already logged out" });
  }
});

module.exports = server;
