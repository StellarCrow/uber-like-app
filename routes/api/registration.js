const express = require('express');
const router = new express.Router();
const UserService = require('../../services/UserService');
const schemas = require('../../validation/JoiSchemas');
const validate = require('../middleware/requestValidator');

/**
 * @api {post} /api/users Registrate new user
 * @apiName PostUser
 * @apiGroup Users
 *
 * @apiParam {String} name User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password for account
 * @apiParam {String} role User role
 *
 *
 * @apiSuccess {Object} user registrated User.
 *
 * @apiError ServerError Server error
 * @apiError EmailAlreadyRegistered Email is already exist in the system
 */

router.post(
    '/users',
    validate(schemas.registration, 'body'),
    async (req, res) => {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };

      try {
        const user = await UserService.registrate(newUser);
        return res.status(201).json({user: user});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
        return res.status(400).json({error: err.message});
      }
    },
);

/**
 * @api {post} /api/users/login Login user
 * @apiName PostUser
 * @apiGroup Users
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password for account
 *
 *
 * @apiSuccess {Object} user signed in User.
 *
 * @apiError ServerError Server error
 * @apiError WrongEmail Account with email doesn't exist in the system
 * @apiError WrongPassword Wrong password
 */

router.post(
    '/users/login',
    validate(schemas.authorization, 'body'),
    async (req, res) => {
      const userInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      try {
        const {token, user} = await UserService.authenticate(userInfo);
        return res.status(200).json({user: user, token: token});
      } catch (err) {
        if (err.name === 'ServerError') {
          return res.status(500).json({error: err.message});
        }
        return res.status(400).json({error: err.message});
      }
    },
);

module.exports = router;
