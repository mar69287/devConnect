const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, postsCtrl.index);
router.get('/:id', ensureLoggedIn, postsCtrl.show);
router.post('/create', postsCtrl.create);
router.put('/:id', postsCtrl.edit);
router.delete('/:id', ensureLoggedIn, postsCtrl.deletePost)
router.post('/:id/like', ensureLoggedIn, postsCtrl.createLike)
router.delete('/:id/like', ensureLoggedIn, postsCtrl.deleteLike)
router.get('/:id/like', ensureLoggedIn, postsCtrl.getLikes)
router.get('/likes/:id', ensureLoggedIn, postsCtrl.getPostLikes)
router.post('/:id/comment', ensureLoggedIn, postsCtrl.createComment)
router.get('/:id/comments', ensureLoggedIn, postsCtrl.getPostComments)
router.delete('/:id/comments/:Cid', ensureLoggedIn, postsCtrl.deleteComment)
router.get('/profile/:id', ensureLoggedIn, postsCtrl.getProfilePosts);

module.exports = router;