const { createUploadMedia } = require('../../../services/mongoose/media');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).send('No file uploaded.');
    }

    const result = await createUploadMedia(req);

    res.status(StatusCodes.CREATED).json({
      msg: 'File uploaded successfully',
      data: {
        uploadMedia: result,
      },
    });
  } catch (error) {
    console.error('Error in uploadMediaController:', error);
    next(error);
  }
};

module.exports = { create };
