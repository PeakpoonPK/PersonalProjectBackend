const Joi = require('joi');

const checkAppointmentIdSchema = Joi.object({
    appointmentId: Joi.number().integer().positive().required()
});


exports.checkAppointmentIdSchema = checkAppointmentIdSchema;

const checkEditAppointmentSchema = Joi.object({
    date: Joi.string().trim().required(),
    doctorId: Joi.number(),
    timePeroid: Joi.string().trim().required(),
    petId: Joi.number(),
})

exports.checkEditAppointmentSchema = checkEditAppointmentSchema