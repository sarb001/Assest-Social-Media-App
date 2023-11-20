

const User = require("../models/User");

exports.Register = async  (req,res) => {
    try {
        const {name,email,password} = req.body;

        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success : false , 
                message : " User Already Exists "
            })
        }
        user = await User.create({
            name,
            email,
            password,
            avatar : { public_id : "hello" , url : "sampleurl" },
        });
        res.status(201).json({ success : true , user });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}

exports.Login = async(req,res) => {
    try {
        const { email , password } = req.body;
        const user = await User.findOne({email}).select("+password");     // find account with email 

        if(!user){
            return res.status(400).json({
                success : false , 
                message : " User does not Exist "
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : " Password Incorrect "
            })
        }

        const  token = await user.generateToken();

        res.status(200).cookie("token",token , {
            expires  : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly : true
        }).json({
            success  :true,
            user,
            token       
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}