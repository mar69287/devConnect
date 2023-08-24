const Profile = require('../../models/profile')
const path = require('path');

module.exports = {
    index,
    create
}

async function index(req, res) {
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId });
    res.json(profile);
}

// async function create(req, res) {
//     console.log('create controller profile')
//     console.log(req.body);
// }

async function create(req, res) {
    try {
        const profile = req.body;
        const newProfile = new Profile(profile);
        const savedProfile = await newProfile.save();

        res.json(savedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating profile' });
    }
}
    
