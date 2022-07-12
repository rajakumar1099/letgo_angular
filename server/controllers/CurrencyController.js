const CurrencyModel = require("../model/CurrencyModel");
var Constants = require("../utils/Constants");
const crypto = require("crypto");

const getCurrencies = async (req, res) => {
  var currencies = await CurrencyModel.find({}, { _id: 0, __v: 0 });
  res.json({
    status: Constants.SUCCESS,
    data: {
        currencies: currencies,
    },
  });
};

const addCurrency = async (req, res) => {
  if (Object.keys(req.body).length < 2) {
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });
  }
  const payload = {
    id: crypto.randomBytes(16).toString("hex"),
    currency_name: req.body.currency_name,
    currency_symbol: req.body.currency_symbol,
  };
  try {
    // save the category details in DB
    await new CurrencyModel(payload).save();
    res.json({
      status: Constants.SUCCESS,
      data: {
        message: Constants.CURRENCY_ADDED_SUCCESSFULLY,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: err.message,
      },
    });
  }
};

module.exports = {
  getCurrencies,
  addCurrency,
};
