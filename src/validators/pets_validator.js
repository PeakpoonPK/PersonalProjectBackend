const Joi = require('joi');

const checkPetIdSchema = Joi.object({
    petId: Joi.number().integer().positive().required()
});


exports.checkPetIdSchema = checkPetIdSchema;

const checkEditPetSchema = Joi.object({
    petName: Joi.string().trim().required(),
    breed: Joi.string().trim().required(),
    age: Joi.string().trim().required(),
    sex: Joi.string().trim().required(),
    drugAllergy: Joi.string().trim().required(),
    Other: Joi.string().trim().required(),
    userId: Joi.number()
})

exports.checkEditPetSchema = checkEditPetSchema