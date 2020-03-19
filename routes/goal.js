const express = require("express");
const {
  createGoal,
  goalsByUser,
  singleGoal,
  updateGoal,
  deleteGoal,
  goalById,
  isCreator,
  isOwner
} = require("../controllers/goal");

const { requireSignin } = require("../controllers/auth");
const {
  createGoalValidator
} = require("../controllers/validators.js/index.js");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create Goal
router.post(
  "/goal/new/:userId",
  requireSignin,
  createGoal,
  createGoalValidator
);

// Get Goal
router.get("/goal/by/:userId", requireSignin, isOwner, goalsByUser);

// Get Single Goal
router.get("/goal/:goalId", requireSignin, isCreator, singleGoal);

// Update Goal
router.put("/goal/edit/:goalId", requireSignin, isCreator, updateGoal);

// Delete Goal
router.delete("/goal/remove/:goalId", requireSignin, isCreator, deleteGoal);

router.param("userId", userById);
router.param("goalId", goalById);

module.exports = router;
