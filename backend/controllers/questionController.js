const express = require("express");
const Questions = require("../models/questionModel");

const createQuestion = async (req, res) => {
  const { questionId, statement, options, parentId } = req.body;
  if (!questionId || !statement || !options || !parentId) {
    return res.status(400).json({ error: "Please filled the field properly" });
  }
  try {
    const newQuestion = await Questions.create({
      questionId,
      statement,
      options,
      parentId,
    });
    if (newQuestion) {
      return res
        .status(201)
        .json({ message: "Question inserted successfully" });
    } else {
      return res.status(400).json({ error: "Question not inserted" });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
};

const questions = async (req, res) => {
  try {
    const q = await Questions.find();
    if (!q) {
      return res.status(404).json({ error: "No questions found" });
    } else {
      res.send(q);
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
};

module.exports = { createQuestion, questions };
