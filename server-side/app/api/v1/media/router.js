const express = require('express');
const router = express();
const { create } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');
const upload = require('../../../middlewares/multer');

router.post('/uploads', authenticateUser, upload.single('file'), create);

module.exports = router;
