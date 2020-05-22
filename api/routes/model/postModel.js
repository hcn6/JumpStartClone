const mg = require('mongoose');

const commentSchema = mg.Schema({
    content: String,
    like:{
        type: Number,
        default: 0
    },
    reply: [String],
    location: String,
    date: Date
});

const postSchema = mg.Schema({
    role: {
        type: String,
        require: true
    },
    location:{
        type: String,
        default: 'Anonymous @ Other'
    },
    viewNumber:{
        type: Number,
        require:true,
        default: 0
    },
    date:{
        type: Date
    },
    like:{
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: [commentSchema],
        default: []
    }
});

module.exports = {
    post: mg.model('post', postSchema),
    comment: mg.model('comment', commentSchema)
}



