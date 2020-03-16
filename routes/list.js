const express = require("express");
const {
  createList,
  listById,
  isCreator,
  isOwner,
  listsByUser,
  singleList,
  deleteList
} = require("../controllers/list");
const { requireSignin } = require("../controllers/auth");
const { createListValidator } = require("../controllers/validators.js");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create list
router.post(
  "/list/new/:userId",
  requireSignin,
  createList,
  createListValidator
);

// Get lists
router.get("/list/by/:userId", requireSignin, isOwner, listsByUser);

// Get single list
router.get("/list/:listId", requireSignin, isCreator, singleList);

// Delete list
router.delete("/list/remove/:listId", requireSignin, isCreator, deleteList);

router.param("userId", userById);
router.param("listId", listById);

module.exports = router;
