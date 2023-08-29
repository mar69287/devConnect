const Post = require('../../models/post')

module.exports = {
    index,
    create
}

async function index(req, res) {
    const userId = req.user._id;
    const profile = await Post.findOne({ user: userId });
    res.json(profile);
}

// async function create(req, res) {
//     console.log('create controller profile')
//     console.log(req.body);
// }

async function create(req, res) {
    try {
        const post = req.body;
        const newPost = new Post(post);
        const savedPost = await newPost.save();

        res.json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
}