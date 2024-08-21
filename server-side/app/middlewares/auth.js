const { UnauthenticatedError } = require('../errors');
const { admin } = require('../firebase.config');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
    };

    next();
  } catch (err) {
    console.error('ERROR', err.msg);
    next(new UnauthenticatedError('Authentication invalid'));
  }
};

module.exports = {
  authenticateUser,
};
