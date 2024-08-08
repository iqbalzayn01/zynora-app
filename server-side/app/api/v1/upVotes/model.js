const mongoose = require('mongoose');

let upVotesSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    threadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Threads',
      required: true,
    },
    voteType: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UpVotes', upVotesSchema);
