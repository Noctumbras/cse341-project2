const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async(req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        result.toArray().then( (users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (error) {
        res.status(500).json(error || 'An error has occurred while getting the users.');
    }
};

const getSingleUser = async(req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId});
        result.toArray().then( (users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (error) {
        res.status(500).json(error || 'An error has occurred while getting the specified user.');
    }
};

const createUser = async(req, res) => {
    //#swagger.tags=['Users']
    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        favoriteMovieId: req.body.favoriteMovieId
    };

    try {
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while creating the user.');
    }
};

const updateUser = async(req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        favoriteMovieId: req.body.favoriteMovieId
    };

    try {
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId}, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while updating the user.');
    }
};

const deleteUser = async(req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    } catch (error) {
        res.status(500).json(error || 'An error occurred while deleting the user.');
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}