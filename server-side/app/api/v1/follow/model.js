const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Follow', followSchema);
