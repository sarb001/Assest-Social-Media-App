
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

// check if post is liked then unlike it 
// if not  then like it now  


exports.LikeandUnlikePost = async(req,res) =>{
    //check if already liked it or not ?
    try {
            // params means specific postid
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
            success : false,
            message : " Post not Found ",
            })
        }

        if(post.likes.includes(req.user._id)){          // check userid ( manyuser liked  the posts ) exists in  all Liked posts
            const index = post.likes.indexOf(req.user._id);     // find specific index of that place 

            post.likes.splice(index,1);                 // remove it from that place 

            return res.status(200).json({
                success  :true,
                message : "Post Unliked",
            });
        }else{
            // like the post now
            post.likes.push(req.user._id);
            await post.save();

            return res.status(200).json({
                success : true,
                message :  " Post Liked "
            })
        }

    } catch (error) {
        res.status(500).json({
             success  :false,
             message : error.message
        })
    }
}