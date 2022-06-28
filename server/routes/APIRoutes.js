const APIRouter = require("express").Router();
var API = require("../utils/API");
const authRoutes = require("./AuthRoutes");
const categoriesRoutes = require("./CategoryRoutes");

APIRouter.use(API.USER, authRoutes);
APIRouter.use(API.ROOT, categoriesRoutes);

module.exports = APIRouter;