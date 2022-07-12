const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const UploadImageController = require("../controllers/UploadImageController");
var API = require("../utils/API");
multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 5000000,
  },
});

router.post(
  API.UPLOADPRODUCTIMAGES,
  verifyToken,
  upload.array("images", 5),
  UploadImageController.uploadImage
);

module.exports = router;
