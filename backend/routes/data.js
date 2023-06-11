const express = require('express');

const router = express.Router();

const {saveData, addVounteer}  = require('../controllers/dataController');

router.route('/user/savedata').post(saveData);

router.route('/volunteer/savedata').post(addVounteer);
module.exports= router;