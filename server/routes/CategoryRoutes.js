const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const CategoryController = require("../controllers/CategoryController");
var API = require("../utils/API");

router.get(API.CATEGORIES, verifyToken, CategoryController.getCategories);
router.post(API.CATEGORIES, verifyToken, CategoryController.addCategories);

module.exports = router;