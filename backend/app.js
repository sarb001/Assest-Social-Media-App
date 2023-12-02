const express = require('express');
const app = express();
const  cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

app.use(express.json({
    limit : '50mb'
}))

app.use(cors());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


// importing Routes
const post = require('./routes/Post.js');
const user = require('./routes/User.js');

// Defining route  path 
app.use('/api/v1' , post);
app.use('/api/v1' , user);

app.get('/' ,(req,res)  => {
    res.send('Helllo Backend Here Working ');
})




module.exports = app;