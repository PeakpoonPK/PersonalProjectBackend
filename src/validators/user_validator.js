const Joi = require('joi');

const checkUserIdSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});

exports.checkUserIdSchema = checkUserIdSchema

const EditUserProfileSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    mobile_1: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be exactly 10 digits long and contain only numbers.'
    }),
    mobile_2: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be exactly 10 digits long and contain only numbers.'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).trim().required().messages({
        'string.pattern.base': 'Password must be between 8 and 30 characters and contain only letters and numbers.'
    }),
    lineId: Joi.string().trim().required(),
    address: Joi.string().trim().required()
})

exports.EditUserProfileSchema = EditUserProfileSchema

