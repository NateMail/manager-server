const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  due: {
    type: Date,
    required: true
  },
  reoccuring: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  addedBy: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Bill", billSchema);
