
const Post = require('../models/Post.js');
const User = require('../models//User.js');

exports.CreatePost = async (req,res) => {
    try {
        const newPostData = {
            caption : req.body.caption,
            image: {
                public_id : "req.body.public_id",
                url : "req.body.url",
            },
            owner : req.user._id,
        }

        const post = await Post.create(newPostData);        // create post with above data
        const user = await User.findById(req.user._id);     // find  user  in 

        user.posts.push(post._id)   // post pushed to specific logged user account
        await user.save();
        
        res.status(201).json({
            success: true,
            post: post,
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}