const mongoose = require('mongoose');
const LikeThreads = require('../likeThreads/model');

let threadsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      maxlength: 500,
    },
    mediaID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
    hashTags: [
      {
        type: String,
        maxlength: 50,
      },
    ],
    likeThreads: [LikeThreads.schema],
    totalComments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Threads', threadsSchema);
