const Profile = require('../../models/profile')

module.exports = {
    index,
    create,
    addFollowing,
    deleteFollowing,
    getProfile
}

async function index(req, res) {
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId })
            .populate({
                path: 'followers',
                select: 'userName picture _id'
            })
            .populate({
                path: 'following',
                select: 'userName picture _id'
            });
    res.json(profile);
}

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

async function addFollowing(req, res) {
    try {
        const profileId = req.params.fid; // The user's Id
        const followerProfileId = req.params.id; // The ID of the person that is being followed

        const userProfile = await Profile.findById(profileId);
        const followerProfile = await Profile.findById(followerProfileId);

        followerProfile.following.push(profileId);
        userProfile.followers.push(followerProfileId);

        await userProfile.save();
        await followerProfile.save();

        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error adding' });
    }
}

async function deleteFollowing(req, res) {
    try {
        const profileId = req.params.id; // The user's Id
        const followerProfileId = req.params.fid; // The ID of the person that is being followed

        const userProfile = await Profile.findById(profileId);
        const followerProfile = await Profile.findById(followerProfileId);

        userProfile.following = userProfile.following.filter((profile) => profile.toString() !== followerProfileId);
        followerProfile.followers = followerProfile.followers.filter((profile) => profile.toString() !== profileId);

        await userProfile.save();
        await followerProfile.save();

        res.json({ message: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting' });
    }
}
    
async function getProfile(req, res) {
    const userName = req.params.userName;
    const profile = await Profile.findOne({ userName })
            .populate({
                path: 'followers',
                select: 'userName picture _id'
            })
            .populate({
                path: 'following',
                select: 'userName picture _id'
            });
    res.json(profile);
}