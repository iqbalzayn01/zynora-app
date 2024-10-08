const mongoose = require('mongoose');
const Threads = require('../../api/v1/threads/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { checkingUsers } = require('./users');

const createThreads = async (req) => {
  const firebaseUID = req.user.uid;
  const { content, mediaID, hashTags, totalComments } = req.body;

  await checkingUsers(firebaseUID);

  if (!content || !firebaseUID) {
    throw new BadRequestError('Content & firebaseUID are required');
  }

  const result = await Threads.create({
    firebaseUID,
    content,
    mediaID,
    hashTags,
    totalComments,
  });

  return result;
};

const getAllThreads = async (req) => {
  const threadsWithLikes = await Threads.aggregate([
    {
      $lookup: {
        from: 'likethreads',
        let: { thread_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$threadID', '$$thread_id'] } } },
          { $count: 'totalLikes' },
        ],
        as: 'likeThreads',
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
        mediaID: 1,
        hashTags: 1,
        totalComments: 1,
        'user.firebaseUID': 1,
        // 'user.name': 1,
        'user.username': 1,
        'user.avatar': 1,
        likeThreads: { $arrayElemAt: ['$likeThreads.totalLikes', 0] },
      },
    },
  ]);

  return threadsWithLikes;
};

const getOneThreads = async (req) => {
  const { id } = req.params;

  const result = await Threads.aggregate([
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) } },
    {
      $lookup: {
        from: 'comments',
        let: { thread_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$threadID', '$$thread_id'] } } },
          { $sort: { createdAt: -1 } },
          // { $limit: 10 },
        ],
        as: 'comments',
      },
    },
    {
      $lookup: {
        from: 'likethreads',
        let: { thread_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$threadID', '$$thread_id'] } } },
          { $count: 'totalLikes' },
        ],
        as: 'likeThreads',
      },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: 'firebaseUID',
        localField: 'firebaseUID',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'comments.firebaseUID',
        foreignField: 'firebaseUID',
        as: 'commentUsers',
      },
    },
    {
      $addFields: {
        comments: {
          $map: {
            input: '$comments',
            as: 'comment',
            in: {
              _id: '$$comment._id',
              content: '$$comment.content',
              likeComments: '$$comment.likeComments',
              firebaseUID: {
                $let: {
                  vars: {
                    user: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$commentUsers',
                            as: 'user',
                            cond: {
                              $eq: [
                                '$$user.firebaseUID',
                                '$$comment.firebaseUID',
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: {
                    _id: '$$user.firebaseUID',
                    name: '$$user.name',
                    username: '$$user.username',
                    avatar: '$$user.avatar',
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        content: 1,
        hashTags: 1,
        mediaID: 1,
        user: { firebaseUID: 1, name: 1, username: 1, avatar: 1 },
        comments: 1,
        totalComments: { $size: '$comments' },
        likeThreads: { $arrayElemAt: ['$likeThreads.totalLikes', 0] },
      },
    },
  ]);

  if (result.length === 0) {
    throw new NotFoundError(`No thread found with id : ${id}`);
  }

  return result[0];
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

  if (!result) throw new NotFoundError(`No thread found with id : ${id}`);

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
