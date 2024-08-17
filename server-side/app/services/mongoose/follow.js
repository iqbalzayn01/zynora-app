const Users = require('../../api/v1/users/model');
const Follow = require('../../api/v1/follow/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const followUser = async (req) => {
  const userlogged = req.user.id;
  const { followingId } = req.body;

  const existingFollow = await Follow.findOne({
    following: followingId,
  });

  if (existingFollow) {
    throw new BadRequestError('You are already following this user');
  }

  const follow = new Follow({
    follower: userlogged,
    following: followingId,
  });
  await follow.save();

  return follow;
};

const getFollowersAndFollowing = async (req) => {
  const userID = req.user.id;
  const user = await Users.findById(userID).select('name username avatar');
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const followers = await Follow.find({ following: userID }).populate(
    'userID',
    'name username avatar'
  );

  const following = await Follow.find({ follower: userID }).populate(
    'following',
    'name username avatar'
  );

  return {
    user,
    followers: followers.map((f) => f.follower),
    following: following.map((f) => f.following),
  };
};

const unFollowUser = async (req) => {
  const userID = req.user.id;
  const { followingId } = req.body;
  const follow = await Follow.findOneAndDelete({
    follower: userID,
    following: followingId,
  });
  if (!follow) {
    throw new NotFoundError('Follow relationship not found');
  }

  return follow;
};

module.exports = { getFollowersAndFollowing, followUser, unFollowUser };
