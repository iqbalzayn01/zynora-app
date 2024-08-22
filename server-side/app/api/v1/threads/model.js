const mongoose = require('mongoose');

let threadsSchema = new mongoose.Schema(
  {
    firebaseUID: {
      type: String,
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
