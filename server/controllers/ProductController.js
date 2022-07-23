const ProductModel = require("../model/ProductModel");
const CategoriesModel = require("../model/CategoriesModel");
var Constants = require("../utils/Constants");

const addProduct = async (req, res) => {
  if (Object.keys(req.body).length !== 14)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });

  const payload = {
    uid: JSON.parse(req.body.uid),
    product_uid: JSON.parse(req.body.product_uid),
    product_name: JSON.parse(req.body.product_name),
    product_description: JSON.parse(req.body.product_description),
    images: req.body.images,
    product_price: JSON.parse(req.body.product_price),
    product_currency: JSON.parse(req.body.product_currency),
    product_location: JSON.parse(req.body.product_location),
    is_giving_away: JSON.parse(req.body.is_giving_away),
    is_available: JSON.parse(req.body.is_available),
    category: JSON.parse(req.body.category),
    sub_category: req.body.sub_category
      ? JSON.parse(req.body.sub_category)
      : null,
    child_category: req.body.child_category
      ? JSON.parse(req.body.child_category)
      : null,
    product_video: JSON.parse(req.body.product_video),
  };
  try {
    await new ProductModel(payload).save();
    let product = await ProductModel.findOne(
      { product_uid: payload.product_uid },
      { _id: 0, __v: 0 }
    );

    product = getCategory(product);
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

const getProducts = async (req, res) => {
  let products = await ProductModel.find({}, { _id: 0, __v: 0 });
  const val = [];
  for (let i = 0; i < products.length; i++) {
    const totalCategory = await CategoriesModel.find(
      { id: products[i].category },
      { _id: 0, __v: 0 }
    );
    const finalData = getCategory(totalCategory, products[i]);
    val.push(finalData);
  }
  res.json({
    status: Constants.SUCCESS,
    data: {
      products: val,
    },
  });
};

const getProduct = async (req, res) => {
  let product = await ProductModel.findOne({product_uid: req.params.product_uid}, { _id: 0, __v: 0 });
  if(!product){
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PRODUCT,
      },
    });
  }  
  const totalCategory = await CategoriesModel.find(
      { id: product?.category },
      { _id: 0, __v: 0 }
    );
    const finalData = getCategory(totalCategory, product);
  res.json({
    status: Constants.SUCCESS,
    data: {
      products: finalData,
    },
  });
};

function getCategory(totalCategory, product) {
  let productData = product;
  const sub_category = totalCategory[0]?.sub_categories.filter(function (val) {
    return val.id === productData?.sub_category;
  });
  const child_category = sub_category
    ? sub_category[0]?.child_categories.filter(function (val) {
        return val.id === productData?.child_category;
      })
    : "";
  delete productData?.category;
  delete productData?.sub_category;
  delete productData?.child_category;

  return {
    uid: productData.uid,
    product_uid: productData.product_uid,
    product_name: productData.product_name,
    product_description: productData.product_description,
    images: productData.images,
    product_price: productData.product_price,
    product_currency: productData.product_currency,
    product_location: productData.product_location,
    is_giving_away: productData.is_giving_away,
    is_available: productData.is_available,
    product_video: productData.product_video,
    category: {
      id: totalCategory[0]?.id,
      name: totalCategory[0]?.name,
      sub_category: sub_category
        ? {
            id: sub_category[0]?.id,
            name: sub_category[0]?.name,
            child_category: child_category
              ? {
                  id: child_category[0]?.id,
                  name: child_category[0]?.name,
                }
              : "",
          }
        : "",
    },
  };
}

module.exports = {
  addProduct,
  getProducts,
  getProduct
};
