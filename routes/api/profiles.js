const express = require('express');
const router = express.Router();
const profilesCtrl = require('../../controllers/api/profiles')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, profilesCtrl.index);
router.post('/create', ensureLoggedIn, profilesCtrl.create);

module.exports = router;