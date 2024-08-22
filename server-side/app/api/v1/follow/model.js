const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      ref: 'Users',
      required: true,
    },
    following: {
      type: String,
      ref: 'Users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Follow', followSchema);
