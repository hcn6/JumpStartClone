const express = require('express');

const router = express.Router();

const userSchema = require('./model/userModel');

router.post('/', async(req, res) =>{
    let name = req.body.username;
    const user = new userSchema({
        username: name
    });
    try{
        let saveUser = await user.save();
        res.json(saveUser);
    }
    catch(error){
        res.json({
            message: error
        });
    }
});

router.get('/', async(req, res) => {
    let query = userSchema.find();
});
