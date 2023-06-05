const express = require('express');

const router = express.Router();

const { registerConselor, loginCounselor, logoutCounselor, getCounselorProfile, updateCounselorPassword} = require('../controllers/counselorController');
const { isAuthenticatedCounselor } = require('../middleware/auth');

router.route('/counselor/register').post(registerConselor);
router.route('/counselor/login').post(loginCounselor);
router.route('/counselor/logout').get(logoutCounselor);
router.route('/counselor/profile').get(isAuthenticatedCounselor,getCounselorProfile);
router.route('/counselor/updatepassword').put(isAuthenticatedCounselor,updateCounselorPassword);

module.exports= router;