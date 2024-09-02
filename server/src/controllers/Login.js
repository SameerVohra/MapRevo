const {User} = require("../models/model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const Login = async(req, res) => {
    const {name, password} = req.body;
    try {
        if(name && password){
            const user = await User.findOne({name});
            if(!user){
                return res.status(401).send("Wrong Username/Password");
            }
            else{
                const isMatching = await bcrypt.compare(password, user.password);
                if(!isMatching){
                    return res.status(403).send("Wrong Username/Password");
                }
                else{
                    const date = new Date();
                    const tokenPayload = {name, password, date};
                    const key = process.env.SECRET_KEY;
                    console.log(key);
                    const token = jwt.sign(tokenPayload, key);
                    console.log(token);
                    return res.status(201).send({token, user});
                }
            }
        }
        else{
            return res.status(422).send("Please Provide username and Password");
        }
    } catch (error) {
        console.error(error);
        return res.status(501).send("Internal Server Error");
    }
}

module.exports = Login