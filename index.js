/**
 * Required External Modules
 */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const expressValidator = require("express-validator");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const authRoutes = require("./routes/auth");

/**
 * DB
 */

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(console.log("DB connected"));

// mongoose.connection.on("error", error => {
//   console.log(`DB connection error: ${error.message}`);
// });

/**
 *  App Middleware
 */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", authRoutes);
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
