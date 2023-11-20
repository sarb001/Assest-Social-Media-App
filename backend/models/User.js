const  mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true,"Please Enter a Name"]
    },
    avatar : {
        public_id : String,
        url : String
    },
    email:{
        type: String,
        required : [true,"Please Enter an Email"],
        unique: [true,"Email already exsits"]
    },
    password : {
        type: String,
        required : [true,"Please Enter a Password"],
        minLength : [6,"Password must be alteast 6 characters"],
        select : false,
    },
    posts: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :  "Post",      // reference to User Post 
        }
    ],
    followers: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :  "User",
        }
    ],
    following: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :  "User",
        }
    ]
})

// hash pass before saving  doc 
UserSchema.pre('save' , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})

// match password 
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateToken = function(){
    return jwt.sign({_id : this._id},'sarbSECRET@123');
}

mongoose.models = {}

const User =  mongoose.models.User || mongoose.model("User",UserSchema);

module.exports = User;
