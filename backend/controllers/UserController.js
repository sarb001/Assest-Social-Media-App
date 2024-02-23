

const User = require("../models/User");
const Post = require('../models/Post');
const cloudinary = require('cloudinary');

exports.Register = async(req,res) => {
    try {
        const {name,email,password,avatar} = req.body;
        const userexist = await User.findOne({email});

        if(userexist){
            return res.status(400).json({
                success : false , 
                message : "User Already Exists"
            })
        }

        let mycloud;

        if(!avatar){
            const defurl = 'https://www.pngitem.com/pimgs/m/516-5167304_transparent-background-white-user-icon-png-png-download.png';
             mycloud = await cloudinary.v2.uploader.upload(defurl ,{
                 folder: "posts"
             });

        }else{

            mycloud = await cloudinary.v2.uploader.upload(avatar ,{
               folder :"posts"
            });
        }

        user = await User.create({
            name,
            email,
            password,
            avatar : { public_id : mycloud.public_id , url : mycloud.secure_url }
        });
        res.status(201).json({ success : true , user });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}

exports.Login = async(req,res) => {
    try {
         console.log('req uested body login -',req.body);
        const { email , password } = req.body;
        const user = await User.findOne({email}).select("+password");     // find account with email 

        if(!user){
            return res.status(400).json({
                success : false , 
                message : "User does not Exist"
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "Password Incorrect"
            })
        }

        const  token = await user.generateToken();
        res.cookie("token",token , {
            secure  :  true,
            expires  : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly : true,
            sameSite : 'None',
        });
        return res.status(200).json({
            success : true,
            token,
            user
        })
    } catch (error) {
        console.log('error login -',error);
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.Logout = async(req,res) => {
    try {
        res.clearCookie('token');
        res.send({  success : true ,message : 'Logged Out' });
    } catch (error) {
        res.status(500).json({
            success :false,
            message : error.message,
        })
    }
}


exports.updateProfile = async(req,res) => {
    try {
        const { name ,email ,avatar } = req.body;
        if(!name || !email){
            return res.status(400).json({
                success : false,
                message : " Provide Name | Email | avatar "
            })
        }

        const user = await User.findById(req.user._id);
        if(name) user.name = name;
        if(email) user.email = email;

        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const mycloud = await cloudinary.v2.uploader.upload(avatar , {
                folder : "avatars",
            });
            user.avatar.public_id = mycloud.public_id;
            user.avatar.url = mycloud.secure_url;
        }    

          await user.save();

            res.status(200).json({
                success : true,
                message: "Profile Updated"
            })

    } catch (error) {
        return res.status(500).json({
            success  : false,
            message  : error.message
        })
    }
}

exports.updatePassword = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword , newPassword } = req.body;

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success : false,
                message : " Write Old | New Password "
            })
        }

        const isMatch = await user.matchPassword(oldPassword);
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "  Old Password is Incorrect "
            });
        }
         user.password = newPassword;
         await user.save();

         res.status(200).json({
            success : true,
            message: " Password Updated ",
         })

    } catch (error) {
        return res.status(500).json({
            success  :false,
            message : error.message
        })
    }
}

// Delete My Profile  and all Posts as well
exports.deleteMyProfile = async(req,res) => {
   try {
    const user = await User.findById(req.user._id);
    const posts  = user.posts;              // users' posts all 
    const userId = user._id;                // logged user Id
    const followers = user.followers;       // LOGGED User Followers 
    const following = user.following;

        await  cloudinary.v2.uploader.destroy(user.avatar.public_id);
        
        await user.deleteOne();
        res.cookie("token", null , {
            expires : new Date(Date.now()),
            httpOnly : true,
        });

    for(let i = 0; i < posts.length;i++){
        const post  = await Post.findById(posts[i]);
        await post.deleteOne();
    }
    // Removing User from Followers's Following as well 
    // or Remove your id from akshay's followers'following Id 

    for(let i = 0; i < followers.length; i++){
        const follower  = await User.findById(followers[i]);    // if specific  id in follower

        const index = follower.following.indexOf(userId);
        follower.following.splice(index,1);
        await follower.save();
    }

    for(let i = 0; i < following.length; i++){
        const follows = await User.findById(following[i]);    // if specific  id in follower

        const index = follows.followers.indexOf(userId);
        follows.followers.splice(index,1);
        await follows.save();
    }

    // Remove userid from All Comments 

    const allPosts = await Post.find();
    
    for(let i = 0 ;i <allPosts.length ;i++){
        const post = await allPosts.findById(allPosts[i]._id);   // Get specifc post with id 

        // check inside each post specifically 
        for (let j = 0; j < post.comments.length; j++) {
            // const element = array[j];
            if(post.comments[j].user ===  userId){
                post.comments.splice(j,1);
            }
            await post.save();
        }
    }

    // Remove userid from All Likes 

    for(let i = 0 ;i < allPosts.length ;i++){
        const post = await allPosts.findById(allPosts[i]._id);   // Get specifc post with id 

        // check inside each post specifically 
        for (let j = 0; j < post.likes.length; j++) {
            // const element = array[j];
            if(post.likes[j] ===  userId){
                post.likes.splice(j,1);
            }
            await post.save();
        }
    }

    res.status(200).json({
      success :true,
      message: " Profile Deleted ",
    })

   } catch (error) {
     return res.status(500).json({
        success : false,
        message : error.message
     })
   } 
}

