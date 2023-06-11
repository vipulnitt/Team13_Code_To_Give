const Counselor = require('../models/counselor');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtTokenCounselor');
const Data = require('../models/data');
const APIFeatures = require('../utils/apiFeatures');
exports.registerConselor = catchAsyncError(async (req, res, next)=>{
    const {name, email, password,expertise,experience,mobileNumber} = req.body;
     const approved=false;
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
 //console.log(JSON.stringify(req.counselor)+"");
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

exports.counselingRequest = catchAsyncError(async (req, res, next) => {
  const counselor = await Counselor.findById(req.counselor.id);
  const expertise = counselor.expertise;

  const data = await Data.find({
    addictionType: { $in: expertise },
    'counselorDetails.isAssigned': false,
    email: { $ne: 'NotProvided' },
  });
  const dataCount = await data.length;

 const resPerPage=6;
 const apiFeatures = new APIFeatures(Data.find({
  addictionType: { $in: expertise },
  'counselorDetails.isAssigned': false,
  email: { $ne: 'NotProvided' },
   }),req.query).search().filter().pagination(resPerPage);
   const response = await apiFeatures.query;
    
  res.status(200).json({
    success: true,
    count: dataCount,
        resPerPage,
    response: response
  });
});

exports.acceptCounseling  = catchAsyncError(async(req,res,next)=>{

  const id= req.body.id;
  var mongoose = require('mongoose');
  var o_id =new mongoose.Types.ObjectId(id);
  const result = await Data.findByIdAndUpdate({_id:o_id});
  result.counselorDetails.counselorId=req.counselor.id;

  result.counselorDetails.counselorName=req.counselor.name;
  result.counselorDetails.isAssigned=true;
  result.counselorDetails.status="underProcess";
  result.save();

  const counselor= await Counselor.findById(req.counselor.id);
  const expertise = counselor.expertise;
  const response = await Data.find({
    addictionType: { $in: expertise },
    'counselorDetails.isAssigned': false,
    email: { $ne: 'NotProvided' },
  });
 
  res.status(200).json({
    success:true,
    response:response
})
});

exports.underProcess = catchAsyncError(async(req,res,next)=>{
  const id= req.counselor.id;
  const response = await Data.find({
    'counselorDetails.counselorId': id,
    'counselorDetails.status': 'underProcess',
  });

  res.status(200).json({
    success:true,
    response:response
})
});

exports.finishedCounseling  = catchAsyncError(async(req,res,next)=>{
  const id= req.body.id;

  var mongoose = require('mongoose');
  var o_id =new mongoose.Types.ObjectId(id);
  const result = await Data.findByIdAndUpdate({_id:o_id});
  result.counselorDetails.status="closed";
  result.counselorDetails.remark=req.body.remark;
  result.save();

  const response = [];
  res.status(200).json({
    success:true,
    response:response
})
});

exports.getClosedData  = catchAsyncError(async(req,res,next)=>{
  const id= req.counselor.id;
  const response = [];

    const result = await Data.find({'counselorDetails.counselorId':id});
    for(let j=0;j<result.length;j++)
    {
      if(result[j].counselorDetails.status==="closed")
      response.push(result[j]);
    }
 
 
  res.status(200).json({
    success:true,
    response:response
})
});