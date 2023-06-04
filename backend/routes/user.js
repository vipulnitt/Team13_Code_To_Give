const express = require('express');

const router = express.Router();

const {login, otpVerify, getCurrentProfile, logoutUser}  = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middleware/auth');
router.route('/user/login').post(login);

router.route('/user/verifyOtp').post(otpVerify);
router.route('/user/profile').get(isAuthenticatedUser,getCurrentProfile);
router.route('/user/logout').get(isAuthenticatedUser,logoutUser);
module.exports= router;