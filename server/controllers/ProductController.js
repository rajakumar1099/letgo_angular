const ProductModel = require("../model/ProductModel");
var Constants = require("../utils/Constants");

const addProduct = async (req, res) => {
  if (Object.keys(req.body).length !== 11)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });

  const payload = {
    uid: req.body.uid,
    product_uid: req.body.product_uid,
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_currency: req.body.product_currency,
    product_location: req.body.product_location,
    is_giving_away: req.body.is_giving_away,
    is_available: req.body.is_available,
    category: req.body.category,
    product_video: req.body.product_video
  };
  console.log(payload);
  // try {
  //   // save the product details in DB
  //   await new ProductModel(payload).save();
  //   const product = await ProductModel.findOne(
  //     { product_uid: payload.product_uid },
  //     { _id: 0, __v: 0 }
  //   );
  //   res.json({
  //     status: Constants.SUCCESS,
  //     data: {
  //       product,
  //     },
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     status: Constants.FAILURE,
  //     data: {
  //       message: err.message,
  //     },
  //   });
  // }
};

const getProducts = async (req, res) => {
  var products = await ProductModel.find({}, { _id: 0, __v: 0 });
  res.json({
    status: Constants.SUCCESS,
    data: {
      products: products,
    },
  });
};

module.exports = {
  addProduct,
  getProducts
};
