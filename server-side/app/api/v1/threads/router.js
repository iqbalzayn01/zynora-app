const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/create-threads', authenticateUser, create);
router.get('/threads', index);
router.get('/threads/:id', find);
router.put('/threads/:id', authenticateUser, update);
router.delete('/threads/:id', authenticateUser, destroy);

module.exports = router;
