const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const AddProductController = require("../controllers/ProductController");
var API = require("../utils/API");
multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 5000000,
  },
});
router.post(
  API.ADDPRODUCTS,
  verifyToken,
  upload.array("images", 5),
  AddProductController.addProduct
);
router.get(API.ROOT, verifyToken, AddProductController.getProducts);
router.post(API.ROOT, verifyToken, AddProductController.getProducts);
router.get(API.PRODUCT, verifyToken, AddProductController.getProduct);
router.get(API.PRODUCT + API.COMMENTS, verifyToken, AddProductController.getComment);
router.delete(API.PRODUCT, verifyToken, AddProductController.deleteProduct);
router.post(API.COMMENTS, verifyToken, AddProductController.addComment);
router.delete(API.DELETECOMMENTS, verifyToken, AddProductController.deleteComment);

module.exports = router;
