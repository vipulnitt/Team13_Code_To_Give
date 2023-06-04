const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const AdminController = require("../models/admin");
const UserController = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
// Checks if user is authenticated or not.
exports.isAuthenticated = catchAsyncError(async (req,res,next)=>{
    const  { token } =req.cookies;
    if(!token){
        return next(new ErrorHandler('Login first to access this resource.'));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    req.admin = await AdminController.findById(decoded.id);
    next();
})
exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const  { tokenUser } =req.cookies;
    if(!tokenUser){
        return next(new ErrorHandler('Login first to access this resource.'));
    }
    const decoded = jwt.verify(tokenUser,process.env.JWT_SECRET);
    
    req.user = await UserController.findById(decoded.id);
    console.log(req.user+"aa");
    next();
})

