const dotenv = require('dotenv');
const mongoose = require('mongoose');
const  app = require('./app');
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary');


dotenv.config({path : "./config.env"})

connectDatabase();

cloudinary.config({
    cloud_name : process.env.cloud_name,
    api_key    : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
})

const PORT = process.env.PORT;

app.listen(PORT,() => {           
    console.log(`Server Running On - ${PORT}`);
})