const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  thumbnail: { type: String, required: true },
});

exports.Product = mongoose.model("Product", productSchema);
