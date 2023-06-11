const express = require('express');

const router = express.Router();

const { registerAdmin, loginAdmin,logoutAdmin, getAdminProfile, updatePassword,getPendingCounselor, acceptCounselorRequest, getAllSubmissions, getCounselorById, getCounselorList, allVounteer, deleteVounteer}  = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');
const { ageVsAddiction, addictionType } = require('../controllers/dataController');

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);
router.route('/profile').get(isAuthenticated,getAdminProfile);
router.route('/logout').get(isAuthenticated,logoutAdmin);
router.route('/password/update').put(isAuthenticated,updatePassword);
router.route('/getPendingCounselor').get(isAuthenticated,getPendingCounselor);
router.route('/acceptCounselorRequest').put(isAuthenticated,acceptCounselorRequest);
router.route('/agevsaddiction').get(isAuthenticated,ageVsAddiction);
router.route('/addiction').get(isAuthenticated,addictionType);
router.route('/allsubmissions').get(isAuthenticated,getAllSubmissions);
router.route('/getcounselorbyid').post(isAuthenticated,getCounselorById);
router.route('/getcounselorslist').get(isAuthenticated,getCounselorList);
router.route('/getvolunteer').get(isAuthenticated,allVounteer);  
router.route('/deletevolunteer').post(isAuthenticated,deleteVounteer);           
module.exports= router;