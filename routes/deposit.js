const express = require("express");
const { createDeposit } = require("../controllers/deposit");

const { requireSignin } = require("../controllers/auth");
const {
  createDepositValidator
} = require("../controllers/validators.js/index.js");
const { userById } = require("../controllers/user");

const router = express.Router();

router.post(
  "/deposit/new/:userId",
  requireSignin,
  createDeposit,
  createDepositValidator
);

router.param("userId", userById);
// router.param("todoId", toDoById);

module.exports = router;
