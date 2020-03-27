const express = require('express');
const router = new express.Router();
const UserService = require('../../services/UserService');

router.patch('/users/:id', async (req, res) => {
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
});

module.exports = router;
