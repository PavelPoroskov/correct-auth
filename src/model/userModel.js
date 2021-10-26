const mongoose = require('mongoose');

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
    expires: {
      type: Date,
      required: true,
    },
  }],
});

// eslint-disable-next-line func-names
userSchema.methods.addToken = async function ({ token, expires }) {
  const nowDate = new Date();
  this.tokens = this.tokens
    .concat({
      token,
      expires,
    })
    .filter((tokenData) => nowDate < tokenData.expires);
};

module.exports = {
  UserModel: mongoose.model('users', userSchema),
};
