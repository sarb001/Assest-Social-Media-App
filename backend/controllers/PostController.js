
const Post = require('../models/Post.js');
const User = require('../models//User.js');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');


exports.CreatePost = async (req,res) => {
    try {
        console.log('before mycloud ');
        console.log('requested request only --- ',req);
        console.log('requested body --- ',req.body);

        console.log('requestyed img2-',typeof(req.body.image));

        const imagebase64 = req.body.image;

        const mycloud = await cloudinary.v2.uploader.upload(imagebase64 ,{
            folder : "posts"
        },(err,res) => {
            console.log('error -',err);
            console.log('result -',res);
        });
        
        console.log('after mycloud ');
        
        if(mongoose.isValidObjectId(req.user._id)){
            owner = req.user._id  
            console.log(' owner --',owner);
        }else {
            console.log(' else part here -');
            return res.status(400).json({
                success: false,
                message: "Invalid user IDDDD",
            });
        }
        
        console.log('after postdata ');

        const newPostData = {
            caption : req.body.caption,
            image: {
                public_id : mycloud.public_id,
                url : mycloud.secure_url,
            },
            owner : req.user._id,
        }
        console.log('new post data - ',newPostData);
        const post = await Post.create(newPostData);        // create post with above data
      
        console.log('post created -',post);

        
        if(!post){
            return res.status(500).json({
                success: false,
                message : " Post Doesn't Exist "
            })
        }

            const user = await User.findById(req.user._id);     // find  user  in 
            user.posts.push(post._id)   // post pushed to specific logged user account
            await user.save();

             return res.status(201).json({
                post,
                success: true,
                message : "Post Createdd"
            })

    } catch (error) {   

       return  res.status(500).json({
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

        await cloudinary.v2.uploader.destroy(post.image.public_id);

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

        const user = await User.findById(req.user._id);         // get  logged User

        // in whole user's following's post array  get id of post and match it with owner 
        // after matching find the posts in Post

        const posts = await Post.find({
            owner : {
                $in : user.following,
            }
        }).populate("owner likes comments.user")

        return res.status(200).json({
            success : true,
            posts : posts.reverse()
        });
    } catch (error) {
        console.log('error -',error);
        res.status(500).json({
            success :   false,
            message :   error.message
        })
    }
}

exports.updateCaption = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success :false,
                message : " Post not Found ",
            })
        }

        // check if logged user is the real owrer who create it  so you can update it 
        if(post.owner.toString() !== req.user._id.toString()){
            return  res.status(401).json({
            success : false,
            message : " Unauthorized User "
            })
        }
        post.caption = req.body.caption;
        await post.save();
        res.status(200).json({
            success  :true,
            message : " Caption Updated "
        })


    } catch (error) {
       return res.status(500).json({
         success  : false,
         message : error.message
       }) 
    }
}

//only comment on post available not Edit
exports.commentonPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                 success : false,
                 message : " Post not Found "
            })
        }

        post.comments.push({
            user    : req.user._id,
            comment : req.body.comment
        });

        await post.save();
        return res.status(200).json({
            success :true,
            message : " Comment Added ",
        })

    } catch (error) {
        return res.status(500).json({
         success :false,
         message :error.message
        })
    }
}


exports.deleteComment = async(req,res) => {
    try {
        const  post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({
                success : false,
                message : " Post not Found "
            })
        }


            if(post.owner === req.user._id){          // logged user is doing some action 
                if(req.body.commentId == undefined){            // if commentId is not Given
                    return res.status(400).json({
                        success : false,
                        message : " Comment ID is Required ",
                    })
                }

                post.comments.forEach((item,index) => {
                    if(item?._id.toString() === req.body.commentId.toString()){
                        return post.comments.splice(index,1);
                    }
                });

                await post.save();
                return res.status(200).json({
                    success : true,
                    message : "Selected Comment has Deleted",
                })
            }else{
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                  return post.comments.splice(index, 1);
                }
              });
        
              await post.save();
        
              return res.status(200).json({
                success: true,
                message: "Your Comment has deleted",
              });
        }
    } catch (error) {
        return res.status(500).json({
        success :false,
        message : error.message
        })
    }
}