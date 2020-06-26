const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
    .post('/signup', authController.signup);

router
    .post('/login', authController.login);

router.route('/')
    .get(userController.getAllUsers);

router.route('/:id')
    .get(userController.getUser)
    .delete(authController.protect,
            authController.restrictTo('ADMN'),
            userController.deleteUser)
    .patch(userController.updateUser);

module.exports = router;
