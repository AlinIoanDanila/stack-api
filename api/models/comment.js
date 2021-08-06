const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
