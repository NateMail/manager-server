const express = require("express");
const {
  createList,
  listById,
  isCreator,
  isOwner,
  listByUser,
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

// Delete list
router.delete("/list/remove/:listId", requireSignin, isCreator, deleteList);

router.param("userId", userById);
router.param("listId", listById);

module.exports = router;
