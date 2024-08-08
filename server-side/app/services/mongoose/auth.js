const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT, createRefreshJWT } = require('../../utils');
const { createUserRefreshToken } = require('./userRefreshToken');

const login = async (req) => {
  const { identifier, password } = req.body;

  if (!identifier) {
    throw new BadRequestError('Please provide username or email');
  }

  if (!password) {
    throw new BadRequestError('Please provide password');
  }

  const result = await Users.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!result) {
    throw new UnauthorizedError('Invalid Creadentials');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const tokenPayload = createTokenUser(result);
  const token = createJWT({ payload: tokenPayload });
  const refreshToken = createRefreshJWT({ payload: tokenPayload });

  if (result) {
    await createUserRefreshToken({ refreshToken, user: result._id });
  }

  return {
    token,
    refreshToken,
    _id: result._id,
    username: result.username,
    email: result.email,
  };
};

const getUserLogged = async (req) => {
  const userId = req.user.id;
  const result = await Users.findById(userId);

  if (!result) {
    throw new UnauthorizedError('User not found');
  }

  delete result._doc.password;

  return result;
};

module.exports = { login, getUserLogged };
