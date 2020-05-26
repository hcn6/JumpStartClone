const express = require('express');
const multer = require('multer')
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const textRoutes = require('./api/routes/texting');
const postRoutes = require('./api/routes/post');
const authenticationRoutes = require('./api/routes/authentication');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//Database connection
mongoose.connect('mongodb://localhost:27017/Post',{useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
});
//Tracking login
app.use(session({
    secret: 'hieu dep trai',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//Routing
app.use(morgan('dev'));
app.use('/texting', textRoutes);
app.use('/post', postRoutes);
app.use('/authentication', authenticationRoutes);

//Throw errors
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