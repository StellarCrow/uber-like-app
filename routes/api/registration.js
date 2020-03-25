const express = require('express');
const router = new express.Router();
const UserService = require('../../services/UserService');
const JoiSchema = require('../../validation/JoiSchemas');

/**
 * @api {post} /api/users Registrate new user
 * @apiName PostUser
 * @apiGroup User
 *
 *
 * @apiSuccess {Object} user registrated User.
 */

router.post('/users', async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  try {
    const schema = JoiSchema.registration();
    await schema.validateAsync(newUser);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }

  try {
    const user = await UserService.registrate(newUser);
    return res.status(201).json({user: user});
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
    return res.status(400).json({error: err.message});
  }
});

/**
 * @api {post} /api/users Sign in user
 * @apiName PostUser
 * @apiGroup User
 *
 *
 * @apiSuccess {Object} user signed in User.
 */

router.post('/login', async (req, res) => {
  const userInfo = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const schema = JoiSchema.authorization();
    await schema.validateAsync(userInfo);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }

  try {
    const {token, user} = await UserService.authenticate(userInfo);
    return res.status(200).json({user: user, token: token});
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
    return res.status(400).json({error: err.message});
  }
});

module.exports = router;
