const express = require("express");
const { Login, Register, AddReview, GetReviews } = require("./controllers/Controllers");
const cors = require("cors");
const Verification = require("./middleware/Verification");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

// Express Middleware
app.use(express.json());

// Routes
app.post("/login", Login);
app.post("/register", Register);
app.post("/review", Verification, AddReview);
app.get("/get-reviews", GetReviews);

module.exports = app;
