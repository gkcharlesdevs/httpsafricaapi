const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    trim: true,
    maxlength: [50, "name can not be more than 50 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "name can not be more than 50 characters"],
  },
  status: {
    type: [String],
    required: [true, "Please add a status"],
    enum: ["Completed", "Not Completed"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
