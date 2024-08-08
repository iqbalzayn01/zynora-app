const createTokenUser = (user) => {
  return {
    userId: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
};

module.exports = { createTokenUser };
