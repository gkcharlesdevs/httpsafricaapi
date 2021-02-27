const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  req.addProperty = "my name";

  console.log("Hello Middleware");

  next();
});

let port = 3000;

app.get("/", function (req, res, next) {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("server listening at port", port);
});
