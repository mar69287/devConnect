const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    username: {
        type: String
    },
}, {
    timestamps: true
});

const postSchema = new Schema({
    content: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    username: {
        type: String
    },
    comments: [commentSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model("Post", postSchema)