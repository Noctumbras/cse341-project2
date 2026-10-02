const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const auth = require('../middleware/authenticate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);
router.post('/', auth.isAuthenticated, validation.userValidation, usersController.createUser);
router.put('/:id', auth.isAuthenticated, validation.userValidation, usersController.updateUser);
router.delete('/:id', auth.isAuthenticated, usersController.deleteUser);

module.exports = router;