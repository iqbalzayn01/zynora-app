const mongoose = require('mongoose');
const Threads = require('../threads/model');

let commentsSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    ref: 'Users',
    require: [true, 'firebaseUID is required'],
  },
  threadID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Threads',
    require: [true, 'threadID is required'],
  },
  content: {
    type: String,
    require: [true, 'Content is required'],
  },
});

commentsSchema.post('save', async function () {
  await Threads.findByIdAndUpdate(this.threadID, {
    $inc: { totalComments: 1 },
  });
});

commentsSchema.post('remove', async function () {
  await Threads.findByIdAndUpdate(this.threadID, {
    $inc: { totalComments: -1 },
  });
});

module.exports = mongoose.model('Comments', commentsSchema);
