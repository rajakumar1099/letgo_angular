const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
var API = require("../utils/API");
const AddressController = require("../controllers/AddressController");

router.get(API.GETADDRESS, verifyToken ,AddressController.getAllAddress);
router.post(API.ROOT, verifyToken ,AddressController.postAddress);

module.exports = router;