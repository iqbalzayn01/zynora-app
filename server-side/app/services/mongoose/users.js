const Users = require('../../api/v1/users/model');
const { admin } = require('../../firebase.config');
const { BadRequestError, NotFoundError } = require('../../errors');

const signUpUsers = async (req) => {
  const {
    email,
    password,
    confirmPassword,
    name,
    username,
    phone_number,
    avatar,
    bio,
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password and Confirm Password do not match');
  }

  // Firebase
  const resultFirebase = await admin.auth().createUser({
    email: email,
    password: password,
    emailVerified: false,
    disabled: false,
  });

  // MongoDB
  const resultMongoDB = await Users.create({
    firebaseUID: resultFirebase.uid,
    email: resultFirebase.email,
    name,
    username,
    phone_number,
    avatar,
    bio,
  });

  return resultMongoDB;
};

const getAllUsers = async (req) => {
  const result = await Users.find(
    {},
    'firebaseUID name username email phone_number avatar bio'
  ).exec();

  return result;
};

const getOneUsers = async (req) => {
  const { id } = req.params;
  const result = await Users.findOne(
    { firebaseUID: id },
    'firebaseUID name username email phone_number avatar bio'
  );

  if (!result) throw new NotFoundError(`No user found with id : ${id}`);

  return result;
};

const updateUsers = async (req) => {
  const { id } = req.params;
  const { name, username, phone_number, avatar, bio } = req.body;

  const check = await Users.findOne({
    firebaseUID: { $ne: id },
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
    { firebaseUID: id },
    { name, username, phone_number, avatar, bio },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`No user found with id : ${id}`);

  return result;
};

const deleteUsers = async (req) => {
  const { id } = req.params;

  const result = await Users.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`No user found with id : ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingUsers = async (id) => {
  const result = await Users.findOne({ firebaseUID: id });

  if (!result) {
    throw new NotFoundError(`No user found with id : ${id}`);
  }

  return result;
};

module.exports = {
  signUpUsers,
  getAllUsers,
  getOneUsers,
  updateUsers,
  deleteUsers,
  checkingUsers,
};
