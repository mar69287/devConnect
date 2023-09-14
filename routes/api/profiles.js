const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, profilesCtrl.index);
router.post('/create', ensureLoggedIn, profilesCtrl.create);
router.post('/:id/following/:fid', ensureLoggedIn, profilesCtrl.addFollowing)
router.delete('/:id/following/:fid', ensureLoggedIn, profilesCtrl.deleteFollowing)
router.get('/:userName', ensureLoggedIn, profilesCtrl.getProfile);
router.post('/:id/skills/:skill', ensureLoggedIn, profilesCtrl.addSkill);
router.delete('/:id/skills/:skill', ensureLoggedIn, profilesCtrl.deleteSkill);

module.exports = router;