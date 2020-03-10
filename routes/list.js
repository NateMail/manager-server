const express = require("express");
const { createList } = require("../controllers/list");
const { requireSignin } = require("../controllers/auth");
const { createListValidator } = require("../controllers/validators.js");

const router = express.Router();

router.post(
  "/list/new/:userId",
  requireSignin,
  createList,
  createListValidator
);

module.exports = router;
