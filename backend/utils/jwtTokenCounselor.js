//create and send token and save in the cookies

const sendToken = (counselor,statusCode,res)=>{
    // create jwt token
    const token = counselor.getJwtToken();
    const options ={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true
    }
    res.status(statusCode).cookie('counselorToken', token,options).json({
        success: true,
        token,
        counselor
    });
    }
    module.exports = sendToken;