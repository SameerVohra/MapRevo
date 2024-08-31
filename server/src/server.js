const express = require("express")
require("dotenv").config();
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const app = require("./app");

const DB_URI = process.env.MONGODB_URI;

const port = process.env.PORT;

mongoose.connect(DB_URI).then(()=>{
    console.log("Connected to DB");
})
.catch((e)=>{
    console.log(`Error connecting to DB: ${e}`);
})

app.listen(port, ()=>{
    console.log(`Started port: ${port}`)
})
