const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const questions = require('./questions');

const {connect} = require('mongoose');
const Questions = require('../models/questionModel');

dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedQuestion=async()=>{
    try{
           await Questions.deleteMany();
           await Questions.insertMany(questions);
           console.log('added Successfully');
           process.exit();
    } catch(error){
        console.log(error.message);
        process.exit();
    }
}
seedQuestion();