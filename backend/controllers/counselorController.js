const Counselor = require('../models/counselor');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtTokenCounselor');
exports.registerConselor = catchAsyncError(async (req, res, next)=>{
    const {name, email, password,expertise,experience,mobileNumber} = req.body;
     const approved=false;
 //    console.log("x"+JSON.stringify(req.body));
  const counselor= await Counselor.create({
        name,
        email,
        password,
        expertise,
        mobileNumber,
        experience,
        approved
    })
   sendToken(counselor, 200,res);
});

exports.loginCounselor= catchAsyncError(async (req, res, next)=>{
  const {email,password}= req.body;

  //check if email or password is entered by user

  if(!email||!password){
      return next(new ErrorHandler('Please enter email or password',400))
  }

  //finding user in database
  const counselor = await Counselor.findOne({email}).select('+password');
  if(!counselor){
      return next(new ErrorHandler('Invalid Email or Password',401));
  }

  const isPasswordMatched = await counselor.comparePassword(password);
  if(!isPasswordMatched)
  {
  return next(new ErrorHandler('Invalid Email or Password',401));
  }

  sendToken(counselor, 200,res);

});

exports.logoutCounselor= catchAsyncError(async(req,res,next)=>{
  res.cookie('counselorToken',null,{
      expires:new Date(Date.now()),
      httpOnly:true
  })
  res.status(200).json({
      success:true,
      message:'Logged out successfully'
  })

});

exports.getCounselorProfile = catchAsyncError(async (req,res,next)=>{
 console.log(JSON.stringify(req.counselor)+"");
  const counselor= await Counselor.findById(req.counselor.id);
  res.status(200).json({
    success:true,
     counselor
  });
});

exports.updateCounselorPassword = catchAsyncError(async(req,res,next)=>{
  const counselor= await Counselor.findById(req.counselor.id).select('+password');

  
  const isMatched = await counselor.comparePassword(req.body.oldPassword);
  
  if(!isMatched)
  {
      return next(new ErrorHandler('Old password is incorrect',401));
  }
  counselor.password = req.body.newPassword;
  await counselor.save();

  sendToken(counselor,200,res);


});
