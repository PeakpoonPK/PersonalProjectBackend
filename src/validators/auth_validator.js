const Joi = require('joi')

const registerPrismaSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    mobile_1: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).trim().required(),
})

exports.registerPrismaSchema = registerPrismaSchema;