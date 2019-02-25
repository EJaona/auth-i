const express = require("express");

const UserRoute = express.Router();
const db = require("./db");

UserRoute.get("/", async (req, res) => {
  try {
    const users = await db.select().from("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "We failed" });
  }
});

module.exports = UserRoute;
