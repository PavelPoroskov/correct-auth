const { UserModel } = require('../model/userModel');
const tokenApi = require('../utils/tokenApi');

const authcheck = async (req, res, next) => {
  try {
    const token = await req.cookies.auth;
    const { userId } = await tokenApi.decodeAuthToken(token);
    // eslint-disable-next-line no-underscore-dangle
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const nowDate = new Date();
    const existedTokenData = user.tokens
      .filter((tokenData) => nowDate < tokenData.expires)
      .find((tokenData) => tokenData.token === token);

    if (!existedTokenData) {
      throw new Error('Token not found');
    }

    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

module.exports = {
  authcheck,
};
