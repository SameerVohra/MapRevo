const {User} = require("../models/model");
const bcrypt = require("bcryptjs")
const Regsiter = async(req, res)=>{
    const {name, password} = req.body;
    try {
        if(!name || !password){
            return res.status(422).send("All fields are required");     
        }
        const user = await User.findOne({name});
        if(user){
            return res.status(409).send("username already in use");
        }
        else{
            const hashedPass = bcrypt.hashSync(password);
            const newUser = new User({
                name: name,
                password: hashedPass
            })
            await newUser.save();
            return res.status(201).json({newUser});
        }
    } catch (error) {
        console.error(error)
        res.status(501).send("Internal Server Error");
    }
}

module.exports = Regsiter