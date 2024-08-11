const mongoose = require('mongoose');

let likeCommentsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    commentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
    likeType: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LikeComments', likeCommentsSchema);
