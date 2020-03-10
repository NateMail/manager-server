/**
 * Required External Modules
 */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list");

/**
 * App Variables
 */
const app = express();

/**
 * DB
 */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("DB connected"));

mongoose.connection.on("error", error => {
  console.log(`DB connection error: ${error.message}`);
});

/**
 *  App Middleware
 */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", listRoutes);

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.status(200).send("Manager-Server");
});

/**
 * Server Activation
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
