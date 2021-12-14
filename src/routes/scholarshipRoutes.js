const express = require('express');
const scholarshipController = require('../controllers/scholarshipController');
const { body } = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
const scholarshipValidation = [
  body('title')
    .notEmpty()
    .withMessage('Judul tidak boleh kosong')
    .isLength({min: 10})
    .withMessage('judul harus memiliki 10 karakter atau lebih'),
  body('deadline')
    .notEmpty()
    .withMessage('Batas pengajuan tidak boleh kosong'),
  body('category')
    .notEmpty()
    .withMessage('Kategori tidak boleh kosong'),
  body('description')
    .notEmpty()
    .withMessage('Deskripsi tidak boleh kosong'),
];

router.get('/', scholarshipController.getAllScholarships);
router.get('/:scholarshipId', scholarshipController.getScholarshipById);
router.patch('/:scholarshipId', [scholarshipValidation, verifyToken], scholarshipController.updateScholarship);
router.delete('/:scholarshipId', verifyToken, scholarshipController.deleteScholarship);
router.post('/', [scholarshipValidation, verifyToken], scholarshipController.createScholarship);

module.exports = router;