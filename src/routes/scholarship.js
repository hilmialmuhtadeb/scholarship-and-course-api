const express = require('express');
const scholarshipController = require('../controllers/scholarship');

const router = express.Router();

router.get('/scholarships', scholarshipController.getAllScholarships);
router.post('/scholarship', scholarshipController.createScholarship);

module.exports = router;