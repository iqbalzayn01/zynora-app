const Users = require('../../api/v1/users/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const createUsers = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    phone_number,
    avatar,
    bio,
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password and Confirm Password do not match');
  }

  const result = await Users.create({
    name,
    username,
    email,
    password,
    phone_number,
    avatar,
    bio,
  });

  delete result._doc.password;

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find(
    {},
    'name username email phone_number avatar bio'
  ).exec();

  return result;
};

const getOneUsers = async (req) => {
  const { id } = req.params;
  const result = await Users.findOne(
    { _id: id },
    'name username email phone_number avatar bio'
  );

  if (!result) throw new NotFoundError(`No user found with id : ${id}`);

  return result;
};

const updateUsers = async (req) => {
  const { id } = req.params;
  const { name, username, phone_number, avatar, bio } = req.body;

  const check = await Users.findOne({
    _id: { $ne: id },
    name,
    username,
    phone_number,
    avatar,
    bio,
  });

  if (check)
    throw new BadRequestError(
      'Username already registered, please try another one'
    );

  const result = await Users.findOneAndUpdate(
    { _id: id },
    { name, username, phone_number, avatar, bio },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`No user found with id : ${id}`);

  delete result._doc.password;

  return result;
};

const deleteUsers = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`No user found with id : ${id}`);

  await result.deleteOne({ _id: id });

  delete result._doc.password;

  return result;
};

const checkingUsers = async (id) => {
  const result = await Users.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError(`No user found with id : ${id}`);
  }

  return result;
};

module.exports = {
  createUsers,
  getAllUsers,
  getOneUsers,
  updateUsers,
  deleteUsers,
  checkingUsers,
};
