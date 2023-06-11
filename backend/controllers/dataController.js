
const catchAsyncError= require('../middleware/catchAsyncError');
const Data = require('../models/data');
const Questions = require("../models/questionModel");
const Volunteer = require("../models/volunteerModel");

exports.saveData =catchAsyncError(async (req, res, next)=>{
     const {data} = Data.create(req.body);
     res.status(200).json({
        success:true,
        data
    });
  });
  exports.ageVsAddiction = catchAsyncError(async (req, res, next) => {
    Data.aggregate([
      {
        $group: {
          _id: {
            addictionType: "$addictionType",
            ageRange: {
              $switch: {
                branches: [
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 10] }, then: "0-10" },
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 15] }, then: "10-15" },
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 20] }, then: "15-20" },
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 25] }, then: "20-25" },
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 30] }, then: "30-35" },
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 35] }, then: "25-40" },
                  { case: { $lte: [{ $toInt: { $arrayElemAt: ["$questions.ans", 0] } }, 40] }, then: "35-40" }
                ],
                default: "40+"
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.addictionType",
          groups: { $push: { ageRange: "$_id.ageRange", count: "$count" } }
        }
      }
    ])
      .then(results => {
        res.status(200).json({
          success: true,
          results
        });
      })
      .catch(error => {
        res.status(200).json({
            success: true,
            error:error
          });
      });
  });
  
  exports.addictionType = catchAsyncError(async (req, res, next)=>{
    await Data.aggregate([
        {
          $group: {
            _id: "$addictionType",
            count: { $sum: 1 }
          }
        }
      ])
        .then(results => {
            res.status(200).json({
                success: true,
                results:results
              });
        })
        .catch(error => {
            res.status(200).json({
                success: true,
                error:error
              });
        });
 });

 exports.addVounteer  = catchAsyncError(async (req, res, next)=>{
     const data= await Volunteer.create(req.body);
     res.status(200).json({
      success: true,
      data
    });
 });