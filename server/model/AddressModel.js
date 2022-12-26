const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  profile_uid: {
    type: String,
    required: true,
  },
  address: [
    {
      line1: {
        type: String,
        required: true,
      },
      line2: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      isPrimary: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Address", addressSchema);
