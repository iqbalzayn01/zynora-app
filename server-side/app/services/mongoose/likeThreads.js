const LikeThreads = require('../../api/v1/likeThreads/model');
const Threads = require('../../api/v1/threads/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingThreads } = require('./threads');

const createLikeThreads = async (req) => {
  const { id } = req.params;
  const { userID, likeType } = req.body;
  const threadID = id;

  await checkingUsers(userID);
  await checkingThreads(threadID);

  if (!userID || !threadID) {
    throw new BadRequestError('userID & threadID are required');
  }

  const result = await LikeThreads.create({
    userID,
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
