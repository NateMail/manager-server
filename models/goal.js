const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Goal", goalSchema);
