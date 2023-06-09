const express = require('express');
const app=express();
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errors');
var bodyParser = require('body-parser')


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
const admin = require('./routes/admin');
const counselor = require('./routes/counselor');
const question = require('./routes/questionRoute')
const data = require('./routes/data');
app.use('/api/v1',admin);
app.use('/api/v1',counselor);
app.use('/api/v1',question);
app.use('/api/v1',data)
//middleware to handle errors
app.use(errorMiddleware);
module.exports = app;