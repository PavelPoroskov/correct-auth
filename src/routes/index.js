const express = require('express');

const rootRoutes = express.Router();
const { UserModel } = require('../model/userModel');

rootRoutes.get('/', (req, res) => {
  res.render('index');
});

rootRoutes.get('/about', (req, res) => {
  res.render('about');
});

rootRoutes.get('/signin', (req, res) => {
  res.render('signin');
});

rootRoutes.get('/signup', (req, res) => {
  res.render('signup');
});

rootRoutes.post('/signup', async (req, res) => {
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
  rootRoutes,
};
