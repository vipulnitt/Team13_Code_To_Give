const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    unique: true,
  },
  statement: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String
      },
      childId: {
        type: String,
        default: "BASE0",
      },
    },
  ],
  isText:{
    childId:{
      type:String
    }
  },
  parentId: {
    type: String
  },createAt:{
    type: Date,
    default: Date.now
}
});

const Questions = mongoose.model("Questions", questionSchema);

module.exports = Questions;
