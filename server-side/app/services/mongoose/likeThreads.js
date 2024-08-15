const LikeThreads = require('../../api/v1/likeThreads/model');
const Threads = require('../../api/v1/threads/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');
const { checkingThreads } = require('./threads');

const createLikeThreads = async (req) => {
  const { id } = req.params;
  const { userID, threadID, likeType } = req.body;
  const dataThreads = await Threads.findOne({
    _id: id,
  });

  if (!dataThreads) {
    throw new NotFoundError(`No like thread found with id : ${id}`);
  }

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

  delete result._doc.password;

  return result;
};

module.exports = {
  createLikeThreads,
  deleteLikeThreads,
};
