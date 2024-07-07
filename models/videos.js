const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Video = new Schema({
    index: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorDisplayName: {
        type: String,
        required: true
    },
    timeAgo: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: String,
    }],
    dislikes: {
        type: Number,
        default: 0
    },
    dislikedBy: [{
        type: String,
    }],
    commentsNum: {
        type: Number,
        default: 0
    },
    Comments: [{
        type: String,
    }]
});
module.exports = mongoose.model('Video', Video);