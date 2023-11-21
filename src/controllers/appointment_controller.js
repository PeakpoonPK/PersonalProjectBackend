const prisma = require('../models/prisma');
const fs = require('fs/promises')
const { checkEditAppointmentSchema, checkAppointmentIdSchema } = require('../validators/appointment_validator');



exports.AddAppointment = async (req, res, next) => {
    try {
        const { value, error } = checkEditAppointmentSchema.validate(req.body);
        console.log(value)
        if (error) {
            return next(error)
        }
        console.log(value)
        const appointment = await prisma.appointment.create({
            data: value
        });
        return res.status(201).json({ appointment, message: "Create appointment Successful!" })

    } catch (err) {
        console.log(err)
    }
}


// exports.updateDoctor = async (req, res, next) => {
//     try {
//         const doctorId = +req.params.doctorId
//         if (!req.files) { }
//         const response = {};
//         if (req.files.doctorImage) {
//             const url = await upload(req.files.doctorImage[0].path);
//             response.doctorImage = url;

//             await prisma.doctors.update({
//                 data: {
//                     doctorImage: url
//                 },
//                 where: {
//                     id: doctorId
//                 }
//             })
//         }

//         const oldData = await prisma.doctors.findFirst({ where: { id: +req.params.doctorId } });
//         const newData = JSON.parse(req.body.doctorData)

//         const patchData = { ...oldData, ...newData }

//         const updateDoctor = await prisma.doctors.update({
//             data: patchData,
//             where: {
//                 id: doctorId
//             }
//         }
//         );
//         res.status(201).json({ updateDoctor })

//     }
//     catch (err) {
//         next(err);
//     } finally {
//         if (req.files.doctorImage) {
//             fs.unlink(req.files.doctorImage[0].path)
//         }
//     }
// }



exports.getAllAppointmentBypetIdOfUserId = async (req, res, next) => {
    try {
        const pet = await prisma.pets.findMany({
            where: {
                userId: +req.user.id
            },
        });

        const appointment = await prisma.appointment.findMany({
            // where: {
            //     OR: pet.map(el => { return { petId: el.id } })
            // }
            where: {
                petId: { in: pet.map(el => el.id) }
            }, include: {
                pet: {
                    select: {
                        petName: true,
                        petImage: true
                    }
                }

                , doctor: true
            }

        });

        res.status(200).json({ appointment })
    } catch (err) {
        next(err)
    }
}

exports.getAppointmentById = async (req, res, next) => {
    try {
        const { error } = checkAppointmentIdSchema.validate(req.params);
        if (error) {
            return next(error);
        };
        const appointmentId = +req.params.appointmentId;
        console.log(appointmentId)
        const appointment = await prisma.appointment.findUnique({
            where: {
                id: appointmentId
            }
        });
        res.status(200).json({ appointment })
    } catch (err) {
        next(err)
    }
}

exports.getAllAppointment = async (req, res, next) => {
    try {
        const appointment = await prisma.appointment.findMany({
            include: {
                pet: {
                    select: {
                        petName: true,
                    }
                }
                , doctor: true
            }
        });
        res.status(200).json({ appointment })
    } catch (err) {
        next(err)
    }
}

exports.deleteAppointmentbyId = async (req, res, next) => {
    try {
        const { value, error } = checkAppointmentIdSchema.validate(req.params);
        console.log(req.params)
        if (error) {
            return next(error);
        }
        const appointmentId = value.appointmentId
        console.log(appointmentId)

        await prisma.appointment.delete({
            where: {
                id: appointmentId
            }
        });
        res.status(200).json({ message: 'deleted' })
    } catch (err) {
        next(err)
    }
};
