const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
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
  
});

module.exports = mongoose.model('Data', dataSchema);
