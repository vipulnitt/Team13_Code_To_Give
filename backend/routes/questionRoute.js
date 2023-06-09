const express = require('express');

const router = express.Router();

const { createQuestion, fetchQuestion } = require('../controllers/questionController');

router.route('/addquestion').post(createQuestion,);

router.route('/fetchquestion').post(fetchQuestion);

module.exports= router;