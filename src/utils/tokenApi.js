const jwt = require('jsonwebtoken');
const { COOKIE_AUTH_EXPIRATION_SECONDS } = require('../config/constants');

const generateAuthToken = async (user) => {
  const expiresInSeconds = Math.floor(Date.now() / 1000) + COOKIE_AUTH_EXPIRATION_SECONDS;
  const token = await jwt.sign(
    {
      // eslint-disable-next-line no-underscore-dangle
      userId: user._id.toString(),
      exp: expiresInSeconds,
    },
    process.env.JWT_TOKEN_SECRET,
  );

  return {
    token,
    expires: new Date(expiresInSeconds * 1000),
  };
};

// TODO: test with incorrect token
// TODO: test with expired token
const decodeAuthToken = async (token) => jwt.verify(
  token,
  process.env.JWT_TOKEN_SECRET,
);

module.exports = {
  generateAuthToken,
  decodeAuthToken,
};
