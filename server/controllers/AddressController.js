const AddressModel = require("../model/AddressModel");
const jwt = require("jsonwebtoken");
var Constants = require("../utils/constants");
const crypto = require("crypto");

const getAllAddress = async (req, res) => {
  const address = await AddressModel.find({profile_uid: req.params.profile_uid}, { _id: 0, __v: 0 });
  res.json({
    status: Constants.SUCCESS,
    data: address,
  });
};
module.exports = {
  getAllAddress,
};

const postAddress = async (req, res) => {
let address;
  if (Object.keys(req.body).length < 6) {
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });
  }
  const existingAddress = await AddressModel.find({}, { _id: 0, __v: 0 });
  console.log(existingAddress);
  address = [
    {
      line1: req.body.line1,
      line2: req.body.line2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      country: req.body.country,
      isPrimary: false,
    },
  ];
  const payload = {
    id: crypto.randomBytes(16).toString("hex"),
    profile_uid: req.body.profile_uid,
    address: address
  };
  try {
    // save the category details in DB
    // await new AddressModel(payload).save();
    res.json({
      status: Constants.SUCCESS,
      data: {
        message: Constants.ADDRESS_ADDED_SUCCESSFULLY,
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
  // const address = await AddressModel.find({}, { _id: 0, __v: 0 });
  // res.json({
  //   status: Constants.SUCCESS,
  //   data: address,
  // });
};
module.exports = {
  getAllAddress,
  postAddress,
};
