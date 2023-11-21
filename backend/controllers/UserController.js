

const User = require("../models/User");

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