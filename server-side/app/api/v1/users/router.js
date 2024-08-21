const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/create-account', create);
router.get('/users', authenticateUser, index);
router.get('/users/:id', authenticateUser, find);
router.put('/users/:id', authenticateUser, update);
router.delete('/users/:id', authenticateUser, destroy);

module.exports = router;
