const multer = require('multer');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('images/') ||
    file.mimetype.startsWith('videos/')
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file format. Only images and videos are allowed.'),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

module.exports = { upload };
