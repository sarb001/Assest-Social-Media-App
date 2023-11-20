const mongoose = require('mongoose');

const  app = require('./app');
const { connectDatabase } = require('./config/database');

connectDatabase();

// const PORT = process.env.PORT;  
const PORT=4000;

app.listen(PORT , () => {           
    console.log(`Server is Running on HERE  ${PORT}`);
})