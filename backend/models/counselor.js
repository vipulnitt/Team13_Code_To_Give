const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const counselorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true,'Please  enter your email'],
    unique: true,
    validate:[validator.isEmail,'Please enter valid email address'] 
  },
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  password: {
    type:String,
    required:[true,'please enter your password'],
    minLenght: [6,'Your password must be longer than 6 character'],
    select: false
  },
  expertise: {
    type: [String],
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  createAt:{
    type: Date,
    default: Date.now
}
});
counselorSchema.pre('save',async function (next){
  if(!this.isModified('password'))
  {
    next()
  }
  this.password = await bcrypt.hash(this.password,10);
});

counselorSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
  }

counselorSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRES_TIME
    });
  }

module.exports = mongoose.model('Counselor', counselorSchema);
