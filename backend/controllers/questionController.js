const express = require("express");
const Questions = require("../models/questionModel");

const createQuestion = async (req, res) => {
  try {
    const q = await Questions.create({
      questionId: "1",
      statement: "How much time do you spend on your phone each day?",
      options: [
        {
          option: "Lees than 1 hours",
        },
        {
          option: "1 - 2 hours",
        },
        {
          option: "2 - 4 hours",
          childId: "2",
        },
        {
          option: "More than 4 hours",
          childId: "2",
        },
      ],
      parentId: "0",
    });

    if (!q) {
      res.status(404).json({ message: "Question not inserted" });
    } else {
      res.send(q);
    }
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};

const questions = async (req, res) => {
  try {
    const q = await Questions.find();
    if (!q) {
      res.status(404).json({ message: "No questions found" });
    } else {
      res.send(q);
    }
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};

module.exports = { createQuestion, questions };
