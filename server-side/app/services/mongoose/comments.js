const Comments = require('../../api/v1/comments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingThreads } = require('./threads');
const { checkingUsers } = require('./users');

const createComments = async (req) => {
  const { id } = req.params;
  const { userID, threadID, content, likeComments } = req.body;

  if (threadID !== id)
    throw new BadRequestError('Thread ID does not match the URL parameter ID');

  await checkingUsers(userID);
  await checkingThreads(threadID);

  if (!content || !userID || !threadID)
    throw new BadRequestError('Content, userID, & threadID are required.');

  const result = await Comments.create({
    userID,
    threadID,
    content,
    likeComments,
  });

  return result;
};

const getAllComments = async (req) => {
  const result = await Comments.find({});

  return result;
};

const updateComments = async (req) => {
  const { id } = req.params;
  const { content } = req.body;

  const result = await Comments.findByIdAndUpdate(
    { _id: id },
    { content },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) throw new NotFoundError(`No comment found with id : ${id}`);

  return result;
};

const deleteComments = async (req) => {
  const { id } = req.params;

  const result = await Comments.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`No comment found with id : ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createComments,
  getAllComments,
  updateComments,
  deleteComments,
};
