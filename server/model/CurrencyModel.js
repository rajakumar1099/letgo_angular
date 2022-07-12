const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  currency_name: {
    type: String,
    required: true,
  },
  currency_symbol: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Currency", currencySchema);
