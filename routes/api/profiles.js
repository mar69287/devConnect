const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/all', ensureLoggedIn, profilesCtrl.index);
router.get('/', ensureLoggedIn, profilesCtrl.show);
router.post('/create', profilesCtrl.create);
router.put('/:id', profilesCtrl.edit);
router.delete('/:id', ensureLoggedIn, profilesCtrl.deleteProfile)
router.post('/:id/following/:fid', ensureLoggedIn, profilesCtrl.addFollowing)
router.delete('/:id/following/:fid', ensureLoggedIn, profilesCtrl.deleteFollowing)
router.get('/:userName', ensureLoggedIn, profilesCtrl.getProfile);
router.post('/:id/skills/:skill', ensureLoggedIn, profilesCtrl.addSkill);
router.delete('/:id/skills/:skill', ensureLoggedIn, profilesCtrl.deleteSkill);

module.exports = router;