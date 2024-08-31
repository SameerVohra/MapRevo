const express = require("express");
const {Login, Regsiter, AddReview, GetReviews} = require("./controllers/Controllers");
const cors = require("cors");
const verification = require("./middleware/Verification");

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

app.post("/login", Login)
app.post("/register", Regsiter);
app.post("/review", AddReview, verification);
app.get("/get-reviews", GetReviews, verification);

module.exports = app;