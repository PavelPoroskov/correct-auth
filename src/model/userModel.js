const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
});

// eslint-disable-next-line func-names
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: this._id.toString(),
      },
      process.env.JWT_TOKEN_SECRET,
    );

    // add token into the database
    // TODO remove old(expired) tokens
    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  UserModel: mongoose.model('users', userSchema),
};
