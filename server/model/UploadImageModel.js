const mongoose = require("mongoose");

const uploadImagesSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  product_uid: {
    type: String,
    required: true,
  },
  images: [],
  uploaded: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", uploadImagesSchema);
