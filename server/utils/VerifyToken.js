const jwt = require("jsonwebtoken");
const constants = require("./constants");

module.exports = function (req, res, next) {
  const token = req.header(constants.AUTHORIZATION);
  if (!token)
    return res.status(401).json({
      status: constants.FAILURE,
      data: {
        message: constants.AUTHORIZATION_FAILED,
      },
    });

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    req.status(400).json({
      status: constants.FAILURE,
      data: {
        message: constants.INVALID_TOKEN,
      },
    });
  }
};
