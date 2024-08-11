const LikeThreads = require('../../api/v1/likeThreads/model');
const Threads = require('../../api/v1/threads/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingThreads } = require('./threads');

const createLikeThreads = async (req) => {
  const { id } = req.params;
  const { userID, threadID, likeType } = req.body;

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

  await Threads.findOneAndUpdate(
    { _id: id },
    { $push: { likeThreads: result._id } },
    { new: true }
  );

  return result;
};

module.exports = {
  createLikeThreads,
};
