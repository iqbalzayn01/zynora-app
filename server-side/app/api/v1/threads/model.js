const mongoose = require('mongoose');

let threadsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    hashTags: {
      type: String,
      maxlength: 50,
    },
    upVotesBy: {
      type: Array,
    },
    totalComments: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Threads', threadsSchema);
