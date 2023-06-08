const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

const jwtSecret = process.env.JWT_SECRET;
mongoose.connect(process.env.MONGO_URI);

app.get("/test", (req, res) => {
  res.json("ok");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send("All fields are required");
  }

  try {
    const newUser = await User.create({
      username,
      password: await bcryptjs.hash(password, 10),
    });

    await jwt.sign(
      { _id: newUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;

        const { _id } = newUser;

        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({ _id, username });
      }
    );
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      res.status(500).json("Username already exist!");
    }
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies["token"];
  if (token) {
    const user = jwt.verify(token, jwtSecret);
    res.send(user);
  } else {
    res.status(401).send({});
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username,
    password: await bcryptjs.hash(password, 10),
  });

  console.log(user);

  if (user) {
    const { _id } = user;
    await jwt.sign({ _id, username }, jwtSecret, {}, (error, token) => {
      if (error) throw error;

      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(201)
        .json({ _id, username });
    });
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.listen("4000", () => {
  console.log("Server started...");
});
