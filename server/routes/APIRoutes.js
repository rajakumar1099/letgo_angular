const APIRouter = require("express").Router();
var API = require("../utils/API");
const authRoutes = require("./AuthRoutes");
const categoriesRoutes = require("./CategoryRoutes");
const productsRoutes = require("./ProductRoutes");
const uploadImagesRoutes = require("./UploadImageRoutes");
const currenciesRoutes = require("./CurrenciesRoutes");
const addressRoutes = require("./AddressRoutes");

APIRouter.use(API.USER, authRoutes);
APIRouter.use(API.ROOT, categoriesRoutes);
APIRouter.use(API.PRODUCTS, productsRoutes);
APIRouter.use(API.ROOT, uploadImagesRoutes);
APIRouter.use(API.CURRENCIES, currenciesRoutes);
APIRouter.use(API.ADDRESS, addressRoutes);

module.exports = APIRouter;