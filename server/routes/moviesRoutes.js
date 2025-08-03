const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

router.get('/', moviesController.getMovies);
router.get('/search', moviesController.searchMovies);
router.get('/recommendations', moviesController.getRecommendations); // Add this route
router.get('/:id', moviesController.getMovieById); // Keep this last to avoid conflicts

module.exports = router;