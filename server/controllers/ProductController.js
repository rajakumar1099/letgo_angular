const ProductModel = require("../model/ProductModel");
const jwt = require("jsonwebtoken");
var Constants = require("../utils/Constants");

const addProduct = async (req, res) => {
  if (Object.keys(req.body).length !==    5)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    }); 

  const payload = {
    uid: req.body.uid,
    product_uid: crypto.randomBytes(16).toString("hex"),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_currency: req.body.product_currency,
    is_giving_away: req.body.is_giving_away,
    category: req.body.category
  };

  try {
    // save the product details in DB
    await new ProductModel(payload).save();
    const product = await ProductModel.findOne(
      { product_uid: payload.product_uid },
      { _id: 0, __v: 0 }
    );
    res.json({
      status: Constants.SUCCESS,
      data: {
        product,
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
  addProduct,
};
