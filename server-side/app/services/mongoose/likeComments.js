const LikeComments = require('../../api/v1/likeComments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingComments } = require('./comments');

const createLikeComments = async (req) => {
  const { id } = req.params;
  const firebaseUID = req.user.uid;
  const { likeType } = req.body;

  const commentID = id;

  await checkingUsers(firebaseUID);
  await checkingComments(commentID);

  if (!firebaseUID || !commentID) {
    throw new BadRequestError('firebaseUID & commentID are required');
  }

  const result = await LikeComments.create({
    firebaseUID,
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
