const Post = require('../../models/post')
const Profile = require('../../models/profile')
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
    deletePost,
    createLike, 
    deleteLike,
    getLikes,
    getPostLikes,
    createComment,
    getPostComments,
    deleteComment,
    getProfilePosts, 
}

async function index(req, res) {
    try {
        let posts = await Post.find().populate('profile').populate('likes.profile').populate('comments.profile');
        posts = posts.map(post => {
            const postObject = post.toObject();
            postObject.profilePic = null;
            return postObject;
        })
        for (let post of posts) {

            if (post.picture !== null) {
                post.picture = await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({
                        Bucket: bucketName,
                        Key: post.picture
                    }),
                    { expiresIn: 60 * 10 }
                );
            }
            if (post.profile.picture !== null) {
                post.profilePic = await getSignedUrl(
                    s3Client,
                    new GetObjectCommand({
                        Bucket: bucketName,
                        Key: post.profile.picture
                    }),
                    { expiresIn: 60 * 10 }
                );
            }
        }
        res.json(posts);
    } catch (error) {
        res.json({ message: 'Error fetching posts' });
    }
}

async function show(req, res) {
    const post = await Post.findById(req.params.id);
    res.json(post);
}

async function create(req, res) {
    const post = req.body
    console.log(post)
    if (post.content) {
        try {
            const newPost = new Post(post);
            await newPost.save();

            let populatedPost = await Post.findById(newPost._id).populate('profile');
            populatedPost = populatedPost.toObject(); 
            populatedPost.profilePic = null;

            if (populatedPost.profile.picture) {
                populatedPost.profilePic = await getSignedUrl(
                    s3Client,
                        new GetObjectCommand({
                        Bucket: bucketName,
                        Key: populatedPost.profile.picture
                        }),
                        { expiresIn: 60 * 10 }
                )
            }
            res.json(populatedPost);
        } catch (err) {
            res.json(err);
        }

    } else {
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
            const { content, type, title, profile } = req.body;
            const post = {
                content,
                type,
                title,
                profile,
                picture: fileName
            }
            const newPost = new Post(post);
            await newPost.save();

            let populatedPost = await Post.findById(newPost._id).populate('profile');
            populatedPost = populatedPost.toObject(); 
            populatedPost.profilePic = null;

            if (populatedPost.profile.picture) {
                populatedPost.profilePic = await getSignedUrl(
                    s3Client,
                        new GetObjectCommand({
                        Bucket: bucketName,
                        Key: populatedPost.profile.picture
                        }),
                        { expiresIn: 60 * 10 }
                )
            }

            res.json(populatedPost);

        })
    }
}

async function edit(req, res) {
    try {
        if (Object.keys(req.body).length > 0) {
            const id = req.params.id;
            const update = {};

            if (req.body.title) {
                update.title = req.body.title;
            }

            if (req.body.content) {
                update.content = req.body.content;
            }

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                update,
                { new: true }
            );

            res.json(updatedPost);
        
        } else {
            upload.single('image')(req, res, async (err) => {
                if (err) {
                    console.error('Multer error:', err);
                    return res.status(500).json({ message: 'Error uploading file' });
                }
                const postId =  req.params.id;
                const post = await Post.findById(postId)
                if (post.picture !== null) {
                    const deleteParams = {
                        Bucket: bucketName,
                        Key: post.picture,
                    }
                    await s3Client.send(new DeleteObjectCommand(deleteParams))
                }

                const file = req.file
                const fileName = generateFileName()
                const params = {
                    Bucket: bucketName,
                    Key: fileName,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                await s3Client.send(new PutObjectCommand(params));
                const { type, title, content } = req.body
                const update = {
                    type,
                    title,
                    content,
                    picture: fileName
                }
                const updatedPost = await Post.findByIdAndUpdate(
                    postId,
                    update,
                    { new: true }
                );
                res.json(updatedPost);

            })
        }
    } catch (err) {
        res.json(err);
    }
}

async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post.picture) {
            const deleteParams = {
                Bucket: bucketName,
                Key: post.picture,
            }
            await s3Client.send(new DeleteObjectCommand(deleteParams))
        }
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.json({ error: "Server error" });
    }
    
}

async function createLike(req, res) {
    try {
        const postId = req.params.id;
        const profileId = req.body.profile;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { likes: { profile: profileId } } },
            { new: true }
        );

        const newLike = updatedPost.likes.find((like) => like.profile.toString() === profileId);

        res.json(newLike);
    } catch (err) {
        res.json(err);
    }
}

async function deleteLike(req, res) {
    try {
        const postId = req.params.id;
        const profileId = req.body.profile;

        const post = await Post.findById(postId)
        const likeIndex = post.likes.findIndex((like) => like.profile === profileId);
        post.likes.splice(likeIndex, 1);

        const updatedPost = await post.save();
        res.json(updatedPost);  
    } catch (err) {
        res.json(err);
    }

}

async function getLikes(req, res) {
    try {
        const profileId = req.params.id
        const likedPosts = await Post.find({ 'likes.profile': profileId })
        res.json(likedPosts)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getPostLikes(req, res) {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('likes.profile');

        const likes = post.likes;

        res.json(likes);
      } catch (err) {
        console.error(err);
        res.json({ message: 'Server error' });
      }
}

async function createComment(req, res) {
    try {
        const postId = req.params.id;
        const profileId = req.body.profile;
        const postCommentContent = req.body.content

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: { profile: profileId, content:  postCommentContent} } },
            { new: true }
        );
        const newComment = updatedPost.comments[updatedPost.comments.length - 1];
        res.json(newComment);
    } catch (err) {
        res.json(err);
    }
}

async function getPostComments(req, res) {
    // try {
    //     const postId = req.params.id;
    //     const post = await Post.findById(postId).populate('comments.profile');

    //     const comments = post.comments;

    //     res.json(comments);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server error' });
    // }
    console.log('getting comments from posts')
}

async function deleteComment(req, res) {
    try {
        const postId = req.params.id;
        const commentId = req.params.Cid.toString();
        const post = await Post.findById(postId);

        const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);

        if (commentIndex !== -1) {
            post.comments.splice(commentIndex, 1);
            await post.save(); 
            res.json({ message: 'Comment deleted successfully' });
        } else {
            res.json({ message: 'Comment not found' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getProfilePosts(req, res) {
    try {
        const profileId = req.params.id
        const posts = await Post.find({ 'profile': profileId }).populate('profile').populate('likes.profile').populate('comments.profile');
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error fetching posts' });
    }
}
