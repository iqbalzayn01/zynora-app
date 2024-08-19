const mongoose = require('mongoose');

const uploadMediaSchema = new mongoose.Schema(
  {
    fileName: String,
    fileUrl: String,
    fileType: String,
    uploadDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UploadMedia', uploadMediaSchema);
