const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "List must have a title..............!"],
    unique: [true,"list name already exist"],
    trim: true,
    minlength: 4,
    maxlength: 10,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const List = mongoose.model("List", listSchema);
module.exports = List;
