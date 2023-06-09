const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError= require('../middleware/catchAsyncError');
const Data = require('../models/data');
const Questions = require("../models/questionModel");

exports.saveData =catchAsyncError(async (req, res, next)=>{
     const {data} = Data.create(req.body);
     res.status(200).json({
        success:true,
        data
    });
  });
  