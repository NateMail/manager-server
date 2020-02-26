/**
 * Required External Modules
 */

const express = require("express");
const mongooe = require("mongoose");
const morgan = require("morgan");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Middleware
 */
app.use(morgan("dev"));
/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.status(200).send("Manager-Server");
});

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
