const LikeThreads = require('../../api/v1/likeThreads/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingThreads } = require('./threads');

const createLikeThreads = async (req) => {
  const { id } = req.params;
  const firebaseUID = req.user.uid;
  const { likeType } = req.body;
  const threadID = id;

  await checkingUsers(firebaseUID);
  await checkingThreads(threadID);

  if (!firebaseUID || !threadID) {
    throw new BadRequestError('firebaseUID & threadID are required');
  }

  const result = await LikeThreads.create({
    firebaseUID,
    threadID,
    likeType,
  });

  return result;
};

const deleteLikeThreads = async (req) => {
  const { id } = req.params;
  const result = await LikeThreads.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No like thread found with id : ${id}`);
  }

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createLikeThreads,
  deleteLikeThreads,
};
