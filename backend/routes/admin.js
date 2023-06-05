const express = require('express');

const router = express.Router();

const { registerAdmin, loginAdmin,logoutAdmin, getAdminProfile, updatePassword,getPendingCounselor, acceptCounselorRequest}  = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);
router.route('/profile').get(isAuthenticated,getAdminProfile);
router.route('/logout').get(isAuthenticated,logoutAdmin);
router.route('/password/update').put(isAuthenticated,updatePassword);
router.route('/getPendingCounselor').get(isAuthenticated,getPendingCounselor);
router.route('/acceptCounselorRequest').put(isAuthenticated,acceptCounselorRequest);
module.exports= router;