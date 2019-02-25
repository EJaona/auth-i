const express = require("express");
const knex = require("knex");
const helmet = require("helmet");
const UserRoute = require("./UsersRoute");
const RegisterRoute = require("./RegisterRoute");
const LoginRoute = require("./LoginRoute");
const db = require("./db");

const server = express();
server.use(express.json());
server.use("/api/register", RegisterRoute);
server.use("/api/login", LoginRoute);
server.use("/api/users", UserRoute);

module.exports = server;
