const express = require('express');
const { Register, Login, FollowUser, Logout, updateProfile, updatePassword, deleteMyProfile, MyProfile } = require('../controllers/UserController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/logout').get(Logout);

router.route('update/profile').put(isAuthenticated,updateProfile);

router.route('/update/password').put(isAuthenticated,updatePassword);

router.route('/follow/:id').get(isAuthenticated,FollowUser);

router.route('/delete/me').delete(isAuthenticated,deleteMyProfile);

router.route('/myprofile').get(isAuthenticated,MyProfile);


module.exports = router;