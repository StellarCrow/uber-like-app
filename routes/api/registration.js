const express = require('express');
const router = new express.Router();
const UserService = require('../../services/UserService');
const JoiSchema = require('../../validation/JoiSchemas');

/**
 * @api {post} /users Registrate new user
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
    return res.status(400).json({error: err.message});
  }
});

module.exports = router;
