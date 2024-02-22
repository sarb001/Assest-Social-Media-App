const  mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

caption :   String,
_id: mongoose.Schema.Types.ObjectId,
image: {
    public_id : String,
    url : String
},

owner : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
},

createdAt:{
    type:Date,
    default : Date.now,
},

likes :[
    {
        type :mongoose.Schema.Types.ObjectId,    
        ref : "User"
    }
],

comments: [
    {
        user : {
            type :mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        comment :{
            type:String,
            required : true,
        }
    }
]

})

mongoose.models = {}

const Post = mongoose.models.Post || mongoose.model("Post",PostSchema);

module.exports = Post;
