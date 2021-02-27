const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Todo = require("../models/Todo");

// @desc    Get all todos
// @route   Get /api/v1/todos
// @access  Public
exports.getTodos = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get a single todo
// @route   Get /api/v1/todos/:id
// @access  Public
exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todos not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: todo });
});

// @desc    Create new todo
// @route   POST /api/v1/todos
// @access  Private
exports.createTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create(req.body);

  res.status(201).json({
    success: true,
    data: todo,
  });
});

// @desc    Update todo
// @route   PUT /api/v1/todos/:id
// @access  Private
exports.updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
    );
  }

  if (todo.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this todo`,
        401
      )
    );
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: todo,
  });
});

// @desc    Delete a todo
// @route   DELETE /api/v1/todos/:id
// @access  Private
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(
      new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is todo owner
  if (todo.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this todo`,
        401
      )
    );
  }

  todo.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
