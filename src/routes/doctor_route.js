const express = require('express')
const doctorController = require('../controllers/doctor_controller')
const authenticatedMiddleware = require('../middleware/authenticated')
const uploadMiddleware = require('../middleware/upload')

const router = express.Router();

router.post('/add', authenticatedMiddleware,
    uploadMiddleware.single('doctorImage'), doctorController.AddDoctor)

router.patch('/:doctorId',
    authenticatedMiddleware,
    uploadMiddleware.fields([
        { name: 'doctorImage', maxCount: 1 },
        { name: 'doctorData', maxcount: 1 }
    ]),
    doctorController.updateDoctor);

router.get('/doctor', authenticatedMiddleware, doctorController.getAllDoctor)

router.get('/:doctorId', authenticatedMiddleware, doctorController.getDoctorById)


router.delete('/:doctorId', authenticatedMiddleware, doctorController.deleteDoctorbyId);




module.exports = router;