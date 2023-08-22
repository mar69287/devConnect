const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const profileSchema = new Schema({
    userName: {
        type: String,
        unique: true,
    },
    location: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bio: {
        type: String,
        maxlength: 100,
    },
    github: String,
    linkedIn: String,
    portfolio: String,
    picture: String,
    skills: [skillSchema],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
