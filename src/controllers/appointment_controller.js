const { upload } = require('../utilis/cloudinary_service');
const prisma = require('../models/prisma');
const fs = require('fs/promises')
const { checkEditAppointmentSchema, checkAppoointmentIdSchema } = require('../validators/appointment_validator');



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

// exports.getDoctorById = async (req, res, next) => {
//     try {
//         const { error } = checkDoctorIdSchema.validate(req.params);
//         if (error) {
//             return next(error);
//         };
//         const doctorId = +req.params.doctorId;
//         console.log(doctorId)
//         const doctor = await prisma.doctors.findUnique({
//             where: {
//                 id: doctorId
//             }
//         });
//         res.status(200).json({ doctor })
//     } catch (err) {
//         next(err)
//     }
// }

// exports.getAllDoctor = async (req, res, next) => {
//     try {
//         const doctor = await prisma.doctors.findMany({
//         });
//         res.status(200).json({ doctor })
//     } catch (err) {
//         next(err)
//     }
// }

// exports.deleteDoctorbyId = async (req, res, next) => {
//     try {
//         const { value, error } = checkDoctorIdSchema.validate(req.params);
//         if (error) {
//             return next(error);
//         }
//         const doctorId = value.doctorId
//         console.log(doctorId)

//         await prisma.doctors.delete({
//             where: {
//                 id: doctorId
//             }
//         });
//         res.status(200).json({ message: 'deleted' })
//     } catch (err) {
//         next(err)
//     }
// };
