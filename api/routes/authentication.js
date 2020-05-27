const express = require('express');
const router = express.Router();
const User = require('../../model/userModel');
const mongoose = require('mongoose');
const db = mongoose.connection;
router.post('/', async(req, res, next) =>{
    if(req.body.passwordConf !== req.body.password){
        let error = new Error('Password do not match');
        error.status = 400;
        return res.send('Password do not match');
    }

    // await User.findOne({email: req.body.email}, (err, result) => {
    //     if(err){
    //         return next(err);
    //     }
    //     else if(result){
    //         return res.json('Email is already registered');
    //     }
    //     else{
    //         return next();
    //     }
    // });
    
    let result = await User.findOne({username: req.body.username});
    if(result){
        return res.send('Username is already registered');
    }

    result = await User.findOne({email: req.body.email});
    if(result){
        return res.send('Email is already registered');
    }

    if(req.body.email
        && req.body.username
        && req.body.password
        && req.body.passwordConf){

        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        await User.create(userData, function(err, user){
            if(err){
                return next(err);
            }
            else{
                req.session.id = user._id;
                return res.redirect('/post');
            }
        });
    }
    else if(req.body.logemail && req.body.logpassword){
        await User.authenticate(req.body.logemail, req.body.logpassword, (err, result) => {
            if(err || !result){
                err = new Error('Wrong email or password');
                return next(err);
            }
            else{
                req.session.id = result._id;
                return res.json(result);
            }
        })
    }
    else{
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

module.exports = router;