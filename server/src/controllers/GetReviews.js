const Review = require("../models/reviewModel");

const GetReviews = async(req, res)=>{
    const {location} = req.body;
    try {
        const reviews = await Review.find({location});
        res.status(201).send({reviews});
    } catch (error) {
        console.error(error);
        res.status(501).send("Internal server error");
    }
}

module.exports = GetReviews