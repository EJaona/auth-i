const express = require("express");

const UserRoute = express.Router();
const db = require("./db");

UserRoute.get("/", async (req, res) => {
  try {
    const users = await db.select("id", "userName as name").from("users");
    res.status(200).json({ users, token: req.decodedToken });
  } catch (error) {
    res.status(500).json({ message: "We failed" });
  }
});

module.exports = UserRoute;
