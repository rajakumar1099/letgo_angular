const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
var API = require("./utils/API");
const APIRoutes = require("./routes/APIRoutes");

//init dotenv
dotenv.config();

//init cors
app.use(cors());

//Connect Database
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

//Route Middlewares
app.use(express.json());

// Init API Route Index File
app.use(API.TAG_API, APIRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
