const express = require("express");
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");

const todo = require("../models/Todo");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(todo), getTodos)
  .post(protect, authorize("user", "admin"), createTodo);

router
  .route("/:id")
  .get(getTodo)
  .put(protect, authorize("user", "admin"), updateTodo)
  .delete(protect, authorize("user", "admin"), deleteTodo);

module.exports = router;
