//create and send token and save in the cookies

const sendUserToken = (user,statusCode,res)=>{
// create jwt token
const token = user.getJwtToken();
const options ={
    expires: new Date(
        Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
    httpOnly:true
}
res.status(statusCode).cookie('tokenUser', token,options).json({
    success: true,
    token,
    user
});
}
module.exports = sendUserToken;