const express = require('express');
const { Register, Login, FollowUser } = require('../controllers/UserController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(Register);

router.route('/login').post(Login);

router.route('/follow/:id').get(isAuthenticated,FollowUser);

module.exports = router;