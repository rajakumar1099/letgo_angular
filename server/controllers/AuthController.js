const UserModel = require("../model/AuthModel");
const jwt = require("jsonwebtoken");
var Constants = require("../utils/Constants");
const crypto = require("crypto");

const signup = async (req, res) => {
  if (Object.keys(req.body).length !== 3)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });

  const payload = new UserModel({
    id: crypto.randomBytes(16).toString("hex"),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // check email Id and username is already on DB
  const user = await UserModel.findOne({ email: payload.email });
  if (user?.email)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.EMAIL_ALREADY_EXIST,
      },
    });

    if (user?.username)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.USERNAME_ALREADY_EXIST,
      },
    });

  try {
    // save the user details in DB
    await payload.save();
    res.json({
      status: Constants.SUCCESS,
      data: {
        message: Constants.USER_REGISTERED_SUCCESSFULLY,
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

const login = async (req, res) => {
  // Check the Payload is valid or Invalid
  if (Object.keys(req.body).length !== 2)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });

  // check if email Id is not available on DB
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.EMAIL_DOES_NOT_EXIST_SIGN_UP,
      },
    });

  // check if the password is correct or wrong
  if (user.password !== req.body.password) {
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INCORRECT_PASSWORD,
      },
    });
  }

  try {
    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header(Constants.AUTHORIZATION, token);
    res.json({
      status: Constants.SUCCESS,
      data: {
        user,
        Authorization: token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: err,
      },
    });
  }
};

const profiles = async (req, res) => {
  const user = await UserModel.find({},{_id:0,__v:0});

  res.json({
    status: Constants.SUCCESS,
    data: {
      profiles: user,
    },
  });
};

const deleteProfile = async (req, res) => {
  const user = await UserModel.findOneAndDelete({ id: req.params.id });

  if (!user)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_EMAIL_ID,
      },
    });
  try {
    res.status(200).json({
      status: Constants.SUCCESS,
      data: {
        message: Constants.USER_DELETED_SUCCESSFULLY,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: err,
      },
    });
  }
};

module.exports = {
    signup,
    login,
    profiles,
    deleteProfile
};
