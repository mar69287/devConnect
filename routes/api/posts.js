const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, postsCtrl.index);
router.post('/create', ensureLoggedIn, postsCtrl.create);

module.exports = router;