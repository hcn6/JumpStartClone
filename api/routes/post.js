const express = require('express');

const router = express.Router();

const postSchema = require('./model/postModel');

router.post('/', async(req, res) => {
    const role = req.body.role;
    const location = req.body.location;
    const viewNumber = req.body.viewNumber;
    const date = req.body.date;
    const like = req.body.like;
    const comments = req.body.comments;
    const post = new postSchema({
        role: role,
        location: location,
        viewNumber: viewNumber,
        date: date,
        like: like,
        comments: comments
    });
    console.log("Hello guys");
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch(error){
        res.json({
            message: error
        });
    }
});

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