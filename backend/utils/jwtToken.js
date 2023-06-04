//create and send token and save in the cookies

const sendToken = (admin,statusCode,res)=>{
// create jwt token
const token = admin.getJwtToken();
const options ={
    expires: new Date(
        Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
    httpOnly:true
}
res.status(statusCode).cookie('token', token,options).json({
    success: true,
    token,
    admin
});
}
module.exports = sendToken;