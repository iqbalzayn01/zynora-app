const { UnauthenticatedError } = require('../errors');
const { admin } = require('../firebase.config');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedError('No token provided');
    }

    const idToken = authHeader.split(' ')[1];

    if (!idToken) {
      throw new UnauthenticatedError('Authentication invalid.');
    }

    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || '',
    };

    next();
  } catch (err) {
    console.error('ERROR', err.msg);
    next(new UnauthenticatedError('Authentication invalid.'));
  }
};

module.exports = {
  authenticateUser,
};