// Logged User's  Profile
exports.MyProfile = async(req,res) => {

    try {
        const user = await User.findById(req.user?._id).populate("posts followers following");
        
        if(user){  
            console.log('sending 200');
           return res.status(200).json({
                success : true,
                user,
            });
        }else{
            
            console.log('sending 404 ');
            return res.status(404).json({           // check down
            success : false,
            message : " My Profile not Found ",
            })
        }

    } catch (error) {
        
        console.log('sending 500');
        // console.log(' profile error - ',error); /// check down
        // return res.status(500).json({
        //     success : false,
        //     message : error.message
        //  })
    }
}

//get Any User Profile by req.params
exports.getUserProfile = async(req,res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts followers following")
       
        if(!user){  
            return res.status(404).json({
            success : false,
            message : " User not Found ",
            })
        }

        res.status(200).json({
            success : true,
            user
        })

    } catch (error) {
        return res.status(500).json({
        success :false,
        message : error.message
        }) 
    }
}

// Get that User's Posts as well 
exports.GetUserPosts = async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = [];

        for(let i = 0; i < user.posts.length ; i++){
            const post = await Post.findById(user.posts[i]).populate(
                "likes comments.user owner"
            );
            posts.push(post);
        }

        res.status(200).json({
            success : true,
            posts,
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


// get All Users
exports.getAllUsers = async(req,res) => {
    try {
        const users = await User.find({ 
            name  :  { $regex : req.query.name , $options : "i" }
        });

        res.status(200).json({
            success :true,
            users 
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
         })
    }
}


//Follow User 
exports.FollowUser = async(req,res) => {
    try {
        const userToFollow = await User.findById(req.params.id);    // user i need to follow
        const loggedInUser   = await User.findById(req.user._id);       //logged User

        // if user we want to follow not existed 
        if(!userToFollow){
            return res.status(404).json({
                success : false,
                message : " User not Found ",
            });
        }

        // If usertoFollow existed then //
        // two cases can be there - 1) - May be user is  already followed then unfolow it
        // 2 )- if not Followed then Follow it normally 

        // 1) case - check if user is already followed
        if(loggedInUser.following.includes(userToFollow._id)){
            // checked in following 
           const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);          // If user to follow already exist then 

           loggedInUser.following.splice(indexFollowing,1);        // id find  in loggeduser  then remove it

           // check in Followers
           const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);         // if id find get the index 
            userToFollow.followers.splice(indexFollowers,1);                        // remove id from  here also 

            // From  Both sides if id Existed then remove it and save it

             await loggedInUser.save();
             await userToFollow.save();

             res.status(200).json({
                 success : true,
                 message : " User UnFollowed "
             })

        }else{   
            // 2) case - if existed then Follow it 
            loggedInUser.following.push(userToFollow._id);            // login user  following increased +1 when someonefollowed it 
            userToFollow.followers.push(loggedInUser._id);            // now user we have followed  increased by + 1
            
            await loggedInUser.save();
            await userToFollow.save();
            
            res.status(200).json({
                success : true,
                message : " User Followed "
            })
        }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })  
    }
}

exports.GetMyPosts  = async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = [];

        for(let i = 0; i < user.posts.length ; i++){
            const post = await Post.findById(user.posts[i]).populate(
                "likes comments.user owner"
            );
            posts.push(post);
        }

        res.status(200).json({
            success : true,
            posts : posts.reverse()
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

