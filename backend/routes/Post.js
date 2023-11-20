const express = require('express');

const { CreatePost } = require('../controllers/PostController.js');
const { isAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.route('/post/upload').post(isAuthenticated,CreatePost);

module.exports = router;