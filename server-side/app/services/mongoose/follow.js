const Users = require('../../api/v1/users/model');
const Follow = require('../../api/v1/follow/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const followUser = async (req) => {
  const userlogged = req.user.uid;
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
  const firebaseUID = req.user.uid;
  const user = await Users.findOne({ firebaseUID }).select(
    'name username avatar'
  );
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const followers = await Follow.find({ following: firebaseUID });

  const following = await Follow.find({ follower: firebaseUID });

  const followersDetails = await Users.find({
    firebaseUID: { $in: followers.map((f) => f.follower) },
  }).select('name username avatar');

  const followingDetails = await Users.find({
    firebaseUID: { $in: following.map((f) => f.following) },
  }).select('name username avatar');

  return {
    user,
    followers: followersDetails,
    following: followingDetails,
  };
};

const unFollowUser = async (req) => {
  const userID = req.user.uid;
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
