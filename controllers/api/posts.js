const Post = require('../../models/post')

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
    deleteComment 
}

async function index(req, res) {
    try {
        const posts = await Post.find().populate('likes.profile').populate('comments.profile');
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
}

async function show(req, res) {
    const company = await Post.findById(req.params.id);
    res.json(company);
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

async function edit(req, res) {
    try {
        const id = req.params.id;
        const update = {};

        if (req.body.title) {
            update.title = req.body.title;
        }

        if (req.body.picture) {
            update.picture = req.body.picture;
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
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deletePost(req, res) {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
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

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
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
        res.status(400).json(err);
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
        res.status(500).json({ message: 'Server error' });
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
        res.status(400).json(err);
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
        const commentId = req.params.Cid;
        const post = await Post.findById(postId)
        const commentIndex = post.comments.findIndex(comment => comment._id === commentId);
        post.comments.splice(commentIndex, 1)
        await post.save();
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(400).json(err);
    }

}