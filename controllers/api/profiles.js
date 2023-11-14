const Profile = require('../../models/profile')
const User = require('../../models/user');
const Post = require('../../models/post');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
require('dotenv').config();
const crypto = require('crypto')

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const storage = multer.memoryStorage();
const upload = multer({ storage });
const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

module.exports = {
    index,
    show,
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
    try {
        const profiles = await Profile.find();
        for (const profile of profiles) {
            if (profile.picture !== null) {
                profile.picture = await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({
                        Bucket: bucketName,
                        Key: profile.picture
                    }),
                    { expiresIn: 60 * 10 }
                );
            }
        }
        res.json(profiles);
    } catch (error) {
        res.json({ message: 'Error fetching profiles' });
    }
}

async function show(req, res) {
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
    if (profile.picture !== null) {
        profile.picture = await getSignedUrl(
            s3Client,
            new GetObjectCommand({
              Bucket: bucketName,
              Key: profile.picture
            }),
            { expiresIn: 60 * 10 }
        )
    }
    if (profile.followers) {
        for (let follower of profile.followers) {
            if (follower.picture !== null) {
                follower.picture = await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({
                        Bucket: bucketName,
                        Key: follower.picture
                    }),
                    { expiresIn: 60 * 10 }
                );
            }
        }
    }
    if (profile.following) {
        for (let following of profile.following) {
            if (following.picture !== null) {
                following.picture = await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({
                        Bucket: bucketName,
                        Key: following.picture
                    }),
                    { expiresIn: 60 * 10 }
                );
            }
        }
    }
    res.json(profile);
}

async function create(req, res) {
    const profile = req.body
    if (profile.picture === null) {
        const newProfile = new Profile(profile)
        const savedProfile = await newProfile.save()
        res.json(savedProfile)
    } else {
        try {
            upload.single('image')(req, res, async (err) => {
                if (err) {
                    console.error('Multer error:', err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }
                const file = req.file
                // Upload the file to AWS S3
                const fileName = generateFileName()
                const params = {
                    Bucket: bucketName,
                    Key: fileName,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                await s3Client.send(new PutObjectCommand(params));
    
                // Upload to database
                const { user, name, email, userName, location, bio, github, linkedIn, portfolio } = req.body;
                const profile = {
                    user,
                    name,
                    email,
                    userName,
                    location,
                    bio,
                    github,
                    linkedIn,
                    portfolio,
                    picture: fileName, 
                };
                const newProfile = new Profile(profile);
                const savedProfile = await newProfile.save();
                savedProfile.picture = await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({
                      Bucket: bucketName,
                      Key: savedProfile.picture
                    }),
                    { expiresIn: 60 * 10 }
                )
        
                res.json(savedProfile);
    
        });
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating profile' });
        }
    }

}

async function edit(req, res) {
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId);
    const userPicture = profile.picture
    try {
        if (req.body.picture === null || req.body.picture) {
            const update = req.body;
            update.picture = userPicture;

            Object.keys(update).forEach((key) => {
                profile[key] = update[key];
            });

            await profile.save();
            res.json(profile);
        } else {
            if (userPicture === null) {
                upload.single('image')(req, res, async (err) => {
                    if (err) {
                        console.error('Multer error:', err);
                        return res.status(500).json({ message: 'Error uploading file' });
                    }
                    const file = req.file
                    // Upload the file to AWS S3
                    const fileName = generateFileName()
                    const params = {
                        Bucket: bucketName,
                        Key: fileName,
                        Body: file.buffer,
                        ContentType: file.mimetype,
                    };
                    await s3Client.send(new PutObjectCommand(params));
        
                    // Upload to database
                    const { user, name, email, userName, location, bio, github, linkedIn, portfolio } = req.body;
                    const update = {
                        user,
                        name,
                        email,
                        userName,
                        location,
                        bio,
                        github,
                        linkedIn,
                        portfolio,
                        picture: fileName, 
                    };
                    Object.keys(update).forEach((key) => {
                        profile[key] = update[key];
                    });
        
                    await profile.save();
                    profile.picture = await getSignedUrl(
                        s3Client,
                        new GetObjectCommand({
                          Bucket: bucketName,
                          Key: update.picture
                        }),
                        { expiresIn: 60 * 10 }
                    )
            
                    res.json(update);
                });
            } else {
                const deleteParams = {
                    Bucket: bucketName,
                    Key: userPicture,
                }
                
                await s3Client.send(new DeleteObjectCommand(deleteParams))
                upload.single('image')(req, res, async (err) => {
                    if (err) {
                        console.error('Multer error:', err);
                        return res.status(500).json({ message: 'Error uploading file' });
                    }
                    const file = req.file
                    // Upload the file to AWS S3
                    const fileName = generateFileName()
                    const params = {
                        Bucket: bucketName,
                        Key: fileName,
                        Body: file.buffer,
                        ContentType: file.mimetype,
                    };
                    await s3Client.send(new PutObjectCommand(params));
        
                    // Upload to database
                    const { user, name, email, userName, location, bio, github, linkedIn, portfolio } = req.body;
                    const update = {
                        user,
                        name,
                        email,
                        userName,
                        location,
                        bio,
                        github,
                        linkedIn,
                        portfolio,
                        picture: fileName, 
                    };
                    Object.keys(update).forEach((key) => {
                        profile[key] = update[key];
                    });
        
                    await profile.save();
                    profile.picture = await getSignedUrl(
                        s3Client,
                        new GetObjectCommand({
                          Bucket: bucketName,
                          Key: update.picture
                        }),
                        { expiresIn: 60 * 10 }
                    )
                    res.json(profile);
                })
            }
        }
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

        if (userProfile.picture) {
            userProfile.picture = await getSignedUrl(
                s3Client,
                new GetObjectCommand({
                  Bucket: bucketName,
                  Key: userProfile.picture
                }),
                { expiresIn: 60 * 10 }
            )
        }

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
    if (profile.picture) {
        profile.picture = await getSignedUrl(
            s3Client,
            new GetObjectCommand({
                Bucket: bucketName,
                Key: profile.picture
            }),
            { expiresIn: 60 * 10 }
        )
    }
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