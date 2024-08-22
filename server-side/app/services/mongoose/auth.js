const Users = require('../../api/v1/users/model');
const { auth, admin } = require('../../firebase.config');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { BadRequestError, UnauthorizedError } = require('../../errors');

const login = async (req) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError('Please provide username or email');
  }

  if (!password) {
    throw new BadRequestError('Please provide password');
  }

  let userCredential;
  try {
    userCredential = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const firebaseUser = userCredential.user;
  const idToken = await firebaseUser.getIdToken();

  const result = await Users.findOne({ email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  return {
    idToken,
    firebaseUID: result.firebaseUID,
    _id: result._id,
    name: result.name,
    username: result.username,
    email: result.email,
  };
};

const getUserLogged = async (req) => {
  const { id } = req.params;
  const firebaseUID = req.user.uid;

  if (firebaseUID !== id) {
    throw new UnauthorizedError('Authentication invalid.');
  }

  // Find the user in the database
  const result = await Users.findOne({ firebaseUID });
  if (!result) {
    throw new UnauthorizedError('User not found');
  }

  // Return user information
  return result;
};

module.exports = { login, getUserLogged };
