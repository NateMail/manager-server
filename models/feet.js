const mongoose = require("mongoose");

const feetSchema = new mongoose.feetSchema({
  feet: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Feet", feetSchema);
