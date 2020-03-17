const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const toDoSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true
  },
  createdBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("ToDo", toDoSchema);
