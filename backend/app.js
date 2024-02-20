const express = require('express');
const app = express();
const  cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

app.use(express.json({
    limit : '50mb'
}))


app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


// importing Routes
const post = require('./routes/Post.js');
const user = require('./routes/User.js');

// Defining route  path 
app.use('/api' , post);
app.use('/api' , user);

app.get('/' ,(req,res)  => {
    res.send('Helllo Backend Herererer er er er Working Starting Production ');
})

app.get('/api/v1' ,(req,res)  => {
    res.send('Helllo Backend V1 vq  1v 1 v1 v1v1v1 ');
})




module.exports = app;