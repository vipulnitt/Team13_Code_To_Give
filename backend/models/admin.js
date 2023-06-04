const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const adminSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Please enter your name'],
    maxLenght: [30,'Your name cannot exceed 30 characters']
  },
  email: {
    type:String,
    required: [true,'Please  enter your email'],
    unique: true,
    validate:[validator.isEmail,'Please enter valid email address'] 
  },
  password: {
    type: String,
    required:[true,'please enter your password'],
    minLenght: [6,'Your password must be longer than 6 character'],
    select: false
  },
createAt:{
    type: Date,
    default: Date.now
},
resetPasswordToken :String,
resetPasswordExpire: Date
});

// Encypting password before saving user
adminSchema.pre('save',async function (next){
  if(!this.isModified('password'))
  {
    next()
  }
  this.password = await bcrypt.hash(this.password,10);
});

//compare user password

adminSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

//return JWT token

adminSchema.methods.getJwtToken = function(){
  return jwt.sign({id: this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME
  });
}
//Generate password reset token
adminSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString('hex');
  console.log(resetToken);
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  console.log(this.resetPasswordToken);
  return resetToken;
}

module.exports = mongoose.model('admin',adminSchema);