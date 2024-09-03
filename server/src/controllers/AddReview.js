const Review = require("../models/reviewModel");

const AddReview = async(req, res)=>{
    const {name, location, review, stars} = req.body;
    try {
        
            const date = new Date();
            const newReview = new Review({
                user: name,
                location,
                date: date,
                review,
                stars
            })

            await newReview.save();
            res.status(201).send({newReview});
        
    } catch (error) {
        console.error(error);
        res.status(501).send("Internal Server Error");
    }
}

module.exports = AddReview;