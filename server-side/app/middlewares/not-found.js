const notFound = (req, res) =>
  res.status(400).send({ msg: 'Route does not exist' });

module.exports = notFound;
