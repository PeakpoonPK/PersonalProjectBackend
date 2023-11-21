const Joi = require('joi');

const checkDoctorIdSchema = Joi.object({
    doctorId: Joi.number().integer().positive().required()
});


exports.checkDoctorIdSchema = checkDoctorIdSchema;

const checkEditDoctorSchema = Joi.object({
    firstNameDoctor: Joi.string().trim().required(),
    lastNameDoctor: Joi.string().trim().required(),
    specialist: Joi.string().trim().required(),
})

exports.checkEditDoctorSchema = checkEditDoctorSchema