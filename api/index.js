const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const ws = require("ws");
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
    res.send({});
  }
});

app.get("/login", async (req, res) => {
  const password = "1234";
  const user = await User.findOne({ username: "test1" });

  if (user) {
    const { _id } = user;
    bcryptjs
      .compare(password, user.password)
      .then(() => {
        jwt.sign({ _id, username }, jwtSecret, {}, (error, token) => {
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .status("200")
            .json({ _id, username });
        });
      })
      .catch(() => {
        res.status(401).json("Incorrect username or password");
      });
  } else {
    res.status(401).json("Unauthorized");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    const { _id } = user;
    bcryptjs
      .compare(password, user.password)
      .then((result) => {
        if (result !== true) throw new Error("Incorrect username or password");

        return new Promise((resolve, reject) => {
          jwt.sign({ _id, username }, jwtSecret, {}, (error, token) => {
            if (token) resolve(token);
            reject();
          });
        }).then((token) => {
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .status(200)
            .json({ _id, username });
        });
      })
      .catch((error) => {
        res.status(401).json(error?.message || "Unauthorized");
      });
  } else {
    res.status(401).json("Unauthorized");
  }
});

const server = app.listen("4000");
const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  const token = parseCookies(req)["token"];
  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if(err) throw new Error(err);

      connection.userId = user._id;
      connection.username = user.username;
    });
  }
});

parseCookies = (request) => {
  const cookies = {};
  const cookiesString = request.headers?.cookie;
  if (!cookiesString) {
    return cookies;
  }

  const cookiesList = cookiesString.split(";");
  cookiesList.forEach((cookieStr) => {
    const cookieObject = cookieStr.split("=");
    cookies[cookieObject[0]] = cookieObject[1];
  });
  return cookies;
};
