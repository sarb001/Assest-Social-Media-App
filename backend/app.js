const express = require('express');
const app = express();
const  cookieParser = require('cookie-parser');
const path = require('path');

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config({path : './config/config.env'});
}

app.use(express.json({
    limit : '50mb'
}))
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


// importing Routes
const post = require('./routes/Post.js');
const user = require('./routes/User.js');

// Defining route  path 
app.use('/api/v1' , post);
app.use('/api/v1' , user);




module.exports = app;