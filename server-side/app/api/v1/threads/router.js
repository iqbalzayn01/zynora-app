const express = require('express');
const router = express();
const { create, index, find } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/create-threads', authenticateUser, create);
router.get('/threads', authenticateUser, index);
router.get('/threads/:id', authenticateUser, find);

module.exports = router;
