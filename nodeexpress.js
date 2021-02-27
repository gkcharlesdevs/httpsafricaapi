const https = require("https");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(function (req, res, next) {
  console.log("Hello Middleware");

  next();
});

app.get("/", function (req, res, next) {
  res.send("Hello World");
});

let port = 3000;

const option = {
  key: fs.readFileSync("keys/server-key.pem"),

  cert: fs.readFileSync("keys/server-cert.pem"),
};

const server = https.createServer(option, app);

server.listen(port, function () {
  console.log("server listening at port ", port);
});
