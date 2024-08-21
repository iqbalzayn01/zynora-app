const {
  createLikeComments,
  deleteLikeComments,
} = require('../../../services/mongoose/likeComments');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
  try {
    const result = await createLikeComments(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteLikeComments(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  destroy,
};
