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

// Show body
router.get("/my/body/:userId", requireSignin, isOwner, userBody);

// Show body info
router.get("/body/:bodyId", requireSignin, isCreator, singleBody);

// Update body
router.put("/body/edit/:bodyId", requireSignin, isCreator, updateBody);

router.param("userId", userById);
router.param("bodyId", bodyById);

module.exports = router;
