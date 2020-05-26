const mg = require('mongoose');

const message = mg.Schema({
    content: String,
    order: {
        type: Number,
        default: 0
    },
    time: Date
});

const firstPerson = mg.Schema({
    message: [message]
})

const secondPerson = mg.Schema({
    message: [message]
})

const first = module.exports = mg.model('First', firstPerson);
const second = module.exports = mg.model('Second', secondPerson);

module.exports.getFirst = (callback, limit) => {
    first.find(callback).limit(limit);
}

module.exports.getSecond = (callback, limit) => {
    second.find(callback).limit(limit);
}

