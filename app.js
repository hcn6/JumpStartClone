const express = require('express');
const multer = require('multer')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const textRoutes = require('./api/routes/texting');
const postRoutes = require('./api/routes/post');

mongoose.connect('mongodb+srv://hieunguyen:Hieu1234@hieubase-r9ivh.gcp.mongodb.net/Post?retryWrites=true&w=majority'
,{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
});
app.use(morgan('dev'));
app.use('/texting', textRoutes);
app.use('/post', postRoutes);

app.use((res, req, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
console.log(mongoose.connection.readyState);
module.exports = app;