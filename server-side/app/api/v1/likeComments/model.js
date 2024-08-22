const mongoose = require('mongoose');

let likeCommentsSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      ref: 'Users',
      required: true,
      unique: true,
    },
    commentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
      required: true,
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
