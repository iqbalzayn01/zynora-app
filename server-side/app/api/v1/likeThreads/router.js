const express = require('express');
const router = express();
const { create, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/threads/:id/like-threads', authenticateUser, create);
router.delete('/threads/:id/like-threads/:id', authenticateUser, destroy);

module.exports = router;
