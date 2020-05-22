const mg = require('mongoose');

const comment = mg.Schema({
    content: String,
    like:{
        type: Number,
        default: 0
    },
    reply: [String],
    location: String,
    date: Date
});

const post = mg.Schema({
    role: {
        type: String,
        default: 'Random'
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
        type: Date,
        required: true
    },
    like:{
        type: Number,
        required: true,
        default: 0
    },
    comments: [comment]
});

const Post = module.exports = mg.model('Post', post);

const Comment = module.exports = mg.model('Comment', comment);

module.exports.getComment = (callback, limit) => {
    Comment.find(callback).limit(limit);
}

module.exports.getPost = (callback, limit) => {
    Post.find(callback).limit(limit);
}

