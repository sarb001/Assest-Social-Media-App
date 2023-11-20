
const User  = require('../models/User.js');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async(req,res,next) => {
    try {   
    const { token } = req.cookies;

    console.log('cookies token-',{token});
    console.log('cookies-- auth',req.cookies);

    if(!token){
        return res.status(401).json({
            message : " PLease Login FIRST ",
        });
    }
    const decoded = await jwt.verify(token,'sarbSECRET@123');

    console.log('decoded  middleware',decoded);
    req.user = await  User.findById(decoded._id);
    next();

} catch (error) {
      res.status(500).json({
        message : error.message,
      })  
    }
}