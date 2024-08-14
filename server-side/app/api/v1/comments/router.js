const express = require('express');
const router = express();
const { create, index, update, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/threads/:id/create-comments', authenticateUser, create);
router.get('/threads/:id/comments', authenticateUser, index);
router.put('/threads/:id/comments/:id', authenticateUser, update);
router.delete('/threads/:id/comments/:id', authenticateUser, destroy);

module.exports = router;
