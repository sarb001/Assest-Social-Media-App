
const User  = require('../models/User.js');
const jwt = require('jsonwebtoken');


exports.isAuthenticated = async(req,res,next) => {
    try {   
       const { token } = req.cookies;
        if(!token){
            res.status(401).json({ message: " No Token Present " });
            return next();
        }
    const decoded =  jwt.verify(token,process.env.SECRET_KEY);

    req.user = await  User.findById(decoded._id);
    next();

} catch (error) {
     return res.status(500).json({
        success : "false",
        message : error.message,
      })  
    }
}