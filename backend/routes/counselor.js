const express = require('express');

const router = express.Router();

const { registerConselor, loginCounselor, logoutCounselor, getCounselorProfile, updateCounselorPassword, counselingRequest, acceptCounseling, underProcess, finishedCounseling} = require('../controllers/counselorController');
const { isAuthenticatedCounselor } = require('../middleware/auth');

router.route('/counselor/register').post(registerConselor);
router.route('/counselor/login').post(loginCounselor);
router.route('/counselor/logout').get(logoutCounselor);
router.route('/counselor/profile').get(isAuthenticatedCounselor,getCounselorProfile);
router.route('/counselor/updatepassword').put(isAuthenticatedCounselor,updateCounselorPassword);
router.route('/counselor/counselingrequest').get(isAuthenticatedCounselor,counselingRequest);
router.route('/counselor/acceptcounseling').put(isAuthenticatedCounselor,acceptCounseling);
router.route('/counselor/underprocess').get(isAuthenticatedCounselor,underProcess);
router.route('/counselor/finishedcounseling').put(isAuthenticatedCounselor,finishedCounseling);


module.exports= router;