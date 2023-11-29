const express = require('express');
const { Register, Login, FollowUser, Logout, updateProfile, updatePassword, deleteMyProfile, MyProfile, getAllUsers, getUserProfile, GetMyPosts, GetUserPosts } = require('../controllers/UserController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/logout').get(Logout);

router.route('/update/profile').put(isAuthenticated,updateProfile);

router.route('/update/password').put(isAuthenticated,updatePassword);

router.route('/follow/:id').get(isAuthenticated,FollowUser);


router.route('/delete/me').delete(isAuthenticated,deleteMyProfile);

router.route('/myprofile').get(isAuthenticated,MyProfile);

// Get All Posts of  Logged User's 
router.route('/my/posts').get(isAuthenticated,GetMyPosts);


// get Any User's Posts as well here 
router.route('/userposts/:id').get(isAuthenticated,GetUserPosts);

// get Any User Profile by req.params.id 
router.route('/user/:id').get(isAuthenticated,getUserProfile);


router.route('/users').get(isAuthenticated,getAllUsers);


module.exports = router;