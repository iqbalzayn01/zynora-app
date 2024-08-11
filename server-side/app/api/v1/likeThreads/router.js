const express = require('express');
const router = express();
const { create } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/threads/:id/like-threads', authenticateUser, create);

module.exports = router;
