
const User  = require('../models/User.js');
const jwt = require('jsonwebtoken');


exports.isAuthenticated = async(req,res,next) => {
    try {   
       const { token } = req.cookies;
        if(!token){
            // req.user = null;
            return next();
        }
    const decoded = await jwt.verify(token,'sarbSECRET@123');

    req.user = await  User.findById(decoded._id);
    next();

} catch (error) {
      res.status(500).json({
        message : error.message,
      })  
    }
}