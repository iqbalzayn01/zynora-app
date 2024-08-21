const express = require('express');
const router = express();
const { signUp, loginCms, userLogged } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post('/auth/login', loginCms);
router.post('/auth/signup', signUp);
router.get('/users/me/:id', authenticateUser, userLogged);

module.exports = router;
