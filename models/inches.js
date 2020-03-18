const mongoose = require("mongoose");

const inchesSchema = new mongoose.feetSchema({
  inches: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Inches", inchesSchema);
