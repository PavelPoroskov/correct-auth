const express = require('express');
const bcrypt = require('bcryptjs');
const { COOKIE_AUTH_EXPIRATION } = require('../config/constants');
const { UserModel } = require('../model/userModel');
const { authcheck } = require('../controller/authcheck');
const { addDataToError } = require('../utils/errors');

const rootRoutes = express.Router();

rootRoutes.get('/', (req, res) => {
  res.render('index');
});

rootRoutes.get('/about', authcheck, (req, res) => {
  console.log(`The cookie is >>> ${req.cookies.auth}`);
  res.render('about');
});

rootRoutes.get('/signin', (req, res) => {
  res.render('signin');
});

rootRoutes.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error('Email required!');
    }

    if (!password) {
      throw new Error('Password required!');
    }

    const userRegistration = await UserModel.findOne({ email });

    const isEmailRegistered = !!userRegistration;
    const isPasswordCorrect = isEmailRegistered && await bcrypt.compare(
      password,
      userRegistration.password,
    );

    if (!(isEmailRegistered && isPasswordCorrect)) {
      throw addDataToError({
        error: new Error('Email or password are incorrect'),
        data: {
          status: 403,
        },
      });
    }

    const token = await userRegistration.generateAuthToken();

    res.cookie('auth', token, {
      expires: new Date(Date.now() + COOKIE_AUTH_EXPIRATION),
      httpOnly: true,
    });
    res.render('index');
  } catch (error) {
    console.log(error);
    const { status = 400, message } = error;
    res.status(status).send(message);
  }
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
      throw addDataToError({
        error: new Error('Email is already registered'),
        data: {
          status: 404,
        },
      });
    }

    const registerUser = new UserModel({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });
    const token = await registerUser.generateAuthToken();
    await registerUser.save();

    res.cookie('auth', token, {
      expires: new Date(Date.now() + COOKIE_AUTH_EXPIRATION),
      httpOnly: true,
    });
    // in browser url after success is 'http://localhost:8080/signup'
    // TODO redirect to index or to congratulations
    res.status(201).render('index');
  } catch (error) {
    console.log(error);
    const { status = 400, message } = error;
    res.status(status).send(message);
  }
});

// TODO use dedicated file for every endpoint
module.exports = {
  rootRoutes,
};
