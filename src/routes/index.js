const express = require('express');

const route = express.Router();
const { UserModel } = require('../model/userModel');

route.get('/', (req, res) => {
  res.render('index');
});

route.get('/about', (req, res) => {
  res.render('about');
});

route.get('/signin', (req, res) => {
  res.render('signin');
});

route.get('/signup', (req, res) => {
  res.render('signup');
});

route.post('/signup', async (req, res) => {
  try {
    const {
      name, email, password, cpassword,
    } = req.body;

    if (password !== cpassword) {
      throw new Error('Password do not match!');
    }

    const userWithThisEmail = await UserModel.findOne({ email });
    if (userWithThisEmail) {
      throw new Error(`${email} is already registered!`);
    }

    const registerUser = new UserModel({
      name,
      email,
      password,
    });
    await registerUser.save();
    res.status(201).render('index');
  } catch (error) {
    res.status(400).send('error:-', error);
  }
});

// TODO use dedicated file for every endpoint
module.exports = {
  route,
};
