const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env variables
dotenv.config({
  path: "./config/config.env",
});

// connect to database
connectDB();

// Routes files
const todos = require("./routes/todos");
const auth = require("./routes/auth");
const users = require("./routes/users");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/todos", todos);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

// Error Handlers
app.use(errorHandler);

const options = {
  key: fs.readFileSync("keys/server-key.pem"),
  cert: fs.readFileSync("keys/server-cert.pem"),
};

PORT = process.env.PORT || 5007;

const server = https.createServer(options, app);

const unhandledError = server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  unhandledError.close(() => process.exit(1));
});
