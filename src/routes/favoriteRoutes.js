const express = require('express');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.post('/', favoriteController.createFavorite);
router.delete('/', favoriteController.removeFavorite);
router.get('/:username', favoriteController.getFavoritesByUsername);
router.get('', favoriteController.getFavorite);

module.exports = router;