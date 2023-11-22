const express = require('express');
const { Register, Login, FollowUser, Logout, updateProfile, updatePassword } = require('../controllers/UserController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/logout').get(Logout);

router.route('update/profile').put(isAuthenticated,updateProfile);

router.route('/update/password').put(isAuthenticated,updatePassword);

router.route('/follow/:id').get(isAuthenticated,FollowUser);

module.exports = router;