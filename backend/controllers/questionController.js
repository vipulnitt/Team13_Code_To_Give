const express = require("express");
const Questions = require("../models/questionModel");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');

exports.createQuestion =  catchAsyncError(async (req, res, next)=>{
  const { questionId, statement, options, parentId } = req.body;
  if (!questionId || !statement || !options || !parentId) {
    return next(new ErrorHandler('Please filled the field properly"',400))

  }
    const newQuestion = await Questions.create({
      questionId,
      statement,
      options,
      parentId,
    });
    res.status(200).json({
      success:true,
      newQuestion
  });

});

exports.fetchQuestion = catchAsyncError(async (req, res, next)=>{
  const { id } = req.body;
  const question = await Questions.findOne({questionId:id});
  res.status(200).json({
    success:true,
    question
});

 
});
