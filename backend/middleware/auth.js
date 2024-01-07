const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


//check if user is authenticated;

exports.isAuthenticated = async(req,res,next)=>{

    const {token} =req.cookies;

    if(!token){
        return next(new ErrorResponse("Not authorized to access this route",401));

    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {   
        return next(new ErrorResponse('Not authorized to access this route',401));
    }
}

//middleware for admin
exports.isAdmin = (req,res,next)=>{

    if(req.user.role === 0){
        return next(new ErrorResponse('Access denied, you must be an Admin',401));

    }
    next();
}