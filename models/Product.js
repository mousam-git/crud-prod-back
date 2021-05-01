const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add some text."],
  },
  image: {
    type: String,
    trim: true,
    required: [true, "Please add prodict image link."],
  },
  price: {
    type: Number,
    required: [true, "Please add price."],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
