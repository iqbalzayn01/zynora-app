const LikeComments = require('../../api/v1/likeComments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingComments } = require('./comments');

const createLikeComments = async (req) => {
  const { id } = req.params;
  const { userID, likeType } = req.body;
  const commentID = id;

  await checkingUsers(userID);
  await checkingComments(commentID);

  if (!userID || !commentID) {
    throw new BadRequestError('userID & commentID are required');
  }

  const result = await LikeComments.create({
    userID,
    commentID,
    likeType,
  });

  return result;
};

const deleteLikeComments = async (req) => {
  const { id } = req.params;
  const result = await LikeComments.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No like comment found with id : ${id}`);
  }

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createLikeComments,
  deleteLikeComments,
};
