const express = require("express");
const {
  createBody,
  bodyById,
  updateBody,
  isCreator,
  singleBody,
  isOwner,
  userBody
} = require("../controllers/body");

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createBodyValidator } = require("../controllers/validators.js");

const router = express.Router();

// Create body
router.post(
  "/body/new/:userId",
  requireSignin,
  createBody,
  createBodyValidator
);

router.param("userId", userById);

module.exports = router;
