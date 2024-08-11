const mongoose = require('mongoose');

let commentsSchema = new mongoose.Schema({
  content: {
    type: String,
    require: [true, 'Content is required'],
  },
  likeComments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LikeComments',
  },
});
