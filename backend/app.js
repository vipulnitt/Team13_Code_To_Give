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
app.use('/api/v1',admin);
app.use('/api/v1',counselor);

//middleware to handle errors
app.use(errorMiddleware);
module.exports = app;