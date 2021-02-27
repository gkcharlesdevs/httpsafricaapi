const fs = require("fs");
const https = require("https");

const options = {
  key: fs.readFileSync("keys/server-key.pem"),

  cert: fs.readFileSync("keys/server-cert.pem"),
};

const server = https.createServer(options, function (req, res) {
  res.end("Hello World");
});

server.listen(5000, function () {
  console.log("server listening on port 5000");
});
