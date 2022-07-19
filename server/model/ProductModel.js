const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  product_uid: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  images: [{}],
  product_location: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
  },
  product_currency: {
    type: String,
  },
  is_available: {
    type: Boolean,
    required: true,
  },
  is_giving_away: {
    type: Boolean,
    required: true,
  },
  product_video: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    default: null
  },
  child_category: {
    type: String,
    default: null
  },
});

module.exports = mongoose.model("Product", productSchema);
