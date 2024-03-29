const UploadImageModel = require("../model/UploadImageModel");
const jwt = require("jsonwebtoken");
var Constants = require("../utils/constants");

const uploadImage = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send({
        status: Constants.FAILURE,
        data: {
          message: Constants.INVALID_PAYLOAD,
        },
      });
    }
    const payload = {
      uid: req.params.uid,
      product_uid: req.params.productuid,
      images: req.files,
    };
    await new UploadImageModel(payload).save();
    return res.status(200).send({
      status: Constants.SUCCESS,
      data: {
        message: "Images uploaded successfully.",
      },
    });
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        status: Constants.FAILURE,
        data: {
          message: "Too many files to upload.",
        },
      });
    }
    return res.status(500).send({
      status: Constants.FAILURE,
      data: {
        message: `Error when trying upload many files: ${error}`,
      },
    });
  }
};

module.exports = {
  uploadImage,
};
