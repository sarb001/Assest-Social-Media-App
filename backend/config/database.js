const mongoose = require('mongoose');


exports.connectDatabase  = () => {
    mongoose.connect(process.env.DB_URL, {
    dbName : process.env.DB_NAME
})
    .then((con) => console.log(` Database Connected Here ${con.connection.host}`))
    .catch((error) => console.log('error -',error))
     console.log('db connected');
}
