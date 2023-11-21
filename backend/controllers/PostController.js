
const Post = require('../models/Post.js');
const User = require('../models//User.js');

exports.CreatePost = async (req,res) => {
    try {
        console.log(' Create post-');
        const newPostData = {
            caption : req.body.caption,
            image: {
                public_id : "req.body.public_id",
                url : "req.body.url",
            },
            owner : req.user._id,
        }
        const post = await Post.create(newPostData);        // create post with above data

        if(!post){
            return res.status(500).json({
                success: false,
                message : " Post Doesn't Exist "
            })
        }
        
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
            await post.save();
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


exports.deletePost = async(req,res) => {
    try {
        // find post of specific id 
        const post = await Post.findById(req.params.id);
        console.log('post in del -',post);
        if(!post){
            return res.status(404).json({
                success : false,
                message :" Post not Found "
            })
        }

        //check if post by deleted  by owner ( the one who create it )
        // if not then show Unathu..
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success : false,
                message : "UnAuthorized"
            })
        }
        await post.deleteOne();        // post removed now 

        // post has been deleted now but 
        // remove it from Specific user's post Array where it still exists

        const user  = await User.findById(req.user._id);    // find specific user's post 
        const index = user.posts.indexOf(req.params.id);    // find Index of that post 
        // and remove it or splice it
        user.posts.splice(index,1);

        await user.save();
        res.status(200).json({
            success : true,
            message : " Post Deleted ",
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        }) 
    }
}


//get Specific User's Following

exports.getPostofFollowing = async(req,res) => {
    try {
        // get loggedin user ID

        // following populate means spread all and  find data of specific ID and  get all posts as well
        const user = await User.findById(req.user._id).populate("following", "posts");
        
        return res.status(200).json({
            success : true,
            following : user.following
        });

    } catch (error) {
        res.status(500).json({
            success :   false,
            message :   error.message
        })
    }
}