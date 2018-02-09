const mongoose = require('mongoose');


// TODO - update model to make url unique

const schema = mongoose.Schema({
    body: {
        type: String, 
        required: true
    },
    date: { type: Date, default: Date.now },
    User: {type: Object},
    
});

const tweetModel = mongoose.model('tweet', schema);

module.exports = tweetModel;