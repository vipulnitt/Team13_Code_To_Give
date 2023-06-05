const express = require('express');

const router = express.Router();

const { registerAdmin, loginAdmin,logoutAdmin, getAdminProfile, updatePassword}  = require('../controllers/authController');
const {login} = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);
router.route('/profile').get(isAuthenticated,getAdminProfile);
router.route('/logout').get(isAuthenticated,logoutAdmin);
router.route('/password/update').put(isAuthenticated,updatePassword);
module.exports= router;