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
    default: '',
  },
  category: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      sub_categories: [
        {
          id: {
            type: String,
          },
          name: {
            type: String,
          },
          child_categories: [
            {
              id: {
                type: String,
              },
              name: {
                type: String,
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
