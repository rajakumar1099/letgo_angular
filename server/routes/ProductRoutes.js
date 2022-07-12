const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const AddProductController = require("../controllers/ProductController");
var API = require("../utils/API");

router.post(API.ADDPRODUCTS, verifyToken ,AddProductController.addProduct);

module.exports = router;