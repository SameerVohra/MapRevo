const Review = require("../models/reviewModel");

const GetReviews = async(req, res)=>{
    try {
        const reviews = await Review.find();
        res.status(200).send({reviews});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

module.exports = GetReviews