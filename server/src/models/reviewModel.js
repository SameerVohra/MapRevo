const { mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: String,
    location: String,
    date: Date,
    review: String,
    stars: Number
})

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;