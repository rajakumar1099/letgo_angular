const ProductModel = require("../model/ProductModel");
const CategoriesModel = require("../model/CategoriesModel");
var Constants = require("../utils/constants");
const CurrencyModel = require("../model/CurrencyModel");
const UserModel = require("../model/AuthModel");
const crypto = require("crypto");
const timestamp = require("../utils/Timestamp");
const addProduct = async (req, res) => {
  if (Object.keys(req.body).length !== 13)
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
    is_available: JSON.parse(req.body.is_available),
    category: JSON.parse(req.body.category),
    sub_category: req.body.sub_category
      ? JSON.parse(req.body.sub_category)
      : null,
    child_category: req.body.child_category
      ? JSON.parse(req.body.child_category)
      : null,
    product_video: JSON.parse(req.body.product_video),
    timestamp: Date.now()
  };
  try {
    await new ProductModel(payload).save();
    let product = await ProductModel.findOne(
      { product_uid: payload.product_uid },
      { _id: 0, __v: 0 }
    );

    const totalCategory = await CategoriesModel.find(
      { id: product.category },
      { _id: 0, __v: 0 }
    );
    let productCurrency = await CurrencyModel.find(
      { id: product.product_currency },
      { _id: 0, __v: 0 }
    );
    productCurrency = productCurrency.find(
      (element) => element.id == product.product_currency
    );
    product = getCategory(
      totalCategory,
      product,
      productCurrency.currency_symbol
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

const getProducts = async (req, res) => {
  let products = await ProductModel.find({}, { _id: 0, __v: 0 });
  const val = [];
  for (let i = 0; i < products.length; i++) {
    const totalCategory = await CategoriesModel.find(
      { id: products[i].category },
      { _id: 0, __v: 0 }
    );
    let productCurrency = await CurrencyModel.find(
      { id: products[i].product_currency },
      { _id: 0, __v: 0 }
    );
    productCurrency = productCurrency.find(
      (element) => element.id == products[i].product_currency
    );
    const finalData = getCategory(
      totalCategory,
      products[i],
      productCurrency.currency_symbol
    );
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
  let product = await ProductModel.findOne(
    { product_uid: req.params.product_uid },
    { _id: 0, __v: 0 }
  );
  if (!product) {
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
  let productCurrency = await CurrencyModel.find(
    { id: product.product_currency },
    { _id: 0, __v: 0 }
  );
  productCurrency = productCurrency.find(
    (element) => element.id == product.product_currency
  );
  const finalData = getCategory(
    totalCategory,
    product,
    productCurrency.currency_symbol
  );
  const sellerData = await getSellerDetails(product?.uid);
  const data = {
    ...finalData,
    ...sellerData
  }
  res.json({
    status: Constants.SUCCESS,
    data: {
      products: data,
    },
  });
};

const deleteProduct = async (req, res) => {
  ProductModel.findOneAndDelete(
    { product_uid: req.params.product_uid },
    { _id: 0, __v: 0 },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          status: Constants.FAILURE,
          data: {
            message: Constants.INVALID_PRODUCT,
          },
        });
      }
      return res.json({
        status: Constants.SUCCESS,
        data: Constants.PRODUCT_DELETED_SUCCESSFULLY,
      });
    }
  );
};

const addComment = async (req, res) => {
  if (Object.keys(req.body).length !== 3)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });
  const payload = {
    id: crypto.randomBytes(16).toString("hex"),
    product_uid: req.body.product_uid,
    uid: req.body.uid,
    comment: req.body.comment,
    timestamp: Date.now(),
  };
  ProductModel.findOneAndUpdate(
    { product_uid: req.body.product_uid },
    { $push: { comments: payload } },
    { new: true },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          status: Constants.FAILURE,
          data: {
            message: err,
          },
        });
      }
      return res.json({
        status: Constants.SUCCESS,
        data: Constants.COMMENT_ADDED_SUCCESSFULLY,
      });
    }
  );
};

const getComment = async (req, res) => {
  let comments = [];
  let commentData = await ProductModel.findOne(
    { product_uid: req.params.product_uid },
    { _id: 0, __v: 0 }
  );

  for (let i = 0; i < commentData?.comments?.length; i++) {
    const user = await UserModel.findOne(
      { uid: commentData?.comments[i]?.uid },
      { _id: 0, __v: 0 }
    );
    const data = {
      id: commentData?.comments[i]?.id,
      fullname: user?.fullname ?? "Anonymous",
      product_uid: commentData?.comments[i]?.product_uid,
      uid: commentData?.comments[i].uid,
      comment: commentData?.comments[i]?.comment,
      timestamp: timestamp(Date.now(), commentData?.comments[i]?.timestamp),
    };
    if(user){
      comments.push(data);
    }
  }
  if (!comments) {
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PRODUCT,
      },
    });
  }
  res.json({
    status: Constants.SUCCESS,
    data: comments,
  });
};

const deleteComment = async (req, res) => {
  const product = await ProductModel.findOne(
    { product_uid: req.params.product_uid },
    { _id: 0, __v: 0 }
  );
  if (!product) {
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PRODUCT,
      },
    });
  }
  const commentIndex = product.comments.findIndex(
    (element) => element.id == req.params.id
  );
  ProductModel.findOneAndUpdate(
    { product_uid: product.product_uid },
    { $pull: { comments: product.comments[commentIndex] } },
    { new: true },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          status: Constants.FAILURE,
          data: {
            message: err,
          },
        });
      }
      return res.json({
        status: Constants.SUCCESS,
        data: Constants.COMMENT_DELETED_SUCCESSFULLY,
      });
    }
  );
};

function getCategory(totalCategory, product, productCurrency) {
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
    product_currency: productCurrency,
    product_location: productData.product_location,
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
    timestamp: timestamp(Date.now(), productData.timestamp),
  };
}

async function getSellerDetails(uid) {
  let user = await UserModel.findOne(
    { uid: uid },
    { _id: 0, __v: 0 }
  );
  let productsCount = await ProductModel.find(
    { uid: uid },
    { _id: 0, __v: 0 }
  ).count();
  const sellerData = {
    sellerName: user?.fullname,
    followers: user?.followers,
    following: user?.following,
    items: productsCount
  }
  return sellerData;
}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  addComment,
  getComment,
  deleteComment,
};
