const {
  createLikeThreads,
  deleteLikeThreads,
} = require('../../../services/mongoose/likeThreads');
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
  try {
    const result = await createLikeThreads(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteLikeThreads(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, destroy };
