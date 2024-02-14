
const User  = require('../models/User.js');
const jwt = require('jsonwebtoken');


exports.isAuthenticated = async(req,res,next) => {
    try {   
        console.log('cookies req--',req);
        const { token } = await req.cookies;
        console.log('token in cookies -',token);

        if(!token){
          return res.status(401).json({ message: " No Token Present " });
        }
        res.status(200).json({token});
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