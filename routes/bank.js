const express = require("express");

const {
  createBank,
  bankById,
  bankByUser,
  updateBank,
  singleBank,
  isCreator,
  isOwner
} = require("../controllers/bank");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create bank info
router.post("/bank/new/:userId", requireSignin, createBank);

// Get Bank
router.get("/bank/by/:userId", requireSignin, isOwner, bankByUser);

// Get single Bank
router.get("/bank/:bankId", requireSignin, isCreator, singleBank);

// Update bank
router.put("/edit/bank/:bankId", requireSignin, isCreator, updateBank);

router.param("userId", userById);
router.param("bankId", bankById);

module.exports = router;
