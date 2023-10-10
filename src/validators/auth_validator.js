const Joi = require('joi')

const registerPrismaSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    mobile_1: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be exactly 10 digits long and contain only numbers.'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).trim().required().messages({
        'string.pattern.base': 'Password must be between 8 and 30 characters and contain only letters and numbers.'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required().strip(),
})

exports.registerPrismaSchema = registerPrismaSchema;

const loginPrismaSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

exports.loginPrismaSchema = loginPrismaSchema;