const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env._MONGO_DB)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const _LOCAL_PORT = 3000;

app.listen(_LOCAL_PORT, () => {
  console.log(`Server running on http://localhost:${_LOCAL_PORT}`);
});

app.get("/", (req, res) => {
  res.send("Homepage");
});


