const express = require('express')

const appointmentController = require('../controllers/appointment_controller')
const authenticatedMiddleware = require('../middleware/authenticated')


const router = express.Router();

router.post('/add', authenticatedMiddleware, appointmentController.AddAppointment)



// router.patch('/:appointmentId', authenticatedMiddleware,appointmentController.updateDoctor);

// router.get('/appointment', authenticatedMiddleware,appointmentController.getAllDoctor)

// router.get('/:appointment', authenticatedMiddleware, appointmentController.getDoctorById)


// router.delete('/:appointmentId', authenticatedMiddleware,appointmentController.deleteDoctorbyId);


module.exports = router;