const express = require('express');
const router = express();
const { index, handleFollow, handleUnFollow } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/follow', authenticateUser, handleFollow);
router.post('/unfollow', authenticateUser, handleUnFollow);
router.get('/follow/:id', authenticateUser, index);

module.exports = router;
