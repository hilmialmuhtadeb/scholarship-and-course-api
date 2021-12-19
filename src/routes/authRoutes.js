const express = require("express");
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const verifyToken = require('../middleware/verifyToken');
const user = require("../models/user");

const router = express.Router();
const authValidation = [
  body('username')
    .notEmpty()
    .withMessage('username tidak boleh kosong')
    .isLength({min: 4})
    .withMessage('username harus memiliki 4 karakter atau lebih'),
  body('password')
    .notEmpty()
    .withMessage('Kategori tidak boleh kosong'),
];

router.post('/register', authValidation, authController.register);
router.post('/login', authValidation, authController.login);
router.post('/logout', verifyToken, authController.logout);
router.get('/user', authController.getUser);

module.exports = router;