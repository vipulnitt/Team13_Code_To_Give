const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  email: {
    type: String
  },
  mobileNumber: {
    type: String
  },
  questions: [{
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
  createAt:{
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('Voluteer', volunteerSchema);
