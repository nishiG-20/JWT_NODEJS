const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "12345678";

app.get("/", (req, res) => {
  res.json({
    message: "A sample api",
  });
});

app.post("/login", (req, res) => {
  const users = {
    id: 1,
    username: "nishant",
    email: "abcd@gmail.com",
  };
  jwt.sign({ users }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
        console.log(err)
      res.send({
        result: "Invalid token"
      });
    } else {
      res.send({
        message: "profile accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token=token
    next();
  } else {
    res.send({
      result: "token is not valid..",
    });
  }
}

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
