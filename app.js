const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
const helmet = require("helmet");
require("dotenv").config();
const path = require("path");

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.d4buf.mongodb.net:27017,cluster0-shard-00-01.d4buf.mongodb.net:27017,cluster0-shard-00-02.d4buf.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-8i7j0t-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(helmet()); // protection des headers

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images"))); //pour pouvoir accéder aux images depuis le front

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
