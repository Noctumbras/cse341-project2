const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', validation.movieValidation, moviesController.createMovie);
router.put('/:id', validation.movieValidation, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;