const Profile = require('../../models/profile')
const User = require('../../models/user');
const Post = require('../../models/post');

module.exports = {
    index,
    create,
    edit,
    deleteProfile,
    addFollowing,
    deleteFollowing,
    getProfile,
    addSkill,
    deleteSkill
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

async function edit(req, res) {
    try {
        const profileId = req.params.id;
        const update = req.body;

        const profile = await Profile.findById(profileId);

        Object.keys(update).forEach((key) => {
            profile[key] = update[key];
        });

        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deleteProfile(req, res) {
    try {
        const userId = req.params.id;
        
        const userProfile = await Profile.findOne({ user: userId });

        const likedPosts = await Post.find({ 'likes.profile': userProfile._id });
        for (const post of likedPosts) {
            post.likes = post.likes.filter((like) => !like.profile.equals(userProfile._id));
            await post.save();
        }

        const commentedPosts = await Post.find({ 'comments.profile': userProfile._id });
        for (const post of commentedPosts) {
            post.comments = post.comments.filter((comment) => !comment.profile.equals(userProfile._id));
            await post.save();
        }

        await Post.deleteMany({ profile: userProfile._id });

        await Profile.findByIdAndDelete(userProfile._id);

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ success: true, message: 'User and associated data deleted' });
    } catch (error) {
        res.status(400).json(error);
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

async function addSkill(req, res) {
    try {
        const profileId = req.params.id;
        const skill = req.params.skill;

        const profile = await Profile.findById(profileId);
        const newSkill = { skill };
        profile.skills.push(newSkill);

        await profile.save();
        res.json(skill)
    } catch (error) {
        res.json({ message: 'Error adding skill' });
    }
}

async function deleteSkill(req, res) {
    try {
        const profileId = req.params.id;
        const skillName = req.params.skill;

        const profile = await Profile.findById(profileId);
        profile.skills = profile.skills.filter((skill) => skill.skill !== skillName);

        await profile.save();
        res.json({ message: 'success' });
    } catch (error) {
        res.json({ message: 'Error deleting skill' });
    }
}