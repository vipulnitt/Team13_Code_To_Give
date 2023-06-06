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
        type: String,
        required: true,
      },
      childId: {
        type: String,
        default: "-1",
      },
    },
  ],
  parentId: {
    type: String,
    required: true,
  },
});

const Questions = mongoose.model("Questions", questionSchema);

module.exports = Questions;
