const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bankSchema = new mongoose.Schema({
  checking: {
    type: Number,
    default: 0
  },
  saving: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Bank", bankSchema);
