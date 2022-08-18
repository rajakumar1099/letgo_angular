const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const AuthController = require("../controllers/AuthController");
var API = require("../utils/API");

router.post(API.SIGNUP, AuthController.signup);
router.post(API.LOGIN, AuthController.login)
router.get(API.LOGINWITHUID, AuthController.loginWithUid)
router.get(API.PROFILES, verifyToken, AuthController.profiles);
router.delete(API.DELETE_PROFILE, verifyToken, AuthController.deleteProfile);

module.exports = router;