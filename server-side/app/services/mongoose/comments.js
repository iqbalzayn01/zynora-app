const Comments = require('../../api/v1/comments/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingThreads } = require('./threads');
const { checkingUsers } = require('./users');

const createComments = async (req) => {
  const { id } = req.params;
  const firebaseUID = req.user.uid;
  const { content } = req.body;

  const threadID = id;

  console.log('testing threadID:', threadID);

  await checkingUsers(firebaseUID);
  await checkingThreads(threadID);

  if (!content || !firebaseUID || !threadID)
    throw new BadRequestError('Content, firebaseUID, & threadID are required.');

  const result = await Comments.create({
    firebaseUID,
    threadID,
    content,
  });

  return result;
};

const getAllComments = async (req) => {
  const result = await Comments.aggregate([
    {
      $lookup: {
        from: 'likecomments',
        let: { comment_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$commentID', '$$comment_id'] } } },
          { $count: 'totalLikesComments' },
        ],
        as: 'likeComments',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'firebaseUID',
        foreignField: 'firebaseUID',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        _id: 1,
        content: 1,
        likeComments: {
          $arrayElemAt: ['$likeComments.totalLikesComments', 0],
        },
        'user.firebaseUID': 1,
        'user.name': 1,
        'user.username': 1,
        'user.avatar': 1,
      },
    },
  ]);

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

const checkingComments = async (id) => {
  const result = await Comments.findOne({ _id: id });

  if (!result) throw new NotFoundError(`No comments found with id : ${id}`);

  return result;
};

module.exports = {
  createComments,
  getAllComments,
  updateComments,
  deleteComments,
  checkingComments,
};
