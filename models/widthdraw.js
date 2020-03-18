const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const widthdrawSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  where: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  addedBy: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Widthdraw", widthdrawSchema);
