const express = require("express");
const { createList } = require("../controllers/list");
const { requireSignin } = require("../controllers/auth");
const { createListValidator } = require("../controllers/validators.js");
const { userById } = require("../controllers/user");

const router = express.Router();

// create list
router.post(
  "/list/new/:userId",
  requireSignin,
  createList,
  createListValidator
);

router.param("userId", userById);

module.exports = router;
