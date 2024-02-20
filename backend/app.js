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

app.use(cors())


// importing Routes
const post = require('./routes/Post.js');
const user = require('./routes/User.js');

// Defining route  path 
app.use('/api' , post);
app.use('/api' , user);

<<<<<<< HEAD
app.get('/' ,(req,res)  => {
    res.send('Helllo Backend Herererer er er er Working Starting Production ');
})

app.get('/api/v1' ,(req,res)  => {
    res.send('Helllo Backend V1 vq  1v 1 v1 v1v1v1 ');
})

=======
>>>>>>> f723c21c853a3b4776d7d4b3c6b54a270eb816ed



module.exports = app;