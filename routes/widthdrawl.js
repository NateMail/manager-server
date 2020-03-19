const express = require("express");
const {
  createWidthdrawal,
  widthdrawalsByUser,
  singleWidthdrawal,
  updateWidthdrawal,
  deleteWidthdrawal,
  widthdrawalById,
  isCreator,
  isOwner
} = require("../controllers/widthdraw");

const { requireSignin } = require("../controllers/auth");
const {
  createWidthdrawalValidator
} = require("../controllers/validators.js/index.js");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create Widthdrawal
router.post(
  "/widthdrawal/new/:userId",
  requireSignin,
  createWidthdrawal,
  createWidthdrawalValidator
);

// Get widthdrawal
router.get(
  "/widthdrawal/by/:userId",
  requireSignin,
  isOwner,
  widthdrawalsByUser
);

// Get single widthdrawal
router.get(
  "/widthdrawal/:widthdrawalId",
  requireSignin,
  isCreator,
  singleWidthdrawal
);

// Update widthdrawal
router.put(
  "/widthdrawal/edit/:widthdrawalId",
  requireSignin,
  isCreator,
  updateWidthdrawal
);

// Delete widthdrawal
router.delete(
  "/widthdrawal/remove/:widthdrawalId",
  requireSignin,
  isCreator,
  deleteWidthdrawal
);

router.param("userId", userById);
router.param("widthdrawalId", widthdrawalById);

module.exports = router;
