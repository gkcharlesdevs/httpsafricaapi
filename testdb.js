const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,

    useCreateIndex: true,

    useFindAndModify: true,

    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected ${conn.connection.host}`);
};

connectDB();
