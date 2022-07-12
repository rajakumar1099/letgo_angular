const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const CurrencyController = require("../controllers/CurrencyController");
var API = require("../utils/API");

router.get(API.ROOT, verifyToken ,CurrencyController.getCurrencies);
router.post(API.ADDCURRENCY, verifyToken ,CurrencyController.addCurrency);

module.exports = router;