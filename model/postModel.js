const mg = require('mongoose');

const commentSchema = mg.Schema({
    postedBy: {
        type: mg.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    like:{
        type: Number,
        default: 0
    },
    location: String,
    date: Date
});

const postSchema = mg.Schema({
    postedBy: {
        type: mg.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        require: true
    },
    location:{
        type: String,
        default: 'Anonymous @ Other'
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
    post: mg.model('post', postSchema, 'post'),
    comment: mg.model('comment', commentSchema, 'comments')
}



