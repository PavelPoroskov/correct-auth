const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/userModel');

const authcheck = async (req, res, next) => {
  try {
    const token = await req.cookies.auth;
    // TODO check token exist, not expired
    const verifyUser = await jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET,
    );
    // eslint-disable-next-line no-underscore-dangle
    const user = await UserModel.findOne({ _id: verifyUser._id });
    if (!user) {
      throw new Error('User not found');
    }
    next();
  } catch (error) {
    res.status(401).send('No data was found');
  }
};

module.exports = {
  authcheck,
};
