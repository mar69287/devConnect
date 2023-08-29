const Post = require('../../models/post')

module.exports = {
    index,
    create
}

async function index(req, res) {
    try {
        const posts = await Post.find();
        console.log(posts)
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

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