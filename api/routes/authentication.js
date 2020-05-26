const express = require('express');
const router = express.Router();
const User = require('./model/userModel');

router.post('/', (req, res, next) =>{
    if(req.body.passwordConf !== req.body.password){
        let error = new Error('Password do not match');
        error.status = 400;
        res.send('Password do not match');
        next(error);
    }
    if(req.body.email
        && req.body.username
        && req.body.password
        && req.body.passwordConf){
        let userData = {
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
        };
        User.create(userData, function(err, user){
            if(err){
                return next(err);
            }
            else{
                req.session.id = user._id;
                return res.json("Happy Registration");
            }
        });
    }
    else if(req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail, req.body.logpassword, (err, result) => {
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
})

module.exports = router;