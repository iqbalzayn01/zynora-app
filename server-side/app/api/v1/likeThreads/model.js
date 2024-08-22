const mongoose = require('mongoose');

let likeThreadsSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
      ref: 'Users',
      required: true,
      unique: true,
    },
    threadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Threads',
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

module.exports = mongoose.model('LikeThreads', likeThreadsSchema);
