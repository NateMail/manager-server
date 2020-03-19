const express = require("express");

const {
  createBill,
  billById,
  billsByUser,
  updateBill,
  singleBill,
  deleteBill,
  isCreator,
  isOwner
} = require("../controllers/bill");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createBillValidator } = require("../controllers/validators.js");

const router = express.Router();

// Create Bill
router.post(
  "/bill/new/:userId",
  requireSignin,
  createBill,
  createBillValidator
);

// Get Bill
router.get("/bill/by/:userId", requireSignin, isOwner, billsByUser);

// Get single Bill
router.get("/bill/:billId", requireSignin, isCreator, singleBill);

// Update Bill
router.put("/bill/edit/:billId", requireSignin, isCreator, updateBill);

// Delete Bill
router.delete("/bill/remove/:billId", requireSignin, isCreator, deleteBill);

router.param("userId", userById);
router.param("billId", billById);

module.exports = router;
