const router = require("express").Router();
const User = require("../model/auth_model");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
var constants = require("../utils/constants");

router.post("/signup", async (req, res) => {
  if (Object.keys(req.body).length !== 3)
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.INVALID_PAYLOAD,
      },
    });

  const payload = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  // check email Id and username is already on DB
  const user = await User.findOne({ email: payload.email });
  if (user?.email)
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.EMAIL_ALREADY_EXIST,
      },
    });

    if (user?.username)
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.USERNAME_ALREADY_EXIST,
      },
    });

  try {
    // save the user details in DB
    await payload.save();
    res.json({
      status: constants.SUCCESS,
      data: {
        message: constants.USER_REGISTERED_SUCCESSFULLY,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: err.message,
      },
    });
  }
});

router.post("/login", async (req, res) => {
  // Check the Payload is valid or Invalid
  if (Object.keys(req.body).length !== 2)
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.INVALID_PAYLOAD,
      },
    });

  // check if email Id is not available on DB
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.EMAIL_DOES_NOT_EXIST_SIGN_UP,
      },
    });

  // check if the password is correct or wrong
  if (user.password !== req.body.password) {
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.INCORRECT_PASSWORD,
      },
    });
  }

  try {
    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header(constants.AUTHORIZATION, token);
    res.json({
      status: constants.SUCCESS,
      data: {
        user,
        Authorization: token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: err,
      },
    });
  }
});

router.get("/profiles", verify, async (req, res) => {
  const user = await User.find();

  res.json({
    status: constants.SUCCESS,
    data: {
      profiles: user,
    },
  });
});

router.delete("/delete-profile/:email", verify, async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });

  if (!user)
    return res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.INVALID_EMAIL_ID,
      },
    });
  try {
    res.status(200).json({
      status: constants.SUCCESS,
      data: {
        message: constants.USER_DELETED_SUCCESSFULLY,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: constants.FAILURE,
      data: {
        message: err,
      },
    });
  }
});

module.exports = router;
