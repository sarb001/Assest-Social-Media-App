const express = require('express');

const { CreatePost, LikeandUnlikePost, deletePost, getPostofFollowing, updateCaption, commentonPost } = require('../controllers/PostController.js');
const { isAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.route('/post/upload').post(isAuthenticated,CreatePost);

// :id -  specific post id should be given 
router.route('/post/:id').get(isAuthenticated,LikeandUnlikePost);

//delete Post
router.route('/post/:id').delete(isAuthenticated,deletePost);

router.route('/post/:id').put(isAuthenticated,updateCaption);

router.route('/followpost').get(isAuthenticated,getPostofFollowing);

router.route('/posts/comment/:id').put(isAuthenticated,commentonPost);


module.exports = router;