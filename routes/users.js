const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.post('/login', loginUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
