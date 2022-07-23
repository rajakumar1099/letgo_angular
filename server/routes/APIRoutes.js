const APIRouter = require("express").Router();
var API = require("../utils/API");
const authRoutes = require("./AuthRoutes");
const categoriesRoutes = require("./CategoryRoutes");
const productsRoutes = require("./ProductRoutes");
const uploadImagesRoutes = require("./UploadImageRoutes");
const currenciesRoutes = require("./CurrenciesRoutes");


APIRouter.use(API.USER, authRoutes);
APIRouter.use(API.ROOT, categoriesRoutes);
APIRouter.use(API.PRODUCTS, productsRoutes);
APIRouter.use(API.ROOT, uploadImagesRoutes);
APIRouter.use(API.CURRENCIES, currenciesRoutes);

module.exports = APIRouter;