const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true,
  },
  sub_categories: [
    {
      id: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: null
      },
      child_categories: [
        {
          id: {
            type: String,
            default: null
          },
          name: {
            type: String,
            default: null
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
