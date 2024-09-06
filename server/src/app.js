const express = require("express");
const { Login, Register, AddReview, GetReviews } = require("./controllers/Controllers");
const cors = require("cors");
const Verification = require("./middleware/Verification");

const app = express();
app.use(cors({origin: "*"}));

app.use(express.json());

app.post("/login", Login);
app.post("/register", Register);
app.post("/review", Verification, AddReview);
app.get("/get-reviews", GetReviews);

module.exports = app;
