require('dotenv').config();
const mongoose = require('mongoose');
const  app = require('./app');
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary');

connectDatabase();

cloudinary.config({
    cloud_name : process.env.cloud_name,
    api_key    : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
})



app.listen(process.env.PORT,() => {           
    console.log(`Server Running On - ${process.env.PORT}`);
})     