const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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

//Import Routes
const authRoutes = require("./routes/auth");

//Route Middlewares
app.use(express.json());
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
