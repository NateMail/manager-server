/**
 * Required External Modules
 */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

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
 * Routes
 */

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const bodyRoutes = require("./routes/body");
const bankRoutes = require("./routes/bank");

/**
 *  App Middleware
 */
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", authRoutes);
app.use("/", todoRoutes);
app.use("/", userRoutes);
app.use("/", bodyRoutes);
app.use("/", bankRoutes);

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.status(200).send("Manager-Server");
});

// const path = require("path");

/**
 * Server Activation
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
