const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const listSchema = new mongoose.Schema({
  title: {
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
  tasks: [
    {
      text: String,
      completed: { type: Boolean, default: false },
      created: { type: ObjectId, ref: "User" }
    }
  ]
});

module.exports = mongoose.model("List", listSchema);
