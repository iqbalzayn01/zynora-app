const { json } = require('express');
const {
  getFollowersAndFollowing,
  followUser,
  unFollowUser,
} = require('../../../services/mongoose/follow');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
  try {
    const result = await getFollowersAndFollowing(req);

    res.status(StatusCodes.OK).json({
      data: {
        follow: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleFollow = async (req, res, next) => {
  try {
    const result = await followUser(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const handleUnFollow = async (req, res, next) => {
  try {
    const result = await unFollowUser(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { index, handleFollow, handleUnFollow };
