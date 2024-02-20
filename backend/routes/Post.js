const express = require('express');

const { CreatePost, LikeandUnlikePost, deletePost, getPostofFollowing, updateCaption, commentonPost, deleteComment } = require('../controllers/PostController.js');
const { isAuthenticated } = require('../middlewares/auth.js');

const router = express.Router();

router.route('/followpost').get(isAuthenticated,getPostofFollowing);

router.route('/post/upload').post(isAuthenticated,CreatePost);


router.route('/post/:id').get(isAuthenticated,LikeandUnlikePost);


router.route('/post/:id').delete(isAuthenticated,deletePost);

router.route('/post/:id').put(isAuthenticated,updateCaption);

router.route('/posts/comment/:id').put(isAuthenticated,commentonPost);

router.route('/posts/comment/:id').delete(isAuthenticated,deleteComment);




module.exports = router;