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
app.use(cors());


const post = require('./routes/Post.js');
const user = require('./routes/User.js');

app.use('/api' , post);
app.use('/api' , user);

app.get('/' , (req,res)   => {
    res.setHeader('Access-Control-Allow-Credentials', "true");
})



module.exports = app;