const express = require('express');

const router = express.Router();

const {saveData}  = require('../controllers/dataController');

router.route('/user/savedata').post(saveData);
module.exports= router;