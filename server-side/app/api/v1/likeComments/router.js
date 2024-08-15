const express = require('express');
const router = express();
const { create, destroy } = require('./controller');
const { authenticateUser } = require('../../../middlewares/auth');

router.post(
  '/threads/:id/comments/:id/like-comments',
  authenticateUser,
  create
);
router.delete(
  '/threads/:id/comments/:id/like-comments/:id',
  authenticateUser,
  destroy
);

module.exports = router;
