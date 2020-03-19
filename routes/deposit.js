const express = require("express");
const {
  createDeposit,
  depositsByUser,
  singleDeposit,
  updateDeposit,
  deleteDeposit,
  depositById,
  isCreator,
  isOwner
} = require("../controllers/deposit");

const { requireSignin } = require("../controllers/auth");
const {
  createDepositValidator
} = require("../controllers/validators.js/index.js");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create Deposit
router.post(
  "/deposit/new/:userId",
  requireSignin,
  createDeposit,
  createDepositValidator
);

// Get Deposit
router.get("/deposit/by/:userId", requireSignin, isOwner, depositsByUser);

// Get single Deposit
router.get("/deposit/:depositId", requireSignin, isCreator, singleDeposit);

// Update Deposit
router.put("/deposit/edit/:depositId", requireSignin, isCreator, updateDeposit);

// Delete Deposit
router.delete(
  "/deposit/remove/:depositId",
  requireSignin,
  isCreator,
  deleteDeposit
);

router.param("userId", userById);
router.param("depositId", depositById);

module.exports = router;
