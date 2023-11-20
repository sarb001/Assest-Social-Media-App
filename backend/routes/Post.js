const express = require('express');

const { CreatePost, LikeandUnlikePost } = require('../controllers/PostController.js');
const { isAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.route('/post/upload').post(isAuthenticated,CreatePost);


// :id -  specific post id should be given 
router.route('/post/:id').get(isAuthenticated,LikeandUnlikePost);

module.exports = router;