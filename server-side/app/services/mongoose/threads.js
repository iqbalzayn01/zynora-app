const Threads = require('../../api/v1/threads/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');

const createThreads = async (req) => {
  const { userID, content, mediaID, hashTags, likeThreads, totalComments } =
    req.body;

  await checkingUsers(userID);

  if (!content || !userID) {
    throw new BadRequestError('Content & userID are required');
  }

  const result = await Threads.create({
    userID,
    content,
    mediaID,
    hashTags,
    likeThreads,
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

  const result = await Threads.findOne({ _id: id }).populate({
    path: 'userID',
    select: '_id name username email avatar',
  });

  if (!result) {
    throw new NotFoundError(`No thread found with id : ${id}`);
  }

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

  delete result._doc.password;

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
