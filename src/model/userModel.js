const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  console.log('Password is hashing .........');
  const hashPassword = await bcrypt.hash(this.password, 12);
  this.password = hashPassword;
  next();
});

module.exports = {
  UserModel: mongoose.model('users', userSchema),
};
