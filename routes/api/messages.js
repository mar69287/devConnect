const express = require('express');
const router = express.Router();
const messagesCtrl = require('../../controllers/api/messages')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/authenticate', ensureLoggedIn, messagesCtrl.authenticate);

module.exports = router;