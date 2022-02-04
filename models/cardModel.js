const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Card must have a title..............!"],
    unique: true,
    trim: true,
    minlength: [4,""],
    maxlength: 10,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Card must have a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  list_id: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
