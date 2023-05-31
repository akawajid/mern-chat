const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true
}));

const jwtSecret = process.env.JWT_SECRET;
mongoose.connect(process.env.MONGO_URI);

app.get("/test", (req, res) => {
  res.json("ok");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("All fields are required");
  }

  const newUser = await User.create({
    username,
    password: await bcryptjs.hash(password, 10),
  });

  await jwt.sign({ id: newUser._id }, jwtSecret, {}, (err, result) => {
    if (err) throw err;

    const { _id } = newUser;

    res.status(201).json({ _id, username });
  });
});

app.listen("4000", () => {
  console.log("Server started...");
});
