const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const sendEmail = require('../utils/sendEmail');
const sendUserToken = require('../utils/jwtTokenUser');

exports.login = catchAsyncError(async (req, res,next) => {
    const {email} = req.body;
    let user = await User.findOne({email});
    if(!user)
    {
        user = await User.create({email});
    }

    const otp = user.getOtp();
    await user.save({validateBeforeSave:false});

    //reset password url
  
    
    const message = `Your Otp for Login is ${otp}`

        try{
            await sendEmail({
                email: user.email,
                subject:'Otp',
                message
            });

        }catch(error){
            user.Otp=undefined;
            user.OtpExpires = undefined;

            await user.save({validateBeforeSave:false});
            return next(new ErrorHandler(error.message,500));
        }
        res.status(200).json({
            success:true,
            email:user.email,
            message:'An email has been sent to the user with further instructions.'
        })
   
});

exports.logoutUser = catchAsyncError(async(req,res,next)=>{
    res.cookie('tokenUser',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully'
    })

});
exports.otpVerify = catchAsyncError(async (req,res,next)=>{
    const {otp,email}= req.body;
    const user = await User.findOne({email});
    const status= await user.verifyOtp(otp);
    
    if(status)
    {
        user.Otp=undefined;
        user.OtpExpires = undefined;

        await user.save({validateBeforeSave:false});
        sendUserToken(user,200,res);
       
    }else
    {
        return next(new ErrorHandler('Wrong Otp',500));
    }

})

//getCurrentUser roll number

exports.getCurrentProfile = catchAsyncError(async (req,res,next)=>{
    console.log(JSON.stringify(req.body)+"");
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success:true,
      user
    });
  });

  