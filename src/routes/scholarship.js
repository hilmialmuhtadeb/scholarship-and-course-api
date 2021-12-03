const express = require('express');
const scholarshipController = require('../controllers/scholarship');
const {body} = require('express-validator');

const router = express.Router();
const scholarshipValidation = [
  body('title').notEmpty().withMessage('Judul tidak boleh kosong').isLength({min: 10}).withMessage('judul harus memiliki 10 karakter atau lebih'),
  body('deadline').notEmpty().withMessage('Batas pengajuan tidak boleh kosong'),
  body('description').notEmpty().withMessage('Deskripsi tidak boleh kosong'),
];

router.get('/scholarships', scholarshipController.getAllScholarships);

router.get('/scholarship/:scholarshipId', scholarshipController.getScholarshipById);

router.put('/scholarship/:scholarshipId', scholarshipValidation, scholarshipController.updateScholarship);

router.post('/scholarship', scholarshipValidation, scholarshipController.createScholarship);


module.exports = router;