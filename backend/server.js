const mongoose = require('mongoose');

const  app = require('./app');
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary');

connectDatabase();

// cloudinary.config({
//     cloud_name : 'damnzg3hr',
//     api_key    : '837344688223248',
//     api_secret : 'IM3NqVRlPox_P1lQ38SVfoss_68',
// })


// const PORT = process.env.PORT;  
const PORT=4000;

app.listen(PORT , () => {           
    console.log(`Server is Running on HERE  ${PORT}`);
})