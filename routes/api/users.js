const express = require('express');
const router = new express.Router();
const multer = require('multer');
const upload = multer();
const UserService = require('../../services/UserService');
const validate = require('../middleware/requestValidator');
const schemas = require('../../validation/JoiSchemas');

// update password
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

// update avatar
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
