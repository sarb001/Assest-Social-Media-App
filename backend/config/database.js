const mongoose = require('mongoose');


exports.connectDatabase  = () => {mongoose.connect('mongodb+srv://admin:admin@cluster0.3phzl66.mongodb.net/?retryWrites=true&w=majority' , 
{
    dbName : 'socialmediaApp1'
})
    .then((con) => console.log(` Database Connected Finally to ${con.connection.host}`))
    .catch((error) => console.log('error -',error))
}
