const express = require('express');

const router = express.Router();

const Post = require('./model/postModel');

router.get('/', function(req, res){
    Post.getPost(function(err, post){
        if(err){
            res.send("Can't get post");
        }
        //res.send("Hello");
        res.json(post);
    });
});

const mongoose = require('mongoose');
console.log(mongoose.connection.readyState);

module.exports = router;