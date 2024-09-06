const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = require("./app");

const DB_URI = process.env.MONGODB_URI;
const port = process.env.PORT;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log(`Error connecting to DB: ${e}`);
  });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
