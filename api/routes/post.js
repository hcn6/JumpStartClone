const express = require('express');

const router = express.Router();

const postSchema = require('./model/postModel');

router.post('/', async(req, res) => {
    let post = new postSchema.post(req.body);
    try{
        let savedPost = await post.save();
        res.json(savedPost);
    }
    catch(error){
        res.json({
            message: error
        });
    }
});

router.get('/:postID', async(req, res) => {
    try{
    let query = await postSchema.post.findById(req.params.postID);
    res.json(query);
    }
    catch(error){
        res.json({
            message: error
        });
    }
});

router.post('/:postID/comment', async(req, res) => {
    let comment = new postSchema.comment(req.body);
    let id = req.params.postID;
    try{
        let newComment = await postSchema.post.findByIdAndUpdate(id, {$push:{comments: comment}}, {new:true});
        res.json(newComment);
    }
    catch(error){
        res.json({
            message:error
        });
    }
});

const mongoose = require('mongoose');
console.log(mongoose.connection.readyState);

module.exports = router;