const validator = require('../helpers/validate');

const userValidation = async (req, res, next) => {
    const userValidationRule  = {
        email: 'required|email',
        password: 'required|string',
        firstName: 'required|string',
        lastName: 'required|string',
        phoneNumber: 'required|string',
        role: 'required|string',
    };
      validator(req.body, userValidationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
          });
        } else {
          next();
        }
      });
};

const movieValidation = async (req, res, next) => {
    const movieValidationRule  = {
        name: 'required|string',
        genre: 'required|string',
        releaseDate: 'required|string',
    };
      validator(req.body, movieValidationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
          });
        } else {
          next();
        }
      });
};

module.exports = { userValidation, movieValidation };