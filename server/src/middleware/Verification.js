const jwt = require("jsonwebtoken");
require("dotenv").config();

const verification = async(req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token || token.trim() === "") res.status(401).send("Invalid Token");
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        res.status(201).send("Valid Token");
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
}

module.exports = verification;