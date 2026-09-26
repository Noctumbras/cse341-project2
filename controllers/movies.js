const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllMovies = async(req, res) => {
    //#swagger.tags=['Movies']
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find();
        result.toArray().then( (movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies);
        });
    } catch (error) {
        res.status(500).json(error || 'An error occurred while getting the movies.');
    }
};

const getSingleMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    
    try {
        const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId});
        result.toArray().then( (movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(movies[0]);
        });
    } catch (error) {
        res.status(500).json(error || 'An error occurred while getting the specified movie.');
    }
};

const createMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    const movie = {
        name: req.body.name,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
    };

    try {
        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the movie.');
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while creating the movie.');
    }
};

const updateMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const movie = {
        name: req.body.name,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
    };

    try {
        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId}, movie);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the movie.');
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while updating the movie.');
    }
};

const deleteMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while deleting the movie.');
    }
};

module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovie,
    deleteMovie
}