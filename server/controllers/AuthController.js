const UserModel = require("../model/AuthModel");
const jwt = require("jsonwebtoken");
var Constants = require("../utils/constants");
const crypto = require("crypto");

const signup = async (req, res) => {
  if (Object.keys(req.body).length !== 4)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.INVALID_PAYLOAD,
      },
    });

  const payload = new UserModel({
    uid: crypto.randomBytes(16).toString("hex"),
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    registerTimestamp: Date.now(),
    lastLoginTimestamp: Date.now(),
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

  const isUsername = await UserModel.findOne({ username: payload.username });
  if (isUsername?.username)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.USERNAME_ALREADY_EXIST,
      },
    });

  try {
    // save the user details in DB
    await payload.save();
    const user = await UserModel.findOne(
      { username: payload.username },
      { _id: 0, __v: 0 }
    );
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.json({
      status: Constants.SUCCESS,
      data: {
        ...user.toObject(),
        Authorization: token,
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
  const user = await UserModel.findOne(
    {
      email: req.body.email,
    },
    { _id: 0, __v: 0 }
  );

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
    const token = jwt.sign({ uid: user.uid }, process.env.SECRET_TOKEN);
    UserModel.findOneAndUpdate(
      { uid: user.uid },
      { $set: { lastLoginTimestamp: Date.now() } },
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
          data: {
            ...docs.toObject(),
            Authorization: token,
          },
        });
      }
    );
  } catch (err) {
    res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: err,
      },
    });
  }
};

const loginWithUid = async (req, res) => {
  const token = jwt.sign({ uid: req.params.uid }, process.env.SECRET_TOKEN);
  const user = await UserModel.findOneAndUpdate(
    { uid: req.params.uid },
    { $set: { lastLoginTimestamp: Date.now() } },
    { new: true }
  );
  if (!user)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.UID_DOES_NOT_EXIST_SIGN_UP,
      },
    });
  return res.json({
    status: Constants.SUCCESS,
    data: {
      ...user.toObject(),
      Authorization: token,
    },
  });
};

const profiles = async (req, res) => {
  const user = await UserModel.find({}, { _id: 0, __v: 0 });

  res.json({
    status: Constants.SUCCESS,
    data: {
      profiles: user,
    },
  });
};

const updateProfile = async (req, res) => {
  const user = await UserModel.findOneAndUpdate(
    { uid: req.body.uid },
    { $set: { ...req.body } },
    { new: true },
  );
  if (!user)
    return res.status(400).json({
      status: Constants.FAILURE,
      data: {
        message: Constants.EMAIL_DOES_NOT_EXIST_SIGN_UP,
      },
    });

  res.json({
    status: Constants.SUCCESS,
    data: user,
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
  loginWithUid,
  profiles,
  updateProfile,
  deleteProfile,
};
