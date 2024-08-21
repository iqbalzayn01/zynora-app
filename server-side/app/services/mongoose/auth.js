const Users = require('../../api/v1/users/model');
const { auth } = require('../../firebase.config');
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
  const { idToken } = req.body;
  console.log(idToken);

  if (!idToken) {
    throw new UnauthorizedError('No token provided');
  }

  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }

  const firebaseUID = decodedToken.uid;

  const user = await Users.findOne({ firebaseUID });

  if (!user) {
    throw new UnauthorizedError('User not found');
  }

  return {
    _id: user._id,
    firebaseUID: user.firebaseUID,
    email: user.email,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    bio: user.bio,
  };
};

// const getUserLogged = async (req) => {
//   const { id } = req.params;
//   const result = await Users.findById(id);

//   console.log(id);

//   if (!result) {
//     throw new UnauthorizedError('User not found');
//   }

//   return result;
// };

module.exports = { login, getUserLogged };
