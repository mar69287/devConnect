const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
}, {
    timestamps: true
});

const commentSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    content: {
        type: String,
        required: true
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
        type: String
    },
    picture: {
        type: String,
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
    comments: [commentSchema],
    likes: [likeSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model("Post", postSchema)