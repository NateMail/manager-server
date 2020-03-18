const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bodySchema = new mongoose.Schema({
  addedBy: {
    type: ObjectId,
    ref: User
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  height: {
    feet: {
      type: ObjectId,
      ref: Feet
    },
    inches: {
      type: ObjectId,
      ref: Inches
    }
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  activity: {
    type: Number,
    required: true
  },
  bmr: {
    type: Number
  },
  tdee: {
    type: Number
  }
});

module.exports = mongoose.model("Body", bodySchema);
