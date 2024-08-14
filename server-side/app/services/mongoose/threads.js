const Threads = require('../../api/v1/threads/model');
const Comments = require('../../api/v1/comments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');

const createThreads = async (req) => {
  const { userID, content, mediaID, hashTags, totalComments } = req.body;

  await checkingUsers(userID);

  if (!content || !userID) {
    throw new BadRequestError('Content & userID are required');
  }

  const result = await Threads.create({
    userID,
    content,
    mediaID,
    hashTags,
    totalComments,
  });

  return result;
};

const getAllThreads = async (req) => {
  const result = await Threads.find({});

  return result;
};

const getOneThreads = async (req) => {
  const { id } = req.params;

  const threads = await Threads.findOne({ _id: id }).populate({
    path: 'userID',
    select: '_id name username email avatar',
  });

  if (!threads) {
    throw new NotFoundError(`No thread found with id : ${id}`);
  }

  const comments = await Comments.find({ threadID: id }).populate({
    path: 'userID',
    select: '_id name username avatar',
  });

  if (!comments) {
    throw new NotFoundError(`Comments not found`);
  }

  const result = {
    threads,
    comments,
  };

  return result;
};

const updateThreads = async (req) => {
  const { id } = req.params;
  const { content, hashTags } = req.body;

  const result = await Threads.findOneAndUpdate(
    { _id: id },
    { content, hashTags },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`No thread found with id : ${id}`);

  return result;
};

const deleteThreads = async (req) => {
  const { id } = req.params;

  const result = await Threads.findOne({
    _id: id,
  });

  if (!result) {
    throw new NotFoundError(`No thread found with id : ${id}`);
  }

  await result.deleteOne({ _id: id });

  return result;
};

const checkingThreads = async (id) => {
  const result = await Threads.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No thread found with id : ${id}`);
  }

  return result;
};

module.exports = {
  createThreads,
  getAllThreads,
  getOneThreads,
  updateThreads,
  deleteThreads,
  checkingThreads,
};
