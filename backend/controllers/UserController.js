

const User = require("../models/User");
const Post = require('../models/Post');


exports.Register = async  (req,res) => {
    try {
        const {name,email,password} = req.body;

        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success : false , 
                message : " User Already Exists "
            })
        }
        user = await User.create({
            name,
            email,
            password,
            avatar : { public_id : "hello" , url : "sampleurl" },
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
        const { email , password } = req.body;
        const user = await User.findOne({email}).select("+password");     // find account with email 

        if(!user){
            return res.status(400).json({
                success : false , 
                message : " User does not Exist "
            });
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : " Password Incorrect "
            })
        }

        const  token = await user.generateToken();

        res.status(200).cookie("token",token , {
            expires  : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly : true
        }).json({
            success  :true,
            user,
            token       
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.Logout = async(req,res) => {
    try {
        res.status(200).cookie("token",null, {
            expires : new Date(Date.now()),
            httpOnly :true
        }).json({
            success : false,
            message  : " Logged Out "
        });
    } catch (error) {
        res.status(500).json({
            success :false,
            message : error.message,
        })
    }
}

exports.updateProfile = async(req,res) => {
    try {
        const { name ,email }= req.body;
        if(!name || !email){
            return res.status(400).json({
                success : false,
                message : " Provide Name | Email "
            })
        }

        const user = await User.findById(req.user._id);
        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        await user.save();
            res.status(200).json({
                success : true,
                message: " Profile Updated "
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
        console.log('update pass-',oldPassword,newPassword);

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success : false,
                message : " Write Old | New Password "
            })
        }

        const isMatch = await user.matchPassword(oldPassword);
        console.log('update ismatch -',isMatch);
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
        const user = await User.findById(req.user._id).populate("posts");
        res.status(200).json({
            success : true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
         })
    }
}

//get Any User Profile by req.params
exports.getUserProfile = async(req,res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts")
       
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

// get All Users
exports.getAllUsers = async(req,res) => {
    try {
        const users = await User.find({});
        console.log('users getall- ',users);
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
            posts,
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
