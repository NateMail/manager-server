const express = require("express");

const { createBank } = require("../controllers/bank");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

// Create bank info
router.post("/bank/new/:userId", requireSignin, createBank);

router.param("userId", userById);

module.exports = router;
