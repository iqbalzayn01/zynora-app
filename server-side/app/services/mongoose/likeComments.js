const LikeComments = require('../../api/v1/likeComments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingComments } = require('./comments');

const createLikeComments = async (req) => {
  const { id } = req.params;
  const { userID, commentID, likeType } = req.body;

  await checkingUsers(userID);
  await checkingComments(commentID);

  if (!userID || !threadID) {
    throw new BadRequestError('userID & commentID are required');
  }
};
