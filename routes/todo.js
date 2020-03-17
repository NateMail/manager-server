const express = require("express");
const {
  createToDo,
  toDoById,
  isCreator,
  isOwner,
  toDosByUser,
  singleToDo,
  updateToDo,
  deleteToDo
} = require("../controllers/todo");
const { requireSignin } = require("../controllers/auth");
const {
  createToDoValidator
} = require("../controllers/validators.js/index.js");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create Todo
router.post(
  "/todo/new/:userId",
  requireSignin,
  createToDo,
  createToDoValidator
);

// Get todos
router.get("/todo/by/:userId", requireSignin, isOwner, toDosByUser);

// Get single todo
router.get("/todo/:todoId", requireSignin, isCreator, singleToDo);

// Update todo
router.put("/todo/edit/:todoId", requireSignin, isCreator, updateToDo);

// Delete todo
router.delete("/todo/remove/:todoId", requireSignin, isCreator, deleteToDo);

router.param("userId", userById);
router.param("todoId", toDoById);

module.exports = router;
