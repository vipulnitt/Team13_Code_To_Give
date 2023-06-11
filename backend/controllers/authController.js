const Admin = require('../models/admin');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const Counselor = require('../models/counselor');
const Data = require('../models/data');
const APIFeatures = require('../utils/apiFeatures');
const Volunteer = require('../models/volunteerModel');
exports.registerAdmin = catchAsyncError(async (req, res, next)=>{
    const {name, email, password} = req.body;

  const admin = await Admin.create({
        name,
        email,
        password
    })
   sendToken(admin, 200,res);
})

exports.loginAdmin = catchAsyncError(async (req, res, next)=>{
    const {email,password}= req.body;

    //check if email or password is entered by user

    if(!email||!password){
        return next(new ErrorHandler('Please enter email or password',400))
    }

    //finding user in database
    const admin = await Admin.findOne({email}).select('+password');
    if(!admin){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    const isPasswordMatched = await admin.comparePassword(password);
    if(!isPasswordMatched)
    {
    return next(new ErrorHandler('Invalid Email or Password',401));
    }

    sendToken(admin, 200,res);

});


//get Current Admin Profile

exports.getAdminProfile = catchAsyncError(async (req,res,next)=>{
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({
      success:true,
      admin
    });
  });

  //Logout User

  exports.logoutAdmin = catchAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully'
    })

});



// Change Password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const admin = await Admin.findById(req.admin.id).select('+password');

    
    const isMatched = await admin.comparePassword(req.body.oldPassword);
    
    if(!isMatched)
    {
        return next(new ErrorHandler('Old password is incorrect',401));
    }
    admin.password = req.body.newPassword;
    await admin.save();

    sendToken(admin,200,res);


});
exports.getPendingCounselor= catchAsyncError(async(req,res,next)=>{

    const counselors = await Counselor.find({approved:false});
    res.status(200).json({
        success:true,
        counselors
    });

    
})

exports.acceptCounselorRequest= catchAsyncError(async(req,res,next)=>{

    const id=req.body.id;
    var mongoose = require('mongoose');
    var o_id =new mongoose.Types.ObjectId(id);
   const counselor =await Counselor.findByIdAndUpdate({_id: o_id});
   counselor.approved=true;
   await counselor.save();
    res.status(200).json({
        success:true,
        counselor
    });

})

exports.getAllSubmissions = catchAsyncError(async(req,res,next)=>{

const dataCount = await Data.countDocuments();
const resPerPage=6;
 const apiFeatures = new APIFeatures(Data.find(),req.query).search().filter().pagination(resPerPage);
 const data = await apiFeatures.query;
    res.status(200).json({
        success:true,
        count: dataCount,
        resPerPage,
        data
    });

})

exports.getCounselorById = catchAsyncError(async(req,res,next)=>{
    const id=req.body.id;
    var mongoose = require('mongoose');
    var o_id =new mongoose.Types.ObjectId(id);
   const counselor =await Counselor.findOne({_id: o_id});
    res.status(200).json({
        success:true,
        counselor
    });
})

exports.getCounselorList = catchAsyncError(async(req,res,next)=>{
    const dataCount = await Counselor.countDocuments({approved:true});
     const resPerPage=3;

   const apiFeatures = new APIFeatures(Counselor.find({approved:true}),req.query).search().filter().pagination(resPerPage);
 const counselors = await apiFeatures.query;
    res.status(200).json({
        success:true,
        resPerPage,
        count:dataCount,
        counselors
    });
    })

    exports.allVounteer  = catchAsyncError(async (req, res, next)=>{
        const dataCount = await Volunteer.countDocuments();
        const resPerPage=4;
   
        const apiFeatures = new APIFeatures(Volunteer.find(),req.query).search().filter().pagination(resPerPage);
        const data = await apiFeatures.query;
           res.status(200).json({
               success:true,
               resPerPage,
               count:dataCount,
               data
           });
    });

exports.deleteVounteer  = catchAsyncError(async (req, res, next)=>{

        const data= await Volunteer.findOneAndDelete({_id:req.body.id});
        res.status(200).json({
         success: true,
         data
       });
    });