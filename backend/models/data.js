const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique:true
  },
  mobileNumber: {
    type: String
  },
  questions: [{
    q_id: {
      type: String
    },
    statement: {
      type: String
    },
    ans: {
      type: String
    }
  }],
  addictionType: {
    type: String
  },
  Counseling:{
    type:Boolean,
    default:false
  },
  counselorDetails:{
    isAssigned: {
      type:Boolean,
      default:false
    },
    counselorId:{
      type:String
    },
    counselorName:{
      type:String
    },
    status:{
      type:String,
      default:"notAccepted"
    },
    remark:{
      type:String,
      default:"Not mentioned"
    }

  }
});

module.exports = mongoose.model('Data', dataSchema);
