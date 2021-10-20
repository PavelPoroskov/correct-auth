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

    if (!name) {
      throw new Error('Name required!');
    }

    if (!email) {
      throw new Error('Email required!');
    }

    if (!password) {
      throw new Error('Password required!');
    }

    if (!cpassword) {
      throw new Error('Confirm password required!');
    }

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

    // in browser url after success is 'http://localhost:8080/signup'
    // TODO redirect to index or to congratulations
    res.status(201).render('index');
  } catch (error) {
    console.log(error);
    res.status(400).send(`error: ${error.message}`);
  }
});

// TODO use dedicated file for every endpoint
module.exports = {
  rootRoutes,
};
