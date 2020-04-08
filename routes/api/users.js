const express = require('express');
const router = new express.Router();
const multer = require('multer');
const upload = multer();
const UserService = require('../../services/UserService');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');

/**
 * @api {patch} /api/users/:id Update password
 * @apiName UpdatePassword
 * @apiGroup Users
 *
 * @apiParam {String} id User id
 * @apiParam {String} password new password
 *
 * @apiSuccess {String} message Password was successfully updated!
 *
 * @apiError ServerError Server error
 */

router.patch(
    '/users/:id',
    validate(schemas.passwordUpdate, 'body'),
    async (req, res) => {
      const password = req.body.password;
      const id = req.params.id;
      try {
        await UserService.changePassword(id, password);
        return res
            .status(200)
            .json({message: 'Password was successfully updated!'});
      } catch (err) {
        res.status(500).json({error: err.message});
      }
    },
);

/**
 * @api {post} /api/users/:id/avatar Upload avatar
 * @apiName UploadAvatar
 * @apiGroup Users
 *
 * @apiParam {String} id User id
 * @apiParam {Object} file image file
 *
 * @apiSuccess {String} image path to uploaded image
 *
 * @apiError ServerError Server error
 */

router.post('/users/:id/avatar', upload.single('image'), async (req, res) => {
  const id = req.params.id;

  try {
    const image = req.file;
    const imagePath = await UserService.updateAvatar(id, image);
    return res.status(200).json({image: imagePath});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
